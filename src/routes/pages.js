///// KhachHang /////
import KhachHangForList from '../pages/KhachHang/KhachHangForList'
import KhachHangForView from '../pages/KhachHang/KhachHangForView'
import KhachHangForCreate from '../pages/KhachHang/KhachHangForCreate'

///// NhanVien /////
import NhanVienForList from '../pages/NhanVien/NhanVienForList'
import NhanVienForCreate from '../pages/NhanVien/NhanVienForCreate'
import NhanVienForView from '../pages/NhanVien/NhanVienForView'

///// NhaCungCap /////
import NhaCungCapForList from '../pages/NhaCungCap/NhaCungCapForList'
import NhaCungCapForView from '../pages/NhaCungCap/NhaCungCapForView'
import NhaCungCapForCreate from '../pages/NhaCungCap/NhaCungCapForCreate'

///// SanBong /////
import SanBongForList from '../pages/SanBong/SanBongForList'
import SanBongForView from '../pages/SanBong/SanBongForView'
import SanBongForCreate from '../pages/SanBong/SanBongForCreate'

export default [
   ///// KhachHang /////
   {
      path: '/quan-ly/khach-hang',
      component: KhachHangForList,
      exact: true
   },
   {
      path: '/quan-ly/khach-hang/xem-thong-tin/:id',
      component: KhachHangForView
   },
   {
      path: '/quan-ly/khach-hang/them-moi',
      component: KhachHangForCreate
   },

   ///// NhanVien /////
   {
      path: '/quan-ly/nhan-vien',
      component: NhanVienForList,
      exact: true
   },
   {
      path: '/quan-ly/nhan-vien/xem-thong-tin/:id',
      component: NhanVienForView
   },
   {
      path: '/quan-ly/nhan-vien/them-moi',
      component: NhanVienForCreate
   },

   ///// NhaCungCap /////
   {
      path: '/quan-ly/nha-cung-cap',
      component: NhaCungCapForList,
      exact: true
   },
   {
      path: '/quan-ly/nha-cung-cap/xem-thong-tin/:id',
      component: NhaCungCapForView
   },
   {
      path: '/quan-ly/nha-cung-cap/them-moi',
      component: NhaCungCapForCreate
   },

   ///// SanBong /////
   {
      path: '/quan-ly/san-bong',
      component: SanBongForList,
      exact: true
   },
   {
      path: '/quan-ly/san-bong/xem-thong-tin/:id',
      component: SanBongForView
   },
   {
      path: '/quan-ly/san-bong/them-moi',
      component: SanBongForCreate
   }
]
