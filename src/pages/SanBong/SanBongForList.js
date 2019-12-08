import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { sanBong } from '../../entities'

class SanBongForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: sanBong,
         api: apiRoutes.sanBong,
         columns: [
            {
               text: 'Mã sân bóng',
               propForValue: 'maSanBong',
               propForSorting: 'MaSanBong',
               isBold: true,
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               propForSorting: 'TenSanBong',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Chiều dài (m)',
               propForValue: 'chieuDai',
               propForSorting: 'ChieuDai',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo chiều dài'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Chiều rộng (m)',
               propForValue: 'chieuRong',
               propForSorting: 'ChieuRong',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo chiều rộng'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Diện tích (m2)',
               propForValue: 'dienTich',
               propForSorting: 'dienTich',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo diện tích'
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

export default SanBongForList
