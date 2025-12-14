---
layout: post
title:  "revisiting gulp js"
date:   2020-10-21 19:34:49 +0000
categories: task-runner javascript gulp
---
# Learning & Revisiting Gulp

### Installing gulp

```bash
# globally
npm install -g gulp

# per project
npm install gulp --save-dev
```



### Installing and using gulp concatenation

##### installation

```bash
npm install gulp-concat --save-dev
```



##### Usage

```js
let gulp = require('gulp'),
    concat = require('gulp-concat');

//creating the concatenation function
gulp.task("concatScripts", function(){
    
    //[1] the files to concat
    gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
    ])
    //[2]
    .pipe(concat("app.js"))
    //[3] folder where file will end
    .pipe(gulp.dest('js'));
})


```



### Minifying Javascript with with gulp uglify and gulp rename

##### installation

```bash
# uglify insta
npm install gulp-uglify --save-dev

#gulp rename
npm i gulp-rename --save-dev
```



##### usage

```javascript
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

//creating the gulp uglify function
gulp.task("minifyscript",function(){
    gulp.src("js/app.js")
      // [1] uglify the file
      .pipe(uglify())
      // [2] renaming the result of the uglify file.
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'));
})
```



### Compiling Sass with gulp sass

##### installation

```bash
npm i gulp-sass --save-dev
```



##### usage

```js
let sass = require('gulp-sass');

// function for compiling sass
gulp.task('compileSass',function(){
    gulp.src('css/sassfile.scss')
      .pipe(sass())
      .pipe(gulp.dest('css'));
})
```



### Adding source map with gulp sourcemaps

##### installation

```bash
npm i gulp-sourcemaps --save-dev

```



##### usage

```js
let maps = require ('gulp-sourcemaps');

// using the sourcemap function
gulp.task('compileSass',function(){
    gulp.src('css/sassfile.scss')
      pipe(maps.init())
      .pipe(sass())
    //[1] write the source map making source map along the css file
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
})
```



### Using source map for javascript using gulp sourcemaps

##### usage

```js
let maps = require ('gulp-sourcemaps');

// using the sourcemap function
//creating the concatenation function
gulp.task("concatScripts", function(){
    
    //[1] the files to concat
    gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
    ])
    //[2]
    .pipe(concat("app.js"))
    .pipe(maps.write('./'))
    //[3] folder where file will end
    .pipe(gulp.dest('js'));
})
```



### Creating a gulp workflow by combining multiple task



##### usage

```js
//creating the build task

//[1] to run all tasks at the same time
gulp.task("build",['concatScripts','minifyScripts','compileSass'])

//[2] running tasks one after the other, so you need to add it as a dependency
gulp.task("minifyScript",["concatScripts"],function(){})

//[2-1] you need to add a return statement on all the functions
gulp.task("concatScripts",function(){
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
    ])
})
```



### Creating Pipelines for watching files with gulp



##### usage

```js
//creating watcher
gulp.task('watchSass',function(){
    //[1]if task isn't a dependent one, no need for a return statement
    gulp.watch(['scss/app.scss','scss/_base.scss'])
    
    //[2] refactor watcher
    gulp.watch(['scss/**/*.scss'],['compileSass'])
})
```



### Production pipeline with gulp



##### usage

```js
    gulp.task("build",['minifyScripts', 'compileSass'], function(){
        return gulp.src(['css/application.css',"js/app.min.js",'index.html',
                       'img/**','fonts/**'],{base: './'}) //[1]
        .pipe(gulp.dest("dist"));
    })
//[1] base keeps compiled files with director
```



### Deleting build files with del module

##### installation

```bash
npm i del --save-dev

```



##### usage 

```js
let del = require('del');


//create clean task
gulp.task('clean',function(){
    del(['dist','css/application.css*','js/app.*.js*']);
})

//default task
gulp.task("default",["clean"],function(){
    gulp.start('build');
})
```



