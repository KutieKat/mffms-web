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

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { providers } = this.state
      const settings = {
         entity: taiSanThietBi,
         api: apiRoutes.taiSanThietBi,
         fields: [
            {
               label: 'Mã tài sản thiết bị',
               propForValue: 'maTaiSanThietBi',
               type: 'input'
            },
            {
               label: 'Tên tài sản thiết bị',
               propForValue: 'tenTaiSanThietBi',
               type: 'input'
            },
            {
               label: 'Nhà cung cấp',
               propForValue: 'nhaCungCap',
               type: 'select',
               values: providers,
               propForItemValue: 'maNhaCungCap',
               propForItemText: 'tenNhaCungCap'
            },
            {
               label: 'Thông tin bảo hành',
               propForValue: 'thongTinBaoHanh',
               type: 'textarea'
            },
            {
               label: 'Trạng thái',
               propForValue: 'trangThai',
               type: 'select',
               values: ASSET_STATUSES,
               propForItemValue: 'text',
               propForItemText: 'text'
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
