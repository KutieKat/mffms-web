import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { hoaDonDichVu } from '../../entities'

class HoaDonDichVuForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: hoaDonDichVu,
         api: apiRoutes.hoaDonDichVu,
         cards: [
            {
               label: 'Tổng số hóa đơn',
               propForValue: 'total',
               icon: 'fas fa-file-invoice',
               unit: 'Hóa đơn'
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

export default HoaDonDichVuForStats
