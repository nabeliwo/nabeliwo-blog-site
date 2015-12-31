import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import cssnext from 'gulp-cssnext';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import BrowserSync from 'browser-sync';

const browserSync = BrowserSync.create();
const reload = browserSync.reload;

const path = {
  scss: {
    ep: './public/assets/css/_scss/app.scss',
    dest: './public/assets/css/',
    sprite: './public/assets/css/_scss/foundation/',
    watch: [
      './public/assets/css/_scss/*.scss',
      './public/assets/css/_scss/**/*.scss'
    ]
  },
  js: {
    ep: './public/assets/js/app/app.js',
    dest: './public/assets/js/bundle/',
    watch: [
      './public/assets/js/app/*.js',
      './public/assets/js/app/**/*.js'
    ],
    lint: [
      './*.js',
      './**/*.js'
    ]
  },
  img: {
    files: './public/assets/img/sprite/*.png',
    dest: './public/assets/img/'
  }
};

gulp.task('sprite', () => {
  const spriteData = gulp.src(path.img.files)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_mixin_sprite.scss',
      imgPath: '/assets/img/sprite.png'
    }));

  spriteData.img.pipe(gulp.dest(path.img.dest));
  spriteData.css.pipe(gulp.dest(path.scss.sprite));
});

gulp.task('scss', () => {
  gulp.src(path.scss.ep)
    .pipe(plumber())
    .pipe(sass())
    .on('error', err => {
      console.log(`Error : ${err.message}`);
    })
    .pipe(cssnext({
      browsers: 'last 2 versions'
    }))
    .pipe(gulp.dest(path.scss.dest))
    .pipe(reload({ stream: true }));
});

gulp.task('browserify', () => {
  browserify(path.js.ep, { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', err => {
      console.log(`Error : ${err.message}`);
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(path.js.dest))
    .pipe(reload({ stream: true }));
});

gulp.task('lint', () => {
  return gulp.src(path.js.lint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('nodemon', cb => {
  let called = false;

  return nodemon({
    script: './index.js',
    ext: 'js html',
    ignore: ['./public/assets/', 'node_modules'],
    nodeArgs: ['--harmony']
  })
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload();
    }, 600);
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 35729,
    open: false
  });
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch('./public/index.html').on('change', reload);
  gulp.watch(path.scss.watch, ['scss']);
  gulp.watch(path.js.watch, ['browserify']);
});
