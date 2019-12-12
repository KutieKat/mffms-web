///// KhachHang /////
import KhachHangForList from '../pages/KhachHang/KhachHangForList'
import KhachHangForView from '../pages/KhachHang/KhachHangForView'
import KhachHangForCreate from '../pages/KhachHang/KhachHangForCreate'
import KhachHangForUpdate from '../pages/KhachHang/KhachHangForUpdate'
import KhachHangForStats from '../pages/KhachHang/KhachHangForStats'

///// NhanVien /////
import NhanVienForList from '../pages/NhanVien/NhanVienForList'
import NhanVienForCreate from '../pages/NhanVien/NhanVienForCreate'
import NhanVienForView from '../pages/NhanVien/NhanVienForView'
import NhanVienForStats from '../pages/NhanVien/NhanVienForStats'

///// NhaCungCap /////
import NhaCungCapForList from '../pages/NhaCungCap/NhaCungCapForList'
import NhaCungCapForView from '../pages/NhaCungCap/NhaCungCapForView'
import NhaCungCapForCreate from '../pages/NhaCungCap/NhaCungCapForCreate'
import NhaCungCapForStats from '../pages/NhaCungCap/NhaCungCapForStats'

///// SanBong /////
import SanBongForList from '../pages/SanBong/SanBongForList'
import SanBongForView from '../pages/SanBong/SanBongForView'
import SanBongForCreate from '../pages/SanBong/SanBongForCreate'
import SanBongForStats from '../pages/SanBong/SanBongForStats'

///// DichVu /////
import DichVuForList from '../pages/DichVu/DichVuForList'
import DichVuForView from '../pages/DichVu/DichVuForView'
import DichVuForCreate from '../pages/DichVu/DichVuForCreate'

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
   {
      path: '/quan-ly/khach-hang/cap-nhat/:id',
      component: KhachHangForUpdate
   },
   {
      path: '/thong-ke/khach-hang',
      component: KhachHangForStats
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
   {
      path: '/thong-ke/nhan-vien',
      component: NhanVienForStats
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
   {
      path: '/thong-ke/nha-cung-cap',
      component: NhaCungCapForStats
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
   },
   {
      path: '/thong-ke/san-bong',
      component: SanBongForStats
   },

   ///// DichVu /////
   {
      path: '/quan-ly/dich-vu',
      component: DichVuForList,
      exact: true
   },
   {
      path: '/quan-ly/dich-vu/xem-thong-tin/:id',
      component: DichVuForView
   },
   {
      path: '/quan-ly/dich-vu/them-moi',
      component: DichVuForCreate
   }
]
