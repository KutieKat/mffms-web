import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { nhanVien } from '../../entities'
import { GENDERS_FOR_SEARCH } from '../../constants'

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
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã nhân viên'
               }
               // displayType: 'listAndPrint'
            },
            {
               text: 'Họ và tên',
               propForValue: 'tenNhanVien',
               propForSorting: 'TenNhanVien',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Họ và tên'
               }
               // displayType: 'listAndPrint'
            },
            {
               text: 'Giới tính',
               propForValue: 'gioiTinh',
               propForSorting: 'GioiTinh',
               type: 'string',
               search: {
                  type: 'select',
                  values: GENDERS_FOR_SEARCH,
                  propForItemValue: 'value',
                  propForItemText: 'label'
               }
               // displayType: 'listAndPrint'
            },
            {
               text: 'Ngày sinh',
               propForValue: 'ngaySinh',
               propForSorting: 'NgaySinh',
               type: 'date',
               search: {
                  type: 'date',
                  placeholder: 'Ngày sinh'
               }
               // displayType: 'listAndPrint'
            },
            {
               text: 'Số điện thoại',
               propForValue: 'soDienThoai',
               propForSorting: 'SoDienThoai',
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Số điện thoại'
               }
               // displayType: 'listAndPrint'
            },
            {
               text: 'Tiền lương (VNĐ)',
               propForValue: 'luong',
               propForSorting: 'Luong',
               type: 'number',
               search: {
                  type: 'slider',
                  placeholder: 'Mức lương'
               }
               // displayType: 'listAndPrint'
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
