import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Section from './Section'
import { PAGE_SIZES, SHORT_FETCHING_DATA_INTERVAL } from '../constants'
import {
   formatDateString,
   scrollTop,
   numberWithCommas,
   apiGet,
   print,
   getColumnsOrdinates,
   deepGet
} from '../utils'
import axios from 'axios'
import { debounce } from 'debounce'
import LoadingIndicator from './LoadingIndicator'
import DeleteDialog from './DeleteDialog'
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range'
import Dialog from './Dialog'
import moment from 'moment'
import exportFromJSON from 'export-from-json'
import ForListPrintPage from './ForListPrintPage'
import ExportReportDialog from './ExportReportDialog'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { excelFormat } from '../utils'
import apiRoutes from '../routes/apis'
import ResetPasswordDialog from './ResetPasswordDialog'

const Slider = require('rc-slider')
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

const customStyles = {
   control: () => ({
      border: '2px solid #edf0f5',
      display: 'flex',
      fontWeight: 'normal',
      paddingTop: '3px',
      paddingBottom: '2px'
   })
}

class ForAccountListPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         data: [],
         keyword: '',
         status: 0,
         statusStats: {
            all: 0,
            active: 0,
            inactive: 0
         },
         totalPages: 1,
         totalItems: 0,
         pageSize: 10,
         pageNumber: 1,
         sortField: 'ThoiGianTao',
         sortOrder: 'DESC',
         hasNextPage: false,
         searchData: null,
         loading: true,
         loadingTableData: false,
         showDeleteDialog: false,
         recordToDelete: '',
         recordToReset: '',
         showDateRangePicker: false,
         activeDateRangePicker: '',
         showExportReportDialog: false,
         showResetPasswordDialog: false,
         settingsData: {
            tenSanBong: '',
            diaChi: '',
            diaChiTrenPhieu: '',
            soDienThoai: '',
            fax: ''
         }
      }

      this.fetchData = debounce(this.fetchData, 50)
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeSearchData } = this
      const searchData = initializeSearchData()

      this.setState({ searchData })
   }

   componentDidMount() {
      const { fetchData, fetchSettingsData } = this

      scrollTop()
      fetchData()
      fetchSettingsData()
   }

   componentWillUnmount() {
      if (this.fetchingDataInterval) {
         clearInterval(this.fetchingDataInterval)
      }
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchSettingsData = async () => {
      const caiDat = { apiRoutes }
      const url = caiDat.getAll

      try {
         const response = await apiGet(url)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({
               settingsData: data
            })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   formRequestParams = () => {
      const { searchData } = this.state
      const params = {}
      const { sortField, sortOrder, pageNumber, pageSize, status } = this.state

      params['sortField'] = sortField
      params['sortOrder'] = sortOrder
      params['pageNumber'] = pageNumber
      params['pageSize'] = pageSize
      params['trangThai'] = status

      Object.keys(searchData).forEach(key => {
         if (searchData[key] !== undefined) {
            if (key.includes('date_')) {
               params[key.replace('date_', '')] = moment(
                  searchData[key]
               ).format('YYYY-MM-DD')
            } else if (key.includes('range_')) {
               params[key.replace('range_', '')] = searchData[key]
            } else {
               params[key] = searchData[key]
            }
         }
      })

      return params
   }

   fetchDataByInterval = () => {
      const { fetchData, fetchingDataInterval } = this

      if (fetchingDataInterval === undefined) {
         this.fetchingDataInterval = setInterval(
            fetchData,
            SHORT_FETCHING_DATA_INTERVAL
         )
      }
   }

   fetchData = async (isFirstLoad = true) => {
      const { formRequestParams, fetchDataByInterval } = this
      const { settings } = this.props
      const { api } = settings
      const url = api.getAll
      const params = formRequestParams()

      try {
         const response = await apiGet(url, { params })

         if (response && response.data.status === 'SUCCESS') {
            const {
               data,
               totalItems,
               totalPages,
               statusStatistics
            } = response.data.result

            if (isFirstLoad) {
               this.setState(
                  {
                     totalItems,
                     totalPages,
                     data,
                     statusStatistics,
                     loading: false
                  },
                  fetchDataByInterval
               )
            } else {
               this.setState(
                  {
                     totalItems,
                     totalPages,
                     data,
                     statusStatistics,
                     loadingTableData: false
                  },
                  fetchDataByInterval
               )
            }
         } else {
            this.setState({ loading: false }, fetchDataByInterval)

            throw new Error(response.errors)
         }
      } catch (error) {
         this.setState({ loading: false }, fetchDataByInterval)

         console.error(error)
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   toggleDateRangePicker = propName => {
      const state = { ...this.state }
      const showDateRangePicker = state['showDateRangePicker']

      if (showDateRangePicker) {
         state['showDateRangePicker'] = false
         state['activeDateRangePicker'] = ''
      } else {
         state['showDateRangePicker'] = true
         state['searchData']['date_' + propName + 'BatDau'] = new Date()
         state['searchData']['date_' + propName + 'KetThuc'] = new Date()
         state['activeDateRangePicker'] = propName
      }

      this.setState({ ...state })
   }

   changeDateRange = selectedOption => {
      const { fetchData } = this
      const state = { ...this.state }
      const activeDateRangePicker = state['activeDateRangePicker']
      const { range1 } = selectedOption
      const { startDate, endDate } = range1

      state['searchData'][
         'date_' + activeDateRangePicker + 'BatDau'
      ] = startDate
      state['searchData']['date_' + activeDateRangePicker + 'KetThuc'] = endDate
      state['showDateRangePicker'] = false
      state['activeDateRangePicker'] = ''

      this.setState({ ...state }, () => {
         fetchData(false)
      })
   }

   changeKeyword = e => {
      const { fetchData } = this
      const keyword = e.target.value

      this.setState({ keyword }, fetchData)
   }

   changeStatus = status => {
      this.setState({ status })
   }

   changePageSize = e => {
      const { fetchData } = this
      const pageSize = parseInt(e.target.value)

      this.setState({ pageSize, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   changePageNumber = e => {
      const { fetchData } = this
      const pageNumber = parseInt(e.target.value)

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   showPrevPage = () => {
      const { fetchData } = this
      let { pageNumber } = this.state

      if (pageNumber > 1) {
         pageNumber--
      }

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   showNextPage = () => {
      const { fetchData } = this
      let { pageNumber, totalPages } = this.state

      if (pageNumber < totalPages) {
         pageNumber++
      }

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   sortByColumn = columnName => {
      const { fetchData } = this
      let { sortField, sortOrder } = this.state

      if (sortField !== columnName) {
         sortField = columnName
         sortOrder = 'ASC'
      } else {
         if (sortOrder === 'ASC') {
            sortOrder = 'DESC'
         } else {
            sortOrder = 'ASC'
         }
      }

      this.setState({ sortField, sortOrder, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   changeSearchData = (value, fieldName) => {
      const { fetchData } = this
      const { searchData } = this.state

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      searchData[fieldName] = value

      this.setState({ searchData, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   refresh = () => {
      const { fetchData } = this

      this.setState(
         {
            sortField: 'ThoiGianTao',
            sortOrder: 'DESC',
            pageNumber: 1,
            pageSize: 10,
            keyword: '',
            status: 0,
            loading: true
         },
         fetchData
      )
   }

   resetSearchData = () => {
      const { initializeSearchData, fetchData } = this
      const searchData = initializeSearchData()

      this.setState({ searchData }, () => {
         fetchData(false)
      })
   }

   importData = () => {}

   exportData = async () => {
      const { data } = this.state
      const { settings } = this.props
      const { entity } = settings
      const { slug } = entity
      const fileName = `${slug}-${moment().format('DDMMYYYY')}`
      const exportType = 'json'

      await exportFromJSON({ data, fileName, exportType })
   }

   exportReport = () => {}

   toggleShowResetPasswordDialog = () => {
      const { showResetPasswordDialog } = this.state

      this.setState({ showResetPasswordDialog: !showResetPasswordDialog })
   }

   toggleShowDeleteDialog = () => {
      const { showDeleteDialog } = this.state

      this.setState({ showDeleteDialog: !showDeleteDialog })
   }

   resetPasswordById = recordId => {
      const { toggleShowResetPasswordDialog } = this
      const recordToReset = recordId

      this.setState({ recordToReset }, toggleShowResetPasswordDialog)
   }

   deleteById = recordId => {
      const { toggleShowDeleteDialog } = this
      const recordToDelete = recordId

      this.setState({ recordToDelete }, toggleShowDeleteDialog)
   }

   deleteByIdOnSuccess = () => {
      const { toggleShowDeleteDialog, refresh } = this

      toggleShowDeleteDialog()
      refresh()
   }

   resetPasswordByIdOnSuccess = () => {
      const { toggleShowResetPasswordDialog, refresh } = this

      toggleShowResetPasswordDialog()
      refresh()
   }

   toggleExportReportDialog = () => {
      const { showExportReportDialog } = this.state

      this.setState({ showExportReportDialog: !showExportReportDialog })
   }

   exportToXlsx = () => {
      const { showSuccessNotification, getCellValue } = this
      const { data, settingsData } = this.state
      const {
         tenSanBong,
         diaChi,
         soDienThoai,
         diaChiTrenPhieu,
         fax
      } = settingsData
      const { settings } = this.props
      const { entity, columns } = settings
      const { name, slug } = entity
      const fileName = `danh-sach-${slug}-${moment().format('DDMMYYYY')}`
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet(moment().format('DD-MM-YYYY'), {
         pageSetup: { fitToPage: true, orientation: 'portrait' }
      })
      let currentRowCount = 7

      workbook.Props = {
         Title: fileName,
         Subject: `Danh sách ${name} trong hệ thống`,
         Author: 'MFFMS',
         CreatedDate: moment()
      }

      worksheet.mergeCells('A1:G1')
      worksheet.getCell('A1').value = tenSanBong
      worksheet.getCell('A1').font = excelFormat.boldFont

      worksheet.mergeCells('A2:G2')
      worksheet.getCell('A2').value = diaChi
      worksheet.getCell('A2').font = excelFormat.boldFont

      worksheet.mergeCells('A3:G3')
      worksheet.getCell(
         'A3'
      ).value = `Số điện thoại: ${soDienThoai} - Fax: ${fax}`
      worksheet.getCell('A3').font = excelFormat.boldFont

      worksheet.mergeCells('A5:P5')
      worksheet.getCell(
         'P5'
      ).value = `DANH SÁCH ${name.toUpperCase()} TRONG HỆ THỐNG`
      worksheet.getCell('P5').font = { ...excelFormat.boldFont, size: 18 }
      worksheet.getCell('P5').alignment = excelFormat.center

      worksheet.mergeCells('A7:A7')
      worksheet.getCell('A7').value = 'STT'
      worksheet.getCell('A7').font = excelFormat.boldFont
      worksheet.getCell('A7').alignment = excelFormat.center
      worksheet.getCell('A7').border = excelFormat.border

      getColumnsOrdinates('B', 'P', columns.length, currentRowCount).forEach(
         (columnOrdinate, index) => {
            const { text } = columns[index]
            const cellOrdinate = columnOrdinate.split(':')[0]

            worksheet.mergeCells(columnOrdinate)
            worksheet.getCell(cellOrdinate).value = text
            worksheet.getCell(cellOrdinate).alignment = excelFormat.center
            worksheet.getCell(cellOrdinate).font = excelFormat.boldFont
            worksheet.getCell(cellOrdinate).border = excelFormat.border
         }
      )

      currentRowCount += 1

      data.forEach((record, recordIndex) => {
         const columnOrdinates = getColumnsOrdinates(
            'B',
            'P',
            columns.length,
            currentRowCount
         )

         ;['', ...columns].forEach((column, index) => {
            if (index === 0) {
               worksheet.mergeCells(`A${currentRowCount}:A${currentRowCount}`)
               worksheet.getCell(`A${currentRowCount}`).value = recordIndex + 1
               worksheet.getCell(`A${currentRowCount}`).font =
                  excelFormat.boldFont
               worksheet.getCell(`A${currentRowCount}`).alignment =
                  excelFormat.center
               worksheet.getCell(`A${currentRowCount}`).border =
                  excelFormat.border
            } else {
               const columnOrdinate = columnOrdinates[index - 1]
               const cellOrdinate = columnOrdinate.split(':')[0]
               worksheet.mergeCells(columnOrdinate)
               worksheet.getCell(cellOrdinate).value = getCellValue(
                  column,
                  record
               )
               worksheet.getCell(cellOrdinate).alignment = excelFormat.center
               worksheet.getCell(cellOrdinate).font = excelFormat.normalFont
               worksheet.getCell(cellOrdinate).border = excelFormat.border
            }
         })

         currentRowCount += 1
      })

      worksheet.mergeCells(
         'A' + (currentRowCount + 2) + ':G' + (currentRowCount + 2)
      )
      worksheet.getCell(
         'A' + (currentRowCount + 2)
      ).value = `Danh sách có tất cả ${data.length} kết quả`
      worksheet.getCell('A' + (currentRowCount + 2)).font =
         excelFormat.italicFont
      worksheet.getCell('A' + (currentRowCount + 2)).alignment =
         excelFormat.left

      worksheet.mergeCells(
         'J' + (currentRowCount + 2) + ':P' + (currentRowCount + 2)
      )
      worksheet.getCell(
         'J' + (currentRowCount + 2)
      ).value = `${diaChiTrenPhieu}, ngày ${moment().format(
         'DD'
      )} tháng ${moment().format('MM')} năm ${moment().format('YYYY')}`
      worksheet.getCell('J' + (currentRowCount + 2)).font =
         excelFormat.italicFont
      worksheet.getCell('J' + (currentRowCount + 2)).alignment =
         excelFormat.right

      worksheet.mergeCells(
         'B' + (currentRowCount + 4) + ':D' + (currentRowCount + 4)
      )
      worksheet.getCell('B' + (currentRowCount + 4)).value = `NGƯỜI DUYỆT`
      worksheet.getCell('B' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('B' + (currentRowCount + 4)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'M' + (currentRowCount + 4) + ':O' + (currentRowCount + 4)
      )
      worksheet.getCell('M' + (currentRowCount + 4)).value = `NGƯỜI LẬP`
      worksheet.getCell('M' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('M' + (currentRowCount + 4)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'A' + (currentRowCount + 5) + ':E' + (currentRowCount + 5)
      )
      worksheet.getCell(
         'A' + (currentRowCount + 5)
      ).value = `(Ký và ghi rõ họ tên)`
      worksheet.getCell('A' + (currentRowCount + 5)).font =
         excelFormat.italicFont
      worksheet.getCell('A' + (currentRowCount + 5)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'L' + (currentRowCount + 5) + ':P' + (currentRowCount + 5)
      )
      worksheet.getCell(
         'L' + (currentRowCount + 5)
      ).value = `(Ký và ghi rõ họ tên)`
      worksheet.getCell('L' + (currentRowCount + 5)).font =
         excelFormat.italicFont
      worksheet.getCell('L' + (currentRowCount + 5)).alignment =
         excelFormat.center

      workbook.xlsx.writeBuffer().then(function(data) {
         var blob = new Blob([data], {
            type:
               'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
         })
         saveAs(blob, fileName)
      })

      showSuccessNotification()
   }

   exportToPdf = () => {
      const { showSuccessNotification } = this

      print()
      showSuccessNotification()
   }

   ///// METHODS FOR CHECKING VALUES /////

   isBeingSorted = columnName => {
      const { sortField } = this.state

      return sortField === columnName
   }

   ///// METHODS FOR COMPUTING VALUES /////

   initializeSearchData = () => {
      const { settings } = this.props
      const { columns } = settings
      let searchData = {}

      columns.forEach(field => {
         const { search, propForValue } = field
         const { type, min, max } = search

         switch (type) {
            case 'input': {
               searchData[propForValue] = ''
               break
            }

            case 'date': {
               searchData['date_' + propForValue + 'BatDau'] = undefined
               searchData['date_' + propForValue + 'KetThuc'] = undefined
               break
            }

            case 'select': {
               const { values, propForItemValue } = search
               searchData[propForValue] =
                  values[0] && values[0][propForItemValue]
               break
            }

            case 'slider': {
               searchData['range_' + propForValue + 'BatDau'] = min
               searchData['range_' + propForValue + 'KetThuc'] = max
               break
            }
         }
      })

      return searchData
   }

   // getCellValue = (column, value) => {
   //    const { type, propForValue } = column

   //    if (value !== '' && value !== undefined) {
   //       switch (type) {
   //          case 'string': {
   //             return value[propForValue]
   //          }

   //          case 'date': {
   //             return formatDateString(value[propForValue])
   //          }

   //          default: {
   //             return value[propForValue]
   //          }
   //       }
   //    } else {
   //       return '(Chưa có dữ liệu)'
   //    }
   // }

   getPageNumbers = () => {
      const { totalPages } = this.state
      let pageNumbers = []

      for (let i = 1; i <= totalPages; i++) {
         pageNumbers.push(i)
      }

      return pageNumbers
   }

   getCurrentStatusColors = statusCode => {
      switch (parseInt(statusCode)) {
         case -1:
            return {
               backgroundColor: 'lightgray',
               color: 'gray'
            }

         case 1:
            return {
               backgroundColor: '#0BBE51',
               color: '#fff'
            }
      }
   }

   getCurrentStatusText = statusCode => {
      switch (parseInt(statusCode)) {
         case -1:
            return 'Đã bị xóa'

         case 1:
            return 'Đang hiển thị'
      }
   }

   getDateRangePickerValue = (propName, defaultValue = '') => {
      const { searchData } = this.state
      const startDate = searchData['date_' + propName + 'BatDau']
      const endDate = searchData['date_' + propName + 'KetThuc']

      if (startDate === undefined && endDate === undefined) {
         return defaultValue
      } else {
         const value = `${formatDateString(startDate)} - ${formatDateString(
            endDate
         )}`

         return value
      }
   }

   getCellValue = (column, record) => {
      const { type, propForValue } = column
      const value = deepGet(record, propForValue)

      switch (type) {
         case 'date': {
            return formatDateString(value)
         }

         case 'number': {
            return numberWithCommas(value)
         }

         case 'string': {
            return value
         }

         default: {
            return value
         }
      }
   }

   ///// METHODS FOR RENDERING UI /////

   showSuccessNotification = () => {
      const { showNotification } = this.props

      showNotification('success', 'Xuất báo cáo thành công!')
   }

   showErrorNotification = () => {
      const { showNotification } = this.props

      showNotification('error', 'Xuất báo cáo thất bại!')
   }

   renderHeader = () => {
      const { settings } = this.props
      const { entity } = settings
      const { name, slug } = entity

      return (
         <section className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (GTMS)</Link>
            </span>

            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>

            <span className="breadcrumb-active">
               <Link to="#">Quản lý {name}</Link>
            </span>
         </section>
      )
   }

   renderSectionHeaderRight = () => {
      const { refresh, importData, exportData, toggleExportReportDialog } = this
      const { data } = this.state
      const { settings } = this.props
      const { entity, exportable = true } = settings
      const { slug } = entity

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            <span className="button">
               <Link to={`/quan-ly/${slug}/them-moi`}>
                  <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Thêm mới
               </Link>
            </span>

            {/* {data.length !== 0 && (
               <span className="button" onClick={exportData}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất dữ liệu
               </span>
            )} */}

            {/* <span className="button" onClick={importData}>
               <i className="fas fa-file-import"></i>&nbsp;&nbsp;Nhập dữ liệu
            </span> */}

            {exportable && data.length !== 0 && (
               <span className="button" onClick={toggleExportReportDialog}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất báo cáo
               </span>
            )}
         </Fragment>
      )
   }

   renderBody = () => {
      const { renderSectionHeaderRight, renderTable, renderPagination } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const section = {
         title: `Danh sách ${name}`,
         subtitle: `Danh sách tất cả các ${name} hiện đang được quản lý`,
         headerRight: renderSectionHeaderRight()
      }

      return (
         <Section section={section}>
            {renderTable()}
            {renderPagination()}
         </Section>
      )
   }

   // renderToolbar = () => {
   //    const { changeKeyword, changeStatus } = this
   //    const { keyword, status, statusStats } = this.state

   //    return (
   //       <div className="section-body-toolbar">
   //          <div className="search-box__wrapper">
   //             <span className="search-button">
   //                <i className="fas fa-search"></i>
   //             </span>

   //             <input
   //                type="text"
   //                className="search-box"
   //                placeholder="Nhập từ khóa cần tìm kiếm"
   //                value={keyword}
   //                onChange={changeKeyword}
   //             />
   //          </div>

   //          <div className="table-tabs">
   //             <span
   //                className={status === 0 ? 'table-tab-active' : 'table-tab'}
   //                onClick={() => changeStatus(0)}
   //             >
   //                Tất cả ({statusStats.all})
   //             </span>

   //             <span
   //                className={
   //                   this.state.status === 1 ? 'table-tab-active' : 'table-tab'
   //                }
   //                onClick={() => changeStatus(1)}
   //             >
   //                Đang hiển thị ({statusStats.active})
   //             </span>

   //             <span
   //                className={status === -1 ? 'table-tab-active' : 'table-tab'}
   //                onClick={() => changeStatus(-1)}
   //             >
   //                Đã xóa ({statusStats.inactive})
   //             </span>
   //          </div>
   //       </div>
   //    )
   // }

   renderTable = () => {
      const { renderTableHeader, renderTableToolbar, renderTableBody } = this

      return (
         <table className="table">
            {renderTableHeader()}
            {renderTableToolbar()}
            {renderTableBody()}
         </table>
      )
   }

   renderTableHeader = () => {
      const { isBeingSorted, sortByColumn } = this
      const { settings } = this.props
      const { columns } = settings

      return (
         <thead>
            <tr>
               <th></th>
               {columns.map((column, index) => (
                  <th
                     onClick={() => sortByColumn(column.propForSorting)}
                     key={index}
                  >
                     {isBeingSorted(column.propForSorting) && (
                        <i className="fas fa-sort sort-button"></i>
                     )}{' '}
                     {column.text}
                  </th>
               ))}

               {/* <th onClick={() => sortByColumn('TrangThai')}>
                  {isBeingSorted('TrangThai') && (
                     <i className="fas fa-sort sort-button"></i>
                  )}{' '}
                  Trạng thái
               </th> */}
            </tr>
         </thead>
      )
   }

   renderTableToolbar = () => {
      const { renderTableToolbarCell, resetSearchData } = this
      const { searchData } = this.state
      const { settings } = this.props
      const { columns } = settings

      return (
         <thead>
            <tr>
               <th className="thead-cell-centered">
                  {searchData !== null ? (
                     <i
                        className="fas fa-times-circle reset-search-data"
                        onClick={resetSearchData}
                     ></i>
                  ) : (
                     <i className="fas fa-search"></i>
                  )}
               </th>

               {columns.map((column, index) => (
                  <th key={index}>{renderTableToolbarCell(column)}</th>
               ))}
            </tr>
         </thead>
      )
   }

   renderTableToolbarCell = column => {
      const {
         changeSearchData,
         toggleDateRangePicker,
         getDateRangePickerValue
      } = this
      const { searchData } = this.state
      const { search, propForValue } = column
      const { type, min, max, step, placeholder } = search

      switch (type) {
         case 'input': {
            return (
               <input
                  className="form-input-outline"
                  type="text"
                  placeholder={placeholder}
                  value={searchData[propForValue]}
                  onChange={e => changeSearchData(e.target.value, propForValue)}
               />
            )
         }

         case 'date': {
            return (
               <span
                  className="form-input-outline"
                  onClick={() => toggleDateRangePicker(propForValue)}
               >
                  {getDateRangePickerValue(propForValue, placeholder)}
               </span>
            )
         }

         case 'select': {
            const { search } = column
            const { values, propForItemText, propForItemValue } = search

            return (
               <Select
                  value={values.find(
                     item => item.value === searchData[propForValue]
                  )}
                  onChange={option =>
                     changeSearchData(option.value, propForValue)
                  }
                  options={values}
                  placeholder={placeholder}
                  styles={customStyles}
               />
            )
         }

         case 'slider': {
            return (
               <div className="slider-wrapper">
                  <Range
                     min={min}
                     max={max}
                     step={step}
                     value={[
                        searchData['range_' + propForValue + 'BatDau'],
                        searchData['range_' + propForValue + 'KetThuc']
                     ]}
                     onChange={range => {
                        const [startValue, endValue] = range

                        changeSearchData(
                           startValue,
                           'range_' + propForValue + 'BatDau'
                        )
                        changeSearchData(
                           endValue,
                           'range_' + propForValue + 'KetThuc'
                        )
                     }}
                     tipFormatter={value => `${numberWithCommas(value)}`}
                  />
               </div>
            )
         }
      }
   }

   renderTableBody = () => {
      const { renderTableData, renderEmptyTable } = this
      const { data, loadingTableData } = this.state
      const { settings } = this.props
      const { columns } = settings

      return (
         <LoadingIndicator
            isLoading={false}
            wrapperTag="tbody"
            colSpan={columns.length}
         >
            {data.length > 0 ? renderTableData() : renderEmptyTable()}
         </LoadingIndicator>
      )
   }

   renderTableData = () => {
      const {
         getCurrentStatusColors,
         getCurrentStatusText,
         deleteById,
         resetPasswordById,
         getCellValue
      } = this
      const { data } = this.state
      const { settings } = this.props
      const { entity, columns } = settings
      const { slug } = entity
      const idColumn = columns[0].propForValue

      return data.map((record, index) => (
         <tr key={index}>
            <td className="table-dropdown-menu-wrapper">
               <span className="table-dropdown-menu-toggle">
                  <i className="fas fa-bars"></i>
               </span>

               <ul className="table-dropdown-menu">
                  <li className="table-dropdown-menu-item">
                     <Link
                        to={`/quan-ly/${slug}/xem-thong-tin/${record[idColumn]}`}
                     >
                        Xem chi tiết
                     </Link>
                  </li>

                  <li className="table-dropdown-menu-item">
                     <Link to={`/quan-ly/${slug}/cap-nhat/${record[idColumn]}`}>
                        Cập nhật thông tin
                     </Link>
                  </li>

                  <li className="table-dropdown-menu-item">
                     <Link
                        to={`/quan-ly/${slug}/thay-doi-mat-khau/${record[idColumn]}`}
                     >
                        Thay đổi mật khẩu
                     </Link>
                  </li>

                  <li
                     className="table-dropdown-menu-item"
                     onClick={() => resetPasswordById(record[idColumn])}
                  >
                     <Link to="#">Khôi phục mật khẩu mặc định</Link>
                  </li>

                  <li
                     className="table-dropdown-menu-item"
                     onClick={() => deleteById(record[idColumn])}
                  >
                     <Link to="#">Xóa khỏi danh sách</Link>
                  </li>

                  {/* <li className="table-dropdown-menu-item">
                     <Link to="#">Xóa tạm thời</Link>
                  </li>

                  {record.trangThai === -1 && (
                     <li className="table-dropdown-menu-item">
                        <Link to="#">Khôi phục lại</Link>
                     </li>
                  )}

                  <li className="table-dropdown-menu-item">
                     <Link to="#">Xóa vĩnh viễn</Link>
                  </li> */}
               </ul>
            </td>

            {columns.map((column, index) => (
               <td
                  className={column.isBold ? 'table-text-bold' : ''}
                  key={index}
               >
                  {getCellValue(column, record)}
               </td>
            ))}

            {/* <td>
               <span
                  className="active-badge"
                  style={getCurrentStatusColors(record.trangThai)}
               >
                  {getCurrentStatusText(record.trangThai)}
               </span>
            </td> */}
         </tr>
      ))
   }

   renderEmptyTable = () => {
      const { keyword } = this.state

      return (
         <tr>
            <td className="text-center" colSpan={10}>
               {keyword !== '' ? 'Không tìm thấy kết quả nào' : 'Trống'}
            </td>
         </tr>
      )
   }

   renderPagination = () => {
      const {
         changePageSize,
         changePageNumber,
         getPageNumbers,
         showPrevPage,
         showNextPage
      } = this
      const { totalPages, totalItems, pageSize } = this.state

      return (
         <div className="table-pagination">
            <div className="table-pagination__left">
               {totalItems > 0 ? (
                  <p>
                     Danh sách có tất cả <strong>{totalItems}</strong> kết quả
                  </p>
               ) : (
                  <p>Không có kết quả nào trong danh sách</p>
               )}
            </div>

            <div className="table-pagination__right">
               <label className="table-pagination__label">Hiển thị dòng</label>
               <select
                  className="table-pagination__select"
                  value={pageSize}
                  onChange={changePageSize}
               >
                  {PAGE_SIZES.map((pageSize, index) => (
                     <option key={index} value={pageSize}>
                        {pageSize}
                     </option>
                  ))}
               </select>

               <label className="table-pagination__label">Đến trang</label>
               <select
                  className="table-pagination__select"
                  onChange={changePageNumber}
               >
                  {getPageNumbers().map((pageNumber, index) => (
                     <option key={index} value={pageNumber}>
                        {pageNumber}
                     </option>
                  ))}
               </select>

               <label className="table-pagination__label">
                  {' '}
                  / {totalPages}
               </label>

               <span
                  className="table-pagination__button"
                  onClick={showPrevPage}
               >
                  <i className="fas fa-chevron-left"></i>
               </span>
               <span
                  className="table-pagination__button"
                  onClick={showNextPage}
               >
                  <i className="fas fa-chevron-right"></i>
               </span>
            </div>
         </div>
      )
   }

   renderDialogs = () => {
      const {
         toggleShowDeleteDialog,
         toggleShowResetPasswordDialog,
         deleteByIdOnSuccess,
         resetPasswordByIdOnSuccess,
         toggleExportReportDialog,
         exportToPdf,
         exportToXlsx
      } = this
      const {
         showDeleteDialog,
         showResetPasswordDialog,
         recordToDelete,
         recordToReset,
         showExportReportDialog,
         data
      } = this.state
      const { settings } = this.props
      const { entity, api, columns } = settings
      const deleteDialogSettings = {
         isOpen: showDeleteDialog,
         onClose: toggleShowDeleteDialog,
         onSuccess: deleteByIdOnSuccess,
         entity,
         id: recordToDelete,
         api
      }
      const resetPasswordDialogSettings = {
         isOpen: showResetPasswordDialog,
         onClose: toggleShowResetPasswordDialog,
         onSuccess: resetPasswordByIdOnSuccess,
         entity,
         id: recordToReset,
         api
      }
      const exportDialogSettings = {
         isOpen: showExportReportDialog,
         onClose: toggleExportReportDialog,
         onExportToPdf: exportToPdf,
         onExportToXlsx: exportToXlsx,
         entity
         // data,
         // columns
      }

      return (
         <Fragment>
            <DeleteDialog settings={deleteDialogSettings} />
            <ResetPasswordDialog settings={resetPasswordDialogSettings} />
            <ExportReportDialog settings={exportDialogSettings} />
         </Fragment>
      )
   }

   renderDateRangePickers = dateRangePicker => {
      const { changeDateRange, toggleDateRangePicker } = this
      const { searchData, showDateRangePicker } = this.state
      const selectionRange = {
         startDate: searchData['date_' + dateRangePicker + 'BatDau'],
         endDate: searchData['date_' + dateRangePicker + 'KetThuc']
      }
      const settings = {
         title: `Chọn khoảng thời gian`,
         onClose: () => toggleDateRangePicker(dateRangePicker),
         isOpen: showDateRangePicker
      }

      return (
         <Dialog settings={settings}>
            <DateRangePicker
               ranges={[selectionRange]}
               onChange={changeDateRange}
            />
         </Dialog>
      )
   }

   renderComponent = () => {
      const {
         renderHeader,
         renderBody,
         renderDialogs,
         renderDateRangePickers
      } = this
      const { data, loading, activeDateRangePicker } = this.state
      const { settings } = this.props
      const { entity, columns } = settings
      const printSettings = {
         entity,
         columns,
         data
      }

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
            {renderDialogs()}
            {renderDateRangePickers(activeDateRangePicker)}

            <ForListPrintPage settings={printSettings} />
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default connect(null, { showNotification })(ForAccountListPage)
