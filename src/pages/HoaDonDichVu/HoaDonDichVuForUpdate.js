import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdateWithListPage'
import { hoaDonDichVu, chiTietHoaDonDichVu } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class HoaDonDichVuForUpdate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         employees: [],
         services: [],
         customers: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchServices, fetchEmployees, fetchCustomers } = this

      fetchServices()
      fetchEmployees()
      fetchCustomers()
   }

   fetchServices = async () => {
      const url = apiRoutes.dichVu.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ services: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchEmployees = async () => {
      const url = apiRoutes.nhanVien.getAll
      const queries = { pageSize: 1000 }

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

   fetchCustomers = async () => {
      const url = apiRoutes.khachHang.getAll
      const queries = {
         pageSize: 1000
      }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ customers: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllServices = () => {
      const { services } = this.state
      let allServices = []

      services.forEach(service => {
         allServices.push({
            value: service['maDichVu'],
            label: service['tenDichVu']
         })
      })

      return allServices
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

      return allEmployees
   }

   getAllCustomers = () => {
      const { customers } = this.state
      let allCustomers = []

      customers.forEach(customer => {
         allCustomers.push({
            value: customer['maKhachHang'],
            label: customer['tenKhachHang']
         })
      })

      return allCustomers
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllCustomers, getAllServices, getAllEmployees } = this
      const { services } = this.state

      const settings = {
         entity: hoaDonDichVu,
         api: apiRoutes.hoaDonDichVu,
         fields: [
            {
               label: 'Mã hóa đơn',
               propForValue: 'soHDDV',
               type: 'input'
            },
            {
               label: 'Khách hàng',
               propForValue: 'maKhachHang',
               type: 'select',
               values: getAllCustomers(),
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
               label: 'Ngày sử dụng',
               propForValue: 'ngaySuDung',
               placeholder: 'Nhập ngày sử dụng dịch vụ',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày sử dụng dịch vụ là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Ngày lập hóa đơn',
               propForValue: 'ngayLap',
               placeholder: 'Nhập ngày lập hóa đơn',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày lập hóa đơn là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về hóa đơn (nếu có)',
               type: 'textarea'
            },
            {
               label: 'Số tiền đã thanh toán (VNĐ)',
               propForValue: 'daThanhToan',
               placeholder: 'Nhập số tiền đã thanh toán',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'Số tiền đã thanh toán chỉ được bao gồm các chữ số (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'Số tiền đã thanh toán là thông tin bắt buộc và không được để trống!'
                  }
               ]
            }
         ],
         details: {
            entity: chiTietHoaDonDichVu,
            api: apiRoutes.chiTietHoaDonDichVu,
            propNameForKey: ['soHDDV, maDichVu'],
            propNameForParentKey: 'soHDDV',
            columns: [
               {
                  label: 'Dịch vụ',
                  propForValue: 'maDichVu',
                  type: 'select',
                  values: getAllServices(),
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  affectedProps: ['donGia', 'thanhTien']
               },
               {
                  label: 'Đơn giá (VNĐ)',
                  propForValue: 'donGia',
                  placeholder: 'Nhập đơn giá của dịch vụ',
                  prefetch: {
                     values: services,
                     reference: 'maDichVu',
                     propForValue: 'donGia'
                  },
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
                  ],
                  disabled: true
               },
               {
                  label: 'Số lượng',
                  propForValue: 'soLuong',
                  placeholder: 'Nhập số lượng dịch vụ',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           'Số lượng dịch vụ chỉ được bao gồm các chữ số (0-9)!'
                     }
                  ],
                  affectedProps: ['thanhTien']
               },
               {
                  label: 'Thành tiền (VNĐ)',
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

      return <ForUpdatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default HoaDonDichVuForUpdate
