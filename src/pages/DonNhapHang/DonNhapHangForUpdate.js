import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdateWithListPage'
import { donNhapHang, chiTietDonNhapHang } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class DonNhapHangForUpdate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         providers: [],
         employees: [],
         assets: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchProviders, fetchEmployees, fetchAssets } = this

      fetchProviders()
      fetchEmployees()
      fetchAssets()
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

   fetchAssets = async () => {
      const url = apiRoutes.taiSanThietBi.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ assets: data })
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

      return allEmployees
   }

   getAllAssets = () => {
      const { assets } = this.state
      let allAssets = []

      assets.forEach(asset => {
         allAssets.push({
            value: asset['maTSTB'],
            label: asset['tenTSTB']
         })
      })

      return allAssets
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchAssets } = this

      fetchAssets()
   }

   fetchAssets = async () => {
      const url = apiRoutes.taiSanThietBi.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ assets: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllAssets = () => {
      const { assets } = this.state
      let allAssets = []

      assets.forEach(asset => {
         allAssets.push({
            value: asset['maTSTB'],
            label: asset['tenTSTB']
         })
      })

      return allAssets
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllProviders, getAllEmployees, getAllAssets } = this

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
            },
            {
               label: 'Ngày lập đơn',
               propForValue: 'ngayLap',
               placeholder: 'Nhập ngày lập đơn',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ngày lập đơn là thông tin bắt buộc và không được để trống!'
                  }
               ]
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               placeholder: 'Nhập ghi chú về đơn nhập hàng (nếu có)',
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
            entity: chiTietDonNhapHang,
            api: apiRoutes.chiTietDonNhapHang,
            columns: [
               {
                  label: 'Tài sản thiết bị',
                  propForValue: 'maTSTB',
                  type: 'select',
                  values: getAllAssets(),
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  affectedProps: ['donGia', 'thanhTien']
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
                  ],
                  affectedProps: ['thanhTien']
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
                  ],
                  affectedProps: ['thanhTien']
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

      return <ForUpdatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DonNhapHangForUpdate
