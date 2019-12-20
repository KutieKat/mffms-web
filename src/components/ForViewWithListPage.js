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
   scrollTop,
   isAfter,
   isValidEmail,
   deepGet,
   numberWithCommas,
   formatDateString,
   print
} from '../utils'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'
import LoadingIndicator from './LoadingIndicator'
import Select from 'react-select'
import apiRoutes from '../routes/apis'
import ExportReportDialog from './ExportReportDialog'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { excelFormat } from '../utils'
import ForDetailsPrintPage from './ForDetailsPrintPage'

const customStyles = {
   control: () => ({
      border: '2px solid #edf0f5',
      display: 'flex',
      fontWeight: 'normal',
      paddingTop: '3px',
      paddingBottom: '2px',
      backgroundColor: '#edf0f5',
      width: '300px'
   }),
   dropdownIndicator: () => ({
      display: 'none'
   })
}

class ForViewWithListPage extends Component {
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
         details: [],
         settingsData: {
            tenSanBong: '',
            diaChi: '',
            diaChiTrenPhieu: '',
            soDienThoai: '',
            fax: ''
         },
         showExportReportDialog: false
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   // componentWillMount() {
   //    const { fetchData } = this

   //    fetchData()
   // }

   componentDidMount() {
      const { fetchSettingsData } = this

      scrollTop()
      fetchSettingsData()
   }

   componentWillMount() {
      const { initializeEditingData, fetchData } = this
      const editingData = initializeEditingData()

      this.setState({ editingData }, fetchData)
   }

   //    componentDidMount() {
   //       scrollTop()
   //    }

   //    componentWillReceiveProps(nextProps) {
   //       const { initializeEditingData } = this
   //       const editingData = initializeEditingData(nextProps)

   //       this.setState({ editingData })
   //    }

   ///// METHODS FOR INTERACTING WITH API /////

   //    createDetails = async () => {
   //       const stateDetails = this.state.details
   //       const { settings } = this.props
   //       const { details } = settings
   //       const { api } = details
   //       const url = api.create

   //       for (let i = 0; i < stateDetails.length; i++) {
   //          const detail = details[i]
   //          await apiPost(url, detail)
   //       }
   //    }

   //    createRecord = async () => {
   //       const {
   //          showErrorNotification,
   //          showSuccessNotification,
   //          createDetails
   //       } = this
   //       const { editingData } = this.state
   //       const { settings, history } = this.props
   //       const { api, entity } = settings
   //       const { slug } = entity
   //       const url = api.create

   //       return apiPost(url, editingData)
   //          .then(response => {
   //             showSuccessNotification()
   //             this.setState({ loading: false }, () => {
   //                createDetails()
   //                history.push(`/quan-ly/${slug}`)
   //             })
   //          })
   //          .catch(error => {
   //             showErrorNotification()
   //             this.setState({ loading: false })
   //             // const { errors } = error.response.data.result
   //             // this.setState({ showAlert: true })
   //          })
   //    }

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

            this.setState({ editingData: data, details, loading: false })
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

      return deepGet(nhanVien, `${propName}.0.${detailsEntityPropName}`)
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   refresh = () => {
      const { fetchData } = this

      this.setState({ loading: true }, fetchData)
   }

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

   exportToPdf = () => {
      const { showSuccessNotification } = this

      print()
      showSuccessNotification()
   }

