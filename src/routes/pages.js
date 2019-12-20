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
import NhanVienForUpdate from '../pages/NhanVien/NhanVienForUpdate'
import NhanVienForStats from '../pages/NhanVien/NhanVienForStats'

///// NhaCungCap /////
import NhaCungCapForList from '../pages/NhaCungCap/NhaCungCapForList'
import NhaCungCapForView from '../pages/NhaCungCap/NhaCungCapForView'
import NhaCungCapForCreate from '../pages/NhaCungCap/NhaCungCapForCreate'
import NhaCungCapForUpdate from '../pages/NhaCungCap/NhaCungCapForUpdate'
import NhaCungCapForStats from '../pages/NhaCungCap/NhaCungCapForStats'

///// SanBong /////
import SanBongForList from '../pages/SanBong/SanBongForList'
import SanBongForView from '../pages/SanBong/SanBongForView'
import SanBongForCreate from '../pages/SanBong/SanBongForCreate'
import SanBongForUpdate from '../pages/SanBong/SanBongForUpdate'
import SanBongForStats from '../pages/SanBong/SanBongForStats'

///// DichVu /////
import DichVuForList from '../pages/DichVu/DichVuForList'
import DichVuForView from '../pages/DichVu/DichVuForView'
import DichVuForCreate from '../pages/DichVu/DichVuForCreate'
import DichVuForUpdate from '../pages/DichVu/DichVuForUpdate'
import DichVuForStats from '../pages/DichVu/DichVuForStats'

///// TaiSanThietBi /////
import TaiSanThietBiForList from '../pages/TaiSanThietBi/TaiSanThietBiForList'
import TaiSanThietBiForView from '../pages/TaiSanThietBi/TaiSanThietBiForView'
import TaiSanThietBiForCreate from '../pages/TaiSanThietBi/TaiSanThietBiForCreate'
import TaiSanThietBiForUpdate from '../pages/TaiSanThietBi/TaiSanThietBiForUpdate'
import TaiSanThietBiForStats from '../pages/TaiSanThietBi/TaiSanThietBiForStats'

///// TaiKhoan /////
import TaiKhoanForList from '../pages/TaiKhoan/TaiKhoanForList'
import TaiKhoanForView from '../pages/TaiKhoan/TaiKhoanForView'
import TaiKhoanForCreate from '../pages/TaiKhoan/TaiKhoanForCreate'
import TaiKhoanForUpdate from '../pages/TaiKhoan/TaiKhoanForUpdate'
import TaiKhoanForUpdatePassword from '../pages/TaiKhoan/TaiKhoanForUpdatePassword'

///// NguoiDung /////
import NguoiDungForUpdate from '../pages/NguoiDung/NguoiDungForUpdate'
import NguoiDungForUpdatePassword from '../pages/NguoiDung/NguoiDungForUpdatePassword'

///// DonNhapHang /////
import DonNhapHangForCreate from '../pages/DonNhapHang/DonNhapHangForCreate'
import DonNhapHangForList from '../pages/DonNhapHang/DonNhapHangForList'
import DonNhapHangForView from '../pages/DonNhapHang/DonNhapHangForView'

///// HoaDonDichVu /////
import HoaDonDichVuForCreate from '../pages/HoaDonDichVu/HoaDonDichVuForCreate'
import HoaDonDichVuForList from '../pages/HoaDonDichVu/HoaDonDichVuForList'
import HoaDonDichVuForView from '../pages/HoaDonDichVu/HoaDonDichVuForView'

///// PhieuDatSan /////
import PhieuDatSanForCreate from '../pages/PhieuDatSan/PhieuDatSanForCreate'
import PhieuDatSanForList from '../pages/PhieuDatSan/PhieuDatSanForList'
import PhieuDatSanForView from '../pages/PhieuDatSan/PhieuDatSanForView'

