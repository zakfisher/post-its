'use strict'

import Reflux from 'reflux'
import request from 'ajax-request'
import UUID from 'uuid'
import FormField from './form-field.jsx'
import FormMsg from './form-msg.jsx'

function Form() {
  const id = UUID.v4()

  const FormActions = Reflux.createActions([
    'setFieldCount',
    'submitForm',
    'setInvalidField',
    'setValidField',
    'checkIfDoneValidating',
    'doneValidating',
    'enableForm',
    'disableForm',
    'formSuccess',
  ])

  const FormStore = Reflux.createStore({
    listenables: [FormActions],
    data: {
      fieldCount: 0,
      invalidFields: [],
      validFields: [],
    },
    init: function() {},
    setFieldCount: function(count) {
      this.data.fieldCount = count
    },
    submitForm: function() {
      this.disableForm()
      this.data.validFields = []
      this.data.invalidFields = []
      this.trigger({
        action: 'submit'
      })
    },
    setInvalidField: function(field) {
      this.data.invalidFields.push(field)
      this.checkIfDoneValidating()
    },
    setValidField: function(field) {
      this.data.validFields.push(field)
      this.checkIfDoneValidating()
    },
    checkIfDoneValidating: function() {
      const totalFields = this.data.fieldCount
      const checkedFields = this.data.invalidFields.length + this.data.validFields.length
      const validationComplete = totalFields === checkedFields
      if (validationComplete) FormActions.doneValidating()
    },
    doneValidating: function() {
      this.trigger({
        action: 'done validating',
        invalid: this.data.invalidFields,
        valid: this.data.validFields,
      })
    },
    enableForm: function() {
      this.trigger({
        action: 'enable form'
      })
    },
    disableForm: function() {
      this.trigger({
        action: 'disable form'
      })
    },
    formSuccess: function() {
      this.trigger({
        action: 'form success'
      })
    }
  })

  return class Form extends GLOBAL.React.Component {
    constructor(props) {
      super(props)

      this.mixins = [Reflux.connect(FormStore, 'form-' + id)]

      this.state = {
        isDisabled: false,
        message: {
          type: '',
          text: ''
        }
      }
    }

    getFieldCount() {
      return (
        this.props.fields.map(function(field) {
          return field.name ? field.name : null
        }).filter((function(v) { return v !== null }))
      ).length
    }

    componentDidMount() {
      FormStore.listen(this.update.bind(this))
      FormActions.setFieldCount(this.getFieldCount())
    }

    update(data) {
      switch (data.action) {
        case 'done validating': this.onValidationComplete(data)
      }
    }

    submit(e) {
      e.preventDefault()
      FormActions.submitForm()
    }

    onValidationComplete(data) {
      if (data.invalid.length === 0) this.success(data.valid)
      else this.error()
    }

    error() {
      this.props.error('Form has errors.')
      FormActions.enableForm()
    }

    success(fields) {

      // Create POST object
      var POST = {}
      fields.map((field) => {
        POST[field.name] = field.value
      })

      // Issue POST xhr w/ form data
      request({
        method: 'POST',
        url: this.props.url,
        data: POST,
        headers: {}
      },
      (err, res, body) => {
        if (res.statusCode !== 200) {
          this.props.error(body)
          this.setState({
            message: {
              type: 'error',
              text: this.props.errorMsg
            }
          })
        }
        else {
          this.props.success(body)
          this.setState({
            message: {
              type: 'success',
              text: this.props.successMsg
            }
          })
          FormActions.formSuccess()
        }
      })
    }

    render() {
      return (
        <form className='form row' onSubmit={this.submit}>
          {this.props.fields.map((field, i) => {
            return <FormField key={i} field={field} actions={FormActions} store={FormStore} />
          })}
          <FormMsg message={this.state.message} big={true} center={true} />
        </form>
      )
    }
  }
}

export default Form
