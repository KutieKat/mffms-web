import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { dichVu } from '../../entities'

class DichVuForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: dichVu,
         api: apiRoutes.dichVu,
         cards: [
            {
               label: 'Tổng số dịch vụ',
               propForValue: 'total',
               icon: 'fas fa-concierge-bell',
               unit: 'Dịch vụ'
            },
            {
               label: 'Dịch vụ rẻ nhất',
               propForValue: 'cheapestService',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Dịch vụ đắt nhất',
               propForValue: 'mostExpensiveService',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
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

export default DichVuForStats
