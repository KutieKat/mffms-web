import React, { Component } from 'react'
import ForUpdateSettingsPage from '../../components/ForUpdateSettingsPage'
import { caiDat } from '../../entities'
import apiRoutes from '../../routes/apis'

class CaiDatForUpdate extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: caiDat,
         api: apiRoutes.caiDat,
         fields: [
            {
               label: 'Tên sân bóng',
               propForValue: 'tenSanBong',
               placeholder: 'Nhập tên đầy đủ của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Tên của sân bóng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message: 'Tên của sân bóng phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               label: 'Địa chỉ của sân bóng',
               propForValue: 'diaChi',
               placeholder: 'Nhập địa chỉ của sân bóng',
               type: 'textarea',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Địa chỉ của sân bóng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message: 'Địa chỉ của sân bóng phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               label: 'Địa chỉ trên phiếu',
               propForValue: 'diaChiTrenPhieu',
               placeholder:
                  'Nhập địa chỉ được sử dụng trên các phiếu và báo biểu',
               type: 'textarea',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Địa chỉ được sử dụng trên các phiếu và báo biểu là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'minLength',
                     length: 4,
                     message:
                        'Địa chỉ được sử dụng trên các phiếu và báo biểu phải có ít nhất 4 ký tự!'
                  }
               ]
            },
            {
               label: 'Số điện thoại',
               propForValue: 'soDienThoai',
               placeholder: 'Nhập số điện thoại của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số điện thoại của sân bóng chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số điện thoại của sân bóng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isPhoneNumber',
                     message: 'Số điện thoại của sân bóng không hợp lệ!'
                  }
               ]
            },
            {
               label: 'Số fax',
               propForValue: 'fax',
               placeholder: 'Nhập số fax của sân bóng',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số fax của sân bóng chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số fax của sân bóng là thông tin bắt buộc và không được để trống!'
                  },
                  {
                     rule: 'isPhoneNumber',
                     message: 'Số fax của sân bóng không hợp lệ!'
                  }
               ]
            }
         ]
      }

      return <ForUpdateSettingsPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default CaiDatForUpdate
