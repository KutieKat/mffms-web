import React, { Component, Fragment } from 'react'
import { Route, Switch, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import menu from './routes/menu'
import pageRoutes from './routes/pages'
import NotFound from './pages/NotFound'
import { APP_NAME, APP_SHORT_NAME } from './constants'
import './styles.css'

class App extends Component {
   constructor(props) {
      super(props)

      this.state = {
         pathTitle: ''
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      this.setState({ pathTitle: '' })
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   logOut = () => {
      const { logOut } = this

      if (
         window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi MFFMS hay không?')
      ) {
         logOut()
         localStorage.removeItem('MFFMS_USER')
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { renderHeaderLeft, renderHeaderCenter, renderHeaderRight } = this

      return (
         <header className="main-header">
            {renderHeaderLeft()}
            {renderHeaderCenter()}
            {renderHeaderRight()}
         </header>
      )
   }

   renderHeaderLeft = () => {
      return (
         <div className="main-header__left">
            <h1 className="main-header__title">
               <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="main-header__logo"
               />
               {APP_SHORT_NAME}
            </h1>
            <p className="main-header__subtitle">{APP_NAME}</p>
         </div>
      )
   }

   renderHeaderCenter = () => {
      const { pathTitle } = this.state

      return <div className="main-header__center">{pathTitle}</div>
   }

   renderHeaderRight = () => {}

   renderMain = () => {
      const { renderMainLeft, renderMainRight } = this

      return (
         <Fragment>
            <main className="main">
               {renderMainLeft()}
               {renderMainRight()}
            </main>
         </Fragment>
      )
   }

   renderMainLeft = () => {
      const { renderMenu } = this

      return <div className="main-left">{renderMenu()}</div>
   }

   renderMenu = () => {
      const { logOut } = this

      return menu.map((item, index) => {
         const { title, items } = item

         return (
            <Fragment key={index}>
               <div className="main-nav__title">{title}</div>
               <ul className="main-nav__list">
                  {items.map((menuItem, index) =>
                     menuItem.path !== '/dang-xuat' ? (
                        <li className="main-nav__list-item" key={index}>
                           <NavLink
                              to={menuItem.path}
                              onClick={() =>
                                 this.setState({ pathTitle: menuItem.title })
                              }
                              activeClassName="main-nav__list-item--active"
                              exact={menuItem.exact}
                           >
                              <i className={menuItem.icon}></i>&nbsp;&nbsp;
                              {menuItem.title}
                           </NavLink>
                        </li>
                     ) : (
                        <li className="main-nav__list-item" key={index}>
                           <NavLink to="#" onClick={logOut}>
                              <i className={menuItem.icon}></i>&nbsp;&nbsp;
                              {menuItem.title}
                           </NavLink>
                        </li>
                     )
                  )}
               </ul>
            </Fragment>
         )
      })
   }

   renderMainRight = () => {
      const { renderRoutes } = this

      return (
         <div className="main-right">
            <Switch>
               {renderRoutes()}
               <Route component={NotFound} />
            </Switch>
         </div>
      )
   }

   renderRoutes = () => {
      return pageRoutes.map((pageRoute, index) => (
         <Route
            key={index}
            path={pageRoute.path}
            component={pageRoute.component}
            exact={pageRoute.exact}
         />
      ))
   }

   renderComponent = () => {
      const { renderHeader, renderMain } = this

      return (
         <Fragment>
            {renderHeader()}
            {renderMain()}
         </Fragment>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

const mapStateToProps = state => ({
   user: state.user
})

export default withRouter(connect(mapStateToProps, actions)(App))
