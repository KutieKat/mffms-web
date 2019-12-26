import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'
import { isEmpty, isLength, isNumeric } from 'validator'
import {
   isEmptyObj,
   isPhoneNumber,
   apiGet,
   apiPost,
   apiPut,
   scrollTop,
   isBefore,
   isValidEmail,
   deepGet,
   numberWithCommas,
   formatDateString,
   apiDelete,
   containsKeys,
   joinValueOfKeys,
   createQueryFromObj
} from '../utils'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'
import LoadingIndicator from './LoadingIndicator'
import Select from 'react-select'
import apiRoutes from '../routes/apis'
import TimePicker from 'react-time-picker'
import cloneDeep from 'clone-deep'

const customStyles = {
   control: () => ({
      border: '2px solid #edf0f5',
      display: 'flex',
      fontWeight: 'normal',
      paddingTop: '3px',
      paddingBottom: '2px'
   }),
   dropdownIndicator: () => ({
      display: 'none'
   })
}

const customStyles2 = {
   control: () => ({
      border: '2px solid #edf0f5',
      display: 'flex',
      fontWeight: 'normal',
      paddingTop: '3px',
      paddingBottom: '2px',
      width: '200px',
      background: 'white'
   })
}

class ForUpdateWithListPage extends Component {
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
         prevDetails: [],
         details: [],
         deleted: []
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeEditingData, fetchData } = this
      const editingData = initializeEditingData()

      this.setState({ editingData }, fetchData)
   }

   componentDidMount() {
      const { fetchData } = this

      scrollTop()
      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   updateRecord = async () => {
      const {
         showErrorNotification,
         showSuccessNotification,
         createDetails,
         updateExistedDetails,
         deleteRemovedDetails
      } = this
      const { editingData } = this.state
      const { settings, history, match } = this.props
      const { api, entity } = settings
      const { slug } = entity
      const { id } = match.params
      const url = `${api.updateById}/${id}`

      return apiPut(url, editingData)
         .then(response => {
            showSuccessNotification()

            this.setState({ loading: false }, () => {
               createDetails()
               updateExistedDetails()
               deleteRemovedDetails()

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

   createDetails = async () => {
      const stateDetails = this.state.details
      const { settings, match } = this.props
      const { details } = settings
      const { api, propNameForKey, propNameForParentKey } = details
      const url = api.create
      const { id } = match.params
      const filteredDetails = stateDetails.filter(
         detail => !containsKeys(detail, propNameForKey)
      )

      if (filteredDetails.length > 0) {
         for (let i = 0; i < filteredDetails.length; i++) {
            const detail = filteredDetails[i]
            const rawPostData = [detail]

            delete rawPostData.thoiGianTao
            delete rawPostData.thoiGianCapNhat

            const postData = rawPostData.map(detail => {
               detail[propNameForParentKey] = id

               if (
                  detail['thoiGianBatDau'] !== undefined &&
                  detail['thoiGianKetThuc'] !== undefined
               ) {
                  const thoiGianBatDau = Math.floor(
                     new Date(
                        `${detail['ngayDat']} ${detail['thoiGianBatDau']}:00`
                     ).getTime() / 1000
                  )

                  const thoiGianKetThuc = Math.floor(
                     new Date(
                        `${detail['ngayDat']} ${detail['thoiGianKetThuc']}:00`
                     ).getTime() / 1000
                  )

                  detail['thoiGianBatDau'] = thoiGianBatDau
                  detail['thoiGianKetThuc'] = thoiGianKetThuc
               }

               return detail
            })

            await apiPost(url, postData)
         }
      }
   }

   updateExistedDetails = async () => {
      const { details } = this.state
      const { settings } = this.props
      const settingsDetails = settings.details
      const { api, propNameForKey, usesCompoundKey } = settingsDetails

      for (let i = 0; i < details.length; i++) {
         const detail = details[i]
         let pathname = ''
         let retrievedValues = []

         propNameForKey.forEach(val => {
            retrievedValues.push(detail[val])
         })

         if (!usesCompoundKey) {
            pathname = joinValueOfKeys(detail, propNameForKey)
         } else {
            pathname = createQueryFromObj(propNameForKey, retrievedValues)
         }

         if (pathname !== undefined) {
            const url = `${api.updateById}/${pathname}`
            console.log(url)

            if (
               detail['thoiGianBatDau'] !== undefined &&
               detail['thoiGianKetThuc'] !== undefined
            ) {
               const thoiGianBatDau = Math.floor(
                  new Date(
                     `${detail['ngayDat']} ${detail['thoiGianBatDau']}:00`
                  ).getTime() / 1000
               )

               const thoiGianKetThuc = Math.floor(
                  new Date(
                     `${detail['ngayDat']} ${detail['thoiGianKetThuc']}:00`
                  ).getTime() / 1000
               )

               detail['thoiGianBatDau'] = thoiGianBatDau
               detail['thoiGianKetThuc'] = thoiGianKetThuc
            }

            await apiPut(url, detail)
         }
      }
   }

   deleteRemovedDetails = async () => {
      const { prevDetails, details } = this.state
      const { settings } = this.props
      const settingsDetails = settings.details
      const { api, propNameForKey } = settingsDetails

      let prev = [],
         current = [],
         ids = []

      prevDetails.forEach(detail => {
         if (containsKeys(detail, propNameForKey)) {
            prev.push(joinValueOfKeys(detail, propNameForKey))
         }
      })

      details.forEach(detail => {
         if (containsKeys(detail, propNameForKey)) {
            current.push(joinValueOfKeys(detail, propNameForKey))
         }
      })

      prev.forEach(detail => {
         if (current.indexOf(detail) === -1) {
            ids.push(detail)
         }
      })

      for (let i = 0; i < ids.length; i++) {
         const id = ids[i]
         const url = `${api.deleteById}/${id}`

         await apiDelete(url)
      }
   }

   fetchSettingsData = async () => {
      const { caiDat } = apiRoutes
      const url = caiDat.getAll

      try {
         const response = await apiGet(url)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({
               settingsData: data
            })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchData = async () => {
      const { getDetails } = this
      const { settings, match } = this.props
      const { api } = settings
      const { id } = match.params
      const url = `${api.getById}/${id}`

      try {
         const response = await apiGet(url)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result
            const details = getDetails(data)
            const newData = {}

            Object.keys(data).forEach(key => {
               const value = data[key]
               if (typeof data[key] === 'object') {
                  newData[Object.keys(value)[0]] = value[Object.keys(value)[0]]
               } else if (key.includes('ngay')) {
                  newData[key] = moment(new Date(value)).format('YYYY-MM-DD')
               } else {
                  newData[key] = data[key]
               }
            })

            this.setState({
               editingData: newData,
               details,
               prevDetails: cloneDeep(details),
               loading: false
            })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   getDetails = data => {
      const { settings } = this.props
      const { entity, details } = settings
      const { propName } = entity
      const detailsEntity = details.entity
      const detailsEntityPropName = detailsEntity.propName
      const { nhanVien } = data
      let results = deepGet(nhanVien, `${propName}.0.${detailsEntityPropName}`)
      results = results.map(result => {
         const newResult = {}

         Object.keys(result).forEach(key => {
            const value = result[key]

            if (key.includes('thoiGian')) {
               newResult[key] = moment(new Date(Number(value) * 1000)).format(
                  'HH:mm'
               )
            } else if (key.includes('ngay')) {
               newResult[key] = moment(new Date(value)).format('YYYY-MM-DD')
            } else {
               newResult[key] = '' + value
            }
         })

         return newResult
      })

      return results
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
      const { details, sumPriceProp, elemPriceProp } = settings
      const { columns } = details

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      stateDetails[index][fieldName] = value

      // Update affected props
      if (column !== undefined) {
         const { affectedProps } = column

         columns
            // .filter(col => affectedProps.indexOf(col.propForValue) > -1)
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
      let sumPrice = 0
      stateDetails.forEach(
         detail => (sumPrice += Number(detail[elemPriceProp]))
      )
      editingData[sumPriceProp] = '' + sumPrice

      this.setState({ details: stateDetails, editingData })
   }

   deleteDetail = index => {
      const { editingData } = this.state
      const stateDetails = cloneDeep(this.state.details)
      const { settings } = this.props
      const { sumPriceProp, elemPriceProp } = settings

      stateDetails.splice(index, 1)

      // Re-calculate sumprice
      let sumPrice = 0
      stateDetails.forEach(
         detail => (sumPrice += Number(detail[elemPriceProp]))
      )
      editingData[sumPriceProp] = '' + sumPrice

      this.setState({ details: stateDetails, editingData })
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
         updateRecord
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
            this.setState({ showAlert: false }, updateRecord)
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

            case 'isBefore': {
               const { date } = validator

               if (!isBefore(data, date)) {
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
      const { showNotification } = this.props

      showNotification('success', 'Xuất báo cáo thành công!')
   }

   showErrorNotification = () => {
      const { showNotification } = this.props

      showNotification('error', 'Xuất báo cáo thất bại!')
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
               <Link to="#">Cập nhật thông tin {name}</Link>
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
      } = this
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
            {renderDetailedList()}
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
                  styles={customStyles2}
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

         case 'time': {
            return (
               <TimePicker
                  onChange={time =>
                     changeDetailsData(time, propForValue, index)
                  }
                  value={deepGet(details[index], propForValue)}
               />
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
                  {stateDetails && stateDetails.length > 0 ? (
                     stateDetails.map((detail, detailIndex) => (
                        <tr key={detailIndex}>
                           <td onClick={() => deleteDetail(detailIndex)}>
                              <i className="fas fa-times-circle reset-search-data"></i>
                           </td>
                           <td>{detailIndex + 1}</td>
                           {columns.map((column, index) => (
                              <td key={index}>
                                 {renderColumn(column, detailIndex)}
                              </td>
                           ))}
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td
                           colSpan={columns.length + 2}
                           style={{ textAlign: 'center' }}
                        >
                           Trống
                        </td>
                     </tr>
                  )}
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

            case 'time': {
               detail[propForValue] = '00:00'
               break
            }

            case 'date': {
               detail[propForValue] = moment().format('YYYY-MM-DD')
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
               <i className="fas fa-save"></i>&nbsp;&nbsp;Cập nhật
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
   connect(null, { showNotification })(ForUpdateWithListPage)
)
