import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { sanBong } from '../../entities'
import apiRoutes from '../../routes/apis'

class SanBongForView extends Component {
   constructor(props) {
      super(props)

      this.settings = {
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
               label: 'Diện tích',
               propForValue: 'dienTich',
               type: 'textarea'
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               type: 'textarea'
            }
         ]
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default SanBongForView
