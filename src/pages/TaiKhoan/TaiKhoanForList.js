import React, { Component } from 'react'
import ForListPage from '../../components/ForAccountListPage'
import apiRoutes from '../../routes/apis'
import { taiKhoan } from '../../entities'
import { GENDERS_FOR_SEARCH, ROLES_FOR_SEARCH } from '../../constants'

class TaiKhoanForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: taiKhoan,
         api: apiRoutes.taiKhoan,
         exportable: false,
         columns: [
            {
               text: 'Mã tài khoản',
               propForValue: 'maTaiKhoan',
               propForSorting: 'MaTaiKhoan',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã tài khoản'
               }
            },
            {
               text: 'Tên đăng nhập',
               propForValue: 'tenDangNhap',
               propForSorting: 'HoVaTen',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Họ và tên'
               }
            },
            {
               text: 'Họ và tên',
               propForValue: 'hoVaTen',
               propForSorting: 'HoVaTen',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Họ và tên'
               }
            },
            {
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               propForSorting: 'GioiTinh',
               type: 'string',
               search: {
                  type: 'select',
                  values: GENDERS_FOR_SEARCH,
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  placeholder: 'Giới tính'
               }
            },
            {
               text: 'Phân quyền',
               propForValue: 'phanQuyen',
               propForSorting: 'PhanQuyen',
               type: 'string',
               search: {
                  type: 'select',
                  values: ROLES_FOR_SEARCH,
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  placeholder: 'Phân quyền'
               }
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Số điện thoại'
               }
            }
         ]
      }

      return <ForListPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiKhoanForList
