import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { GENDERS, POSITIONS } from '../../constants/'
import apiRoutes from '../../routes/apis'
import { nhanVien } from '../../entities'

class NhanVienForView extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: nhanVien,
         api: apiRoutes.nhanVien,
         fields: [
            {
               label: 'Mã nhân viên',
               propForValue: 'maNhanVien',
               type: 'input'
            },
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
               propForItemValue: 'value',
               propForItemText: 'label'
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
               propForItemValue: 'value',
               propForItemText: 'label'
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

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default NhanVienForView
