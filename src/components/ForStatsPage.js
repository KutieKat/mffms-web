import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link } from 'react-router-dom'
import { scrollTop, print, apiGet, formatDateString, deepGet } from '../utils'
import LoadingIndicator from '../components/LoadingIndicator'
import { STATS_TABS, LONG_FETCHING_DATA_INTERVAL } from '../constants'
import CountUp from 'react-countup'
import moment from 'moment'
import { DateRangePicker } from 'react-date-range'
import Dialog from './Dialog'
import ForStatsPrintPage from './ForStatsPrintPage'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { excelFormat } from '../utils'
import apiRoutes from '../routes/apis'
import ExportReportDialog from './ExportReportDialog'

class ForStatsPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         data: null,
         loading: false,
         selectedTab: STATS_TABS[0],
         startDate: undefined,
         endDate: undefined,
         showDateRangePicker: false,
         date_startDate: new Date(),
         date_endDate: new Date(),
         showExportReportDialog: false,
         settingsData: {
            tenSanBong: '',
            diaChi: '',
            diaChiTrenPhieu: '',
            soDienThoai: '',
            fax: ''
         }
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { fetchData, fetchSettingsData } = this

      fetchData()
      fetchSettingsData()
   }

   componentDidMount() {
      const { fetchData } = this

      this.fetchingDataInterval = setInterval(
         fetchData,
         LONG_FETCHING_DATA_INTERVAL
      )
      scrollTop()
   }

   componentWillUnmount() {
      if (this.fetchingDataInterval) {
         clearInterval(this.fetchingDataInterval)
      }
   }

   ///// METHODS FOR INTERACTING WITH API /////

   formRequestParams = () => {
      const { startDate, endDate } = this.state
      const params = {}

      params['startingTime'] = startDate
      params['endingTime'] = endDate

      return params
   }

   fetchData = async () => {
      const { formRequestParams } = this
      const { settings } = this.props
      const { api } = settings
      const url = `${api.getGeneralStats}`
      const params = formRequestParams()

      try {
         const response = await apiGet(url, params)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result
            this.setState({ data, loading: false })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchSettingsData = async () => {
      const { caiDat } = apiRoutes
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

   ///// METHODS FOR CHECKING VALUES /////

   isActiveTab = tab => {
      const { selectedTab } = this.state
      const selectedTabValue = selectedTab.value
      const tabValue = tab.value

      return tabValue === selectedTabValue
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getDateRange = () => {
      const { startDate, endDate, selectedTab } = this.state
      const { value } = selectedTab
      const start = formatDateString(new Date(startDate))
      const end = formatDateString(new Date(endDate))
      const dateRange = value !== 0 ? `(${start} - ${end})` : ''

      return dateRange
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   refresh = () => {
      const { fetchData } = this

      this.setState(
         {
            loading: true,
            selectedTab: STATS_TABS[0],
            startDate: undefined,
            endDate: undefined,
            showDateRangePicker: false,
            date_startDate: new Date(),
            date_endDate: new Date()
         },
         fetchData
      )
   }

   exportReport = () => {
      print()
   }

   changeTab = selectedTab => {
      const { changeDateRange } = this

      this.setState({ selectedTab }, changeDateRange)
   }

   changeDateRange = () => {
      const { fetchData } = this
      const { selectedTab } = this.state
      const { value } = selectedTab
      let startDate, endDate

      switch (value) {
         case 1: {
            startDate = moment()
               .startOf('day')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('day')
               .format('YYYY-MM-DD')
            break
         }

         case 2: {
            startDate = moment()
               .startOf('week')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('week')
               .format('YYYY-MM-DD')
            break
         }

         case 3: {
            startDate = moment()
               .startOf('month')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('month')
               .format('YYYY-MM-DD')
            break
         }

         case 4: {
            startDate = moment()
               .startOf('quarter')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('quarter')
               .format('YYYY-MM-DD')
            break
         }

         case 5: {
            startDate = moment()
               .startOf('year')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('year')
               .format('YYYY-MM-DD')
            break
         }

         case 6: {
            startDate = moment()
               .startOf('day')
               .format('YYYY-MM-DD')
            endDate = moment()
               .endOf('day')
               .format('YYYY-MM-DD')
            break
         }

         default: {
            startDate = undefined
            endDate = undefined
         }
      }

      this.setState({ startDate, endDate }, fetchData)
   }

   toggleDateRangePicker = () => {
      const state = { ...this.state }
      const showDateRangePicker = state['showDateRangePicker']

      if (showDateRangePicker) {
         state['showDateRangePicker'] = false
      } else {
         state['showDateRangePicker'] = true
      }

      this.setState({ ...state })
   }

   changeDateRangePicker = selectedOption => {
      const { fetchData } = this
      const state = { ...this.state }
      const { range1 } = selectedOption
      const { startDate, endDate } = range1
      state['date_startDate'] = startDate
      state['date_endDate'] = endDate
      state['startDate'] = moment(startDate).format('YYYY-MM-DD')
      state['endDate'] = moment(endDate).format('YYYY-MM-DD')
      state['showDateRangePicker'] = false

      this.setState({ ...state }, fetchData)
   }

   exportToPdf = () => {
      const { showSuccessNotification } = this

      print()
      showSuccessNotification()
   }

   exportToXlsx = () => {
      const { showSuccessNotification } = this
      const { data, settingsData } = this.state
      const {
         tenSanBong,
         diaChi,
         diaChiTrenPhieu,
         soDienThoai,
         fax
      } = settingsData
      const { settings } = this.props
      const { entity, cards } = settings
      const { name, slug } = entity
      const fileName = `thong-ke-${slug}-${moment().format('DDMMYYYY')}`
      let workbook = new Excel.Workbook()
      let worksheet = workbook.addWorksheet(moment().format('DD-MM-YYYY'), {
         pageSetup: { fitToPage: true, orientation: 'portrait' }
      })
      let currentRowCount = 7

      workbook.Props = {
         Title: fileName,
         Subject: `Thống kê ${name}`,
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

      worksheet.mergeCells('A5:M5')
      worksheet.getCell('M5').value = `THỐNG KÊ ${name.toUpperCase()}`
      worksheet.getCell('M5').font = { ...excelFormat.boldFont, size: 18 }
      worksheet.getCell('M5').alignment = excelFormat.center

      cards.forEach((card, index) => {
         const { label, propForValue, unit } = card

         worksheet.mergeCells(`B${currentRowCount}:D${currentRowCount}`)
         worksheet.mergeCells(`E${currentRowCount}:L${currentRowCount}`)

         worksheet.getCell(`B${currentRowCount}`).value = `${label} (${unit})`
         worksheet.getCell(`B${currentRowCount}`).font = excelFormat.boldFont
         worksheet.getCell(`B${currentRowCount}`).alignment = excelFormat.left

         worksheet.getCell(`E${currentRowCount}`).value = deepGet(
            data,
            propForValue
         )
         worksheet.getCell(`E${currentRowCount}`).font = excelFormat.normalFont
         worksheet.getCell(`E${currentRowCount}`).alignment = excelFormat.left

         currentRowCount += index !== cards.length - 1 ? 2 : 0
      })

      worksheet.mergeCells(
         'G' + (currentRowCount + 2) + ':M' + (currentRowCount + 2)
      )
      worksheet.getCell(
         'G' + (currentRowCount + 2)
      ).value = `${diaChiTrenPhieu}, ngày ${moment().format(
         'DD'
      )} tháng ${moment().format('MM')} năm ${moment().format('YYYY')}`
      worksheet.getCell('G' + (currentRowCount + 2)).font =
         excelFormat.italicFont
      worksheet.getCell('G' + (currentRowCount + 2)).alignment =
         excelFormat.right

      worksheet.mergeCells(
         'B' + (currentRowCount + 4) + ':D' + (currentRowCount + 4)
      )
      worksheet.getCell('B' + (currentRowCount + 4)).value = `NGƯỜI DUYỆT`
      worksheet.getCell('B' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('B' + (currentRowCount + 4)).alignment =
         excelFormat.center

      worksheet.mergeCells(
         'J' + (currentRowCount + 4) + ':L' + (currentRowCount + 4)
      )
      worksheet.getCell('J' + (currentRowCount + 4)).value = `NGƯỜI LẬP`
      worksheet.getCell('J' + (currentRowCount + 4)).font = excelFormat.boldFont
      worksheet.getCell('J' + (currentRowCount + 4)).alignment =
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
         'I' + (currentRowCount + 5) + ':M' + (currentRowCount + 5)
      )
      worksheet.getCell(
         'I' + (currentRowCount + 5)
      ).value = `(Ký và ghi rõ họ tên)`
      worksheet.getCell('I' + (currentRowCount + 5)).font =
         excelFormat.italicFont
      worksheet.getCell('I' + (currentRowCount + 5)).alignment =
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

   toggleExportReportDialog = () => {
      const { showExportReportDialog } = this.state

      this.setState({ showExportReportDialog: !showExportReportDialog })
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
      const { name } = entity

      return (
         <span className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (MFFMS)</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-active">
               <Link to="#">Thống kê {name}</Link>
            </span>
         </span>
      )
   }

   renderSectionHeaderRight = () => {
      const { refresh, toggleExportReportDialog } = this
      const { data } = this.state

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            {data !== null && (
               <span className="button" onClick={toggleExportReportDialog}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất báo cáo
               </span>
            )}
         </Fragment>
      )
   }

   renderBody = () => {
      const {
         renderSectionHeaderRight,
         renderTabs,
         renderCards,
         renderDateRangePickers
      } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const generalStatsSection = {
         title: `Số liệu tổng quan`,
         subtitle: `Số liệu thống kê tổng quan về ${name}`,
         headerRight: renderSectionHeaderRight(),
         framedBody: false
      }

      return (
         <Fragment>
            <Section section={generalStatsSection}>
               {renderTabs()}
               {renderCards()}
               {renderDateRangePickers()}
            </Section>
         </Fragment>
      )
   }

   renderTabs = () => {
      const {
         changeTab,
         isActiveTab,
         getDateRange,
         toggleDateRangePicker
      } = this
      const { selectedTab } = this.state

      return (
         <div className="stats-toolbar">
            <div className="stats-tabs">
               {STATS_TABS.map(tab => (
                  <span
                     className={
                        isActiveTab(tab)
                           ? 'stats-tab stats-tab--active'
                           : 'stats-tab'
                     }
                     onClick={() => changeTab(tab)}
                     key={tab.value}
                  >
                     {tab.text}
                  </span>
               ))}
            </div>

            <div className="stats-criteria">
               Thống kê số liệu {selectedTab.text.toLowerCase()}{' '}
               {getDateRange()}
               {selectedTab.value === 6 && (
                  <span
                     className="stats-date-range-picker-toggler"
                     onClick={toggleDateRangePicker}
                  >
                     Thay đổi
                  </span>
               )}
            </div>
         </div>
      )
   }

   renderCards = () => {
      const { renderCard } = this
      const { data } = this.state
      const { settings } = this.props
      const { cards } = settings

      return (
         <div className="stats-cards">
            {cards.map((cardMeta, index) => {
               const { propForValue } = cardMeta

               return renderCard(cardMeta, data && data[propForValue], index)
            })}
         </div>
      )
   }

   renderCard = (cardMeta, cardData, index) => {
      const { label, icon, unit } = cardMeta

      return (
         <div className="stats-card" key={index}>
            <div className="stats-card__label">
               <i className={icon}></i>&nbsp;&nbsp; {label}
            </div>

            <div className="stats-card__body">
               <div className="stats-card__value">
                  <CountUp
                     start={0}
                     end={cardData || 0}
                     duration={2.75}
                     separator=","
                  />
               </div>

               {unit !== undefined && (
                  <div className="stats-card__unit">Đơn vị tính: {unit}</div>
               )}
            </div>
         </div>
      )
   }

   renderDateRangePickers = () => {
      const { changeDateRangePicker, toggleDateRangePicker } = this
      const { date_startDate, date_endDate, showDateRangePicker } = this.state
      const selectionRange = {
         startDate: date_startDate,
         endDate: date_endDate
      }
      const settings = {
         title: `Chọn khoảng thời gian`,
         onClose: toggleDateRangePicker,
         isOpen: showDateRangePicker
      }
      return (
         <Dialog settings={settings}>
            <DateRangePicker
               ranges={[selectionRange]}
               onChange={changeDateRangePicker}
            />
         </Dialog>
      )
   }

   renderDialogs = () => {
      const { toggleExportReportDialog, exportToPdf, exportToXlsx } = this
      const { showExportReportDialog, data } = this.state
      const { settings } = this.props
      const { entity } = settings
      const dialogSettings = {
         isOpen: showExportReportDialog,
         onClose: toggleExportReportDialog,
         onExportToPdf: exportToPdf,
         onExportToXlsx: exportToXlsx,
         entity,
         data
      }

      return (
         <Fragment>
            <ExportReportDialog settings={dialogSettings} />
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderDialogs } = this
      const { data, loading } = this.state
      const { settings } = this.props
      const { entity, cards } = settings
      const printSettings = {
         entity,
         cards,
         data
      }

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
            {renderDialogs()}

            <ForStatsPrintPage settings={printSettings} />
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default connect(null, { showNotification })(ForStatsPage)
