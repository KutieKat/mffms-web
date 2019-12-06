import React, { Component, Fragment } from 'react'
import {
   BrowserRouter as Router,
   Route,
   Switch,
   NavLink,
   withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import menuRoutes from './routes/menus'
import pageRoutes from './routes/pages'
import { isEmpty } from './utils'
import NotFound from './pages/NotFound'
import './styles.css'

class App extends Component {
   constructor(props) {
      super(props)

      this.state = {
         pathTitle: ''
      }
   }

   componentDidMount() {
      let pathTitle = ''
      this.setState({ pathTitle })
   }

   logOut() {
      if (
         window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi MFFMS hay không?')
      ) {
         this.props.logOut()
         localStorage.removeItem('MFFMS_USER')
      }
   }

   renderMenuSection(title, menuItems) {
      return (
         <Fragment>
            <div className="main-nav__title">{title}</div>
            <ul className="main-nav__list">
               {menuItems.map((menu, index) =>
                  menu.path !== '/dang-xuat' ? (
                     <li className="main-nav__list-item" key={index}>
                        <NavLink
                           to={menu.path}
                           onClick={() =>
                              this.setState({ pathTitle: menu.title })
                           }
                           activeClassName="main-nav__list-item--active"
                           exact={menu.exact}
                        >
                           <i className={menu.icon}></i>&nbsp;&nbsp;{menu.title}
                        </NavLink>
                     </li>
                  ) : (
                     <li className="main-nav__list-item" key={index}>
                        <NavLink to="#" onClick={() => this.logOut()}>
                           <i className={menu.icon}></i>&nbsp;&nbsp;{menu.title}
                        </NavLink>
                     </li>
                  )
               )}
            </ul>
         </Fragment>
      )
   }

   renderRoutes() {
      return pageRoutes.map((pageRoute, index) => (
         <Route
            key={index}
            path={pageRoute.path}
            component={pageRoute.component}
            exact={pageRoute.exact}
         />
      ))
   }

   render() {
      return (
         <Fragment>
            <header className="main-header">
               <div className="main-header__left">
                  <h1 className="main-header__title">
                     <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="main-header__logo"
                     />
                     MFFMS
                  </h1>
                  <p className="main-header__subtitle">
                     Mini Football Field Management System
                  </p>
               </div>

               <div className="main-header__center">{this.state.pathTitle}</div>
            </header>

            <main className="main">
               <div className="main-left">
                  {this.renderMenuSection('Nghiệp vụ', menuRoutes.business)}
                  {this.renderMenuSection('Hệ thống', menuRoutes.system)}
               </div>

               <div className="main-right">
                  <Switch>
                     {this.renderRoutes()}
                     <Route component={NotFound} />
                  </Switch>
               </div>
            </main>
         </Fragment>
      )
   }
}

const mapStateToProps = state => ({
   user: state.user
})

export default withRouter(connect(mapStateToProps, actions)(App))
