import React, { Component, Fragment } from 'react'
import Section from './Section'
import { Link, withRouter } from 'react-router-dom'
import { apiGet, formatDateString } from '../utils'

class ForViewPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         data: null
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = async () => {
      const { settings, match } = this.props
      const { api } = settings
      const { id } = match.params
      const url = `${api.getById}/${id}`

      try {
         const response = await apiGet(url)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getFieldValue = (valueType, value) => {
      if (value !== '' && value !== undefined) {
         switch (valueType) {
            case 'text': {
               return value
            }

            case 'date': {
               return formatDateString(value)
            }
         }
         return value
      } else {
         return '(Chưa có dữ liệu)'
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { settings } = this.props
      const { entity } = settings
      const { entityName, entitySlug } = entity

      return (
         <span className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (MFFMS)</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb">
               <Link to={`/${entitySlug}`}>Quản lý {entityName}</Link>
            </span>
            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-active">
               <Link to="#">Xem thông tin {entityName}</Link>
            </span>
         </span>
      )
   }

   renderBody = () => {
      const { renderForm, renderFormFooter } = this
      const { settings } = this.props
      const { entity } = settings
      const { entityName } = entity
      const section = {
         title: `Xem thông tin ${entityName}`,
         subtitle: `Xem thông tin chi tiết của ${entityName}`,
         footerRight: renderFormFooter()
      }

      return <Section section={section}>{renderForm()}</Section>
   }

   renderForm = () => {
      const { renderFormGroup } = this
      const { settings } = this.props
      const { fields } = settings

      return (
         <Fragment>
            <form autoComplete="off">
               {fields.map((field, index) => renderFormGroup(field, index))}
            </form>
         </Fragment>
      )
   }

   renderFormGroup = (field, index) => {
      const { renderField } = this
      const { label } = field

      return (
         <div className="form-group" key={index}>
            <label className="form-label">{label}</label>
            {renderField(field)}
         </div>
      )
   }

   renderField = field => {
      const { getFieldValue } = this
      const { data } = this.state
      const { type, propForValue } = field

      switch (type) {
         case 'input': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={getFieldValue('text', data && data[propForValue])}
                  disabled={true}
               />
            )
         }

         case 'date': {
            return (
               <input
                  className="form-input-disabled"
                  type="text"
                  value={getFieldValue('date', data && data[propForValue])}
                  disabled={true}
               />
            )
         }

         case 'select': {
            const { values, propForItemText, propForItemValue } = field

            return (
               <select
                  className="form-input-disabled"
                  value={data && data[propForValue]}
                  disabled={true}
               >
                  {values.length > 0 &&
                     values.map((record, index) => (
                        <option key={index} value={record[propForItemValue]}>
                           {record[propForItemText]}
                        </option>
                     ))}
               </select>
            )
         }

         case 'textarea': {
            return (
               <textarea
                  className="form-input-disabled"
                  value={getFieldValue('text', data && data[propForValue])}
                  disabled={true}
               ></textarea>
            )
         }
      }
   }

   renderFormFooter = () => {
      const { settings } = this.props
      const { entity } = settings
      const { entitySlug } = entity

      return (
         <Fragment>
            <span className="button">
               <Link to={`/${entitySlug}`}>
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Trở về
               </Link>
            </span>
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody } = this

      return (
         <Fragment>
            {renderHeader()}
            {renderBody()}
         </Fragment>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default withRouter(ForViewPage)
