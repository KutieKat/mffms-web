import React, { Component, Fragment } from 'react'
import Section from '../../components/Section'
import { Link } from 'react-router-dom'
import {
   scrollTop,
   print,
   apiGet,
   formatDateString,
   deepGet
} from '../../utils'
import LoadingIndicator from '../../components/LoadingIndicator'
import { STATS_TABS, LONG_FETCHING_DATA_INTERVAL } from '../../constants'
import moment from 'moment'
import { DateRangePicker } from 'react-date-range'
import Dialog from '../../components/Dialog'
import ForChartsPrintPage from '../../components/ForChartsPrintPage'
import { connect } from 'react-redux'
import { showNotification } from '../../redux/actions'
import apiRoutes from '../../routes/apis'
import ExportReportDialog from '../../components/ExportReportDialog'
import cloneDeep from 'clone-deep'
import { Bar } from 'react-chartjs-2'

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

   fetchData = () => {
      const { fetchStats } = this

      fetchStats('tongTienDatSan')
      fetchStats('tongSoLuotDatSan')
      fetchStats('tongTienDichVu')
      fetchStats('tongTienNhapHang')
   }

   fetchStats = async propName => {
      const { formRequestParams } = this
      const url = apiRoutes.thongKe[propName]
      const params = formRequestParams()

      try {
         const response = await apiGet(url, params)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result.data
            const state = cloneDeep(this.state)

            state[propName] = data
            state['loading'] = false

            this.setState({ ...state })
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
      return (
         <span className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (MFFMS)</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-active">
               <Link to="#">Biểu đồ thống kê tổng quan</Link>
            </span>
         </span>
      )
   }

   renderSectionHeaderRight = () => {
      const { refresh, toggleExportReportDialog } = this

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            <span className="button" onClick={toggleExportReportDialog}>
               <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất báo cáo
            </span>
         </Fragment>
      )
   }

   renderBody = () => {
      const {
         renderSectionHeaderRight,
         renderTabs,
         renderCharts,
         renderDateRangePickers
      } = this
      const generalStatsSection = {
         title: `Biểu đồ thống kê tổng quan`,
         subtitle: `Biểu đồ thống kê tổng quan về số liệu trên hệ thống`,
         headerRight: renderSectionHeaderRight(),
         framedBody: false
      }

      return (
         <Fragment>
            <Section section={generalStatsSection}>
               {renderTabs()}
               {renderDateRangePickers()}
            </Section>

            <div className="chart-sections">
               <ForChartsPrintPage settings={{ section: 'header' }} />
               <div className="chart-sections-wrapper">{renderCharts()}</div>
               <ForChartsPrintPage settings={{ section: 'footer' }} />
            </div>
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
               Biểu đồ thống kê tổng quan {selectedTab.text.toLowerCase()}{' '}
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

   renderCharts = () => {
      const { renderChart } = this

      return (
         <Fragment>
            {renderChart('tongTienDatSan')}
            {renderChart('tongSoLuotDatSan')}
            {renderChart('tongTienDichVu')}
            {renderChart('tongTienNhapHang')}
         </Fragment>
      )
   }

   getLabelForPropName = propName => {
      switch (propName) {
         case 'tongSoLuotDatSan':
            return 'Tổng số lượt đặt sân (Lượt)'

         case 'tongTienDatSan':
            return 'Tổng tiền đặt sân (VNĐ)'

         case 'tongTienDichVu':
            return 'Tổng tiền dịch vụ (VNĐ)'

         case 'tongTienNhapHang':
            return 'Tổng tiền nhập hàng (VNĐ)'
      }
   }

   renderChart = propName => {
      const { getLabelForPropName } = this
      const rawData = this.state[propName]
      const data = {}
      data['labels'] =
         Array.isArray(rawData) &&
         rawData.map(record => moment(record.thoiGian).format('DD/MM/YYYY'))

      data['datasets'] = [
         {
            label: getLabelForPropName(propName),
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)',
            data: Array.isArray(rawData) && rawData.map(record => record.giaTri)
         }
      ]

      return (
         <div className="chart-section">
            <h4 className="chart-section__title">
               {getLabelForPropName(propName)}
            </h4>
            <Bar data={data} width="50%" height="12vh" />
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
      const { toggleExportReportDialog, exportToPdf } = this
      const { showExportReportDialog, data } = this.state
      const dialogSettings = {
         isOpen: showExportReportDialog,
         onClose: toggleExportReportDialog,
         onExportToPdf: exportToPdf
      }

      return (
         <Fragment>
            <ExportReportDialog settings={dialogSettings} />
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderDialogs, renderCharts } = this
      const { loading } = this.state

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
            {renderDialogs()}
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default connect(null, { showNotification })(ForStatsPage)
