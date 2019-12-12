import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'

class TaiSanThietBiForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: taiSanThietBi,
         api: apiRoutes.taiSanThietBi,
         cards: [
            {
               label: 'Tổng số tài sản thiết bị',
               propForValue: 'total',
               icon: 'fas fa-users',
               unit: 'Cái'
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

export default TaiSanThietBiForStats
