import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'
import { ASSET_STATUSES } from '../../constants'
import { apiGet } from '../../utils'

class TaiSanThietBiForList extends Component {
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
         columns: [
            {
               text: 'Mã tài sản thiết bị',
               propForValue: 'maTaiSanThietBi',
               propForSorting: 'MaTSTB',
               isBold: true,
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Tên tài sản thiết bị',
               propForValue: 'tenTSTB',
               propForSorting: 'TenTSTB',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Nhà cung cấp',
               propForValue: 'nhaCungCap',
               propForSorting: 'NhaCungCap',
               search: {
                  type: 'select',
                  values: providers,
                  propForItemValue: 'maNhaCungCap',
                  propForItemText: 'tenNhaCungCap'
               }
            },
            {
               text: 'Thông tin bảo hành',
               propForValue: 'thongTinBaoHanh',
               propForSorting: 'ThongTinBaoHanh',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo thông tin bảo hành'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Trạng thái',
               propForValue: 'tinhTrang',
               propForSorting: 'TinhTrang',
               search: {
                  type: 'select',
                  values: ASSET_STATUSES,
                  propForItemValue: 'text',
                  propForItemText: 'text'
               },
               displayType: 'listAndPrint'
            }
         ]
      }

      return <ForListPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiSanThietBiForList
