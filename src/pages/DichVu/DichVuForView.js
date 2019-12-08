import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import apiRoutes from '../../routes/apis'
import { dichVu } from '../../entities'

class DichVuForView extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: dichVu,
         api: apiRoutes.dichVu,
         fields: [
            {
               label: 'Mã dịch vụ',
               propForValue: 'maDichVu',
               type: 'input'
            },
            {
               label: 'Tên dịch vụ',
               propForValue: 'tenDichVu',
               type: 'input'
            },
            {
               label: 'Đơn giá',
               propForValue: 'donGia',
               type: 'input'
            },
            {
               label: 'Đơn vị tính',
               propForValue: 'dvt',
               type: 'input'
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               type: 'textarea'
            }
         ]
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DichVuForView
