import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import apiRoutes from '../../routes/apis'
import { apiPost } from '../../utils'
import { APP_DESCRIPTION, APP_ABOUT } from '../../constants'

class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         userData: {
            tenDangNhap: '',
            matKhau: ''
         }
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeUserData(fieldName, value) {
      const userData = { ...this.state.userData }
      userData[fieldName] = value
      this.setState({ userData })
   }

   login = async e => {
      e.preventDefault()

      try {
         const { reset } = this
         const { userData } = this.state
         const { logIn } = this.props
         const url = apiRoutes.taiKhoan.logIn
         const response = await apiPost(url, userData)

         if (response && response.status == 200) {
            logIn({})
         } else {
            alert('Đăng nhập vào tài khoản thất bại! Vui lòng kiểm tra lại!')
            reset()
         }
      } catch (error) {
         alert('Đăng nhập vào tài khoản thất bại! Vui lòng kiểm tra lại!')
         reset()
      }
   }

   reset = () => {
      this.setState({
         userData: {
            tenDangNhap: '',
            matKhau: ''
         }
      })
   }

   ///// METHODS FOR RENDERING UI /////

   renderFormHeader = () => {
      return (
         <div className="login-form__header">
            <img src="/images/logo.png" className="login-form__icon" />
            <p className="text-center login-form__description">
               {APP_DESCRIPTION}
            </p>
         </div>
      )
   }

   renderFormBody = () => {
      const { changeUserData } = this
      const { userData } = this.state
      const { tenDangNhap, matKhau } = userData

      return (
         <Fragment>
            <hr />

            <div className="form-group">
               <label>Tên đăng nhập</label>
               <input
                  type="text"
                  placeholder="Nhập tên đăng nhập của bạn"
                  className="form-input-outline"
                  value={tenDangNhap}
                  onChange={e => changeUserData('tenDangNhap', e.target.value)}
                  autoComplete="off"
               />
            </div>

            <div className="form-group">
               <label>Mật khẩu</label>
               <input
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="form-input-outline"
                  value={matKhau}
                  onChange={e => changeUserData('matKhau', e.target.value)}
                  autoComplete="off"
               />
            </div>

            <button type="submit" className="login-button">
               Đăng nhập
            </button>

            <hr />
         </Fragment>
      )
   }

   renderFormFooter = () => {
      return <p className="login-form__footer">{APP_ABOUT}</p>
   }

   renderForm = () => {
      const { login, renderFormHeader, renderFormBody, renderFormFooter } = this

      return (
         <form onSubmit={login} className="login-form">
            {renderFormHeader()}
            {renderFormBody()}
            {renderFormFooter()}
         </form>
      )
   }

   renderComponent = () => {
      const { renderForm } = this

      return (
         <div className="container">
            <div className="col-md-6 offset-md-3 loginBox">{renderForm()}</div>
         </div>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default connect(null, actions)(Login)
