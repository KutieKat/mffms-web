import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'

class TaiSanThietBiForStats extends Component {
   constructor(props) {
      super(props)

      this.settings = {
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
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForStatsPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiSanThietBiForStats
