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
      const { section } = this.props
      const { title, subtitle } = section

      return (
         <div className="section__header-left">
            <h3 className="section__title">{title}</h3>
            {subtitle !== '' && <p className="section__subtitle">{subtitle}</p>}
         </div>
      )
   }

   renderHeaderRight = () => {
      const { section } = this.props
      const { headerRight } = section

      return (
         headerRight !== undefined && (
            <div className="section__header-right">{headerRight}</div>
         )
      )
   }

   renderBody = () => {
      const { children, section } = this.props
      const { framedBody = true } = section

      return (
         <div
            className={
               framedBody ? 'section__body' : 'section__body--frameless'
            }
         >
            {children}
         </div>
      )
   }

   renderFooter = () => {
      const { renderFooterLeft, renderFooterRight } = this

      return (
         (renderFooterLeft() !== false || renderFooterRight() !== false) && (
            <footer className="section__footer">
               {renderFooterLeft()}
               {renderFooterRight()}
            </footer>
         )
      )
   }

   renderFooterLeft = () => {
      const { section } = this.props
      const { footerLeft } = section

      return (
         footerLeft !== undefined && (
            <div className="section__footer-left">{footerLeft}</div>
         )
      )
   }

   renderFooterRight = () => {
      const { section } = this.props
      const { footerRight } = section

      return (
         footerRight !== undefined && (
            <div className="section__footer-right">{footerRight}</div>
         )
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderFooter } = this

      return (
         <section className="section">
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
         </section>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default Section
