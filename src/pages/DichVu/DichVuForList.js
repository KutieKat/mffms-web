import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { dichVu } from '../../entities'

class DichVuForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: dichVu,
         api: apiRoutes.dichVu,
         columns: [
            {
               text: 'Mã dịch vụ',
               propForValue: 'maDichVu',
               propForSorting: 'MaDichVu',
               isBold: true,
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Tên dịch vụ',
               propForValue: 'tenDichVu',
               propForSorting: 'TenDichVu',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Đơn giá',
               propForValue: 'donGia',
               propForSorting: 'DonGia',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo đơn giá'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Đơn vị tính',
               propForValue: 'dvt',
               propForSorting: 'DVT',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo đơn vị tính'
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

export default DichVuForList
