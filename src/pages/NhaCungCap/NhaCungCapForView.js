import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import apiRoutes from '../../routes/apis'
import { nhaCungCap } from '../../entities'

class NhaCungCapForView extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: nhaCungCap,
         api: apiRoutes.nhaCungCap,
         fields: [
            {
               label: 'Mã nhà cung cấp',
               propForValue: 'maNhaCungCap',
               type: 'input'
            },
            {
               label: 'Tên nhà cung cấp',
               propForValue: 'tenNhaCungCap',
               type: 'input'
            },
            {
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               type: 'input'
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               type: 'textarea'
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

export default NhaCungCapForView
