import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { sanBong } from '../../entities'
import apiRoutes from '../../routes/apis'

class SanBongForCreate extends Component {
   constructor(props) {
      super(props)

      this.settings = {
         entity: sanBong,
         api: apiRoutes.sanBong,
         fields: [
            {
               label: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               placeholder: 'Nhập tên của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Tên của sân bóng là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Diện tích',
               propForValue: 'dienTich',
               placeholder: 'Nhập diện tích của sân bóng',
               type: 'textarea',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Diện tích của sân bóng chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Diện tích của sân bóng là thông tin bắt buộc và không được để trống!'
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

export default SanBongForCreate
