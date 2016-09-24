'use strict'

const babelify = require('babelify')
const browserify = require('browserify')
const cleanCSS = require('gulp-clean-css')
const del = require('del')
const gulp = require('gulp')
const gulpsync = require('gulp-sync')(gulp)
const gutil = require('gulp-util')
const livereload = require('gulp-livereload')
const minify = require('gulp-minify')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const wait = require('gulp-wait')
const watch = require('gulp-watch')

let isDev = !process.env.NODE_ENV
//isDev = false

if (isDev) {
  livereload({ start: true })
  gulp.task('default', ['build', 'watch', 'dev-server'])
}
else {
  gulp.task('default', ['build'])
}

const dist = './public/.dist' // dir for compiled js/css before minification

const reloadDelay = 0
const minifyDelay = 3000

const minifyJS = () => {
  const src = `${dist}/index.js`

  let bundle = gulp.src(`${dist}/index.js`)
    .pipe(minify({
      ext:{
        src:'.js',
        min:'.min.js'
      },
      mangle: false,
      exclude: ['tasks'],
      ignoreFiles: []
    }))
    .pipe(gulp.dest('public'))

  if (isDev) {
    bundle
      .pipe(wait(reloadDelay))
      .pipe(livereload())
  }

  del([src])
}

const minifyCSS = () => {
  const src = `${dist}/index.css`

  let bundle = gulp.src(src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public'))

  if (isDev) {
    bundle
      .pipe(wait(reloadDelay))
      .pipe(livereload())
  }

  del([src])
}

const minifyAll = () => {
  minifyJS()
  minifyCSS()
  setTimeout(() => {
    del([dist])
  }, 300)
}

gulp.task('build', [
  'copy-dependencies',
  'copy-fonts',
  'copy-images',
  'scss',
  'jsx',
  'minify',
], () => {
  setTimeout(() => {
    console.log('build complete')
    if (!isDev) {
      process.exit()
    }
  }, 15000)
})

gulp.task('copy-dependencies', () => {
  const vendors = './public/vendors'
  gulp.src('./node_modules/react/dist/react.js').pipe(gulp.dest(vendors))
  gulp.src('./node_modules/react/dist/react.min.js').pipe(gulp.dest(vendors))
  gulp.src('./node_modules/react-dom/dist/react-dom.js').pipe(gulp.dest(vendors))
  gulp.src('./node_modules/react-dom/dist/react-dom.min.js').pipe(gulp.dest(vendors))
  gulp.src('./node_modules/react-router/umd/ReactRouter.js').pipe(gulp.dest(vendors))
  gulp.src('./node_modules/react-router/umd/ReactRouter.min.js').pipe(gulp.dest(vendors))
})

gulp.task('copy-fonts', function() {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'))
})

gulp.task('copy-images', function() {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./public/images'))
})

gulp.task('jsx', () => {
  const src = './src/index.jsx'
  const filename = 'index.js'
  const dependencies = [
    'react',
    'react-dom',
    'react-router',
  ]

  let bundle = browserify({
    importGlobals: true,
    entries: src,
    debug: true
  })
  dependencies.map((dep) => {
    bundle.exclude(dep)
  })
  bundle
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', gutil.log)
    .pipe(source(filename))
    .pipe(gulp.dest(dist))

  setTimeout(minifyJS, minifyDelay)
})

gulp.task('minify', () => {
  setTimeout(minifyAll, 10000)
})

gulp.task('minify-js', () => {
  minifyJS()
})

gulp.task('minify-css', function() {
  minifyCSS()
})

gulp.task('scss', () => {
  let bundle = gulp.src(['./src/*.scss'])
    .pipe(sass({
      loadPath: ['./src/**']
    }).on('error', sass.logError))
    .pipe(gulp.dest(dist))

  if (isDev) {
    bundle
      .pipe(wait(reloadDelay))
      .pipe(livereload())
  }

  setTimeout(minifyCSS, minifyDelay)
})

gulp.task('dev-server', () => {
  var env = require('./.env')
  return nodemon({
    script: 'server.js',
    ext: 'html js jsx',
    env: env
  })
})

gulp.task('watch', () => {
  gulp.watch(['./src/index.jsx', './src/components/*', './src/components/**/*', './src/pages/*'], ['jsx'])
  gulp.watch(['./src/index.scss', './src/styles/*.scss'], ['scss'])
  gulp.watch([`${dist}/index.js`], ['minify-js'])
  gulp.watch([`${dist}/index.css`], ['minify-css'])
})
