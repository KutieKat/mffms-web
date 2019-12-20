import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { phieuDatSan } from '../../entities'

class PhieuDatSanForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: phieuDatSan,
         api: apiRoutes.phieuDatSan,
         cards: [
            {
               label: 'Tổng số phiếu đặt sân',
               propForValue: 'totalPhieuDatSan',
               icon: 'fas fa-calendar-alt',
               unit: 'Phiếu'
            },
            {
               label: 'Khách hàng đặt sân nhiều nhất',
               propForValue: 'datSanNhieuNhat.tenKhachHang',
               icon: 'fas fa-calendar-alt',
               unit: 'Khách hàng'
            },
            {
               label: 'Nhân viên tiếp nhận đặt sân nhiều nhất',
               propForValue: 'tiepNhanDatSanNhieuNhat.tenNhanVien',
               icon: 'fas fa-calendar-alt',
               unit: 'Nhân viên'
            },
            {
               label: 'Sân bóng được đặt nhiều nhất',
               propForValue: 'duocDatNhieuNhat.tenSanBong',
               icon: 'fas fa-calendar-alt',
               unit: 'Sân bóng'
            }
         ]
      }

      return <ForStatsPage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default PhieuDatSanForStats
