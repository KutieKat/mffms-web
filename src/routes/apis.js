const baseApi = "http://localhost:5000/api";
const baseKhachHangApi = baseApi + "/KhachHang";
const baseNhanVienApi = baseApi + "/NhanVien";
const baseCaiDatApi = baseApi + "/CaiDat";

export default {
  khachHang: {
    getAll: baseKhachHangApi + "/GetAll",
    getById: baseKhachHangApi + "/GetById",
    create: baseKhachHangApi + "/Create",
    createMultiple: baseKhachHangApi + "/CreateMultiple",
    updateById: baseKhachHangApi + "/UpdateById",
    temporarilyDeleteById: baseKhachHangApi + "/TemporarilyDeleteById",
    permanentlyDeleteById: baseKhachHangApi + "/PermanentlyDeleteById",
    restoreById: baseKhachHangApi + "/RestoreById"
  },
  nhanVien: {
    getAll: baseNhanVienApi + "/GetAll",
    getById: baseNhanVienApi + "/GetById",
    create: baseNhanVienApi + "/Create",
    createMultiple: baseNhanVienApi + "/CreateMultiple",
    updateById: baseNhanVienApi + "/UpdateById",
    temporarilyDeleteById: baseNhanVienApi + "/TemporarilyDeleteById",
    permanentlyDeleteById: baseNhanVienApi + "/PermanentlyDeleteById",
    restoreById: baseNhanVienApi + "/RestoreById"
  },
  caiDat: {
    getAll: baseCaiDatApi + "/GetAll",
    updateById: baseCaiDatApi + "/UpdateById",
    restore: baseCaiDatApi + "/Restore"
  }
};
