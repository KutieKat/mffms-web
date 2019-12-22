# mffms-web
:soccer: Website của hệ thống quản lý sân bóng đá mini (Mini Football Field Management System)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/KutieKat/mffms-web.svg?branch=master)](https://travis-ci.org/KutieKat/mffms-web)

## Giới thiệu
* **MFFMS** (Mini Football Field Management System) là hệ thống quản lý sân bóng đá mini trên nền tảng web. MFFMS hỗ trợ tin học hóa các chức năng nghiệp vụ cơ bản mà một sân bóng đá mini cần phải có.
* Repository này là phần front-end của hệ thống.

## Demo
![Snapshot](https://github.com/KutieKat/mffms-web/blob/master/snapshots/snapshot.png?raw=true)

## Các phân hệ chính
* Quản lý khách hàng
* Quản lý nhân viên
* Quản lý sân bóng
* Quản lý nhà cung cấp
* Quản lý đơn nhập hàng
* Quản lý tài sản thiết bị
* Quản lý phiếu đặt sân
* Quản lý dịch vụ
* Quản lý hóa đơn dịch vụ
* Quản lý người dùng
* Quản lý cài đặt
  
## Chức năng
* Tra cứu và tìm kiếm thông tin
* Thêm, xóa, sửa, xem thông tin chi tiết
* Xem số liệu thống kê theo khoảng thời gian cố định và tùy chọn
* Xem biểu đồ thống kê theo khoảng thời gian cố định và tùy chọn
* Xuất dữ liệu (danh sách, chi tiết, số liệu thống kê, biểu đồ) ra định dạng `*.xlsx` và `*.pdf`

## Chức năng dự kiến phát triển trong tương lai
* Nhập xuất dữ liệu từ file `*.json`, `*.csv`
* Cho phép kết nối với hệ thống tiếp nhận lịch đặt sân từ phía khách hàng

## Ngôn ngữ lập trình và công nghệ
* Ngôn ngữ: HTML, CSS, JavaScript
* Framework: ReactJS

## Môi trường phát triển
* NodeJS 10.15.3
* Microsoft Visual Code 1.41.1

## Cài đặt
* Tải và cài đặt [NodeJS](https://nodejs.org/en/).
* Trong command line, thực thi dòng lệnh sau:
```bash
> npm install -g yarn
```
* Clone repository mffms-web về máy thông qua dòng lệnh sau:
```bash
> git clone https://github.com/KutieKat/mffms-web
```
* Chạy command line trong thư mục vừa được clone về, thực thi dòng lệnh sau:
```bash
> yarn install
```
* Sau khi quá trình cài đặt hoàn tất, tiếp tục thực thi dòng lệnh sau:
```bash
> yarn start
```
* Sau khi quá trình biên dịch hoàn tất, truy cập vào địa chỉ `http://localhost:3000`.

## Thư viện
* [React](https://www.npmjs.com/package/react)
* [React DOM](https://www.npmjs.com/package/react-dom)
* [React Router DOM](https://www.npmjs.com/package/react-router-dom)
* [Redux](https://www.npmjs.com/package/redux)
* [React Redux](https://www.npmjs.com/package/react-redux)
* [React Countup](https://www.npmjs.com/package/react-countup)
* [React Date Range](https://www.npmjs.com/package/react-date-range)
* [React Time Picker](https://www.npmjs.com/package/react-time-picker)
* [React Select](https://www.npmjs.com/package/react-select)
* [RC Slider](https://www.npmjs.com/package/rc-slider)
* [React Notifications](https://www.npmjs.com/package/react-notifications)
* [Axios](https://www.npmjs.com/package/axios)
* [React ChartJS 2](https://www.npmjs.com/package/react-chartjs-2)
* [Clone Deep](https://www.npmjs.com/package/clone-deep)
* [Debounce](https://www.npmjs.com/package/debounce)
* [ExcelJS](https://www.npmjs.com/package/exceljs)
* [Export from JSON](https://www.npmjs.com/package/export-from-json)
* [File Saver](https://www.npmjs.com/package/file-saver)
* [Moment](https://www.npmjs.com/package/moment)

## Đội ngũ phát triển
* [Nguyễn Tiến Dũng](https://github.com/KutieKat) (16520259 - PMCL2016.1)
* [Nguyễn Việt Tiến](https://github.com/viettiennguyen029) (16521233 - PMCL2016.3)
* [Hồ Nguyễn Nhật Tiến](https://github.com/nhattienho1998) (16521218 - PMCL2016.3)
* [Dương Thạnh Tín](https://github.com/DuongThanhTin) (16521241 - PMCL2016.3)

## Giấy phép
* [MIT](https://github.com/KutieKat/mffms-web/blob/master/LICENSE)
