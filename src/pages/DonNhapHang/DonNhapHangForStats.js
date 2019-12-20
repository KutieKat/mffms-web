import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { donNhapHang } from '../../entities'

class DonNhapHangForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: donNhapHang,
         api: apiRoutes.donNhapHang,
         cards: [
            {
               label: 'Tổng số đơn nhập hàng',
               propForValue: 'total',
               icon: 'fas fa-file-invoice',
               unit: 'Hóa đơn'
            },
            {
               label: 'Giá trị đơn nhập hàng thấp nhất',
               propForValue: 'cheapest',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Giá trị đơn nhập hàng cao nhất',
               propForValue: 'mostExpensive',
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

export default DonNhapHangForStats
