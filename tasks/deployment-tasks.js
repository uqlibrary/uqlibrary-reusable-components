/*
 * deployment tasks
 *
 * contains tasks for AWS S3 invalidation and publishing
 *
 * */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var cloudfront = require('gulp-invalidate-cloudfront');
var fs = require('fs');
var argv = require('yargs/yargs')(process.argv.slice(2));
var merge = require('merge-stream');

var config = {
  dist: 'dist',
  applications: 'applications',
  elements: 'elements',
  dependencies: '..',
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
  var awsConfig = JSON.parse(fs.readFileSync('./aws.json', 'utf-8'));

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
    config.dependencies + '/*',
    '!./*',
    config.applications + '/*',
    config.elements + '/*',
    config.resources + '/*'
  ]).pipe(cloudfront(invalidationBatch, awsSettings));
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

  var mockData = gulp.src([config.dependencies + '/uqlibrary-api/mock/**/*'])
      .pipe(gulp.dest(config.dist + '/../uqlibrary-api/mock'));

  var jsonData = gulp.src([config.dependencies + '/uqlibrary-api/data/contacts.json'])
      .pipe(gulp.dest(config.dist + '/../uqlibrary-api/data'));

  return merge(vulcanized, dependencies, resources, demo, mockData, vulcanized2elements, jsonData)
      .pipe($.size({title: 'copy'}));
});

// upload package to S3
gulp.task('publish', gulp.series('copy:aws', function () {

  // create a new publisher using S3 options
  var awsConfig = JSON.parse(fs.readFileSync('./aws.json', 'utf-8'));
  var publisher = $.awspublish.create(awsConfig);

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  // Local debug config. Comment out lines in the function till here.
  // var awsConfig = {
  //   params: {
  //     bucketSubDir: 'my-branch/reusable-components'
  //   }
  // };

  return gulp.src(
      [
        './' + config.dist + '/**',
        './uqlibrary-api/**'        
      ], 
      {
        base: '.' // To include the directory itself; not just subfolders
      }
    )

    // Everything inside dist folder should be put inside bucketSubDir
    // Everything else should be at top level
    .pipe($.rename(function (path) {
      if (path.dirname.indexOf(config.dist) === 0) {
        path.dirname = awsConfig.params.bucketSubDir + '/' + path.dirname.substring(config.dist.length + 1);
      } else {
        if (path.basename === config.dist) {
          // Avoid creating an empty dir called 'dist'
          path.dirname = awsConfig.params.bucketSubDir;
          path.basename = '.';
        } else {
          if (awsConfig.params.bucketSubDir.indexOf('/') > -1) {
            // For non-production branches, bucketSubDir has the format 
            // "<branchname>/reusable-components"
            path.dirname = awsConfig.params.bucketSubDir + '/../' + path.dirname;
          }
        }
      }
    }))

    // Local debug config. Comment-out lines in this function after the next.
    // .pipe(gulp.dest('to-aws'));

    // gzip, Set Content-Encoding headers
    .pipe($.awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe($.awspublish.reporter());
    
}));
