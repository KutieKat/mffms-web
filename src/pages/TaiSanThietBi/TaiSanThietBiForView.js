import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewPage'
import { ASSET_STATUSES } from '../../constants/'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'
import { apiGet } from '../../utils'

class TaiSanThietBiForView extends Component {
   constructor(props) {
      super(props)

      this.state = {
         providers: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchProviders } = this

      fetchProviders()
   }

   fetchProviders = async () => {
      const url = apiRoutes.nhaCungCap.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ providers: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllProviders = () => {
      const { providers } = this.state
      let allProviders = []

      providers.forEach(provider => {
         allProviders.push({
            value: provider['maNhaCungCap'],
            label: provider['tenNhaCungCap']
         })
      })

      return allProviders
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllProviders } = this

      const settings = {
         entity: taiSanThietBi,
         api: apiRoutes.taiSanThietBi,
         fields: [
            {
               label: 'Mã tài sản thiết bị',
               propForValue: 'maTSTB',
               type: 'input'
            },
            {
               label: 'Tên tài sản thiết bị',
               propForValue: 'tenTSTB',
               type: 'input'
            },
            {
               label: 'Nhà cung cấp',
               propForValue: 'nhaCungCap.maNhaCungCap',
               type: 'select',
               values: getAllProviders(),
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Thông tin bảo hành',
               propForValue: 'thongTinBaoHanh',
               type: 'textarea'
            },
            {
               label: 'Tình trạng',
               propForValue: 'tinhTrang',
               type: 'select',
               values: ASSET_STATUSES,
               propForItemValue: 'value',
               propForItemText: 'label'
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

export default TaiSanThietBiForView
