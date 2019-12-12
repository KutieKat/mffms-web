import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { sanBong } from '../../entities'
import apiRoutes from '../../routes/apis'

class SanBongForView extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: sanBong,
         api: apiRoutes.sanBong,
         fields: [
            {
               label: 'Mã sân bóng',
               propForValue: 'maSanBong',
               type: 'input'
            },
            {
               label: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               type: 'input'
            },
            {
               label: 'Chiều dài (m)',
               propForValue: 'chieuDai',
               type: 'input'
            },
            {
               label: 'Chiều rộng (m)',
               propForValue: 'chieuRong',
               type: 'input'
            },
            {
               label: 'Diện tích (m2)',
               propForValue: 'dienTich',
               type: 'input'
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               type: 'textarea'
            }
         ]
      }

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default SanBongForView
