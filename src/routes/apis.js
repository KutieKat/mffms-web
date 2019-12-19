const baseApi = 'http://localhost:5000/api'
const baseKhachHangApi = baseApi + '/KhachHang'
const baseNhanVienApi = baseApi + '/NhanVien'
const baseNhaCungCapApi = baseApi + '/NhaCungCap'
const baseSanBongApi = baseApi + '/SanBong'
const baseDichVuApi = baseApi + '/DichVu'
const baseTaiSanThietBiApi = baseApi + '/TaiSanThietBi'
const baseCaiDatApi = baseApi + '/CaiDat'
const baseDonNhapHangApi = baseApi + '/DonNhapHang'
const baseTaiKhoanApi = baseApi + '/TaiKhoan'

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
      getAll: baseNhanVienApi + '/GetAll',
      getById: baseNhanVienApi + '/GetById',
      create: baseNhanVienApi + '/Create',
      createMultiple: baseNhanVienApi + '/CreateMultiple',
      updateById: baseNhanVienApi + '/UpdateById',
      deleteById: baseNhanVienApi + '/PermanentlyDeleteById'
   },
   nhaCungCap: {
      getAll: baseNhaCungCapApi + '/GetAll',
      getById: baseNhaCungCapApi + '/GetById',
      create: baseNhaCungCapApi + '/Create',
      createMultiple: baseNhaCungCapApi + '/CreateMultiple',
      updateById: baseNhaCungCapApi + '/UpdateById',
      deleteById: baseNhaCungCapApi + '/PermanentlyDeleteById'
   },
   sanBong: {
      getAll: baseSanBongApi + '/GetAll',
      getById: baseSanBongApi + '/GetById',
      create: baseSanBongApi + '/Create',
      createMultiple: baseSanBongApi + '/CreateMultiple',
      updateById: baseSanBongApi + '/UpdateById',
      deleteById: baseSanBongApi + '/PermanentlyDeleteById'
   },
   dichVu: {
      getAll: baseDichVuApi + '/GetAll',
      getById: baseDichVuApi + '/GetById',
      create: baseDichVuApi + '/Create',
      createMultiple: baseDichVuApi + '/CreateMultiple',
      updateById: baseDichVuApi + '/UpdateById',
      deleteById: baseDichVuApi + '/PermanentlyDeleteById'
   },
   taiSanThietBi: {
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
      create: baseDonNhapHangApi + '/Create'
   },
   caiDat: {
      getAll: baseCaiDatApi + '/GetAll',
      updateById: baseCaiDatApi + '/UpdateById',
      restore: baseCaiDatApi + '/Restore'
   }
}
