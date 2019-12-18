import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { sanBong } from '../../entities'

class SanBongForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: sanBong,
         api: apiRoutes.sanBong,
         columns: [
            {
               text: 'Mã sân bóng',
               propForValue: 'maSanBong',
               propForSorting: 'MaSanBong',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               }
            },
            {
               text: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               propForSorting: 'TenSanBong',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               }
            },
            {
               text: 'Chiều dài (m)',
               propForValue: 'chieuDai',
               propForSorting: 'ChieuDai',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100,
                  step: 10,
                  placeholder: 'Tìm theo chiều dài'
               }
            },
            {
               text: 'Chiều rộng (m)',
               propForValue: 'chieuRong',
               propForSorting: 'ChieuRong',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100,
                  step: 10,
                  placeholder: 'Tìm theo chiều rộng'
               }
            },
            {
               text: 'Diện tích (m2)',
               propForValue: 'dienTich',
               propForSorting: 'dienTich',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100,
                  step: 10,
                  placeholder: 'Tìm theo diện tích'
               }
            },
            {
               text: 'Ghi chú',
               propForValue: 'ghiChu',
               propForSorting: 'GhiChu',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo ghi chú'
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

export default SanBongForList
