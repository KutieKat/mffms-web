const APP_SHORT_NAME = 'MFFMS'

const APP_NAME = 'Mini Football Management System'

const APP_DESCRIPTION =
   'Mini Football Management System - Hệ thống quản lý sân bóng đá mini'

const APP_ABOUT =
   'Đồ án môn học Phương pháp phát triển phần mềm hướng đối tượng (SE100.K16.PMCL)'

const PAGE_SIZES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000]

const GENDERS = [
   { value: 'Nam', text: 'Nam' },
   { value: 'Nữ', text: 'Nữ' }
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

export {
   APP_SHORT_NAME,
   APP_NAME,
   APP_DESCRIPTION,
   PAGE_SIZES,
   GENDERS,
   POSITIONS,
   ASSET_STATUSES
}
