const baseApi = 'http://localhost:5000/api'
const baseKhachHangApi = baseApi + '/KhachHang'
const baseNhanVienApi = baseApi + '/NhanVien'
const baseNhaCungCapApi = baseApi + '/NhaCungCap'
const baseSanBongApi = baseApi + '/SanBong'
const baseDichVuApi = baseApi + '/DichVu'
const baseTaiSanThietBiApi = baseApi + '/TaiSanThietBi'
const baseCaiDatApi = baseApi + '/CaiDat'
const baseTaiKhoanApi = baseApi + '/TaiKhoan'
const baseDonNhapHangApi = baseApi + '/DonNhapHang'
const baseChiTietDonNhapHangApi = baseApi + '/ChiTietDonNhapHang'
const baseHoaDonDichVuApi = baseApi + '/HoaDonDichVu'
const baseChiTietHoaDonDichVuApi = baseApi + '/ChiTietHDDV'
const basePhieuDatSanApi = baseApi + '/PhieuDatSan'
const baseChiTietPhieuDatSanApi = baseApi + '/ChiTietPhieuDatSan'
const baseThongKeApi = baseApi + '/ThongKe'

export default {
   khachHang: {
      getGeneralStats: baseKhachHangApi + '/GetGeneralStatistics',
      getAll: baseKhachHangApi + '/GetAll',
      getById: baseKhachHangApi + '/GetById',
      create: baseKhachHangApi + '/Create',
      createMultiple: baseKhachHangApi + '/CreateMultiple',
      updateById: baseKhachHangApi + '/UpdateById',
      deleteById: baseKhachHangApi + '/PermanentlyDeleteById'
   },
   nhanVien: {
      getGeneralStats: baseNhanVienApi + '/GetGeneralStatistics',
      getAll: baseNhanVienApi + '/GetAll',
      getById: baseNhanVienApi + '/GetById',
      create: baseNhanVienApi + '/Create',
      createMultiple: baseNhanVienApi + '/CreateMultiple',
      updateById: baseNhanVienApi + '/UpdateById',
      deleteById: baseNhanVienApi + '/PermanentlyDeleteById'
   },
   nhaCungCap: {
      getGeneralStats: baseNhaCungCapApi + '/GetGeneralStatistics',
      getAll: baseNhaCungCapApi + '/GetAll',
      getById: baseNhaCungCapApi + '/GetById',
      create: baseNhaCungCapApi + '/Create',
      createMultiple: baseNhaCungCapApi + '/CreateMultiple',
      updateById: baseNhaCungCapApi + '/UpdateById',
      deleteById: baseNhaCungCapApi + '/PermanentlyDeleteById'
   },
   sanBong: {
      getGeneralStats: baseSanBongApi + '/GetGeneralStatistics',
      getAll: baseSanBongApi + '/GetAll',
      getById: baseSanBongApi + '/GetById',
      create: baseSanBongApi + '/Create',
      createMultiple: baseSanBongApi + '/CreateMultiple',
      updateById: baseSanBongApi + '/UpdateById',
      deleteById: baseSanBongApi + '/PermanentlyDeleteById'
   },
   dichVu: {
      getGeneralStats: baseDichVuApi + '/GetGeneralStatistics',
      getAll: baseDichVuApi + '/GetAll',
      getById: baseDichVuApi + '/GetById',
      create: baseDichVuApi + '/Create',
      createMultiple: baseDichVuApi + '/CreateMultiple',
      updateById: baseDichVuApi + '/UpdateById',
      deleteById: baseDichVuApi + '/PermanentlyDeleteById'
   },
   taiSanThietBi: {
      getGeneralStats: baseTaiSanThietBiApi + '/GetGeneralStatistics',
      getAll: baseTaiSanThietBiApi + '/GetAll',
      getById: baseTaiSanThietBiApi + '/GetById',
      create: baseTaiSanThietBiApi + '/Create',
      createMultiple: baseTaiSanThietBiApi + '/CreateMultiple',
      updateById: baseTaiSanThietBiApi + '/UpdateById',
      deleteById: baseTaiSanThietBiApi + '/PermanentlyDeleteById'
   },
   taiKhoan: {
      getAll: baseTaiKhoanApi + '/GetAll',
      getById: baseTaiKhoanApi + '/GetById',
      create: baseTaiKhoanApi + '/Register',
      register: baseTaiKhoanApi + '/Register',
      login: baseTaiKhoanApi + '/Login',
      updateById: baseTaiKhoanApi + '/UpdateById',
      changePassword: baseTaiKhoanApi + '/ChangePassword',
      deleteById: baseTaiKhoanApi + '/PermanentlyDeleteById',
      resetPasswordById: baseTaiKhoanApi + '/ResetPassword',
      validateHash: baseTaiKhoanApi + '/ValidateHash'
   },
   donNhapHang: {
      getAll: baseDonNhapHangApi + '/GetAll',
      create: baseDonNhapHangApi + '/Create',
      getById: baseDonNhapHangApi + '/GetById',
      create: baseDonNhapHangApi + '/Create',
      deleteById: baseDonNhapHangApi + '/PermanentlyDeleteById'
   },
   chiTietDonNhapHang: {
      create: baseChiTietDonNhapHangApi + '/CreateMultiple'
   },
   hoaDonDichVu: {
      getGeneralStats: baseHoaDonDichVuApi + '/GetGeneralStatistics',
      getAll: baseHoaDonDichVuApi + '/GetAll',
      getById: baseHoaDonDichVuApi + '/GetById',
      create: baseHoaDonDichVuApi + '/Create',
      deleteById: baseHoaDonDichVuApi + '/PermanentlyDeleteById'
   },
   chiTietHoaDonDichVu: {
      create: baseChiTietHoaDonDichVuApi + '/CreateMultiple'
   },
   phieuDatSan: {
      getGeneralStats: basePhieuDatSanApi + '/GetGeneralStatistics',
      getAll: basePhieuDatSanApi + '/GetAll',
      create: basePhieuDatSanApi + '/Create',
      getById: basePhieuDatSanApi + '/GetById',
      create: basePhieuDatSanApi + '/Create',
      deleteById: basePhieuDatSanApi + '/PermanentlyDeleteById'
   },
   chiTietPhieuDatSan: {
      create: baseChiTietPhieuDatSanApi + '/CreateMultiple'
   },
   thongKe: {
      tongSoLuotDatSan: baseThongKeApi + '/TongSoLuotDatSan',
      tongTienDatSan: baseThongKeApi + '/TongTienDatSan',
      tongTienDichVu: baseThongKeApi + '/TongTienDichVu',
      tongTienNhapHang: baseThongKeApi + '/TongTienNhapHang'
   },
   caiDat: {
      getAll: baseCaiDatApi + '/GetAll',
      updateById: baseCaiDatApi + '/UpdateById',
      restore: baseCaiDatApi + '/Restore'
   }
}
