import React, { Component } from 'react'
import ForListPage from '../../components/ForListPage'
import apiRoutes from '../../routes/apis'
import { donNhapHang } from '../../entities'
import { apiGet } from '../../utils'

class DonNhapHangForList extends Component {
   constructor(props) {
      super(props)

      this.state = {
         customers: [],
         employees: [],
         providers: []
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

   ///// METHODS FOR COMPUTING VALUES /////

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

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllEmployees, getAllProviders } = this

      const settings = {
         entity: donNhapHang,
         api: apiRoutes.donNhapHang,
         columns: [
            {
               text: 'Mã đơn nhập hàng',
               propForValue: 'maDonNhapHang',
               propForSorting: 'MaDonNhapHang',
               isBold: true,
               type: 'string',
               search: {
                  type: 'input',
                  placeholder: 'Mã đơn nhập hàng'
               }
            },
            {
               text: 'Nhà cung cấp',
               propForValue: 'nhaCungCap.tenNhaCungCap',
               propForSorting: 'MaNhaCungCap',
               type: 'string',
               search: {
                  type: 'select',
                  values: getAllProviders(),
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

export default DonNhapHangForList
