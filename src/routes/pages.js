// NhanVien
import KhachHangForList from "../components/KhachHang/KhachHangForList";
import NhanVienForList from "../components/NhanVien/NhanVienForList";

export default [
  {
    path: "/khach-hang",
    component: KhachHangForList,
    exact: true
  },
  {
    path: "/nhan-vien",
    component: NhanVienForList,
    exact: true
  }
];
