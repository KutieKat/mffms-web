import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdateWithListPage'
import { phieuDatSan, chiTietPhieuDatSan } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class PhieuDatSanForUpdate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         employees: [],
         services: [],
         customers: [],
         pitches: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const {
         fetchServices,
         fetchEmployees,
         fetchCustomers,
         fetchPitches
      } = this

      fetchServices()
      fetchEmployees()
      fetchCustomers()
      fetchPitches()
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

   fetchPitches = async () => {
      const url = apiRoutes.sanBong.getAll
      const queries = {
         pageSize: 1000
      }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ pitches: data })
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

   getAllPitches = () => {
      const { pitches } = this.state
      let allPitches = []

      pitches.forEach(pitch => {
         allPitches.push({
            value: pitch['maSanBong'],
            label: pitch['tenSanBong']
         })
      })

      return allPitches
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const {
         getAllCustomers,
         getAllServices,
         getAllEmployees,
         getAllPitches
      } = this
      const { services } = this.state

      const settings = {
         entity: phieuDatSan,
         api: apiRoutes.phieuDatSan,
         sumpriceProp: 'tongTien',
         fields: [
            {
               label: 'Mã phiếu đặt sân',
               propForValue: 'maPhieuDatSan',
               type: 'input',
               disabled: true
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
               label: 'Ngày lập hóa đơn',
               propForValue: 'ngayLap',
               placeholder: 'Nhập ngày lập phiếu',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày lập phiếu là thông tin bắt buộc và không được để trống!'
                  }
               ]
            }
         ],
         details: {
            entity: chiTietPhieuDatSan,
            api: apiRoutes.chiTietPhieuDatSan,
            columns: [
               {
                  label: 'Sân bóng',
                  propForValue: 'maSanBong',
                  type: 'select',
                  values: getAllPitches(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               },
               {
                  label: 'Thời gian bắt đầu',
                  propForValue: 'thoiGianBatDau',
                  type: 'time',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Thời gian bắt đầu là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Thời gian kết thúc',
                  propForValue: 'thoiGianKetThuc',
                  type: 'time',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Thời gian kết thúc là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Ngày đặt',
                  propForValue: 'ngayDat',
                  type: 'date',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Ngày đặt sân là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Thành tiền (VNĐ)',
                  propForValue: 'thanhTien',
                  type: 'input',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Thành tiền là thông tin bắt buộc và không được để trống!'
                     }
                  ]
               },
               {
                  label: 'Số tiền đã thanh toán (VNĐ)',
                  propForValue: 'tienCoc',
                  type: 'input',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           'Số tiền đã thanh toán là thông tin bắt buộc và không được để trống!'
                     }
                  ]
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

export default PhieuDatSanForUpdate
