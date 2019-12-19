import React, { Component } from 'react'
import ForCreatePage from '../../components/ForCreateWithListPage'
import { donNhapHang, chiTietDonNhapHang } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class DonNhapHangForCreate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         providers: [],
         employees: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchProviders, fetchEmployees } = this

      fetchProviders()
      fetchEmployees()
   }

   fetchProviders = async () => {
      const url = apiRoutes.nhaCungCap.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ providers: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchEmployees = async () => {
      const url = apiRoutes.nhanVien.getAll
      const queries = {
         pageSize: 1000,
         luongBatDau: 0,
         luongKetThuc: 1000000000
      }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ employees: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllProviders = () => {
      const { providers } = this.state
      let allProviders = []

      providers.forEach(provider => {
         allProviders.push({
            value: provider['maNhaCungCap'],
            label: provider['tenNhaCungCap']
         })
      })

      return allProviders
   }

   getAllEmployees = () => {
      const { employees } = this.state
      let allEmployees = []

      employees.forEach(employee => {
         allEmployees.push({
            value: employee['maNhanVien'],
            label: employee['tenNhanVien']
         })
      })

      console.log(employees)

      return allEmployees
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllProviders, getAllEmployees } = this

      const settings = {
         entity: donNhapHang,
         api: apiRoutes.donNhapHang,
         fields: [
            {
               label: 'Nhà cung cấp',
               propForValue: 'maNhaCungCap',
               type: 'select',
               values: getAllProviders(),
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Nhân viên',
               propForValue: 'maNhanVien',
               type: 'select',
               values: getAllEmployees(),
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Ngày giao hàng',
               propForValue: 'ngayGiaoHang',
               placeholder: 'Nhập ngày giao hàng',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày giao hàng là thông tin bắt buộc và không được để trống!'
                  }
               ]
            }
         ],
         details: {
            entity: chiTietDonNhapHang,
            api: apiRoutes.chiTietDonNhapHang,
            columns: [
               {
                  label: 'Tài sản thiết bị',
                  propForValue: 'maNhaCungCap',
                  type: 'select',
                  values: getAllProviders(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               },
               {
                  label: 'Đơn giá',
                  propForValue: 'donGia',
                  placeholder: 'Nhập đơn giá của tài sản thiết bị',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           'Đơn giá của tài sản thiết bị chỉ được bao gồm các chữ số (0-9)!'
                     },
                     {
                        rule: 'notEmpty',
                        message:
                           'Đơn giá của tài sản thiết bị là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Đơn vị tính',
                  propForValue: 'dvt',
                  placeholder: 'Nhập đơn vị tính của tài sản thiết bị',
                  type: 'input',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Đơn vị tính của tài sản thiết bị là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Số lượng',
                  propForValue: 'soLuong',
                  placeholder: 'Nhập số lượng tài sản thiết bị',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           'Số lượng tài sản thiết bị chỉ được bao gồm các chữ số (0-9)!'
                     }
                  ]
               },
               {
                  label: 'Thành tiền',
                  type: 'calculation',
                  operator: '*',
                  propForValue: 'thanhTien',
                  propForValue1: 'soLuong',
                  propForValue2: 'donGia',
                  disabled: true
               }
            ]
         }
      }

      return <ForCreatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DonNhapHangForCreate
