const APP_SHORT_NAME = 'MFFMS'

const APP_NAME = 'Mini Football Field Management System'

const APP_DESCRIPTION =
   'Mini Football Field Management System - Hệ thống quản lý sân bóng đá mini'

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
      value: 'Chủ sân',
      label: 'Chủ sân'
   },
   {
      value: 'Người quản lý',
      label: 'Người quản lý'
   },
   {
      value: 'Nhân viên',
      label: 'Nhân viên'
   }
]

const ASSET_STATUSES_FOR_SEARCH = [
   {
      value: '',
      label: 'Tất cả'
   },
   {
      value: 'Hoạt động tốt',
      label: 'Hoạt động tốt'
   },
   {
      value: 'Đang sửa chữa',
      label: 'Đang sửa chữa'
   },
   {
      value: 'Đang bảo hành',
      label: 'Đang bảo hành'
   },
   {
      value: 'Đã qua sử dụng',
      label: 'Đã qua sử dụng'
   }
]

const ASSET_STATUSES = [
   {
      value: 'Đang sử dụng',
      label: 'Đang sử dụng'
   },
   {
      value: 'Đang sửa chữa',
      label: 'Đang sửa chữa'
   },
   {
      value: 'Đang bảo hành',
      label: 'Đang bảo hành'
   },
   {
      value: 'Đã qua sử dụng',
      label: 'Đã qua sử dụng'
   },
   {
      value: 'Đã hư hỏng',
      label: 'Đã hư hỏng'
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

const ALPHABETS = [
   'A',
   'B',
   'C',
   'D',
   'E',
   'F',
   'G',
   'H',
   'I',
   'J',
   'K',
   'L',
   'M',
   'N',
   'O',
   'P',
   'Q',
   'R',
   'S',
   'T',
   'U',
   'V',
   'W',
   'X',
   'Y',
   'Z'
]

const ROLES_FOR_SEARCH = [
   {
      value: '',
      label: 'Tất cả'
   },
   {
      value: 'Chủ sân',
      label: 'Chủ sân'
   },
   {
      value: 'Người quản lý',
      label: 'Người quản lý'
   },
   {
      value: 'Nhân viên',
      label: 'Nhân viên'
   }
]

const ROLES = [
   {
      value: 'Chủ sân',
      label: 'Chủ sân'
   },
   {
      value: 'Người quản lý',
      label: 'Người quản lý'
   },
   {
      value: 'Nhân viên',
      label: 'Nhân viên'
   }
]

const SECTIONS_FOR_ROLES = [
   {
      role: 'Chủ sân',
      sections: ['Nghiệp vụ', 'Thống kê', 'Hệ thống']
   },
   {
      role: 'Người quản lý',
      sections: ['Nghiệp vụ']
   },
   {
      role: 'Quản trị viên',
      sections: ['Hệ thống']
   },
   {
      role: 'Nhân viên',
      sections: ['Nghiệp vụ']
   }
]

export {
   APP_SHORT_NAME,
   APP_NAME,
   APP_ABOUT,
   APP_DESCRIPTION,
   PAGE_SIZES,
   GENDERS,
   GENDERS_FOR_SEARCH,
   POSITIONS,
   ASSET_STATUSES,
   PAYMENT_STATUSES,
   STATS_TABS,
   LONG_FETCHING_DATA_INTERVAL,
   SHORT_FETCHING_DATA_INTERVAL,
   ALPHABETS,
   ASSET_STATUSES_FOR_SEARCH,
   ROLES_FOR_SEARCH,
   ROLES,
   SECTIONS_FOR_ROLES
}
