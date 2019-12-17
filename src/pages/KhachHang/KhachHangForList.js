import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'
import { GENDERS_FOR_SEARCH } from '../../constants'

class KhachHangForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: khachHang,
         api: apiRoutes.khachHang,
         columns: [
            {
               text: 'Mã khách hàng',
               propForValue: 'maKhachHang',
               propForSorting: 'MaKhachHang',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã khách hàng'
               }
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenKhachHang',
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
                  // propForItemValue: 'value',
                  // propForItemText: 'label',
                  placeholder: 'Giới tính'
               }
            },
            {
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               propForSorting: 'NgaySinh',
               type: 'date',
               search: {
                  type: 'date',
                  placeholder: 'Ngày sinh'
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

export default KhachHangForList
