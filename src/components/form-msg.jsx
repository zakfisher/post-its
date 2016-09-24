'use strict'

class FormMsg extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      big: false,
      center: false
    }
  }

  getStyle() {
    var style = {
      display: 'none',
      margin: '0',
      fontSize: this.props.big ? '1rem' : '0.8rem',
    }
    if (this.props.center) {
      style.margin = '0 auto'
    }
    switch (this.props.message.type) {
      case 'success':
        style.display = 'block'
        style.color = 'green'
        break
      case 'error':
        style.display = 'block'
        style.color = 'red'
        break
    }
    return style
  }

  render() {
    return <p style={this.getStyle()}>{this.props.message.text}</p>
  }
}

export default FormMsg
