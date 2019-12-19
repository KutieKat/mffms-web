import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { dichVu } from '../../entities'
import apiRoutes from '../../routes/apis'

class DichVuForCreate extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: dichVu,
         api: apiRoutes.dichVu,
         fields: [
            {
               label: 'Tên dịch vụ',
               propForValue: 'tenDichVu',
               placeholder: 'Nhập tên của dịch vụ',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Tên của dịch vụ là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Đơn giá',
               propForValue: 'donGia',
               placeholder: 'Nhập đơn giá của dịch vụ',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Đơn giá của dịch vụ chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Đơn giá của dịch vụ là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Đơn vị tính',
               propForValue: 'dvt',
               placeholder: 'Nhập đơn vị tính của dịch vụ',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Đơn vị tính của dịch vụ là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về dịch vụ (nếu có)',
               type: 'textarea'
            }
         ]
      }

      return <ForCreatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DichVuForCreate
