import React, { Component } from 'react'

class Dialog extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { renderHeaderTop, renderHeaderMain } = this

      return (
         <header className="popup__header">
            {renderHeaderTop()}
            {renderHeaderMain()}
         </header>
      )
   }

   renderHeaderTop = () => {
      const { settings } = this.props
      const { onClose } = settings

      return (
         <div className="popup-header__top-section">
            <i className="fas fa-times close-button" onClick={onClose}></i>
         </div>
      )
   }

   renderHeaderMain = () => {
      const { settings } = this.props
      const { title, iconUrl } = settings

      return (
         <div className="popup-header__main-section">
            {iconUrl !== undefined && (
               <img src={iconUrl} className="popup__image" />
            )}
            <h4 className="popup-header__title">{title}</h4>
         </div>
      )
   }

   renderBody = () => {
      const { children } = this.props

      return <div className="popup__body">{children}</div>
   }

   renderFooter = () => {
      const { settings } = this.props
      const {
         onClose,
         onSubmit,
         enableSubmit = true,
         closeButtonText = 'Hủy bỏ',
         submitButtonText = 'Đồng ý'
      } = settings

      return (
         <footer className="popup__footer">
            <span className="popup-button-default" onClick={onClose}>
               {closeButtonText}
            </span>

            {onSubmit !== undefined && (
               <span
                  className={
                     enableSubmit
                        ? 'popup-button-danger'
                        : 'popup-button-default'
                  }
                  onClick={enableSubmit ? onSubmit : null}
               >
                  {submitButtonText}
               </span>
            )}
         </footer>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderFooter } = this
      const { settings } = this.props
      const { isOpen } = settings

      return (
         isOpen && (
            <div className="popup-wrapper">
               <div className="popup">
                  {renderHeader()}
                  {renderBody()}
                  {renderFooter()}
               </div>
            </div>
         )
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default Dialog
