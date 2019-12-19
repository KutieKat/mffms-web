import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { GENDERS, ROLES } from '../../constants/'
import apiRoutes from '../../routes/apis'
import { taiKhoan } from '../../entities'

class TaiKhoanForView extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: taiKhoan,
         api: apiRoutes.taiKhoan,
         fields: [
            {
               label: 'Mã tài khoản',
               propForValue: 'maTaiKhoan',
               type: 'input'
            },
            {
               label: 'Tên đăng nhập',
               propForValue: 'tenDangNhap',
               type: 'input'
            },
            {
               label: 'Họ và tên',
               propForValue: 'hoVaTen',
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
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               type: 'input'
            },
            {
               label: 'Địa chỉ email',
               propForValue: 'email',
               type: 'email'
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               type: 'textarea'
            },
            {
               label: 'Phân quyền',
               propForValue: 'phanQuyen',
               type: 'select',
               values: ROLES,
               propForItemValue: 'value',
               propForItemText: 'label'
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

export default TaiKhoanForView
