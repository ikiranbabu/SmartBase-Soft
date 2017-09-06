const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const sequence = require('gulp-sequence');

var scss_paths = [
    "./src/main/webapp/content/scss/*.scss",
    "./src/main/webapp/app/**/*.scss",
    "./src/main/webapp/app/**/**/*.scss"
];
var css_paths = [
    "./src/main/webapp/content/scss/*.css",
    "./src/main/webapp/app/**/*.css",
    "./src/main/webapp/app/**/**/*.css"
];
var scssbkp_paths = [
    "./src/main/webapp/content/scss/*.scssbkp",
    "./src/main/webapp/app/**/*.scssbkp",
    "./src/main/webapp/app/**/**/*.scssbkp"
];

gulp.task('sass', () => {
    return gulp.src(scss_paths, {base: './'})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

gulp.task('copy:bkp', () => {
    return gulp.src(scss_paths, {base: './'})
        .pipe(rename({ extname: '.scssbkp' }))
        .pipe(gulp.dest('./'));
});

gulp.task('rename:css:scss', () => {
    return gulp.src(css_paths, {base: './'})
        .pipe(rename({ extname: '.scss' }))
        .pipe(gulp.dest('./'));
});

gulp.task('rename:bkp:scss', () => {
    return gulp.src(scssbkp_paths, {base: './'})
        .pipe(rename({ extname: '.scss' }))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', () => {
    return gulp.src(['./src/main/webapp/content/scss/*.scssbkp', './src/main/webapp/content/scss/*.css',
        './src/main/webapp/app/**/*.scssbkp', './src/main/webapp/app/**/*.css',
        './src/main/webapp/app/**/**/*.scssbkp', './src/main/webapp/app/**/**/*.css'], { read: false })
        .pipe(clean());
});

gulp.task('before:ngc', sequence('sass', 'copy:bkp', 'rename:css:scss'));
gulp.task('after:ngc', sequence('rename:bkp:scss', 'clean'));
