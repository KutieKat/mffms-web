import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { GENDERS } from '../../constants/'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'

class KhachHangForView extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: khachHang,
         api: apiRoutes.khachHang,
         fields: [
            {
               label: 'Họ và tên',
               propForValue: 'tenKhachHang',
               type: 'input'
            },
            {
               label: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'select',
               values: GENDERS,
               propForItemValue: 'text',
               propForItemText: 'text'
            },
            {
               label: 'Ngày sinh',
               propForValue: 'ngaySinh',
               type: 'date'
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

export default KhachHangForView
