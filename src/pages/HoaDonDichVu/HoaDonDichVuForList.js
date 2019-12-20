import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { hoaDonDichVu } from '../../entities'
import { apiGet } from '../../utils'

class HoaDonDichVuForList extends Component {
   constructor(props) {
      super(props)

      this.state = {
         customers: [],
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
      const { fetchCustomers, fetchEmployees } = this

      fetchCustomers()
      fetchEmployees()
   }

   fetchCustomers = async () => {
      const url = apiRoutes.khachHang.getAll
      const queries = { pageSize: 1000 }

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

   ///// METHODS FOR COMPUTING VALUES /////

   getAllCustomers = () => {
      const { customers } = this.state
      let allCustomers = [{ value: '', label: 'Tất cả' }]

      customers.forEach(customer => {
         allCustomers.push({
            value: customer['maKhachHang'],
            label: customer['tenKhachHang']
         })
      })

      return allCustomers
   }

   getAllEmployees = () => {
      const { employees } = this.state
      let allEmployees = [{ value: '', label: 'Tất cả' }]

      employees.forEach(employee => {
         allEmployees.push({
            value: employee['maNhanVien'],
            label: employee['tenNhanVien']
         })
      })

      return allEmployees
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllCustomers, getAllEmployees } = this

      const settings = {
         entity: hoaDonDichVu,
         api: apiRoutes.hoaDonDichVu,
         columns: [
            {
               text: 'Mã hóa đơn',
               propForValue: 'soHDDV',
               propForSorting: 'SoHDDV',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã hóa đơn'
               }
            },
            {
               text: 'Khách hàng',
               propForValue: 'khachHang.tenKhachHang',
               propForSorting: 'MaKhachHang',
               type: 'string',
               search: {
                  type: 'select',
                  values: getAllCustomers(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               }
            },
            {
               text: 'Nhân viên',
               propForValue: 'nhanVien.tenNhanVien',
               propForSorting: 'MaNhanVien',
               type: 'string',
               search: {
                  type: 'select',
                  values: getAllEmployees(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               }
            },
            {
               text: 'Thành tiền (VNĐ)',
               propForValue: 'thanhTien',
               propForSorting: 'ThanhTien',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100000000,
                  step: 1000000,
                  placeholder: 'Thành tiền'
               }
            },
            {
               text: 'Đã thanh toán (VNĐ)',
               propForValue: 'daThanhToan',
               propForSorting: 'DaThanhToan',
               type: 'number',
               search: {
                  type: 'slider',
                  min: 0,
                  max: 100000000,
                  step: 1000000,
                  placeholder: 'Đã thanh toán'
               }
            }
         ]
      }

      return <ForListPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default HoaDonDichVuForList
