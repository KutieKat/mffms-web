import React, { Component, Fragment } from "react";
import moment from "moment";
import { formatDateString } from "../../utils";
import apiRoutes from "../../routes/apis";

class ForPrintPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        tenSanBong: "",
        diaChi: "",
        soDienThoai: ""
      }
    };
  }

  ///// METHODS FOR REACT LIFECYCLES /////

  componentDidMount() {
    const { fetchData } = this;

    fetchData();
  }

  ///// METHODS FOR INTERACTING WITH API /////

  fetchData = () => {
    const { fetchSettings } = this;

    fetchSettings();
  };

  fetchSettings = async () => {
    const url = apiRoutes.caiDat.getAll;

    try {
      const response = await axios.get(url);

      if (response && response.data.status === "SUCCESS") {
        const { data } = response.data.result;

        this.setState({
          settings: data
        });
      } else {
        throw new Error(response.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  ///// METHODS FOR RENDERING UI /////

  renderHeader = () => {
    const { renderTopHeader, renderMainHeader } = this;

    return (
      <div className="printing-page__header">
        {renderTopHeader()}
        {renderMainHeader()}
      </div>
    );
  };

  renderTopHeader = () => {
    const { renderTopHeaderLeft, renderTopHeaderRight } = this;

    return (
      <div className="printing-page__header-top">
        {renderTopHeaderLeft()}
        {renderTopHeaderRight()}
      </div>
    );
  };

  renderTopHeaderLeft = () => {
    const { settings } = this.state;

    return (
      <div className="print-page__header-top-left">
        <p>{settings.tenSanBong}</p>
        <p>{settings.diaChi}</p>
        <p>Điện thoại: {settings.soDienThoai}</p>
        <div className="print-page__splitter"></div>
      </div>
    );
  };

  renderTopHeaderRight = () => {
    return (
      <div className="printing-page__header-top-right">
        <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
        <p>Độc lập - Tự do - Hạnh phúc</p>
        <div className="print-page__splitter"></div>
      </div>
    );
  };

  renderMainHeader = () => {
    const { entityName } = this.props;

    return (
      <div className="printing-page__main">
        <h1 className="printing-page-title">
          DANH SÁCH {entityName} HIỆN CÓ TRONG HỆ THỐNG
        </h1>
        <h2 className="printing-page-subtitle">
          Mini Football Field Management System (MFFMS)
        </h2>
      </div>
    );
  };

  renderBody = () => {
    const { renderTable } = this;

    return <div className="printing-page__body">{renderTable()}</div>;
  };

  renderTable = () => {
    const { renderTableHeader, renderTableBody } = this;

    return (
      <table className="printing-page-table">
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    );
  };

  renderTableHeader = () => {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.id}>STT</th>
          ))}
        </tr>
      </thead>
    );
  };

  renderTableBody = () => {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.length > 0 &&
          data.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {columns.map(column => (
                <td>
                  {column.isDateTimeValue
                    ? formatDateString(record[column.idForValue])
                    : record[column.idForValue]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
  };

  renderFooter = () => {
    const { renderTopFooter, renderMainFooter } = this;

    return (
      <div className="printing-page__footer">
        {renderTopFooter()}
        {renderMainFooter()}
      </div>
    );
  };

  renderTopFooter = () => {
    const { renderTopFooterLeft, renderTopFooterRight } = this;

    return (
      <div className="printing-page__footer-top">
        {renderTopFooterLeft()}
        {renderTopFooterRight()}
      </div>
    );
  };

  renderTopFooterLeft = () => {
    const { data } = this.props;

    return (
      <div className="printing-page__footer-top-left">
        <p>Danh sách có tất cả {data.length} kết quả</p>
      </div>
    );
  };

  renderTopFooterRight = () => {
    return (
      <div className="printing-page__footer-top-right">
        <p>
          Thành phố Hồ Chí Minh, ngày {moment().format("DD")} tháng{" "}
          {moment().format("MM")} năm {moment().format("YYYY")}
        </p>
      </div>
    );
  };

  renderMainFooter = () => {
    return (
      <div className="printing-page__footer-main">
        <div className="printing-page__footer-main-left">
          <p className="printing-page__job-title">NGƯỜI DUYỆT</p>
          <p className="printing-page__signature">(Ký và ghi rõ họ tên)</p>
        </div>

        <div className="printing-page__footer-main-center"></div>

        <div className="printing-page__footer-main-right">
          <p className="printing-page__job-title">NGƯỜI LẬP</p>
          <p className="printing-page__signature">(Ký và ghi rõ họ tên)</p>
        </div>
      </div>
    );
  };

  renderComponent = () => {
    const { renderHeader, renderBody, renderFooter } = this;

    return (
      <Fragment>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </Fragment>
    );
  };

  render() {
    const { renderComponent } = this;

    return renderComponent();
  }
}

export default ForPrintPage;
