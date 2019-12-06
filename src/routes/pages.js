///// KhachHang /////
import KhachHangForList from '../pages/KhachHang/KhachHangForList'
import KhachHangForView from '../pages/KhachHang/KhachHangForView'
import KhachHangForCreate from '../pages/KhachHang/KhachHangForCreate'

///// NhanVien /////
import NhanVienForList from '../pages/NhanVien/NhanVienForList'

export default [
   ///// KhachHang /////
   {
      path: '/khach-hang',
      component: KhachHangForList,
      exact: true
   },
   {
      path: '/khach-hang/xem-thong-tin/:id',
      component: KhachHangForView
   },
   {
      path: '/khach-hang/them-moi',
      component: KhachHangForCreate
   },
   ///// NhanVien /////
   {
      path: '/nhan-vien',
      component: NhanVienForList,
      exact: true
   }
]
