import React, { Component } from 'react'

class LoadingIndicator extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { isLoading, children } = this.props

      return isLoading ? (
         <div className="loading-indicator">
            <div className="lds-ripple">
               <div></div>
               <div></div>
            </div>

            <div>Đang tải dữ liệu, vui lòng chờ đợi trong giây lát</div>
         </div>
      ) : (
         <div className="animated fadeIn">{children}</div>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default LoadingIndicator
