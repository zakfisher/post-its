import FormMsg from './form-msg.jsx'

class FormField extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisabled: false,
      message: {
        type: '',
        text: ''
      },
      style: {
        display: 'block'
      }
    }
  }

  static get defaultProps() {
    return {
      field: {
        hideOnSuccess: false
      }
    }
  }

  componentDidMount() {
    this.props.store.listen(this.onFormAction.bind(this))
  }

  onFormAction(data) {
    switch (data.action) {
      case 'submit':
        this.validate()
        break
      case 'disable form':
        this.setState({ isDisabled: true })
        break
      case 'enable form':
        this.setState({ isDisabled: false })
        break
      case 'form success':
        if (this.props.field.hideOnSuccess) {
          this.setState({
            style: { display: 'none' }
          })
        }
        break
    }
  }

  clearMessage() {
    this.setState({ message: {} })
  }

  getValue() {
    var value = null
    const field = this.props.field
    switch (field.type) {
      case 'text':
      case 'textarea':
        value = this.refs[field.name].value
    }
    return value
  }

  validate() {
    const field = this.props.field
    if (!field.name) return

    const value = this.getValue()

    // Check if required
    if (field.isRequired) {
      if (value.length === 0) {

        // Add error to store
        this.props.actions.setInvalidField({
          name: field.name,
          value: value
        })

        // Display error message
        return this.setState({
          message: {
            type: 'error',
            text: field.name.substr(0,1).toUpperCase() + field.name.substr(1).toLowerCase() + ' is required.',
          }
        })
      }
    }

    // Check custom validations
    var regex = null
    switch (field.validation) {
      case 'email':
        regex = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)
        if (!regex.exec(value)) {

          // Add error to store
          this.props.actions.setInvalidField({
            name: field.name,
            value: value
          })

          // Display error message
          return this.setState({
            message: {
              type: 'error',
              text: 'Please enter a valid email address.',
            }
          })
        }
        break

      case 'zip':
        regex = new RegExp(/^\d{5}$/)
        break

      case 'password':
        // check for password requirements
        // - 1 special character
        // - 1 uppercase
        // - 1 lowercase
        break
    }

    // Let our store know we've validated this field
    this.props.actions.setValidField({
      name: field.name,
      value: value
    })
  }

  render() {
    return (
      <div className={'field ' + this.props.field.grid} style={this.state.style}>
        {this.renderFormElement()}
        {this.renderFormMessage()}
      </div>
    )
  }

  renderFormElement() {
    const { field } = this.props
    switch (field.type) {
      case 'text':
        return <input ref={field.name} name={field.name} type='text' placeholder={field.placeholder} disabled={this.state.isDisabled} maxLength={field.maxLength} onFocus={this.clearMessage.bind(this)} onChange={this.clearMessage.bind(this)} />
      case 'textarea':
        return <textarea ref={field.name} name={field.name} placeholder={field.placeholder} disabled={this.state.isDisabled} maxLength={field.maxLength} onFocus={this.clearMessage.bind(this)} onChange={this.clearMessage.bind(this)} />
      case 'submit':
        return <input type='submit' disabled={this.state.isDisabled} value={field.text} />
    }
  }

  renderFormMessage() {
    return <FormMsg message={this.state.message} />
  }
}

export default FormField
