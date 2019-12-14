import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link } from 'react-router-dom'
import { scrollTop, print, apiGet, formatDateString } from '../utils'
import LoadingIndicator from '../components/LoadingIndicator'
import { STATS_TABS, LONG_FETCHING_DATA_INTERVAL } from '../constants'
import CountUp from 'react-countup'
import moment from 'moment'
import { DateRangePicker } from 'react-date-range'
import Dialog from './Dialog'

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
         date_endDate: new Date()
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { fetchData } = this

      fetchData()
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
         const response = await apiGet(url, { params })

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

   ///// METHODS FOR RENDERING UI /////

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
      const { refresh, exportReport } = this
      const { data } = this.state

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            {data !== null && (
               <span className="button" onClick={exportReport}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;In thông tin
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

               <div className="stats-card__unit">Đơn vị tính: {unit}</div>
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

   renderComponent = () => {
      const { renderHeader, renderBody } = this
      const { data, loading } = this.state
      const { settings } = this.props
      const { entity, api, fields } = settings
      //   const printSettings = {
      //      entity,
      //      api,
      //      fields,
      //      data
      //   }

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
         </LoadingIndicator>
      )
   }

   render() {
      console.log('STATS - STATE: ', this.state)
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForStatsPage
