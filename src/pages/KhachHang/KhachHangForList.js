import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'

class KhachHangForList extends Component {
   constructor(props) {
      super(props)

      this.columnsForList = [
         {
            id: 'MaKhachHang',
            text: 'Mã khách hàng',
            idForValue: 'maKhachHang',
            isBold: true
         },
         {
            id: 'HoVaTen',
            text: 'Họ và tên',
            idForValue: 'tenKhachHang'
         },
         {
            id: 'GioiTinh',
            text: 'Giới tính',
            idForValue: 'gioiTinh'
         },
         {
            id: 'NgaySinh',
            text: 'Ngày sinh',
            idForValue: 'ngaySinh',
            isDateTimeValue: true
         },
         {
            id: 'SoDienThoai',
            text: 'Số điện thoại',
            idForValue: 'soDienThoai'
         }
      ]

      this.columnsForPrint = [
         {
            id: 'MaKhachHang',
            text: 'Mã khách hàng',
            idForValue: 'maKhachHang'
         },
         {
            id: 'HoVaTen',
            text: 'Họ và tên',
            idForValue: 'tenKhachHang'
         },
         {
            id: 'GioiTinh',
            text: 'Giới tính',
            idForValue: 'gioiTinh'
         },
         {
            id: 'NgaySinh',
            text: 'Ngày sinh',
            idForValue: 'ngaySinh',
            isDateTimeValue: true
         },
         {
            id: 'SoDienThoai',
            text: 'Số điện thoại',
            idForValue: 'soDienThoai'
         }
      ]
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { columnsForList, columnsForPrint } = this

      return (
         <ForListPage
            entityName="khách hàng"
            entitySlug="khach-hang"
            api={apiRoutes.khachHang}
            columnsForList={columnsForList}
            columnsForPrint={columnsForPrint}
         />
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default KhachHangForList