   exportToXlsx = () => {
      const { showSuccessNotification } = this
      const { editingData, settingsData } = this.state
      const data = editingData
      const {
         tenSanBong,
         diaChi,
         diaChiTrenPhieu,
         soDienThoai,
         fax
      } = settingsData
      const { settings } = this.props
      const { entity, fields } = settings
      const { name, slug } = entity
      const fileName = `thong-tin-${slug}-${moment().format('DDMMYYYY')}`
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet(moment().format('DD-MM-YYYY'), {
         pageSetup: { fitToPage: true, orientation: 'portrait' }
      })
      let currentRowCount = 7

      workbook.Props = {
         Title: fileName,
         Subject: `Thông tin chi tiết về ${name}`,
         Author: 'MFFMS',
         CreatedDate: moment()
      }

      worksheet.mergeCells('A1:G1')
      worksheet.getCell('A1').value = tenSanBong
      worksheet.getCell('A1').font = excelFormat.boldFont

      worksheet.mergeCells('A2:G2')
      worksheet.getCell('A2').value = diaChi
      worksheet.getCell('A2').font = excelFormat.boldFont

      worksheet.mergeCells('A3:G3')
      worksheet.getCell(
         'A3'
      ).value = `Số điện thoại: ${soDienThoai} - Fax: ${fax}`
      worksheet.getCell('A3').font = excelFormat.boldFont

      worksheet.mergeCells('A5:M5')
      worksheet.getCell(
         'M5'
      ).value = `THÔNG TIN CHI TIẾT VỀ ${name.toUpperCase()}`
      worksheet.getCell('M5').font = { ...excelFormat.boldFont, size: 18 }
      worksheet.getCell('M5').alignment = excelFormat.center

      fields.forEach((field, index) => {
         const { label, propForValue, type } = field

         worksheet.mergeCells(`B${currentRowCount}:D${currentRowCount}`)
         worksheet.mergeCells(`E${currentRowCount}:L${currentRowCount}`)

         worksheet.getCell(`B${currentRowCount}`).value = label
         worksheet.getCell(`B${currentRowCount}`).font = excelFormat.boldFont
         worksheet.getCell(`B${currentRowCount}`).alignment = excelFormat.left

         worksheet.getCell(`E${currentRowCount}`).value = (type => {
            switch (type) {
               case 'date': {
                  return formatDateString(deepGet(data, propForValue))
               }

               default: {
                  return deepGet(data, propForValue)
               }
            }
         })(type)
         worksheet.getCell(`E${currentRowCount}`).font = excelFormat.normalFont
         worksheet.getCell(`E${currentRowCount}`).alignment = excelFormat.left

         currentRowCount += index !== fields.length - 1 ? 2 : 0
      })

      worksheet.mergeCells(
         'G' + (currentRowCount + 2) + ':M' + (currentRowCount + 2)
      )
      worksheet.getCell(
         'G' + (currentRowCount + 2)
      ).value = `${diaChiTrenPhieu}, ngày ${moment().format(
         'DD'
      )} tháng ${moment().format('MM')} năm ${moment().format('YYYY')}`
      worksheet.getCell('G' + (currentRowCount + 2)).font =
         excelFormat.italicFont
      worksheet.getCell('G' + (currentRowCount + 2)).alignment =
         excelFormat.right

      worksheet.mergeCells(
         'B' + (currentRowCount + 4) + ':D' + (currentRowCount + 4)
      )
      worksheet.getCell('B' + (currentRowCount + 4)).value = `NGƯỜI DUYỆT`
      worksheet.getCell('B' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('B' + (currentRowCount + 4)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'J' + (currentRowCount + 4) + ':L' + (currentRowCount + 4)
      )
      worksheet.getCell('J' + (currentRowCount + 4)).value = `NGƯỜI LẬP`
      worksheet.getCell('J' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('J' + (currentRowCount + 4)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'A' + (currentRowCount + 5) + ':E' + (currentRowCount + 5)
      )
      worksheet.getCell(
         'A' + (currentRowCount + 5)
      ).value = `(Ký và ghi rõ họ tên)`
      worksheet.getCell('A' + (currentRowCount + 5)).font =
         excelFormat.italicFont
      worksheet.getCell('A' + (currentRowCount + 5)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'I' + (currentRowCount + 5) + ':M' + (currentRowCount + 5)
      )
      worksheet.getCell(
         'I' + (currentRowCount + 5)
      ).value = `(Ký và ghi rõ họ tên)`
      worksheet.getCell('I' + (currentRowCount + 5)).font =
         excelFormat.italicFont
      worksheet.getCell('I' + (currentRowCount + 5)).alignment =
         excelFormat.center

      workbook.xlsx.writeBuffer().then(function(data) {
         var blob = new Blob([data], {
            type:
               'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
         })
         saveAs(blob, fileName)
      })

      showSuccessNotification()
   }

   toggleExportReportDialog = () => {
      const { showExportReportDialog } = this.state

      this.setState({ showExportReportDialog: !showExportReportDialog })
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
               <Link to="#">Xem thông tin {name}</Link>
            </span>
         </span>
      )
   }

   renderSectionHeaderRight = () => {
      const { refresh, exportData, toggleExportReportDialog } = this
      const { data } = this.state
      const { settings } = this.props
      const { exportable = true } = settings

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            {/* {data !== null && (
               <span className="button" onClick={exportData}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất dữ liệu
               </span>
            )} */}

            {exportable && data !== null && (
               <span className="button" onClick={toggleExportReportDialog}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất báo cáo
               </span>
            )}
         </Fragment>
      )
   }

