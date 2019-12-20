import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewWithListPage'
import { hoaDonDichVu, chiTietHoaDonDichVu } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class HoaDonDichVuForView extends Component {
   constructor(props) {
      super(props)

      this.state = {
         services: []
      }
   }

   // ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   // ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchServices } = this

      fetchServices()
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

   // ///// METHODS FOR COMPUTING VALUES /////

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

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllServices } = this

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
               propForValue: 'khachHang.tenKhachHang',
               type: 'input'
            },
            {
               label: 'Nhân viên',
               propForValue: 'nhanVien.tenNhanVien',
               type: 'input'
            },
            {
               label: 'Ngày sử dụng',
               propForValue: 'ngaySuDung',
               type: 'date'
            },
            {
               label: 'Ngày lập hóa đơn',
               propForValue: 'ngayLap',
               type: 'date'
            },
            {
               label: 'Ghi chú',
               propForValue: 'ghiChu',
               type: 'textarea'
            },
            {
               label: 'Số tiền đã thanh toán (VNĐ)',
               propForValue: 'daThanhToan',
               type: 'number'
            },
            {
               label: 'Tình trạng',
               propForValue: 'tinhTrang',
               type: 'input'
            }
         ],
         details: {
            entity: chiTietHoaDonDichVu,
            api: apiRoutes.chiTietHoaDonDichVu,
            columns: [
               {
                  label: 'Dịch vụ',
                  propForValue: 'maDichVu',
                  type: 'select',
                  values: getAllServices(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               },
               {
                  label: 'Đơn giá (VNĐ)',
                  propForValue: 'donGia',
                  type: 'number'
               },
               {
                  label: 'Số lượng',
                  propForValue: 'soLuong',
                  type: 'number'
               },
               {
                  label: 'Thành tiền (VNĐ)',
                  propForValue: 'thanhTien',
                  type: 'number'
               }
            ]
         }
      }

      return <ForViewPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default HoaDonDichVuForView
