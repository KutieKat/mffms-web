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
               type: 'listAndPrint'
            },
            {
               text: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               propForSorting: 'TenSanBong',
               type: 'listAndPrint'
            },
            {
               text: 'Diện tích',
               propForValue: 'dienTich',
               propForSorting: 'dienTich',
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

export default SanBongForList
