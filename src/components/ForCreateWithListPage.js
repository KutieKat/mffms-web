import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import { isEmpty, isLength, isNumeric } from 'validator'
import {
   isEmptyObj,
   isPhoneNumber,
   apiPost,
   scrollTop,
   isAfter,
   isValidEmail,
   deepGet,
   numberWithCommas
} from '../utils'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'
import LoadingIndicator from './LoadingIndicator'
import Select from 'react-select'

const customStyles = {
   control: () => ({
      border: '2px solid #edf0f5',
      display: 'flex',
      fontWeight: 'normal',
      paddingTop: '3px',
      paddingBottom: '2px'
   })
}

class ForCreateWithListPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         errors: null,
         detailsErrors: null,
         serverErrors: null,
         editingData: null,
         showAlert: false,
         loading: false,
         fields: [],
         details: []
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeEditingData } = this
      const editingData = initializeEditingData()

      this.setState({ editingData })
   }

   componentDidMount() {
      scrollTop()
   }

   componentWillReceiveProps(nextProps) {
      const { initializeEditingData } = this
      const editingData = initializeEditingData(nextProps)

      this.setState({ editingData })
   }

   ///// METHODS FOR INTERACTING WITH API /////

   createDetails = async () => {
      const stateDetails = this.state.details
      const { settings } = this.props
      const { details } = settings
      const { api } = details
      const url = api.create

      for (let i = 0; i < stateDetails.length; i++) {
         const detail = details[i]
         await apiPost(url, detail)
      }
   }

   createRecord = async () => {
      const {
         showErrorNotification,
         showSuccessNotification,
         createDetails
      } = this
      const { editingData } = this.state
      const { settings, history } = this.props
      const { api, entity } = settings
      const { slug } = entity
      const url = api.create

      return apiPost(url, editingData)
         .then(response => {
            showSuccessNotification()
            this.setState({ loading: false }, () => {
               createDetails()
               history.push(`/quan-ly/${slug}`)
            })
         })
         .catch(error => {
            showErrorNotification()
            this.setState({ loading: false })
            // const { errors } = error.response.data.result
            // this.setState({ showAlert: true })
         })
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeEditingData = (value, fieldName) => {
      const { editingData } = this.state

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      editingData[fieldName] = value

      this.setState({ editingData })
   }

   changeDetailsData = (value, fieldName, index, column = undefined) => {
      const { calculate } = this
      const { editingData } = this.state
      const stateDetails = this.state.details
      const { settings } = this.props
      const { details } = settings
      const { columns } = details

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      stateDetails[index][fieldName] = value

      // Update affected props
      if (column !== undefined) {
         const { affectedProps } = column

         columns
            .filter(col => affectedProps.indexOf(col.propForValue) > -1)
            .forEach(prop => {
               const { type, propForValue } = prop

               switch (type) {
                  case 'calculation': {
                     const result = calculate(prop, index)
                     stateDetails[index][propForValue] = '' + result
                     break
                  }

                  case 'input': {
                     const { prefetch } = prop

                     if (prefetch !== undefined) {
                        const { values, reference } = prefetch
                        const prefetchPropForValue = prefetch.propForValue

                        stateDetails[index][prefetchPropForValue] =
                           values.find(val => val[reference] === value)[
                              prefetchPropForValue
                           ] + ''
                     }

                     break
                  }
               }
            })
      }

      // Re-calculate sumprice
      let sumprice = 0
      stateDetails.forEach(detail => (sumprice += Number(detail['thanhTien'])))
      editingData['thanhTien'] = '' + sumprice

      this.setState({ details: stateDetails, editingData })
   }

   deleteDetail = index => {
      const { details } = this.state

      details.splice(index, 1)

      this.setState({ details })
   }

   calculate = (column, index) => {
      const { details } = this.state
      const { operator, propForValue1, propForValue2 } = column
      const value1 = deepGet(details[index], propForValue1)
      const value2 = deepGet(details[index], propForValue2)

      switch (operator) {
         case '+': {
            return value1 + value2
         }

         case '-': {
            return value1 - value2
         }

         case '*': {
            return value1 * value2
         }

         case '/': {
            return value1 / value2
         }
      }
   }

   hideAlert = () => {
      this.setState({ showAlert: false, errors: null, detailsErrors: null })
   }

   submit = () => {
      const {
         showErrorNotification,
         validateFields,
         validateDetails,
         createRecord
      } = this
      const stateDetails = this.state.details
      const { settings } = this.props
      const { details } = settings
      const { entity } = details
      const { name } = entity

      if (stateDetails.length === 0) {
         const errors = {
            chiTiet: {
               name,
               errors: [`Không được bỏ trống ${name}!`]
            }
         }

         showErrorNotification()
         this.setState({
            errors,
            showAlert: true
         })
      } else {
         const generalErrors = validateFields()
         const detailsErrors = validateDetails()

         if (
            !generalErrors &&
            (!detailsErrors || detailsErrors.join('') === '')
         ) {
            this.setState({ showAlert: false }, createRecord)
         } else {
            showErrorNotification()
            this.setState({
               errors: generalErrors,
               detailsErrors,
               showAlert: true
            })
         }
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getPrefetchedValue = (column, index) => {
      const { details } = this.state
      const detail = details[index]
      const { prefetch } = column
      const { values, reference, propForValue } = prefetch
      const result = values.find(
         value => value[reference] === detail[reference]
      )

      return result[propForValue]
   }

   initializeEditingData = (props = this.props) => {
      const { settings } = props
      const { fields } = settings
      let editingData = { thanhTien: '0' }

      fields.forEach(field => {
         const { type, propForValue } = field

         switch (type) {
            case 'input': {
               editingData[propForValue] = ''
               break
            }

            case 'password': {
               editingData[propForValue] = ''
               break
            }

            case 'email': {
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

   validateDetails = () => {
      const { validateField } = this
      const stateDetails = this.state.details
      const { settings } = this.props
      const { details } = settings
      const { columns } = details
      let errors = []

      stateDetails.forEach((detail, index) => {
         let error = {}

         columns
            .filter(column => column.validators)
            .forEach(column => {
               const { label, validators, propForValue } = column
               const data = detail[propForValue]
               const columnErrors = validateField(validators, data)

               if (columnErrors.length > 0) {
                  error[propForValue] = {
                     name: label,
                     errors: columnErrors
                  }
               }
            })

         if (isEmptyObj(error)) {
            errors.push('')
         } else {
            errors.push(error)
         }
      })

      return errors.length > 0 ? errors : null
   }

   validateField = (validators, data) => {
      const { editingData } = this.state
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

            case 'isEmail': {
               if (!isValidEmail(data)) {
                  errors.push(message)
               }

               break
            }

            case 'isEqual': {
               const { propForComparedValue } = validator
               const valueToCompare = editingData[propForComparedValue]

               if (valueToCompare !== data) {
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

   isValidColumn = (columnName, index) => {
      const { detailsErrors } = this.state

      if (detailsErrors) {
         const detailErrors = detailsErrors[index]

         return (
            Object.keys(detailErrors)
               .map(key => key.toLowerCase())
               .indexOf(columnName.toLowerCase()) > -1
         )
      } else {
         return false
      }
   }

   ///// METHODS FOR RENDERING UI /////

   showSuccessNotification = () => {
      const { showNotification, settings } = this.props
      const { entity } = settings
      const { name } = entity

      showNotification('success', `Thêm ${name} mới thành công!`)
   }

   showErrorNotification = () => {
      const { showNotification, settings } = this.props
      const { entity } = settings
      const { name } = entity

      showNotification('error', `Thêm ${name} mới thất bại!`)
   }

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
               <Link to="#">Thêm {name} mới</Link>
            </span>
         </span>
      )
   }

   renderBody = () => {
      const {
         renderErrors,
         renderForm,
         renderDetailedList,
         renderFormFooter
         // renderFooter
      } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const section = {
         title: `Thêm ${name} mới`,
         subtitle: `Thêm ${name} mới vào hệ thống`,
         footerRight: renderFormFooter()
      }

      return (
         <Section section={section}>
            {renderErrors()}
            {renderForm()}
            {renderDetailedList()}
            {/* {renderFooter()} */}
         </Section>
      )
   }

   renderErrors = () => {
      const { showAlert, errors, detailsErrors } = this.state

      return (
         showAlert && (
            <div className="section__alert">
               {errors && (
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
               )}

               {detailsErrors &&
                  detailsErrors.map((error, index) => {
                     if (!isEmptyObj(error)) {
                        return (
                           <ul>
                              <li>
                                 <strong>
                                    Chi tiết đơn nhập hàng #{index + 1}
                                 </strong>
                              </li>

                              {Object.keys(error).map(err => {
                                 const subErrors = error[err].errors

                                 return subErrors.map((subError, index) => (
                                    <li key={index}>
                                       <i className="fas fa-exclamation-triangle"></i>{' '}
                                       <strong>
                                          {deepGet(error[err], 'name')}:
                                       </strong>{' '}
                                       {subError}
                                    </li>
                                 ))
                              })}
                           </ul>
                        )
                     } else {
                        return null
                     }
                  })}
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
                  onChange={e =>
                     changeEditingData(e.target.value, propForValue)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'password': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="password"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e =>
                     changeEditingData(e.target.value, propForValue)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'email': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="email"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e =>
                     changeEditingData(e.target.value, propForValue)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="date"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e =>
                     changeEditingData(e.target.value, propForValue)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'select': {
            const { values, propForItemText, propForItemValue } = field

            return (
               <Select
                  value={values.find(
                     item => item.value === editingData[propForValue]
                  )}
                  onChange={option =>
                     changeEditingData(option.value, propForValue)
                  }
                  options={values}
                  placeholder={placeholder}
                  styles={customStyles}
                  onFocus={hideAlert}
               />
            )
         }

         case 'textarea': {
            return (
               <textarea
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidField(propForValue)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  onChange={e =>
                     changeEditingData(e.target.value, propForValue)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               ></textarea>
            )
         }
      }
   }

   renderColumn = (column, index) => {
      const {
         isValidColumn,
         hideAlert,
         changeDetailsData,
         calculate,
         getPrefetchedValue
      } = this
      const { details } = this.state
      const { type, disabled, propForValue, placeholder } = column

      switch (type) {
         case 'input': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="text"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(
                        e.target.value,
                        propForValue,
                        index,
                        column
                     )
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'calculation': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'number': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="number"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(
                        e.target.value,
                        propForValue,
                        index,
                        column
                     )
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'password': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="password"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(e.target.value, propForValue, index)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'email': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="email"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(e.target.value, propForValue, index)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  type="date"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(e.target.value, propForValue, index)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               />
            )
         }

         case 'select': {
            const { values, propForItemText, propForItemValue } = column

            return (
               <Select
                  value={values.find(
                     item =>
                        item.value === deepGet(details[index], propForValue)
                  )}
                  onChange={option =>
                     changeDetailsData(
                        option.value,
                        propForValue,
                        index,
                        column
                     )
                  }
                  options={values}
                  placeholder={placeholder}
                  styles={customStyles}
                  onFocus={hideAlert}
               />
            )
         }

         case 'textarea': {
            return (
               <textarea
                  className={
                     disabled
                        ? 'form-input-disabled'
                        : isValidColumn(propForValue, index)
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(e.target.value, propForValue, index)
                  }
                  onFocus={hideAlert}
                  disabled={disabled}
               ></textarea>
            )
         }
      }
   }

   renderDetailedList = () => {
      const { addDetail, renderColumn, deleteDetail } = this
      const { settings } = this.props
      const { details, entity } = settings
      const { columns } = details
      const stateDetails = this.state.details
      const { name } = entity

      return (
         <div>
            <h4>Chi tiết {name}</h4>

            <table className="table">
               <thead>
                  <tr>
                     <th></th>
                     <th>STT</th>
                     {columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {stateDetails.map((detail, detailIndex) => (
                     <tr key={detailIndex}>
                        <td onClick={() => deleteDetail(detailIndex)}>X</td>
                        <td>{detailIndex + 1}</td>
                        {columns.map((column, index) => (
                           <td key={index}>
                              {renderColumn(column, detailIndex)}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>

            <span className="button" onClick={addDetail}>
               Thêm mới
            </span>
         </div>
      )
   }

   addDetail = () => {
      const { initializeDetail } = this
      let { details } = this.state
      const detail = initializeDetail()

      details.push(detail)

      this.setState({ details })
   }

   initializeDetail = () => {
      const { settings } = this.props
      const { details } = settings
      const { columns } = details
      const detail = {}

      columns.forEach(column => {
         const { type, propForValue } = column

         switch (type) {
            case 'input': {
               const { prefetch } = column

               if (prefetch !== undefined) {
                  const { prefetch } = column
                  const { values } = prefetch

                  detail[propForValue] =
                     '' + deepGet(values[0], prefetch.propForValue)
               } else {
                  detail[propForValue] = ''
               }

               break
            }

            case 'select': {
               const { values, propForItemValue } = column
               detail[propForValue] = values[0] && values[0][propForItemValue]
               break
            }

            case 'number': {
               detail[propForValue] = 0
               break
            }

            case 'calculation': {
               detail[propForValue] = 0
               break
            }
         }
      })

      return detail
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

            <span className="button button-primary" onClick={submit}>
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
      console.log('STATE: ', this.state)
      const { renderComponent } = this

      return renderComponent()
   }
}

export default withRouter(
   connect(null, { showNotification })(ForCreateWithListPage)
)
