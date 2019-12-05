import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import { isEmpty } from './utils'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

class Main extends Component {
   render() {
      return (
         <Router>
            <App />
         </Router>
      )
   }
}

const mapStateToProps = state => ({
   user: state.user
})

export default connect(mapStateToProps, actions)(Main)