   renderBody = () => {
      const {
         renderErrors,
         renderSectionHeaderRight,
         renderForm,
         renderDetailedList,
         renderFormFooter
      } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const section = {
         title: `Xem thông tin ${name}`,
         subtitle: `Xem thông tin chi tiết của ${name}`,
         headerRight: renderSectionHeaderRight(),
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

   renderDialogs = () => {
      const { toggleExportReportDialog, exportToPdf, exportToXlsx } = this
      const { showExportReportDialog, data } = this.state
      const { settings } = this.props
      const { entity } = settings
      const dialogSettings = {
         isOpen: showExportReportDialog,
         onClose: toggleExportReportDialog,
         onExportToPdf: exportToPdf,
         onExportToXlsx: exportToXlsx,
         entity,
         data
      }

      return (
         <Fragment>
            <ExportReportDialog settings={dialogSettings} />
         </Fragment>
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
                  className="form-input-disabled"
                  type="text"
                  placeholder={placeholder}
                  value={deepGet(editingData, propForValue)}
                  disabled={true}
               />
            )
         }

         case 'number': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  placeholder={placeholder}
                  value={numberWithCommas(deepGet(editingData, propForValue))}
                  disabled={true}
               />
            )
         }

         case 'password': {
            return (
               <input
                  className="form-input-disabled"
                  type="password"
                  placeholder={placeholder}
                  value={editingData[propForValue]}
                  disabled={true}
               />
            )
         }

         case 'email': {
            return (
               <input
                  className="form-input-disabled"
                  type="email"
                  placeholder={placeholder}
                  value={deepGet(editingData, propForValue)}
                  disabled={true}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className="form-input-disabled"
                  type="input"
                  placeholder={placeholder}
                  value={formatDateString(deepGet(editingData, propForValue))}
                  disabled={true}
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
                  options={values}
                  styles={customStyles}
                  isDisabled={true}
               />
            )
         }

         case 'textarea': {
            return (
               <textarea
                  className="form-input-disabled"
                  placeholder={placeholder}
                  value={deepGet(editingData, propForValue)}
                  disabled={true}
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
                  className="form-input-disabled"
                  type="text"
                  value={deepGet(details[index], propForValue)}
                  disabled={true}
               />
            )
         }

         // case 'calculation': {
         //    return (
         //       <input
         //          className="form-input-disabled"
         //          type="text"
         //          placeholder={placeholder}
         //          value={deepGet(details[index], propForValue)}
         //          onFocus={hideAlert}
         //          disabled={true}
         //       />
         //    )
         // }

         case 'number': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={numberWithCommas(
                     deepGet(details[index], propForValue)
                  )}
                  disabled={true}
               />
            )
         }

         // case 'password': {
         //    return (
         //       <input
         //          className="form-input-disabled"
         //          type="password"
         //          placeholder={placeholder}
         //          value={deepGet(details[index], propForValue)}
         //          onChange={e =>
         //             changeDetailsData(e.target.value, propForValue, index)
         //          }
         //          onFocus={hideAlert}
         //          disabled={true}
         //       />
         //    )
         // }

         // case 'email': {
         //    return (
         //       <input
         //          className="form-input-disabled"
         //          type="email"
         //          placeholder={placeholder}
         //          value={deepGet(details[index], propForValue)}
         //          onChange={e =>
         //             changeDetailsData(e.target.value, propForValue, index)
         //          }
         //          onFocus={hideAlert}
         //          disabled={true}
         //       />
         //    )
         // }

         case 'date': {
            return (
               <input
                  className="form-input-disabled"
                  type="date"
                  placeholder={placeholder}
                  value={deepGet(details[index], propForValue)}
                  onChange={e =>
                     changeDetailsData(e.target.value, propForValue, index)
                  }
                  onFocus={hideAlert}
                  disabled={true}
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
                  options={values}
                  styles={customStyles}
                  isDisabled={true}
               />
            )
         }

         // case 'textarea': {
         //    return (
         //       <textarea
         //          className="form-input-disabled"
         //          placeholder={placeholder}
         //          value={deepGet(details[index], propForValue)}
         //          onChange={e =>
         //             changeDetailsData(e.target.value, propForValue, index)
         //          }
         //          onFocus={hideAlert}
         //          disabled={true}
         //       ></textarea>
         //    )
         // }
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
                           colSpan={columns.length + 1}
                           style={{ textAlign: 'center' }}
                        >
                           Trống
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
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
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderDialogs } = this
      const { editingData, loading } = this.state
      const data = editingData
      const { settings } = this.props
      const { entity, fields } = settings
      const printSettings = {
         entity,
         fields,
         data
      }

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
            {renderDialogs()}

            <ForDetailsPrintPage settings={printSettings} />
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default withRouter(
   connect(null, { showNotification })(ForViewWithListPage)
)
