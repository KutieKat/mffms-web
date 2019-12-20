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
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã dịch vụ'
               }
            },
            {
               text: 'Tên dịch vụ',
               propForValue: 'tenDichVu',
               propForSorting: 'TenDichVu',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tên dịch vụ'
               }
            },
            {
               text: 'Đơn giá (VNĐ)',
               propForValue: 'donGia',
               propForSorting: 'DonGia',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100000000,
                  step: 1000000,
                  placeholder: 'Đơn giá'
               }
            },
            {
               text: 'Đơn vị tính',
               propForValue: 'dvt',
               propForSorting: 'DVT',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Đơn vị tính'
               }
            },
            {
               text: 'Ghi chú',
               propForValue: 'ghiChu',
               propForSorting: 'GhiChu',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Ghi chú'
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

export default DichVuForList
