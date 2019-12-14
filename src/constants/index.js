const APP_SHORT_NAME = 'MFFMS'

const APP_NAME = 'Mini Football Management System'

const APP_DESCRIPTION =
   'Mini Football Management System - Hệ thống quản lý sân bóng đá mini'

const APP_ABOUT =
   'Đồ án môn học Phương pháp phát triển phần mềm hướng đối tượng (SE100.K16.PMCL)'

const PAGE_SIZES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000]

const GENDERS_FOR_SEARCH = [
   { value: '', label: 'Tất cả' },
   { value: 'Nam', label: 'Nam' },
   { value: 'Nữ', label: 'Nữ' }
]

const GENDERS = [
   { value: 'Nam', label: 'Nam' },
   { value: 'Nữ', label: 'Nữ' }
]

const POSITIONS = [
   {
      value: 'CHU_SAN',
      text: 'Chủ sân'
   },
   {
      value: 'NGUOI_QUAN_LY',
      text: 'Người quản lý'
   },
   {
      value: 'NHAN_VIEN',
      text: 'Nhân viên'
   }
]

const ASSET_STATUSES = [
   {
      value: 0,
      text: 'Hoạt động tốt'
   },
   {
      value: 1,
      text: 'Đang sửa chữa'
   },
   {
      value: 2,
      text: 'Đang bảo hành'
   },
   {
      value: 3,
      text: 'Đã qua sử dụng'
   }
]

const PAYMENT_STATUSES = [
   {
      value: 0,
      text: 'Chưa thanh toán'
   },
   {
      value: 1,
      text: 'Đã thanh toán một phần'
   },
   {
      value: 2,
      text: 'Đã thanh toán xong'
   }
]

const STATS_TABS = [
   {
      value: 0,
      text: 'Từ trước đến nay'
   },
   {
      value: 1,
      text: 'Hôm nay'
   },
   {
      value: 2,
      text: 'Tuần này'
   },
   {
      value: 3,
      text: 'Tháng này'
   },
   {
      value: 4,
      text: 'Quý này'
   },
   {
      value: 5,
      text: 'Năm nay'
   },
   {
      value: 6,
      text: 'Tùy chọn'
   }
]

const SHORT_FETCHING_DATA_INTERVAL = 30000

const LONG_FETCHING_DATA_INTERVAL = 60000

export {
   APP_SHORT_NAME,
   APP_NAME,
   APP_DESCRIPTION,
   PAGE_SIZES,
   GENDERS,
   GENDERS_FOR_SEARCH,
   POSITIONS,
   ASSET_STATUSES,
   PAYMENT_STATUSES,
   STATS_TABS,
   LONG_FETCHING_DATA_INTERVAL,
   SHORT_FETCHING_DATA_INTERVAL
}
