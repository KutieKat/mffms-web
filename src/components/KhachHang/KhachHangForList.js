import React, { Component } from "react";
import ForListPage from "../Shared/ForListPage";
import apiRoutes from "../../routes/apis";

class KhachHangForList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        id: "MaKhachHang",
        text: "Mã khách hàng",
        idForValue: "maKhachHang",
        isBold: true
      },
      {
        id: "HoVaTen",
        text: "Họ và tên",
        idForValue: "tenKhachHang"
      },
      {
        id: "GioiTinh",
        text: "Giới tính",
        idForValue: "gioiTinh"
      },
      {
        id: "NgaySinh",
        text: "Ngày sinh",
        idForValue: "ngaySinh",
        isDateTimeValue: true
      },
      {
        id: "SoDienThoai",
        text: "Số điện thoại",
        idForValue: "soDienThoai"
      }
    ];
  }

  ///// METHODS FOR RENDERING UI /////

  renderComponent = () => {
    const { columns } = this;

    return (
      <ForListPage
        entityName="khách hàng"
        entitySlug="khach-hang"
        api={apiRoutes.khachHang}
        columns={columns}
      />
    );
  };

  render() {
    const { renderComponent } = this;

    return renderComponent();
  }
}

export default KhachHangForList;
