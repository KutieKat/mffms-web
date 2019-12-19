import React, { Component, Fragment } from 'react'
import Dialog from './Dialog'
import { apiPut } from '../utils'
import { connect } from 'react-redux'
import { showNotification } from '../redux/actions'

class ResetPasswordDialog extends Component {
   constructor(props) {
      super(props)

      this.state = {
         confirmationValue: '',
         showAlert: false
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeConfirmationValue = e => {
      const confirmationValue = e.target.value

      this.setState({ confirmationValue })
   }

   onSubmit = () => {
      const { showErrorNotification } = this
      const { isValidConfirmationValue, deleteById } = this

      if (isValidConfirmationValue()) {
         deleteById()
      } else {
         showErrorNotification()
         this.setState({ showAlert: true })
      }
   }

   deleteById = async () => {
      const { showErrorNotification, showSuccessNotification } = this
      const { settings } = this.props
      const { api, id, onSuccess } = settings
      const url = `${api.resetPasswordById}/${id}`

      try {
         const response = await apiPut(url)

         if (response && response.data.status === 'SUCCESS') {
            showSuccessNotification()
            onSuccess()
         } else {
            showErrorNotification()
            this.setState({ showAlert: true })
            throw new Error(response.errors)
         }
      } catch (error) {
         showErrorNotification()
         this.setState({ showAlert: true })
      }
   }

   ///// METHODS FOR CHECKING VALUES /////

   isValidConfirmationValue = () => {
      const { confirmationValue } = this.state
      const { settings } = this.props
      const { id } = settings

      return confirmationValue === id
   }

   ///// METHODS FOR RENDERING UI /////

   showSuccessNotification = () => {
      const { showNotification, entity } = this.props

      showNotification('success', `Khôi phục mật khẩu mặc định thành công!`)
   }

   showErrorNotification = () => {
      const { showNotification, entity } = this.props

      showNotification('error', `Khôi phục mật khẩu mặc định thất bại!`)
   }

   renderComponent = () => {
      const {
         changeConfirmationValue,
         isValidConfirmationValue,
         onSubmit
      } = this
      const { confirmationValue, showAlert } = this.state
      const { settings } = this.props
      const { onClose, isOpen, id } = settings
      const dialogSettings = {
         title: `Khôi phục mật khẩu mặc định`,
         onClose: () => {
            this.setState({ showAlert: false })
            onClose()
         },
         onSubmit,
         isOpen,
         iconUrl: '/images/restore.png',
         enableSubmit: isValidConfirmationValue()
      }

      return (
         <Dialog settings={dialogSettings}>
            {!showAlert ? (
               <Fragment>
                  <p className="alert-message">
                     Bạn có chắc chắc muốn khôi phục mật khẩu mặc định cho tài
                     khoản có mã <strong>{id}</strong> hay không?
                  </p>

                  <p>
                     Hành động này đồng nghĩa với việc mật khẩu cũ sẽ bị thay
                     đổi và không thể khôi phục lại được. Để xác nhận, vui lòng
                     nhập <span className="pre">{id}</span> vào khung bên dưới
                  </p>

                  <input
                     type="text"
                     className="form-input-outline"
                     placeholder="Nhập nội dung xác nhận"
                     value={confirmationValue}
                     onChange={changeConfirmationValue}
                  />
               </Fragment>
            ) : (
               <p>
                  Khôi phục mật khẩu mặc định cho tài khoản không thành công!
               </p>
            )}
         </Dialog>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default connect(null, { showNotification })(ResetPasswordDialog)
