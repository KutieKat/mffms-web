import React, { Component } from 'react'

class LoadingIndicator extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { isLoading, children, wrapperTag, colSpan } = this.props

      if (isLoading) {
         switch (wrapperTag) {
            case 'tobdy': {
               return (
                  <tbody className="loading-indicator">
                     <tr colSpan={colSpan}>
                        <td>
                           <div className="lds-ripple">
                              <div></div>
                              <div></div>
                           </div>

                           <div>
                              Đang tải dữ liệu, vui lòng chờ đợi trong giây lát
                           </div>
                        </td>
                     </tr>
                  </tbody>
               )
            }

            default: {
               return (
                  <div className="loading-indicator">
                     <div className="lds-ripple">
                        <div></div>
                        <div></div>
                     </div>

                     <div>
                        Đang tải dữ liệu, vui lòng chờ đợi trong giây lát
                     </div>
                  </div>
               )
            }
         }
      } else {
         switch (wrapperTag) {
            case 'tbody': {
               return <tbody className="animated fadeIn">{children}</tbody>
            }

            default: {
               return <div className="animated fadeIn">{children}</div>
            }
         }
      }
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default LoadingIndicator
