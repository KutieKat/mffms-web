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
               propForValue: 'employees',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng số nam nhân viên nói chung',
               propForValue: 'maleEmployees',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tống số nữ nhân viên nói chung',
               propForValue: 'femaleEmployees',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng số nhân viên quản lý',
               propForValue: 'managers',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng số nam quản lý',
               propForValue: 'maleManagers',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tống số nữ quản lý',
               propForValue: 'femaleManagers',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tống số nhân viên phục vụ',
               propForValue: 'servers',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tổng số nam phục vụ',
               propForValue: 'waiters',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Tống số nữ phục vụ',
               propForValue: 'waitresses',
               icon: 'fas fa-users',
               unit: 'Người'
            },
            {
               label: 'Mức lương thấp nhất nói chung',
               propForValue: 'lowestSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Mức lương cao nhất nói chung',
               propForValue: 'highestSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Mức lương thấp nhất của quản lý',
               propForValue: 'lowestManagerSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Mức lương cao nhất của quản lý',
               propForValue: 'highestManagerSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Mức lương thấp nhất của phục vụ',
               propForValue: 'lowestStaffSalary',
               icon: 'fas fa-dollar-sign',
               unit: 'VNĐ'
            },
            {
               label: 'Mức lương cao nhất của phục vụ',
               propForValue: 'highestStaffSalary',
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
