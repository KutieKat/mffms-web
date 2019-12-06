import React, { Component } from 'react'

class ForViewPage extends Component {
   renderComponent = () => {
      return <div>ForViewPage</div>
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForViewPage
