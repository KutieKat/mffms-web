import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreatePage'
import { sanBong } from '../../entities'
import apiRoutes from '../../routes/apis'

class SanBongForCreate extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
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
               label: 'Chiều dài',
               propForValue: 'chieuDai',
               placeholder: 'Nhập chiều dài của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Chiều dài của sân bóng chỉ được bao gồm các chữ số (0-9)!'
                  }
               ]
            },
            {
               label: 'Chiều rộng',
               propForValue: 'chieuRong',
               placeholder: 'Nhập chiều rộng của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Chiều rộng của sân bóng chỉ được bao gồm các chữ số (0-9)!'
                  }
               ]
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về sân bóng (nếu có)',
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

export default SanBongForCreate
