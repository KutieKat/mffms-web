import React, { Component } from 'react'
import ForViewPage from '../../components/ForViewWithListPage'
import { donNhapHang, chiTietDonNhapHang } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class DonNhapHangForView extends Component {
   constructor(props) {
      super(props)

      this.state = {
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
      const { getAllAssets } = this

      const settings = {
         entity: donNhapHang,
         api: apiRoutes.donNhapHang,
         fields: [
            {
               label: 'Mã đơn nhập hàng',
               type: 'input',
               propForValue: 'maDonNhapHang'
            },
            {
               label: 'Nhà cung cấp',
               propForValue: 'nhaCungCap.tenNhaCungCap',
               type: 'input'
            },
            {
               label: 'Nhân viên',
               propForValue: 'nhanVien.tenNhanVien',
               type: 'input'
            },
            {
               label: 'Ngày giao hàng',
               propForValue: 'ngayGiaoHang',
               type: 'date'
            },
            {
               label: 'Ngày lập đơn',
               propForValue: 'ngayLapDon',
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
            entity: chiTietDonNhapHang,
            api: apiRoutes.chiTietDonNhapHang,
            columns: [
               {
                  label: 'Tài sản thiết bị',
                  propForValue: 'maTSTB',
                  type: 'select',
                  values: getAllAssets(),
                  propForItemValue: 'value',
                  propForItemText: 'label'
               },
               {
                  label: 'Đơn giá (VNĐ)',
                  propForValue: 'donGia',
                  type: 'input'
               },
               {
                  label: 'Đơn vị tính',
                  propForValue: 'dvt',
                  type: 'input'
               },
               {
                  label: 'Số lượng',
                  propForValue: 'soLuong',
                  type: 'input'
               },
               {
                  label: 'Thành tiền (VNĐ)',
                  propForValue: 'thanhTien',
                  type: 'input'
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

export default DonNhapHangForView
