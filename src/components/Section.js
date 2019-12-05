import React, { Component } from 'react'

class Section extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { renderHeaderLeft, renderHeaderRight } = this

      return (
         <header className="section__header">
            {renderHeaderLeft()}
            {renderHeaderRight()}
         </header>
      )
   }

   renderHeaderLeft = () => {
      const { title, subtitle } = this.props

      return (
         <div className="section__header-left">
            <h3 className="section__title">{title}</h3>
            {subtitle !== '' && <p className="section__subtitle">{subtitle}</p>}
         </div>
      )
   }

   renderHeaderRight = () => {
      const { headerRight } = this.props

      return (
         headerRight !== undefined && (
            <div className="section__header-right">{headerRight}</div>
         )
      )
   }

   renderBody = () => {
      const { children } = this.props

      return <div className="section__body">{children}</div>
   }

   renderComponent = () => {
      const { renderHeader, renderBody } = this

      return (
         <section className="section">
            {renderHeader()}
            {renderBody()}
         </section>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default Section
