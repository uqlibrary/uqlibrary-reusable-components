/*
 * deployment tasks
 *
 * contains tasks for AWS S3 invalidation and publishing
 *
 * */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var cloudfront = require('gulp-invalidate-cloudfront');

var path = require('path');
var fs = require('fs');
var argv = require('yargs').argv;
var merge = require('merge-stream');

var config = {
  dist: 'dist',
  applications: 'applications',
  elements: 'elements',
  dependencies: 'bower_components',
  resources: 'resources',
  demo: 'elements/demo'
};

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

  return gulp.src('./' + config.dist + '/**')
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

// copy and rename elements.html to elements.vulcanized.html
gulp.task('copy:aws', function () {

  var apps = gulp.src([config.applications + '/**/*.*',
    '!' + config.applications + '/**/*.scss',
    '!' + config.applications + '/**/*.json'])
      .pipe(gulp.dest(config.dist));

  var vulcanized = gulp.src([config.elements + '/elements.vulcanized.*'])
      .pipe(gulp.dest(config.dist));

  var vulcanized2elements = gulp.src([config.elements + '/elements.vulcanized.*'])
      .pipe(gulp.dest(config.dist + '/elements'));

  var dependencies = gulp.src([config.dependencies + '/webcomponentsjs/**/webcomponents*.js'])
      .pipe(gulp.dest(config.dist + '/webcomponentsjs'));

  var resources = gulp.src([config.resources + '/**/*'])
      .pipe(gulp.dest(config.dist + '/resources'));

  var demo = gulp.src([config.demo + '/**/*'])
      .pipe(gulp.dest(config.dist + '/elements/demo'));

  var mock_data = gulp.src([config.dependencies + '/uqlibrary-api/mock/**/*'])
      .pipe(gulp.dest(config.dist + '/bower_components/uqlibrary-api/mock'));

  var jsonData = gulp.src([config.dependencies + '/uqlibrary-api/data/contacts.json'])
      .pipe(gulp.dest(config.dist + '/bower_components/uqlibrary-api/data'));

  return merge(vulcanized, dependencies, resources, demo, mock_data, vulcanized2elements, jsonData)
      .pipe($.size({title: 'copy'}));
});