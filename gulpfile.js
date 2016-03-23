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
var argv = require('yargs').argv;
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');

//var browserSync = require('browser-sync');
//var reload = browserSync.reload;

var path = require('path');
var fs = require('fs');
var glob = require('glob');

var cloudfront = require('gulp-invalidate-cloudfront');
var replace = require('gulp-replace-task');
var taskList = require('gulp-task-listing');

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
  applications: 'applications',
  elements: 'elements',
  dependencies: 'bower_components',
  resources: 'resources',
  demo: 'elements/demo'
};

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
        config.applications + '/**/*.js',
        config.elements + '/**/*.js',
        '!' + config.elements + '/elements.vulcanized.js'
      ])
      //.pipe(reload({stream: true, once: true}))
      .pipe($.jshint.extract()) // Extract JS from .html files
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'));
  //.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JSON
gulp.task('jsonlint', function () {
  return gulp.src([
        config.resources + '/**/*.json',
        config.applications + '/**/*.json',
        config.elements + '/**/*.json'
      ])
      .pipe($.jsonlint())
      .pipe($.jsonlint.failAfterError())
      .pipe($.jsonlint.reporter());
});

// Clean elements.html from bower_components, all required elements should be defined in elements/elements.html
// and do not rely on bower_components/element-x/elements.html
gulp.task('vulcanize:clean_bower', function() {

  var regEx = new RegExp("bower_components", "g");

  return gulp.src('bower_components/**/*.html')
      .pipe(replace({patterns: [{ match: regEx, replacement: ".."}], usePrefix: false}))
      .pipe(gulp.dest('bower_components'))
      .pipe($.size({title: 'vulcanize:clean_bower'}));

  //return del([config.dependencies + '/**/**/elements.html']).then(paths => {
  //      if (paths) {
  //        //create an empty file?
  //        for (var i = 0; i < paths.length; i++) {
  //          var path = paths[i];
  //          console.log(path);
  //          fs.writeFile(path, '', function () {
  //          });
  //        }
  //      }
  //
  //  });
});

/** Vulcanize */
// vulcanizes and splits html/js, replaces menu-json with value from resources/uql-menu.json, min html/js 'vulcanize:clean_bower'
gulp.task('vulcanize', ['vulcanize:clean_bower', 'vulcanize:clean', 'vulcanize:copy'], function() {

  var menuJson=fs.readFileSync("./resources/uql-menu.json", "utf8");
  var regEx = new RegExp("menuJsonFileData;", "g");

  return gulp.src(config.elements + '/elements.vulcanized.html')
      .pipe($.vulcanize({
        dest: config.elements,
        strip: true,
        inlineCss: true,
        inlineScripts: true,
        stripComments: true
      }))
      .pipe($.crisper({
        scriptInHead: false, // true is default
        onlySplit: false
      })) // Separate JS into its own file for CSP compliance and reduce html parser load.
      .pipe($.if('*.js',replace({patterns: [{ match: regEx, replacement: menuJson + ';'}], usePrefix: false}))) //replace menu-json with value from resources/uql-menu.json
      .pipe($.if('*.js',$.uglify({preserveComments: 'some'}))) // Minify js output
      .pipe($.if('*.html', $.minifyHtml({quotes: true, empty: true, spare: true}))) // Minify html output
      .pipe(gulp.dest(config.elements))
      .pipe($.size({title: 'vulcanize'}));
});

// delete old vulcanized file
gulp.task('vulcanize:clean', function (done) {
  return del([
    config.elements + '/elements.vulcanized.html',
    config.elements + '/elements.vulcanized.js'
  ]);
});

// copy and rename elements.html to elements.vulcanized.html
gulp.task('vulcanize:copy', function () {
  var vulcanized = gulp.src([config.elements + '/elements.html'])
      .pipe($.rename('elements.vulcanized.html'))
      .pipe(gulp.dest(config.elements));

  return merge(vulcanized)
      .pipe($.size({title: 'copy'}));
});

//optimize css and js of application specific files
gulp.task('optimize', function () {
  gulp.src(config.applications + '/**/*')
      //.pipe($.cssmin())
      .pipe($.if('*.css',$.cssmin())) // Minify css output
      .pipe($.if('*.js',$.uglify({preserveComments: 'some'}))) // Minify js output
      .pipe(gulp.dest(config.applications));
});

