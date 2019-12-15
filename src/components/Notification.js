import React, { Component } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import * as actions from '../redux/actions'
import { connect } from 'react-redux'
const showNotification = actions.showNotification

class Notification extends Component {
   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillReceiveProps = nextProps => {
      const { createNotification } = this
      const { notification } = nextProps

      createNotification(notification)
   }

   ///// METHODS FOR HANDING UI EVENTS /////

   createNotification = notification => {
      const { type, title, message } = notification

      switch (type) {
         case 'info':
            NotificationManager.info(message, title, 2000)
            break

         case 'success':
            NotificationManager.success(message, title, 2000)
            break

         case 'warning':
            NotificationManager.warning(message, title, 2000)
            break

         case 'error':
            NotificationManager.error(message, title, 2000)
            break
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      return <NotificationContainer />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

const mapStateToProps = state => {
   return {
      notification: state.notification
   }
}

export default connect(mapStateToProps, { showNotification })(Notification)
