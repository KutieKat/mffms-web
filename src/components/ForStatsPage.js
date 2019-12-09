import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link } from 'react-router-dom'
import { scrollTop, print, apiGet } from '../utils'
import LoadingIndicator from '../components/LoadingIndicator'

class ForStatsPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         data: null,
         loading: false
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { fetchData } = this

      fetchData()
   }

   componentDidMount() {
      scrollTop()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = async () => {
      const { settings } = this.props
      const { api } = settings
      const url = `${api.getGeneralStats}`
      try {
         const response = await apiGet(url)
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

   ///// METHODS FOR HANDLING UI EVENTS /////

   refresh = () => {
      const { fetchData } = this

      this.setState({ loading: true }, fetchData)
   }

   exportReport = () => {
      print()
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

            {/* {data !== null && (
               <span className="button" onClick={exportReport}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;In thông tin
               </span>
            )} */}
         </Fragment>
      )
   }

   renderBody = () => {
      const { renderSectionHeaderRight, renderCards } = this
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
            <Section section={generalStatsSection}>{renderCards()}</Section>
         </Fragment>
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
               <div className="stats-card__value">{cardData || 0}</div>
               <div className="stats-card__unit">Đơn vị tính: {unit}</div>
            </div>
         </div>
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
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForStatsPage
