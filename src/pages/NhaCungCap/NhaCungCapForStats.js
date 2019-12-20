import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { nhaCungCap } from '../../entities'

class NhaCungCapForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: nhaCungCap,
         api: apiRoutes.nhaCungCap,
         cards: [
            {
               label: 'Tổng số nhà cung cấp',
               propForValue: 'total',
               icon: 'fas fa-hands-helping',
               unit: 'Nhà cung cấp'
            }
         ]
      }

      return <ForStatsPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default NhaCungCapForStats
