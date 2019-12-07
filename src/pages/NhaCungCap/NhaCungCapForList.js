import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { nhaCungCap } from '../../entities'

class NhaCungCapForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: nhaCungCap,
         api: apiRoutes.nhaCungCap,
         columns: [
            {
               text: 'Mã nhà cung cấp',
               propForValue: 'maNhaCungCap',
               propForSorting: 'MaNhaCungCap',
               isBold: true,
               type: 'listAndPrint'
            },
            {
               text: 'Tên nhà cung cấp',
               propForValue: 'tenNhaCungCap',
               propForSorting: 'TenNhaCungCap',
               type: 'listAndPrint'
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               type: 'listAndPrint'
            },
            {
               text: 'Địa chỉ',
               propForValue: 'soDienThoai',
               propForSorting: 'DiaChi',
               type: 'listAndPrint'
            },
            {
               text: 'Ghi chú',
               propForValue: 'ghiChu',
               propForSorting: 'GhiChu',
               type: 'listAndPrint'
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

export default NhaCungCapForList
