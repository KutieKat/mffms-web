import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'

class KhachHangForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: khachHang,
         columns: [
            {
               text: 'Mã khách hàng',
               propForValue: 'maKhachHang',
               propForSorting: 'MaKhachHang',
               isBold: true,
               type: 'listAndPrint'
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenKhachHang',
               propForSorting: 'HoVaTen',
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

export default KhachHangForList
