import React, { Component } from 'react'

class KhachHangForView extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      return <div>KhachHangForView</div>
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default KhachHangForView