///// CaiDat /////
import CaiDatForUpdate from '../pages/CaiDat/CaiDatForUpdate'
import ChartBoard from '../pages/ChartBoard'

export default [
   {
      path: '/',
      component: ChartBoard,
      exact: true
   },
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
      path: '/quan-ly/nhan-vien/cap-nhat/:id',
      component: NhanVienForUpdate
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
      path: '/quan-ly/nha-cung-cap/cap-nhat/:id',
      component: NhaCungCapForUpdate
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
      path: '/quan-ly/san-bong/cap-nhat/:id',
      component: SanBongForUpdate
   },
   {
      path: '/thong-ke/san-bong',
      component: SanBongForStats
   },

   ///// TaiSanThietBi /////
   {
      path: '/quan-ly/tai-san-thiet-bi',
      component: TaiSanThietBiForList,
      exact: true
   },
   {
      path: '/quan-ly/tai-san-thiet-bi/xem-thong-tin/:id',
      component: TaiSanThietBiForView
   },
   {
      path: '/quan-ly/tai-san-thiet-bi/them-moi',
      component: TaiSanThietBiForCreate
   },
   {
      path: '/quan-ly/tai-san-thiet-bi/cap-nhat/:id',
      component: TaiSanThietBiForUpdate
   },
   {
      path: '/thong-ke/tai-san-thiet-bi',
      component: TaiSanThietBiForStats
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
   },
   {
      path: '/quan-ly/dich-vu/cap-nhat/:id',
      component: DichVuForUpdate
   },
   {
      path: '/thong-ke/dich-vu',
      component: DichVuForStats
   },

   ///// TaiKhoan /////
   {
      path: '/quan-ly/tai-khoan',
      component: TaiKhoanForList,
      exact: true
   },
   {
      path: '/quan-ly/tai-khoan/xem-thong-tin/:id',
      component: TaiKhoanForView
   },
   {
      path: '/quan-ly/tai-khoan/them-moi',
      component: TaiKhoanForCreate
   },
   {
      path: '/quan-ly/tai-khoan/cap-nhat/:id',
      component: TaiKhoanForUpdate
   },
   {
      path: '/quan-ly/tai-khoan/thay-doi-mat-khau/:id',
      component: TaiKhoanForUpdatePassword
   },

   ///// NguoiDung /////
   {
      path: '/tai-khoan/cap-nhat/:id',
      component: NguoiDungForUpdate
   },
   {
      path: '/tai-khoan/thay-doi-mat-khau/:id',
      component: NguoiDungForUpdatePassword
   },

   ///// DonNhapHang /////
   {
      path: '/quan-ly/don-nhap-hang',
      component: DonNhapHangForList,
      exact: true
   },
   {
      path: '/quan-ly/don-nhap-hang/them-moi',
      component: DonNhapHangForCreate
   },
   {
      path: '/quan-ly/don-nhap-hang/xem-thong-tin/:id',
      component: DonNhapHangForView
   },

   ///// HoaDonDichVu /////
   {
      path: '/quan-ly/hoa-don-dich-vu',
      component: HoaDonDichVuForList,
      exact: true
   },
   {
      path: '/quan-ly/hoa-don-dich-vu/them-moi',
      component: HoaDonDichVuForCreate
   },
   {
      path: '/quan-ly/hoa-don-dich-vu/xem-thong-tin/:id',
      component: HoaDonDichVuForView
   },

   ///// PhieuDatSan /////
   {
      path: '/quan-ly/phieu-dat-san',
      component: PhieuDatSanForList,
      exact: true
   },
   {
      path: '/quan-ly/phieu-dat-san/them-moi',
      component: PhieuDatSanForCreate
   },
   {
      path: '/quan-ly/phieu-dat-san/xem-thong-tin/:id',
      component: PhieuDatSanForView
   },

   ///// CaiDat /////
   {
      path: '/he-thong/cai-dat',
      component: CaiDatForUpdate
   }
]
