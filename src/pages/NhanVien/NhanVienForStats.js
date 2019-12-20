import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { nhanVien } from '../../entities'

class NhanVienForStats extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const settings = {
         entity: nhanVien,
         api: apiRoutes.nhanVien,
         cards: [
            {
               label: 'Tổng số nhân viên nói chung',
               propForValue: 'totalQuantity',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng lương nhân viên',
               propForValue: 'totalAllSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Tổng số nhân viên quản lý',
               propForValue: 'totalManageQuantity',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng lương cho nhân viên quản lý',
               propForValue: 'totalManageSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Lương trung bình cho nhân viên quản lý',
               propForValue: 'avgManageSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Lương thấp nhất cho nhân viên quản lý',
               propForValue: 'minManageSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Lương cao nhất cho nhân viên quản lý',
               propForValue: 'maxManageSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Tổng số lượng nhân viên phục vụ',
               propForValue: 'totalServiceQuantity',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng lương cho nhân viên phục vụ',
               propForValue: 'totalServiceSalary',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Lương trung bình cho nhân viên phục vụ',
               propForValue: 'avgServiceSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Lương thấp nhất cho nhân viên phục vụ',
               propForValue: 'minServiceSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Lương cao nhất cho nhân viên phục vụ',
               propForValue: 'maxServiceSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
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

export default NhanVienForStats