// copy and rename elements.html to elements.vulcanized.html
gulp.task('copy:aws', function () {
  var vulcanized = gulp.src([config.elements + '/elements.vulcanized.*'])
      .pipe(gulp.dest(config.applications));

  var vulcanized2elements = gulp.src([config.elements + '/elements.vulcanized.*'])
      .pipe(gulp.dest(config.applications + '/elements'));

  var dependencies = gulp.src([config.dependencies + '/webcomponentsjs/**/webcomponents*.js'])
      .pipe(gulp.dest(config.applications + '/webcomponentsjs'));

  var resources = gulp.src([config.resources + '/**/*'])
      .pipe(gulp.dest(config.applications + '/resources'));

  var demo = gulp.src([config.demo + '/**/*'])
      .pipe(gulp.dest(config.applications + '/elements/demo'));

  var mock_data = gulp.src([config.dependencies + '/uqlibrary-api/mock/**/*'])
      .pipe(gulp.dest(config.applications + '/bower_components/uqlibrary-api/mock'));

  return merge(vulcanized, dependencies, resources, demo, mock_data, vulcanized2elements)
      .pipe($.size({title: 'copy'}));
});

/**
 * Command line param:
 *    --path {INVALIDATION_PATH}
 *
 * If no bucket path passed will invalidate production subdir
 */
gulp.task('invalidate', function () {
  var awsConfig = JSON.parse(fs.readFileSync('./aws.json'));

  var invalidatePath = '';

  if (argv.path) {
    invalidatePath = argv.path + '/*';
  } else {
    invalidatePath += '/reusable-components/*';
  }

  $.util.log('Invalidation path: ' + invalidatePath);

  var invalidationBatch = {
    CallerReference: new Date().toString(),
    Paths: {
      Quantity: 1,
      Items: [
        invalidatePath
      ]
    }
  };

  var awsSettings = {
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey
    },
    distributionId: awsConfig.params.distribution,
    region: awsConfig.params.region
  };

  return gulp.src([
    config.applications + '/*',
    config.elements + '/*',
    config.dependencies + '/*',
    config.resources + '/*'
  ]).pipe(cloudfront(invalidationBatch, awsSettings));
});

// upload package to S3
gulp.task('publish', ['copy:aws'], function () {

  // create a new publisher using S3 options
  var awsConfig = JSON.parse(fs.readFileSync('./aws.json'));
  var publisher = $.awspublish.create(awsConfig);

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./' + config.applications + '/**')
      .pipe($.rename(function (path) {
        path.dirname = awsConfig.params.bucketSubDir + '/' + path.dirname;
      }))
      // gzip, Set Content-Encoding headers
      .pipe($.awspublish.gzip())

      // publisher will add Content-Length, Content-Type and headers specified above
      // If not specified it will set x-amz-acl to public-read by default
      .pipe(publisher.publish(headers))

      // create a cache file to speed up consecutive uploads
      .pipe(publisher.cache())

      // print upload updates to console
      .pipe($.awspublish.reporter());
});

// inject browser-update.js code into html pages
gulp.task('inject-browser-update', function() {

  var regEx = new RegExp("//bower_components/uqlibrary-browser-supported/browser-update.js", "g");
  var browserUpdate=fs.readFileSync("bower_components/uqlibrary-browser-supported/browser-update.js", "utf8");

  return gulp.src(config.resources + '/**/*.js')
      .pipe(replace({patterns: [{ match: regEx, replacement: browserUpdate}], usePrefix: false}))
      .pipe(gulp.dest(config.resources))
      .pipe($.size({title: 'inject-browser-update'}));
});

gulp.task('syntax', [
  'jshint',
  'jsonlint'
]);

// display a list of available tasks
gulp.task('help', taskList);
gulp.task('default', ['help']);


// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try {
  require('web-component-tester').gulp.init(gulp);
}
catch (err) {
}

//// Load custom tasks from the `tasks` directory
//try { require('require-dir')('tasks'); } catch (err) {}
