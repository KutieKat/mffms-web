import React, { Component, Fragment } from 'react'
import { apiGet, formatDateString, numberWithCommas, deepGet } from '../utils'
import apiRoutes from '../routes/apis'
import moment from 'moment'

class ForDetailsPrintPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         settingsData: {
            tenSanBong: '',
            diaChi: '',
            diaChiTrenPhieu: '',
            soDienThoai: '',
            fax: ''
         }
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchSettingsData } = this

      fetchSettingsData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

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

   ///// METHODS FOR COMPUTING VALUES /////

   getFieldValue = (valueType, value) => {
      if (value !== '' && value !== undefined) {
         switch (valueType) {
            case 'text': {
               return value
            }

            case 'date': {
               return formatDateString(value)
            }
         }
         return value
      } else {
         return '(Chưa có dữ liệu)'
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { renderTopHeader, renderMainHeader } = this

      return (
         <div className="printing-page__header">
            {renderTopHeader()}
            {renderMainHeader()}
         </div>
      )
   }

   renderTopHeader = () => {
      const { renderTopHeaderLeft, renderTopHeaderRight } = this

      return (
         <div className="printing-page__header-top">
            {renderTopHeaderLeft()}
            {renderTopHeaderRight()}
         </div>
      )
   }

   renderTopHeaderLeft = () => {
      const { settingsData } = this.state
      const { tenSanBong, diaChi, soDienThoai, fax } = settingsData

      return (
         <div className="print-page__header-top-left">
            <p className="printing-page__company">{tenSanBong}</p>
            <p className="printing-page__address">Địa chỉ: {diaChi}</p>
            <p className="printing-page__phones">
               Điện thoại: {soDienThoai}{' '}
               {fax !== '' && <Fragment>- Fax: {fax}</Fragment>}
            </p>
         </div>
      )
   }

   renderTopHeaderRight = () => {}

   renderMainHeader = () => {
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity

      return (
         <div className="printing-page__main">
            <h1 className="printing-page-title">
               THÔNG TIN CHI TIẾT VỀ {name.toUpperCase()}
            </h1>
         </div>
      )
   }

   renderBody = () => {
      const { renderForm } = this

      return <div className="printing-page__body">{renderForm()}</div>
   }

   renderForm = () => {
      const { renderFormGroup } = this
      const { settings } = this.props
      const { fields } = settings

      return (
         <form className="printing-page__form">
            {fields.map((field, index) => renderFormGroup(field, index))}
         </form>
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
      const { getFieldValue } = this
      const { settings } = this.props
      const { data } = settings
      const { type, propForValue } = field

      switch (type) {
         case 'input': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={deepGet(data, propForValue)}
                  disabled={true}
               />
            )
         }

         case 'number': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={numberWithCommas(deepGet(data, propForValue))}
                  disabled={true}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={formatDateString(deepGet(data, propForValue))}
                  disabled={true}
               />
            )
         }

         case 'select': {
            const { values, propForItemText, propForItemValue } = field

            return (
               <select
                  className="form-input-disabled"
                  value={deepGet(data, propForValue)}
                  disabled={true}
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
                  className="form-input-disabled"
                  value={deepGet(data, propForValue)}
                  disabled={true}
               ></textarea>
            )
         }
      }
   }

   renderFooter = () => {
      const { renderTopFooter, renderMainFooter } = this

      return (
         <div className="printing-page__footer">
            {renderTopFooter()}
            {renderMainFooter()}
         </div>
      )
   }

   renderTopFooter = () => {
      const { renderTopFooterLeft, renderTopFooterRight } = this

      return (
         <div className="printing-page__footer-top">
            {renderTopFooterLeft()}
            {renderTopFooterRight()}
         </div>
      )
   }

   renderTopFooterLeft = () => {
      return <div className="printing-page__footer-top-left"></div>
   }

   renderTopFooterRight = () => {
      const { settingsData } = this.state
      const { diaChiTrenPhieu } = settingsData

      return (
         <div className="printing-page__footer-top-right">
            <p>
               {diaChiTrenPhieu}, ngày {moment().format('DD')} tháng{' '}
               {moment().format('MM')} năm {moment().format('YYYY')}
            </p>
         </div>
      )
   }

   renderMainFooter = () => {
      return (
         <div className="printing-page__footer-main">
            <div className="printing-page__footer-main-left">
               <p className="printing-page__job-title">NGƯỜI DUYỆT</p>
               <p className="printing-page__signature">(Ký và ghi rõ họ tên)</p>
            </div>

            <div className="printing-page__footer-main-right">
               <p className="printing-page__job-title">NGƯỜI LẬP</p>
               <p className="printing-page__signature">(Ký và ghi rõ họ tên)</p>
            </div>
         </div>
      )
   }

   renderInternalCss = () => {
      const style = `<style>@media print { @page { size: portrait; } }</style>`

      return <div dangerouslySetInnerHTML={{ __html: style }}></div>
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderFooter, renderInternalCss } = this

      return (
         <div className="printing-page">
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
            {renderInternalCss()}
         </div>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForDetailsPrintPage
