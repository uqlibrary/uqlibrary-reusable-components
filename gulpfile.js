/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
//var browserSync = require('browser-sync');
var vulcanize = require('gulp-vulcanize');
//var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var awspublish = require('gulp-awspublish');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var taskList = require('gulp-task-listing');
var cssmin = require('gulp-cssmin');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var config = {
  applications : 'applications',
  elements: 'elements',
  dependencies: 'bower_components',
  resources: 'resources'
};

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
    config.applications + '/**/*.js',
    config.elements + '/**/*.js',
    config.elements + '/**/*.html'
  ])
    //.pipe(reload({stream: true, once: true}))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
    //.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Vulcanize imports
gulp.task('vulcanize', ['clean:vulcanize', 'copy:vulcanize'], function () {

  return gulp.src(config.elements + '/elements.vulcanized.html')
    .pipe($.vulcanize({
      dest: config.elements,
      strip: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.elements))
    .pipe($.size({title: 'vulcanize'}));
});

// delete old vulcanized file
gulp.task('clean:vulcanize', function(done) {
  del([
    config.elements + '/elements.vulcanized.html'
  ], done);
});

// copy and rename elements.html to elements.vulcanized.html
gulp.task('copy:vulcanize', function () {
  var vulcanized = gulp.src([config.elements + '/elements.html'])
    .pipe($.rename('elements.vulcanized.html'))
    .pipe(gulp.dest(config.elements));

  return merge(vulcanized)
    .pipe($.size({title: 'copy'}));
});

// optimize files
gulp.task('optimize', function () {
  gulp.src(config.applications + '/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(config.applications));
});


// copy and rename elements.html to elements.vulcanized.html
gulp.task('copy:aws', function () {
  var vulcanized = gulp.src([config.elements + '/elements.vulcanized.html'])
    .pipe(gulp.dest(config.applications));

  var dependencies = gulp.src([config.dependencies + '/webcomponentsjs/**/*'])
    .pipe(gulp.dest(config.applications + '/webcomponentsjs'));

  var resources = gulp.src([config.resources + '/**/*'])
    .pipe(gulp.dest(config.applications + '/resources'));

  return merge(vulcanized, dependencies, resources)
    .pipe($.size({title: 'copy'}));
});

// upload package to S3
gulp.task('publish', ['copy:aws'], function() {

  // create a new publisher using S3 options
  var awsConfig = JSON.parse(fs.readFileSync('./aws.json'));
  var publisher = awspublish.create(awsConfig);

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./' + config.applications + '/**')
    .pipe(rename(function (path) {
      path.dirname = awsConfig.params.bucketSubDir + '/' + path.dirname;
    }))
    // gzip, Set Content-Encoding headers
    .pipe(awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter());
});

// display a list of available tasks
gulp.task('help', taskList);
gulp.task('default', ['help']);


//  TODO: add tests for custom elements
//// Load tasks for web-component-tester
//// Adds tasks for `gulp test:local` and `gulp test:remote`
//try { require('web-component-tester').gulp.init(gulp); } catch (err) {}
//
//// Load custom tasks from the `tasks` directory
//try { require('require-dir')('tasks'); } catch (err) {}
