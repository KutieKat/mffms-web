import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { nhanVien } from '../../entities'
import { GENDERS } from '../../constants'

class NhanVienForList extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: nhanVien,
         api: apiRoutes.nhanVien,
         columns: [
            {
               text: 'Mã nhân viên',
               propForValue: 'maNhanVien',
               propForSorting: 'MaNhanVien',
               isBold: true,
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mã'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenNhanVien',
               propForSorting: 'TenNhanVien',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo họ và tên'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               propForSorting: 'GioiTinh',
               search: {
                  type: 'select',
                  values: GENDERS,
                  propForItemValue: 'text',
                  propForItemText: 'text'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               propForSorting: 'NgaySinh',
               isDateTimeValue: true,
               displayType: 'listAndPrint',
               search: {
                  type: 'date'
               }
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo số điện thoại'
               },
               displayType: 'listAndPrint'
            },
            {
               text: 'Tiền lương (VNĐ)',
               propForValue: 'luong',
               propForSorting: 'Luong',
               search: {
                  type: 'input',
                  placeholder: 'Tìm theo mức lương'
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

export default NhanVienForList
