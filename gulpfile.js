// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer

/*
gulp.task('css', function () {
    return gulp.src(source + '/assets/css/styles.less')
        .pipe(plugins.less())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(destination + '/assets/css/'));
});




 // Tâche "css" = LESS + autoprefixer + unCSS + minify
 gulp.task('css', function() {
 return gulp.src(source + '/assets/css/*.less')
 .pipe(less())
 .pipe(autoprefixer())
 .pipe(uncss({
 html: [source + '/{,_includes/}/{,conf/}/{,livres/}*.html']
 }))
 .pipe(rename({
 suffix: '.min'
 }))
 .pipe(minify())
 .pipe(gulp.dest(prod + '/assets/css/'));
 });
*/
// Tâche "js" = uglify + concat
gulp.task('js', function() {
    return gulp.src(source + '/assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('global.min.js'))
        .pipe(gulp.dest(prod + '/assets/js/'));
});
// Tâche "img" = Images optimisées
gulp.task('img', function () {
    return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest(prod + '/assets/img'));
});
gulp.task('css', function() {
    return gulp.src(source + '/assets/css/styles.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minify())
        .pipe(gulp.dest(prod + '/assets/css/'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
    return gulp.src(destination + '/assets/css/*.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/css/'));
});
// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche par défaut
gulp.task('default', ['build']);
// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
    gulp.watch(source + '/assets/css/*.less', ['build']);
});