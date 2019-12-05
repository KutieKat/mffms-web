import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'

class NhanVienForList extends Component {
   constructor(props) {
      super(props)

      this.columns = [
         {
            id: 'MaNhanVien',
            text: 'Mã nhân viên',
            idForValue: 'maNhanVien',
            isBold: true
         },
         {
            id: 'HoVaTen',
            text: 'Họ và tên',
            idForValue: 'tenNhanVien'
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
         },
         {
            id: 'TienLuong',
            text: 'Tiền lương',
            idForValue: 'luong'
         }
      ]
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { columns } = this

      return (
         <ForListPage
            entityName="nhân viên"
            entitySlug="nhan-vien"
            api={apiRoutes.nhanVien}
            columns={columns}
         />
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default NhanVienForList
