import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import { isEmpty, isLength, isNumeric } from 'validator'
import {
   isEmptyObj,
   isPhoneNumber,
   apiGet,
   apiPut,
   scrollTop,
   isAfter
} from '../utils'
import LoadingIndicator from './LoadingIndicator'

class ForUpdatePage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         errors: null,
         serverErrors: null,
         editingData: null,
         showAlert: false,
         loading: false
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeEditingData } = this
      const editingData = initializeEditingData()

      this.setState({ editingData })
   }

   componentWillReceiveProps(nextProps) {
      const { initializeEditingData } = this
      const editingData = initializeEditingData(nextProps)

      this.setState({ editingData })
   }

   componentDidMount() {
      const { fetchData } = this

      scrollTop()
      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = async () => {
      const { settings, match } = this.props
      const { api } = settings
      const { id } = match.params
      const url = `${api.getById}/${id}`

      try {
         const response = await apiGet(url)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ editingData: data, loading: false })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   updateRecord = () => {
      const { editingData } = this.state
      const { settings, match, history } = this.props
      const { api, entity } = settings
      const { id } = match.params
      const { slug } = entity
      const url = `${api.updateById}/${id}`

      return apiPut(url, editingData)
         .then(response => {
            this.setState({ loading: false })
            history.push(`/quan-ly/${slug}`)
         })
         .catch(error => {
            this.setState({ loading: false })
            // const { errors } = error.response.data.result
            // this.setState({ showAlert: true })
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

   submit = () => {
      const { validateFields, updateRecord } = this
      const errors = validateFields()

      if (!errors) {
         this.setState({ showAlert: false, loading: true }, updateRecord)
      } else {
         this.setState({ errors, showAlert: true })
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   initializeEditingData = (props = this.props) => {
      const { settings } = props
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

               editingData[propForValue] =
                  values[0] && values[0][propForItemValue]
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
               if (isEmpty(data.toString(10))) {
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
               if (!isNumeric(data.toString())) {
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
      const { entity } = settings
      const { name, slug } = entity

      return (
         <span className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (MFFMS)</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb">
               <Link to={`/quan-ly/${slug}`}>Quản lý {name}</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-active">
               <Link to="#">Cập nhật thông tin {name}</Link>
            </span>
         </span>
      )
   }

   renderBody = () => {
      const { renderErrors, renderForm, renderFormFooter } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const section = {
         title: `Cập nhật thông tin ${name}`,
         subtitle: `Cập nhật lại thông tin ${name} trên hệ thống`,
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
                     disabled
                        ? 'form-input-disabled'
                        : isValidField(propForValue)
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
                  value={moment(editingData[propForValue]).format('YYYY-MM-DD')}
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
      const { submit } = this
      const { settings } = this.props
      const { entity } = settings
      const { slug } = entity

      return (
         <Fragment>
            <span className="button">
               <Link to={`/quan-ly/${slug}`}>
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Trở về
               </Link>
            </span>

            <span className="button" onClick={submit}>
               <i className="fas fa-save"></i>&nbsp;&nbsp;Lưu lại
            </span>
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody } = this
      const { loading } = this.state

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default withRouter(ForUpdatePage)
