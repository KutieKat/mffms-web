import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { GENDERS } from '../../constants/'
import apiRoutes from '../../routes/apis'

class KhachHangForCreate extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entityName: 'khách hàng',
         entitySlug: 'khach-hang',
         api: apiRoutes.khachHang,
         fields: [
            {
               id: 'HoVaTen',
               label: 'Họ và tên',
               propForValue: 'tenKhachHang',
               placeholder: 'Nhập họ và tên đầy đủ của khách hàng',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Họ và tên của khách hàng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message:
                        'Họ và tên của khách hàng phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               id: 'GioiTinh',
               label: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'select',
               values: GENDERS,
               propForItemKey: 'id',
               propForItemValue: 'text',
               propForItemText: 'text'
               // validators: [
               //    {
               //       rule: 'inRange',
               //       range: [0, 1],
               //       message: 'Giới tính của khách hàng không hợp lệ!'
               //    }
               // ]
            },
            {
               id: 'NgaySinh',
               label: 'Ngày sinh',
               propForValue: 'ngaySinh',
               placeholder: 'Nhập ngày sinh của khách hàng',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày sinh của khách hàng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isAfter',
                     date: new Date().toLocaleDateString(),
                     message:
                        'Ngày sinh của khách hàng phải lớn hơn hoặc bằng ngày hiện tại!'
                  }
               ]
            },
            {
               id: 'SoDienThoai',
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               placeholder: 'Nhập số điện thoại của khách hàng',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số điện thoại của khách hàng chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số điện thoại của khách hàng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isPhoneNumber',
                     message: 'Số điện thoại của khách hàng không hợp lệ!'
                  }
               ]
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

export default KhachHangForCreate
