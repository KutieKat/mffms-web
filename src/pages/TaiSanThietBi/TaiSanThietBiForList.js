import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'
import { ASSET_STATUSES_FOR_SEARCH } from '../../constants'
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

   ///// METHODS FOR COMPUTING VALUES /////

   getAllProviders = () => {
      const { providers } = this.state
      let allProviders = [{ value: '', label: 'Tất cả' }]

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
         columns: [
            {
               text: 'Mã tài sản thiết bị',
               propForValue: 'maTSTB',
               propForSorting: 'MaTSTB',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               }
            },
            {
               text: 'Tên tài sản thiết bị',
               propForValue: 'tenTSTB',
               propForSorting: 'TenTSTB',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo tên'
               }
            },
            {
               text: 'Nhà cung cấp',
               propForValue: 'nhaCungCap.tenNhaCungCap',
               propForSorting: 'MaNhaCungCap',
               type: 'string',
               // reference: 'nhaCungCap.tenNhaCungCap',
               search: {
                  type: 'select',
                  values: getAllProviders(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               }
            },
            {
               text: 'Thông tin bảo hành',
               propForValue: 'thongTinBaoHanh',
               propForSorting: 'ThongTinBaoHanh',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo thông tin bảo hành'
               }
            },
            {
               text: 'Trạng thái',
               propForValue: 'tinhTrang',
               propForSorting: 'TinhTrang',
               type: 'string',
               search: {
                  type: 'select',
                  values: ASSET_STATUSES_FOR_SEARCH,
                  propForItemValue: 'value',
                  propForItemText: 'label'
               }
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
