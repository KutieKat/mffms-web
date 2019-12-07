import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { isEmpty, isLength, isAfter, isNumeric } from 'validator'
import { isEmptyObj, isPhoneNumber, apiPost } from '../utils'

class ForCreatePage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         errors: null,
         serverErrors: null,
         editingData: null,
         showAlert: false
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeEditingData } = this
      const editingData = initializeEditingData()

      this.setState({ editingData })
   }

   ///// METHODS FOR INTERACTING WITH API /////

   createRecord = () => {
      const { editingData } = this.state
      const { settings, history } = this.props
      const { api, entitySlug } = settings
      const url = api.create

      return apiPost(url, editingData)
         .then(response => {
            history.push(`/${entitySlug}`)
         })
         .catch(error => {
            const { errors } = error.response.data.result
            this.setState({ errors, showAlert: true })
         })
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeEditingData = (e, fieldName) => {
      const { editingData } = this.state
      const value = e.target.value

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      editingData[fieldName] = value

      this.setState({ editingData })
   }

   hideAlert = () => {
      this.setState({ showAlert: false, errors: null })
   }

   onSubmit = () => {
      const { validateFields, createRecord } = this
      const errors = validateFields()

      if (!errors) {
         this.setState({ showAlert: false }, createRecord)
      } else {
         this.setState({ errors, showAlert: true })
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   initializeEditingData = () => {
      const { settings } = this.props
      const { fields } = settings
      let editingData = {}

      fields.forEach(field => {
         const { type, propForValue } = field

         switch (type) {
            case 'input': {
               editingData[propForValue] = ''
               break
            }

            case 'date': {
               editingData[propForValue] = moment().format('YYYY-MM-DD')
               break
            }

            case 'select': {
               const { values, propForItemValue } = field

               editingData[propForValue] = values[0][propForItemValue]
               break
            }

            case 'textarea': {
               editingData[propForValue] = ''
               break
            }
         }
      })

      return editingData
   }

   validateFields = () => {
      const { validateField } = this
      const { editingData } = this.state
      const { settings } = this.props
      const { fields } = settings
      let errors = {}

      fields
         .filter(field => field.validators)
         .forEach(field => {
            const { label, validators } = field
            const data = editingData[field.propForValue]
            const fieldErrors = validateField(validators, data)

            if (fieldErrors.length > 0) {
               errors[field.propForValue] = {
                  name: label,
                  errors: fieldErrors
               }
            }
         })

      return !isEmptyObj(errors) ? errors : null
   }

   validateField = (validators, data) => {
      let errors = []

      validators.forEach(validator => {
         const { rule, message } = validator

         switch (rule) {
            case 'notEmpty': {
               if (isEmpty(data)) {
                  errors.push(message)
               }

               break
            }

            case 'minLength': {
               const { length } = validator

               if (!isLength(data, { min: length })) {
                  errors.push(message)
               }

               break
            }

            case 'isAfter': {
               const { date } = validator

               if (!isAfter(data, date)) {
                  errors.push(message)
               }

               break
            }

            case 'isNumeric': {
               if (!isNumeric(data)) {
                  errors.push(message)
               }

               break
            }

            case 'isPhoneNumber': {
               if (!isPhoneNumber(data)) {
                  errors.push(message)
               }

               break
            }
         }
      })

      return errors
   }

   ///// METHODS FOR CHECKING VALUES /////

   isValidField = fieldName => {
      const { errors } = this.state

      return (
         errors &&
         Object.keys(errors)
            .map(key => key.toLowerCase())
            .indexOf(fieldName.toLowerCase()) > -1
      )
   }

   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { settings } = this.props
      const { entityName, entitySlug } = settings

      return (
         <span className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (MFFMS)</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb">
               <Link to={`/${entitySlug}`}>Quản lý {entityName}</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-active">
               <Link to="#">Thêm {entityName} mới</Link>
            </span>
         </span>
      )
   }

   renderBody = () => {
      const { renderErrors, renderForm, renderFormFooter } = this
      const { settings } = this.props
      const { entityName } = settings
      const section = {
         title: `Thêm ${entityName} mới`,
         subtitle: `Thêm ${entityName} mới vào hệ thống`,
         footerRight: renderFormFooter()
      }

      return (
         <Section section={section}>
            {renderErrors()}
            {renderForm()}
         </Section>
      )
   }

   renderErrors = () => {
      const { showAlert, errors } = this.state

      return (
         showAlert && (
            <div className="section__alert">
               <ul>
                  {Object.keys(errors).map(error => {
                     const subErrors = errors[error].errors

                     return subErrors.map((subError, index) => (
                        <li key={index}>
                           <i className="fas fa-exclamation-triangle"></i>{' '}
                           <strong>{errors[error].name}:</strong> {subError}
                        </li>
                     ))
                  })}
               </ul>
            </div>
         )
      )
   }

   renderForm = () => {
      const { renderFormGroup } = this
      const { settings } = this.props
      const { fields } = settings

      return (
         <Fragment>
            <form autoComplete="off">
               {fields.map((field, index) => renderFormGroup(field, index))}
            </form>
         </Fragment>
      )
   }

   renderFormGroup = (field, index) => {
      const { renderField } = this
      const { label } = field

      return (
         <div className="form-group" key={index}>
            <label className="form-label">{label}</label>
            {renderField(field)}
         </div>
      )
   }

   renderField = field => {
      const { isValidField, hideAlert, changeEditingData } = this
      const { editingData } = this.state
      const { type, disabled, propForValue, placeholder } = field

      switch (type) {
         case 'input': {
            return (
               <input
                  className={
                     isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="text"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e => changeEditingData(e, propForValue)}
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className={
                     isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="date"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e => changeEditingData(e, propForValue)}
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'select': {
            const { values, propForItemText, propForItemValue } = field

            return (
               <select
                  className={
                     isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  value={editingData[propForValue]}
                  onChange={e => changeEditingData(e, propForValue)}
                  onFocus={hideAlert}
               >
                  {values.length > 0 &&
                     values.map((record, index) => (
                        <option key={index} value={record[propForItemValue]}>
                           {record[propForItemText]}
                        </option>
                     ))}
               </select>
            )
         }

         case 'textarea': {
            return (
               <textarea
                  className={
                     isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e => changeEditingData(e, propForValue)}
                  onFocus={hideAlert}
                  disabled={disabled}
               ></textarea>
            )
         }
      }
   }

   renderFormFooter = () => {
      const { onSubmit } = this
      const { settings } = this.props
      const { entitySlug } = settings

      return (
         <Fragment>
            <span className="button">
               <Link to={`/${entitySlug}`}>
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Trở về
               </Link>
            </span>

            <span className="button" onClick={onSubmit}>
               <i className="fas fa-save"></i>&nbsp;&nbsp;Lưu lại
            </span>
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody } = this

      return (
         <Fragment>
            {renderHeader()}
            {renderBody()}
         </Fragment>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForCreatePage
