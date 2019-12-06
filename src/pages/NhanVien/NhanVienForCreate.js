import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { GENDERS } from '../../constants/'
import apiRoutes from '../../routes/apis'

class NhanVienForCreate extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entityName: 'nhân viên',
         entitySlug: 'nhan-vien',
         api: apiRoutes.nhanVien,
         fields: [
            {
               label: 'Họ và tên',
               propForValue: 'tenNhanVien',
               placeholder: 'Nhập họ và tên đầy đủ của nhân viên',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Họ và tên của nhân viên là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message: 'Họ và tên của nhân viên phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               label: 'Giới tính',
               propForValue: 'gioiTinh',
               type: 'select',
               values: GENDERS,
               propForItemKey: 'id',
               propForItemValue: 'text',
               propForItemText: 'text'
            },
            {
               label: 'Ngày sinh',
               propForValue: 'ngaySinh',
               placeholder: 'Nhập ngày sinh của nhân viên',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày sinh của nhân viên là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isAfter',
                     date: new Date().toLocaleDateString(),
                     message:
                        'Ngày sinh của nhân viên phải lớn hơn hoặc bằng ngày hiện tại!'
                  }
               ]
            },
            {
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               placeholder: 'Nhập số điện thoại của nhân viên',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số điện thoại của nhân viên chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số điện thoại của nhân viên là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isPhoneNumber',
                     message: 'Số điện thoại của nhân viên không hợp lệ!'
                  }
               ]
            },
            {
               label: 'Số CMND',
               propForValue: 'soCMND',
               placeholder: 'Nhập số CMND của nhân viên',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số CMND của nhân viên chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'minLength',
                     length: 9,
                     message: 'Số CMND của nhân viên phải có ít nhất 9 chữ số!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số CMND của nhân viên là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Tiền lương',
               propForValue: 'luong',
               placeholder: 'Nhập tiền lương của nhân viên',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Tiền lương của nhân viên chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Tiền lương của nhân viên là thông tin bắt buộc và không được để trống!'
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

export default NhanVienForCreate
