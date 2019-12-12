import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { GENDERS } from '../../constants/'
import { khachHang } from '../../entities'
import apiRoutes from '../../routes/apis'
import moment from 'moment'

class KhachHangForCreate extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: khachHang,
         api: apiRoutes.khachHang,
         fields: [
            {
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
               label: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'select',
               values: GENDERS,
               propForItemValue: 'text',
               propForItemText: 'text'
            },
            {
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
                     date: moment.utc().startOf('day'),
                     message:
                        'Ngày sinh của khách hàng phải lớn hơn hoặc bằng ngày hiện tại!'
                  }
               ]
            },
            {
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
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               placeholder: 'Nhập địa chỉ của khách hàng',
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
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về khách hàng (nếu có)',
               type: 'textarea'
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
