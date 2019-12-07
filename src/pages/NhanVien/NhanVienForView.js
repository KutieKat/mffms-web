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
               placeholder: 'Nhập họ và tên đầy đủ của nhân viên',
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
               placeholder: 'Nhập ngày sinh của nhân viên',
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
               placeholder: 'Nhập số điện thoại của nhân viên',
               type: 'input'
            },
            {
               label: 'Số CMND',
               propForValue: 'soCMND',
               placeholder: 'Nhập số CMND của nhân viên',
               type: 'input'
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               placeholder: 'Nhập địa chỉ của nhân viên',
               type: 'textarea'
            },
            {
               label: 'Tiền lương',
               propForValue: 'luong',
               placeholder: 'Nhập tiền lương của nhân viên',
               type: 'input'
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về nhân viên (nếu có)',
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
