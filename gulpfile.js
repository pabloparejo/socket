var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var pump = require('pump');
var ngAnnotate = require('gulp-ng-annotate');

var rootFolder = "static/public/"
var jsUri = rootFolder + "js/"
var minUri = rootFolder + "min/"
var paths = {
    scripts: ["vendor/angular.min.js", "vendor/angular-route.min.js", "js/**/*.js"].map(route => rootFolder + route)
}

console.log(paths.scripts)

gulp.task("default", function () {
    gulp.watch(paths.scripts, ["dev-js"])
});

gulp.task("js", function (cb) {
    pump(minifyStream(false), cb)
})

gulp.task("dev-js", function (cb) {
    pump(minifyStream(true), cb)
})

function minifyStream(dev) {
    var before = [
        gulp.src(paths.scripts),
        sourcemaps.init(),
        babel(),
        ngAnnotate()
    ]

    var min = [uglify()]

    var after = [
        concat("all.js"),
        sourcemaps.write("."),
        gulp.dest(minUri)
    ]

    if (dev) {
        return before.concat(after)
    }else{
        return before.concat(min).concat(after)
    }
}