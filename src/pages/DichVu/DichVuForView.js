import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import apiRoutes from '../../routes/apis'
import { dichVu } from '../../entities'

class DichVuForView extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
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
               label: 'Đơn giá (VNĐ)',
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

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DichVuForView
