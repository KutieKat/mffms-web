// NhanVien
import KhachHangForList from '../pages/KhachHang/KhachHangForList'
import NhanVienForList from '../pages/NhanVien/NhanVienForList'

export default [
   {
      path: '/khach-hang',
      component: KhachHangForList,
      exact: true
   },
   {
      path: '/nhan-vien',
      component: NhanVienForList,
      exact: true
   }
]
