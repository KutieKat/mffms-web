import React, { Component, Fragment } from 'react'
import { Route, Switch, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, logOut } from './redux/actions'
import menu from './routes/menu'
import pageRoutes from './routes/pages'
import NotFound from './pages/NotFound'
import { APP_NAME, APP_SHORT_NAME, SECTIONS_FOR_ROLES } from './constants'
import Login from './pages/Login'
import { isEmptyObj, apiPost, deepGet, scrollTop } from './utils'
import apiRoutes from './routes/apis'
import './styles.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'rc-slider/assets/index.css'
import 'react-notifications/lib/notifications.css'

class App extends Component {
   constructor(props) {
      super(props)

      this.state = {
         pathTitle: '',
         showLoginPage: false,
         autoLoginEnabled: false
      }
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { user } = this.props
      const localUser = JSON.parse(localStorage.getItem('MFFMS_USER')) || {}

      if (isEmptyObj(user) || isEmptyObj(localUser)) {
         this.setState({ showLoginPage: true })
      } else {
         this.setState({ showLoginPage: false })
      }
   }

   componentWillReceiveProps(nextProps) {
      const { autoLogin } = this
      const { autoLoginEnabled } = this.state
      const { user } = nextProps
      const localUser = JSON.parse(localStorage.getItem('MFFMS_USER')) || {}

      if (isEmptyObj(user) || isEmptyObj(localUser)) {
         this.setState({ showLoginPage: true })
      } else {
         this.setState({ showLoginPage: false, autoLoginEnabled: true }, () => {
            if (autoLoginEnabled) {
               autoLogin()
            }
         })
      }
   }

   componentDidMount() {
      const { getPathTitle, autoLogin } = this
      const pathTitle = getPathTitle()

      scrollTop()
      this.setState({ pathTitle }, autoLogin)
   }

   ///// METHODS FOR INTERACTING WITH API /////

   autoLogin = async () => {
      const { location, history, logIn } = this.props
      const { pathname } = location
      const localUser = JSON.parse(localStorage.getItem('MFFMS_USER')) || {}

      if (!isEmptyObj(localUser)) {
         const { tenDangNhap, hash } = localUser
         const { taiKhoan } = apiRoutes
         const { validateHash } = taiKhoan
         const url = validateHash
         const response = await apiPost(url, { tenDangNhap, hash })

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState(
               { showLoginPage: false, autoLoginEnabled: false },
               () => {
                  logIn(data)

                  if (pathname === '/dang-nhap') {
                     history.push('/')
                  }
               }
            )
         } else {
            this.setState({ showLoginPage: true, autoLoginEnabled: false })
         }
      } else {
         this.setState({ showLoginPage: true, autoLoginEnabled: false })
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   onLogOut = () => {
      const { history, logOut } = this.props
      localStorage.removeItem('MFFMS_USER')
      logOut()
      history.push('/dang-nhap')
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getPathTitle = () => {
      const { location } = this.props
      const { pathname } = location
      const standardPathName = pathname
         .split('/')
         .slice(0, 3)
         .join('/')
      let pathTitle = ''

      menu.forEach(item => {
         const { items } = item

         items.forEach(menuItem => {
            const { title, path } = menuItem

            if (path === standardPathName) {
               pathTitle = title
            }
         })
      })

      return pathTitle
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

   renderHeaderRight = () => {
      const { renderProfileInfo, renderProfileDropdownMenu } = this

      return (
         <div className="main-header__right">
            {renderProfileInfo()}
            {renderProfileDropdownMenu()}
         </div>
      )
   }

   renderProfileInfo = () => {
      const { user } = this.props
      const { hoVaTen, tenDangNhap, phanQuyen } = user
      return (
         <Fragment>
            <div>
               <div className="main-header__profile-name">
                  {hoVaTen || tenDangNhap}
               </div>
               <div className="main-header__profile-role">
                  <i className="fas fa-user-circle"></i> {phanQuyen}
               </div>
            </div>
         </Fragment>
      )
   }

   renderProfileDropdownMenu = () => {
      const { onLogOut } = this
      const { user } = this.props
      const { maTaiKhoan } = user

      return (
         <div className="main-header__dropdown-menu">
            <ul className="main-nav__list">
               <li className="main-nav__list-item">
                  <NavLink to={`/tai-khoan/cap-nhat/${maTaiKhoan}`}>
                     <i className="fas fa-address-card"></i>&nbsp;&nbsp;Cập nhật
                     thông tin
                  </NavLink>
               </li>
               <li className="main-nav__list-item">
                  <NavLink to={`/tai-khoan/thay-doi-mat-khau/${maTaiKhoan}`}>
                     <i className="fas fa-lock"></i>&nbsp;&nbsp;Thay đổi mật
                     khẩu
                  </NavLink>
               </li>
               <li className="main-nav__list-item">
                  <NavLink to="#" onClick={onLogOut}>
                     <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Đăng
                     xuất
                  </NavLink>
               </li>
            </ul>
         </div>
      )
   }

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
      const { user } = this.props
      const { phanQuyen } = user
      const sectionsForUser = SECTIONS_FOR_ROLES.find(
         item => item.role === phanQuyen
      )
      const filteredMenu =
         sectionsForUser &&
         sectionsForUser.sections.map(section =>
            menu.find(menuItem => menuItem.title === section)
         )

      return (
         filteredMenu &&
         filteredMenu.map((item, index) => {
            const { title, items } = item

            return (
               <Fragment key={index}>
                  <div className="main-nav__title">{title}</div>
                  <ul className="main-nav__list">
                     {items.map((menuItem, index) => (
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
                     ))}
                  </ul>
               </Fragment>
            )
         })
      )
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

   // renderNotification = () => {
   //    return <Notification />
   // }

   renderComponent = () => {
      const { renderHeader, renderMain } = this
      const { showLoginPage } = this.state

      if (showLoginPage) {
         return <Login />
      } else {
         return (
            <Fragment>
               {renderHeader()}
               {renderMain()}
               {/* {renderNotification()} */}
            </Fragment>
         )
      }
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

const mapStateToProps = state => ({
   user: state.user
})

export default withRouter(connect(mapStateToProps, { logIn, logOut })(App))
