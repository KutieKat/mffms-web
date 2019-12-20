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
               icon: 'fas fa-cog',
               unit: 'Cái'
            },
            {
               label: 'Tài sản thiết bị đang hoạt động tốt',
               propForValue: 'hoatDongTot',
               icon: 'fas fa-cog',
               unit: 'Cái'
            },
            {
               label: 'Tài sản thiết bị đang sửa chữa',
               propForValue: 'dangSuaChua',
               icon: 'fas fa-cog',
               unit: 'Cái'
            },
            {
               label: 'Tài sản thiết bị đang bảo hàng',
               propForValue: 'dangBaoHanh',
               icon: 'fas fa-cog',
               unit: 'Cái'
            },
            {
               label: 'Tài sản thiết bị đã qua sử dụng',
               propForValue: 'daQuaSuDung',
               icon: 'fas fa-cog',
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
