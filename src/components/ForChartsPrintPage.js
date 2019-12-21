import React, { Component, Fragment } from 'react'
import { apiGet } from '../utils'
import apiRoutes from '../routes/apis'
import moment from 'moment'

class ForChartsPrintPage extends Component {
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
      return (
         <div className="printing-page__main">
            <h1 className="printing-page-title">BIỂU ĐỒ THỐNG KÊ TỔNG QUAN</h1>
         </div>
      )
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
      const { renderHeader, renderFooter, renderInternalCss } = this
      const { settings } = this.props
      const { section } = settings

      return (
         <div className="printing-page">
            {section === 'header' && renderHeader()}
            {section === 'footer' && renderFooter()}
            {renderInternalCss()}
         </div>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForChartsPrintPage
