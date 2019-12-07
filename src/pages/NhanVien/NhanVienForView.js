import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { GENDERS, POSITIONS } from '../../constants/'
import apiRoutes from '../../routes/apis'

class NhanVienForView extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entityName: 'nhân viên',
         entitySlug: 'nhan-vien',
         api: apiRoutes.nhanVien,
         fields: [
            {
               label: 'Họ và tên',
               propForValue: 'tenNhanVien',
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
               label: 'Chức vụ',
               propForValue: 'chucVu',
               type: 'select',
               values: POSITIONS,
               propForItemValue: 'text',
               propForItemText: 'text'
            },
            {
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               type: 'input'
            },
            {
               label: 'Số CMND',
               propForValue: 'soCMND',
               type: 'input'
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               type: 'textarea'
            },
            {
               label: 'Tiền lương',
               propForValue: 'luong',
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

export default NhanVienForView
