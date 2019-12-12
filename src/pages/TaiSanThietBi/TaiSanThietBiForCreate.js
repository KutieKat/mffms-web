import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { ASSET_STATUSES } from '../../constants/'
import { taiSanThietBi } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class TaiSanThietBiForCreate extends Component {
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
               label: 'Tên tài sản thiết bị',
               propForValue: 'tenTSTB',
               placeholder: 'Nhập tên đầy đủ của thiết bị',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Tên của thiết bị là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message: 'Tên của thiết bị phải có ít nhất 4 ký tự!'
                  }
               ]
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
               placeholder: 'Nhập thông tin bảo hành về tài sản thiết bị',
               type: 'textarea',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Địa chỉ của khách hàng là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Tình trạng',
               propForValue: 'tinhTrang',
               type: 'select',
               values: ASSET_STATUSES,
               propForItemValue: 'text',
               propForItemText: 'text'
            }
         ]
      }

      return <ForCreatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiSanThietBiForCreate
