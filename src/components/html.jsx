'use strict'

/*
  The HTML component is only rendered on the server.
*/

import App from './app.jsx'

class HTML extends GLOBAL.React.Component {
  head() {
    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
        <meta name="description" content={"Zak Fisher's Website"} />
        <meta name="keywords" content="Web Development, Software Engineer" />
        <title>{this.props.title}</title>
        <link rel="stylesheet" type="text/css" href="/index.css" />
        {this.propsTag()}
      </head>
    )
  }

  body() {
    return (
      <body>
        <App {...this.props} />
        {this.scripts()}
      </body>
    )
  }

  scripts() {
    let vendors = ['/vendors/react.js', '/vendors/react-dom.js', '/vendors/ReactRouter.js', '/index.js']
    if (this.props.env === 'production') {
      vendors = vendors.map((path) => {return path.replace('.js', '.min.js') })
    }
    return vendors.map((filepath, i) => {
      return <script type='text/javascript' src={filepath} key={i} />
    })
  }

  propsTag() {
    let props = {}
    this.props.keys.forEach((p) => {
      props[p] = this.props[p]
    })
    const script = `window.data = ${JSON.stringify(props)}`
    return <script type='text/javascript' dangerouslySetInnerHTML={{__html: script}} />
  }

  render() {
    return <html>{this.head()}{this.body()}</html>
  }
}

export default HTML
