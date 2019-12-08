const baseApi = 'http://localhost:5000/api'
const baseKhachHangApi = baseApi + '/KhachHang'
const baseNhanVienApi = baseApi + '/NhanVien'
const baseNhaCungCapApi = baseApi + '/NhaCungCap'
const baseSanBongApi = baseApi + '/SanBong'
const baseDichVuApi = baseApi + '/DichVu'
const baseCaiDatApi = baseApi + '/CaiDat'

export default {
   khachHang: {
      getAll: baseKhachHangApi + '/GetAll',
      getById: baseKhachHangApi + '/GetById',
      create: baseKhachHangApi + '/Create',
      createMultiple: baseKhachHangApi + '/CreateMultiple',
      updateById: baseKhachHangApi + '/UpdateById',
      permanentlyDeleteById: baseKhachHangApi + '/PermanentlyDeleteById'
   },
   nhanVien: {
      getAll: baseNhanVienApi + '/GetAll',
      getById: baseNhanVienApi + '/GetById',
      create: baseNhanVienApi + '/Create',
      createMultiple: baseNhanVienApi + '/CreateMultiple',
      updateById: baseNhanVienApi + '/UpdateById',
      permanentlyDeleteById: baseNhanVienApi + '/PermanentlyDeleteById'
   },
   nhaCungCap: {
      getAll: baseNhaCungCapApi + '/GetAll',
      getById: baseNhaCungCapApi + '/GetById',
      create: baseNhaCungCapApi + '/Create',
      createMultiple: baseNhaCungCapApi + '/CreateMultiple',
      updateById: baseNhaCungCapApi + '/UpdateById',
      permanentlyDeleteById: baseNhaCungCapApi + '/PermanentlyDeleteById'
   },
   sanBong: {
      getAll: baseSanBongApi + '/GetAll',
      getById: baseSanBongApi + '/GetById',
      create: baseSanBongApi + '/Create',
      createMultiple: baseSanBongApi + '/CreateMultiple',
      updateById: baseSanBongApi + '/UpdateById',
      permanentlyDeleteById: baseSanBongApi + '/PermanentlyDeleteById'
   },
   dichVu: {
      getAll: baseDichVuApi + '/GetAll',
      getById: baseDichVuApi + '/GetById',
      create: baseDichVuApi + '/Create',
      createMultiple: baseDichVuApi + '/CreateMultiple',
      updateById: baseDichVuApi + '/UpdateById',
      permanentlyDeleteById: baseDichVuApi + '/PermanentlyDeleteById'
   },
   caiDat: {
      getAll: baseCaiDatApi + '/GetAll',
      updateById: baseCaiDatApi + '/UpdateById',
      restore: baseCaiDatApi + '/Restore'
   }
}
