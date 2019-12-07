import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { nhanVien } from '../../entities'

class NhanVienForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: nhanVien,
         api: apiRoutes.nhanVien,
         columns: [
            {
               text: 'Mã nhân viên',
               propForValue: 'maNhanVien',
               propForSorting: 'MaNhanVien',
               isBold: true,
               type: 'listAndPrint'
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenNhanVien',
               propForSorting: 'TenNhanVien',
               type: 'listAndPrint'
            },
            {
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               propForSorting: 'GioiTinh',
               type: 'listAndPrint'
            },
            {
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               propForSorting: 'NgaySinh',
               isDateTimeValue: true,
               type: 'listAndPrint'
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               type: 'listAndPrint'
            },
            {
               text: 'Tiền lương',
               propForValue: 'luong',
               propForSorting: 'Luong',
               type: 'listAndPrint'
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

export default NhanVienForList
