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
var merge = require('merge-stream');
var fs = require('fs');
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

var styleTask = function (srcs) {
  return gulp.src(srcs)
      .pipe($.sass({style: 'expanded'}))
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(gulp.dest('.tmp/'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('applications/'))
      .pipe($.size({title: 'custom-styles.css'}));
};

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
        config.applications + '/**/*.js',
        config.elements + '/**/*.js',
        '!' + config.elements + '/elements.vulcanized.js'
      ])
      .pipe($.jshint.extract()) // Extract JS from .html files
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.jshint.reporter('fail'));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  return styleTask(['applications/**/*-styles.scss']);
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
});

/** Vulcanize */
// vulcanizes and splits html/js, replaces menu-json with value from resources/uql-menu.json, min html/js 'vulcanize:clean_bower'
gulp.task('vulcanize', ['vulcanize:clean_bower', 'vulcanize:clean', 'vulcanize:copy'], function() {

  // optimisation to avoid constant calls to the api
  var menuJson=fs.readFileSync("./resources/uql-menu.json", "utf8");
  var regEx = new RegExp("menuJsonFileData;", "g");

  var contactsJson=fs.readFileSync("./bower_components/uqlibrary-api/data/contacts.json", "utf8");
  var contactsRegEx = new RegExp("contactsJsonFileData;", "g");

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
      .pipe($.if('*.js',replace({patterns: [{ match: contactsRegEx, replacement: contactsJson + ';'}], usePrefix: false}))) //replace contacts.json with value from uqlibrary-api
      .pipe($.if('*.js',$.uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))) // Minify js output
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
try { require('require-dir')('tasks'); } catch (err) {}
