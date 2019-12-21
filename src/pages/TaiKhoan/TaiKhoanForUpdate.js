import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdatePage'
import { GENDERS, ROLES } from '../../constants/'
import { taiKhoan } from '../../entities'
import apiRoutes from '../../routes/apis'
import moment from 'moment'

class TaiKhoanForUpdate extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: taiKhoan,
         api: apiRoutes.taiKhoan,
         fields: [
            {
               label: 'Mã tài khoản',
               propForValue: 'maTaiKhoan',
               type: 'input',
               disabled: true
            },
            {
               label: 'Tên đăng nhập',
               propForValue: 'tenDangNhap',
               placeholder: 'Nhập tên đăng nhập của tài khoản',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Tên đăng nhập của tài khoản là thông tin bắt buộc và không được để trống!'
                  }
               ],
               disabled: true
            },
            {
               label: 'Họ và tên',
               propForValue: 'hoVaTen',
               placeholder: 'Nhập họ và tên đầy đủ của tài khoản',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Họ và tên của tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message: 'Họ và tên của tài khoản phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               label: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'select',
               values: GENDERS,
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Ngày sinh',
               propForValue: 'ngaySinh',
               placeholder: 'Nhập ngày sinh của tài khoản',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày sinh của tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isBefore',
                     date: moment.utc().startOf('day'),
                     message:
                        'Ngày sinh của tài khoản phải nhỏ hơn hoặc bằng ngày hiện tại!'
                  }
               ]
            },
            {
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               placeholder: 'Nhập số điện thoại của tài khoản',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số điện thoại của tài khoản chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số điện thoại của tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isPhoneNumber',
                     message: 'Số điện thoại của tài khoản không hợp lệ!'
                  }
               ]
            },
            {
               label: 'Địa chỉ email',
               propForValue: 'email',
               placeholder: 'Nhập địa chỉ email của tài khoản',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Số điện thoại của tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isEmail',
                     message: 'Địa chỉ email của tài khoản không hợp lệ!'
                  }
               ]
            },
            {
               label: 'Địa chỉ',
               propForValue: 'diaChi',
               placeholder: 'Nhập địa chỉ của tài khoản',
               type: 'textarea',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Địa chỉ của tài khoản là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Phân quyền',
               propForValue: 'phanQuyen',
               type: 'select',
               values: ROLES,
               propForItemValue: 'value',
               propForItemText: 'label'
            }
            // {
            //    label: 'Ghi chú',
            //    propForValue: 'ghiChu',
            //    placeholder: 'Nhập ghi chú về tài khoản (nếu có)',
            //    type: 'textarea'
            // }
         ]
      }

      return <ForUpdatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiKhoanForUpdate
