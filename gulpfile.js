//Include gulp
var gulp = require('gulp');

//Include plugins


var plugins= require('gulp-load-plugins')({
    pattern:['gulp-*','gulp.*'],
    replaceString: /\bgulp[\-.]/
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
})
//Default Task
gulp.task('watch',function(){
    gulp.watch('src/js/*.js',['scripts']);
     gulp.watch('src/css/*.css',['css']);
});
gulp.task('default',['scripts','serve','watch']);