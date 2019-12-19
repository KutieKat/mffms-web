import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import { isEmpty } from './utils'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import Notification from './components/Notification'

class Main extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderNotification = () => {
      return <Notification />
   }

   renderComponent = () => {
      const { renderNotification } = this

      return (
         <Router>
            <Fragment>
               <App />
               {renderNotification()}
            </Fragment>
         </Router>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

// const mapStateToProps = state => ({
//    user: state.user
// })

export default Main
