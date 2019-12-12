import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { ASSET_STATUSES } from '../../constants/'
import { taiSanThietBi } from '../../entities'
import apiRoutes from '../../routes/apis'

class TaiSanThietBiForCreate extends Component {
   constructor(props) {
      super(props)

      this.settings = {
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
               dataSourceType: 'api',
               dataSource: apiRoutes.nhaCungCap,
               propForItemValue: 'tenNhaCungCap',
               propForItemText: 'maNhaCungCap'
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
               label: 'Trạng thái',
               propForValue: 'trangThai',
               type: 'select',
               dataSourceType: 'hardCoded',
               dataSource: ASSET_STATUSES,
               propForItemValue: 'text',
               propForItemText: 'text'
            }
         ]
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForCreatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiSanThietBiForCreate
