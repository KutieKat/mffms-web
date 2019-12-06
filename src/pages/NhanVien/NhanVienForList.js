import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'

class NhanVienForList extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entityName: 'nhân viên',
         entitySlug: 'nhan-vien',
         api: apiRoutes.nhanVien,
         columns: [
            {
               id: 'MaNhanVien',
               text: 'Mã nhân viên',
               propForValue: 'maNhanVien',
               isBold: true,
               type: 'listAndPrint'
            },
            {
               id: 'HoVaTen',
               text: 'Họ và tên',
               propForValue: 'tenNhanVien',
               type: 'listAndPrint'
            },
            {
               id: 'GioiTinh',
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'listAndPrint'
            },
            {
               id: 'NgaySinh',
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               isDateTimeValue: true,
               type: 'listAndPrint'
            },
            {
               id: 'SoDienThoai',
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               type: 'listAndPrint'
            },
            {
               id: 'TienLuong',
               text: 'Tiền lương',
               propForValue: 'luong',
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
