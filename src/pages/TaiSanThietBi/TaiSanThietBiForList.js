import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { taiSanThietBi } from '../../entities'
import { ASSET_STATUSES } from '../../constants'

class TaiSanThietBiForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
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
                  dataSourceType: 'api',
                  dataSource: apiRoutes.nhaCungCap,
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
                  dataSourceType: 'hardCoded',
                  // values: ASSET_STATUSES,
                  dataSource: ASSET_STATUSES,
                  propForItemValue: 'text',
                  propForItemText: 'text'
               },
               displayType: 'listAndPrint'
            }
         ]
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this

      return <ForListPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiSanThietBiForList
