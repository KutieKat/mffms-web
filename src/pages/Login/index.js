import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { showNotification, logIn } from '../../redux/actions'
import apiRoutes from '../../routes/apis'
import { apiPost, isEmptyObj } from '../../utils'
import { APP_SHORT_NAME, APP_DESCRIPTION, APP_ABOUT } from '../../constants'
import LoadingIndicator from '../../components/LoadingIndicator'
import { withRouter } from 'react-router-dom'

class Login extends Component {
   constructor(props) {
      super(props)

      this.state = {
         userData: {
            tenDangNhap: '',
            matKhau: ''
         },
         loading: false,
         showAlert: false,
         errors: null
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeUserData = (fieldName, value) => {
      const userData = { ...this.state.userData }
      userData[fieldName] = value

      this.setState({ userData })
   }

   login = async () => {
      const { reset, showSuccessNotification, showErrorNotification } = this

      try {
         const { reset } = this
         const { userData } = this.state
         const { history, logIn } = this.props
         const { taiKhoan } = apiRoutes
         const url = taiKhoan.login
         const response = await apiPost(url, userData)

         if (response && response.status === 200) {
            const { data } = response.data.result
            const { tenDangNhap, hash } = data
            const localUser = {
               tenDangNhap,
               hash
            }

            showSuccessNotification()
            this.setState({ loading: false }, () => {
               logIn(data)
               localStorage.setItem('MFFMS_USER', JSON.stringify(localUser))
               history.push('/')
            })
         } else {
            showErrorNotification()
            this.setState({ loading: false })
            reset()
         }
      } catch (error) {
         showErrorNotification()
         this.setState({ loading: false })
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

   submit = e => {
      e.preventDefault()
      const { validateFields, login, showErrorNotification } = this
      const errors = validateFields()

      if (!errors) {
         this.setState({ showAlert: false, loading: true }, login)
      } else {
         showErrorNotification()
         this.setState({ errors, showAlert: true })
      }
   }

   hideAlert = () => {
      this.setState({ showAlert: false, errors: null })
   }

   ///// METHODDS FOR CHECKING VALUES /////

   validateFields = () => {
      const { userData } = this.state
      const { tenDangNhap, matKhau } = userData
      let errors = {}
      let tenDangNhapErrors = []
      let matKhauErrors = []

      if (tenDangNhap === '') {
         tenDangNhapErrors.push(
            'Tên đăng nhập là thông tin bắt buộc và không được để trống!'
         )
      }

      if (matKhau === '') {
         matKhauErrors.push(
            'Mật khẩu là thông tin bắt buộc và không được để trống!'
         )
      }

      if (matKhau.length < 6) {
         matKhauErrors.push('Mật khẩu phải có ít nhất 6 ký tự!')
      }

      if (tenDangNhapErrors.length > 0) {
         errors['tenDangNhap'] = {
            name: 'Tên đăng nhập',
            errors: tenDangNhapErrors
         }
      }

      if (matKhauErrors.length > 0) {
         errors['matKhau'] = {
            name: 'Mật khẩu',
            errors: matKhauErrors
         }
      }

      return tenDangNhapErrors.length > 0 || matKhauErrors.length > 0
         ? errors
         : null
   }

   isValidField = fieldName => {
      const { errors } = this.state

      return (
         errors &&
         Object.keys(errors)
            .map(key => key.toLowerCase())
            .indexOf(fieldName.toLowerCase()) > -1
      )
   }

   ///// METHODS FOR RENDERING UI /////

   showSuccessNotification = () => {
      const { showNotification } = this.props

      showNotification('success', 'Đăng nhập hệ thống thành công!')
   }

   showErrorNotification = () => {
      const { showNotification } = this.props

      showNotification('error', 'Đăng nhập hệ thống thất bại!')
   }

   renderFormHeader = () => {
      return (
         <div className="login-form__header">
            <img src="/images/logo.png" className="login-form__icon" />
            <h1 className="login-form__title">{APP_SHORT_NAME}</h1>
            <p className="text-center login-form__description">
               {APP_DESCRIPTION}
            </p>
            <hr />
         </div>
      )
   }

   renderFormBody = () => {
      const { changeUserData, hideAlert, isValidField } = this
      const { userData } = this.state

      return (
         <Fragment>
            <div className="form-group">
               <label>Tên đăng nhập</label>
               <input
                  type="text"
                  placeholder="Nhập tên đăng nhập của bạn"
                  className={
                     isValidField('tenDangNhap')
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  value={userData && userData.tenDangNhap}
                  onChange={e => changeUserData('tenDangNhap', e.target.value)}
                  onFocus={hideAlert}
                  autoComplete="off"
               />
            </div>

            <div className="form-group">
               <label>Mật khẩu</label>
               <input
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className={
                     isValidField('matKhau')
                        ? 'form-input-alert'
                        : 'form-input-outline'
                  }
                  value={userData && userData.matKhau}
                  onChange={e => changeUserData('matKhau', e.target.value)}
                  onFocus={hideAlert}
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
      const {
         submit,
         renderFormHeader,
         renderErrors,
         renderFormBody,
         renderFormFooter
      } = this

      return (
         <form onSubmit={submit} className="login-form">
            {renderFormHeader()}
            {renderErrors()}
            {renderFormBody()}
            {renderFormFooter()}
         </form>
      )
   }

   renderErrors = () => {
      const { showAlert, errors } = this.state

      return (
         showAlert && (
            <div className="section__alert">
               <ul>
                  {Object.keys(errors).map(error => {
                     const subErrors = errors[error].errors

                     return subErrors.map((subError, index) => (
                        <li key={index}>
                           <i className="fas fa-exclamation-triangle"></i>{' '}
                           <strong>{errors[error].name}:</strong> {subError}
                        </li>
                     ))
                  })}
               </ul>
            </div>
         )
      )
   }

   renderComponent = () => {
      const { renderForm } = this
      const { loading } = this.state

      return (
         <LoadingIndicator isLoading={loading}>
            <div className="container">
               <div className="col-md-6 offset-md-3 loginBox">
                  {renderForm()}
               </div>
            </div>
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default withRouter(connect(null, { showNotification, logIn })(Login))
