import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'
import { GENDERS } from '../../constants'

class KhachHangForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: khachHang,
         api: apiRoutes.khachHang,
         columns: [
            {
               text: 'Mã khách hàng',
               propForValue: 'maKhachHang',
               propForSorting: 'MaKhachHang',
               isBold: true,
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenKhachHang',
               propForSorting: 'HoVaTen',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo họ và tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               propForSorting: 'GioiTinh',
               search: {
                  type: 'select',
                  values: GENDERS,
                  propForItemValue: 'text',
                  propForItemText: 'text'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               propForSorting: 'NgaySinh',
               search: {
                  type: 'date'
               },
               isDateTimeValue: true,
               displayType: 'listAndPrint'
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo SĐT'
               },
               displayType: 'listAndPrint'
            }
         ]
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForListPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default KhachHangForList
