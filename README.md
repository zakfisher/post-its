![](http://superfantastic.s3.amazonaws.com/post-its/landing.png)

Zak Fisher's Post-it App
=====
A full JavaScript stack built with Node, Express, React, Reflux, Gulp, JSX, ES6, and SCSS.

It is hosted on Heroku at [ZF Post-its](https://zf-post-its.herokuapp.com/).

## Installation

To run this locally, you'll need `node`, `npm` and `gulp` installed globally.

Download `node` & `npm` at [nodejs.org](https://nodejs.org/en/).

Download `gulp` with `npm install -g gulp`.

Download dependencies with `npm i`.

## Server

On production, Heroku runs `node server.js`, which is our [server entry point](https://github.com/zakfisher/post-its/blob/master/index.js).

In dev, we run `gulp`, which
* starts the express server at [localhost:4200](http://localhost:4200)
* restarts the server whenever there's a file change
* watches & compiles `src/**.jsx` files into `public/index.js` using browserify (reactify)
* watches & compiles `src/**.scss` files into `public/index.scss`
* minifies JS & CSS
* uses livereload to refresh the browser automatically

## Client

The React app's entry point is at [`src/index.jsx`](https://github.com/zakfisher/post-its/blob/master/src/index.jsx).

One CSS file is compiled from [`src/index.scss`](https://github.com/zakfisher/post-its/blob/master/src/index.scss).

## Key Features

There are a few noteworthy features, including:
* [A Gulp workflow with LiveReload](https://github.com/zakfisher/post-its/blob/master/gulpfile.js)
* [A Reflux data store using localStorage](https://github.com/zakfisher/post-its/blob/master/src/services/notes.js)
* [An HTML React Component (used for server-side JSX rendering)](https://github.com/zakfisher/post-its/blob/master/src/components/html.jsx)

## Future Development

Some features that still need to be implemented include:
* Server & Client-side Routing
* Additional content & pages
* Unit testing
* SEO optimization
* Analytics
* Better Documentation

## Credits

If you have any questions or comments, feel free to send me an email at [zak@super-fantastic.com](mailto:zak@super-fantastic.com).

Thanks for stopping by,

Zak Fisher

![](https://avatars2.githubusercontent.com/u/1245254?v=3&s=160)
