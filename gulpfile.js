//Include major plugins
var gulp = require('gulp');
var args= require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

//Include gulp-plugins
var plugins= require('gulp-load-plugins')({
    pattern:['gulp-*','gulp.*'],
    replaceString: /\bgulp[\-.]/
});

gulp.task('vet',function(){
    log('Analyzing source with JSHint and JSCS');
    return gulp.src(config.alljs)
    .pipe(plugins.if(args.verbose,plugins.print()))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish',{verbose:true}))
    .pipe(plugins.jshint.reporter('fail'));
});



gulp.task('styles', ['clean-styles'], function(){
    log('Compiling Less --> CSS');
    return gulp
        .src(config.less)
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({browsers:['last 2 version','> 5%']}))
        .pipe(gulp.dest(config.temp));
});
gulp.task('clean-styles',function(done) { 
    var files=config.temp + '**/*.css';
    clean(files,done);
});

gulp.task('less-watcher',function(){
    gulp.watch([config.less],['styles']);
});
gulp.task('serve',function(){
    plugins.nodemon({
        'script':'build/js/main.min.js'
    });
});

gulp.task('scripts',function(){
    return gulp.src('src/js/*.js')
               .pipe(plugins.concat('main.js'))
               .pipe(plugins.rename({suffix:'.min'}))
               .pipe(plugins.uglify())
               .pipe(gulp.dest('build/js')); 
});

gulp.task('css',function(){
    return gulp.src('src/css/*.css')
               .pipe(plugins.cleanCSS())
               .pipe(gulp.dest('build/css')); 
});

//Default Task
gulp.task('watch',function(){
    gulp.watch('src/js/*.js',['scripts']);
     gulp.watch('src/css/*.css',['css']);
});

gulp.task('default',['scripts','serve','watch']);

/////////////////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for(var item in msg) {
            if(msg.hasOwnProperty(item)) {
                plugins.util.log(plugins.util.colors.blue(msg[item]));
            }
        }
    } else {
        plugins.util.log(plugins.util.colors.blue(msg));
    }
}

function clean(path,done) {
    log('Cleaning: ' + plugins.util.colors.blue(path));
    del(path);
    done();
}