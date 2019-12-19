import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdatePasswordPage'
import { GENDERS, ROLES } from '../../constants/'
import { taiKhoan } from '../../entities'
import apiRoutes from '../../routes/apis'
import moment from 'moment'

class TaiKhoanForUpdatePassword extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: taiKhoan,
         api: apiRoutes.taiKhoan,
         fields: [
            {
               label: 'Mật khẩu cũ',
               propForValue: 'matKhauCu',
               placeholder: 'Nhập mật khẩu cũ của tài khoản',
               type: 'password',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Mật khẩu của cũ tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 6,
                     message:
                        'Mật khẩu cũ của tài khoản phải có ít nhất 6 ký tự!'
                  }
               ]
            },
            {
               label: 'Mật khẩu mới',
               propForValue: 'matKhauMoi',
               placeholder: 'Nhập mật khẩu mới của tài khoản',
               type: 'password',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Mật khẩu của mới tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 6,
                     message:
                        'Mật khẩu mới của tài khoản phải có ít nhất 6 ký tự!'
                  }
               ]
            },
            {
               label: 'Xác nhận mật khẩu mới',
               propForValue: 'xacNhanMatKhauMoi',
               placeholder: 'Nhập lại mật khẩu mới của tài khoản',
               type: 'password',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Mật khẩu xác nhận của tài khoản là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 6,
                     message:
                        'Mật khẩu xác nhận của tài khoản phải có ít nhất 6 ký tự!'
                  },
                  {
                     rule: 'isEqual',
                     propForComparedValue: 'matKhauMoi',
                     message: 'Mật khẩu xác nhận của tài khoản chưa trùng khớp!'
                  }
               ]
            }
         ]
      }

      return <ForUpdatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default TaiKhoanForUpdatePassword
