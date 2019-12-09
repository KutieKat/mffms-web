import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'

class KhachHangForStats extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: khachHang,
         api: apiRoutes.khachHang,
         cards: [
            {
               label: 'Tổng số khách hàng',
               propForValue: 'totalCustomers', // customers
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng số khách hàng nam',
               propForValue: 'maleCustomers',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tống số khách hàng nữ',
               propForValue: 'femaleCustomers',
               icon: 'fas fa-users',
               unit: 'Người'
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

export default KhachHangForStats
