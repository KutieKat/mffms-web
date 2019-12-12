import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { nhaCungCap } from '../../entities'

class NhaCungCapForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: nhaCungCap,
         api: apiRoutes.nhaCungCap,
         columns: [
            {
               text: 'Mã nhà cung cấp',
               propForValue: 'maNhaCungCap',
               propForSorting: 'MaNhaCungCap',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               isBold: true,
               displayType: 'listAndPrint'
            },
            {
               text: 'Tên nhà cung cấp',
               propForValue: 'tenNhaCungCap',
               propForSorting: 'TenNhaCungCap',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo số điện thoại'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Địa chỉ',
               propForValue: 'soDienThoai',
               propForSorting: 'DiaChi',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo địa chỉ'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Ghi chú',
               propForValue: 'ghiChu',
               propForSorting: 'GhiChu',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo ghi chú'
               },
               displayType: 'listAndPrint'
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

export default NhaCungCapForList
