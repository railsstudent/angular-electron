// get the devDependencies
var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron-prebuilt');

var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

// create the gulp task
gulp.task('run', [], function() {
  childProcess.spawn(electron, ['./app'], { stdio : 'inherit' });
});

gulp.task('run-build', [], function() {
  childProcess.spawn(electron, ['./build'], { stdio : 'inherit' });
});

// https://github.com/szwacz/electron-boilerplate/blob/master/tasks/build.js
gulp.task('clean', function(callback) {
  return destDir.dirAsync('.', { empty: true });
});

// Copy files into build directory, We don’t need to copy the angular
// application code using copy function. usemin will do this for us in next
// section:

var copyTask = function _copyTask() {
  return projectDir.copyAsync('app', destDir.path(), {
      overwrite: true,
      matching: [
        './node_modules/**/*',
        '*.html',
        '*.css',
        'main.js',
        'package.json'
      ]
  });
}

gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', copyTask);

//Our build task takes our app/index.html with gulp.src() and then we pipe it
// to usemin. It then writes the output into build directory and replace
// references in index.html with optimized version of code.
gulp.task ('build', ['copy'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
        js : [ uglify(), rev() ],
        app : [ uglify(), rev() ],
        css: [ minifyCss(), rev() ]
    }))
    .pipe(gulp.dest('build/'));
});

var release_linux = require('./build.linux');
 var os = require('os');
 gulp.task('build-electron', ['build'], function () {
     switch (os.platform()) {
         case 'darwin':
         // execute build.osx.js
         break;
         case 'linux':
         //execute build.linux.js
         return release_linux.build();
         case 'win32':
//         return release_windows.build();
            break;
     }
});
