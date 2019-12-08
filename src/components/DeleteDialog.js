import React, { Component, Fragment } from 'react'
import Dialog from './Dialog'
import { apiDelete } from '../utils'

class DeleteDialog extends Component {
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
      const { isValidConfirmationValue, deleteById } = this

      if (isValidConfirmationValue()) {
         deleteById()
      } else {
         this.setState({ showAlert: true })
      }
   }

   deleteById = async () => {
      const { settings } = this.props
      const { api, id, onSuccess } = settings
      const url = `${api.deleteById}/${id}`

      try {
         const response = await apiDelete(url)

         if (response && response.data.status === 'SUCCESS') {
            onSuccess()
         } else {
            this.setState({ showAlert: true })
            throw new Error(response.errors)
         }
      } catch (error) {
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

   renderComponent = () => {
      const {
         changeConfirmationValue,
         isValidConfirmationValue,
         onSubmit
      } = this
      const { confirmationValue, showAlert } = this.state
      const { settings } = this.props
      const { onClose, entity, isOpen, id } = settings
      const { name } = entity
      const dialogSettings = {
         title: `Xóa ${name} khỏi danh sách`,
         onClose,
         onSubmit,
         isOpen,
         iconUrl: '/images/delete.png',
         enableSubmit: isValidConfirmationValue()
      }

      return (
         <Dialog settings={dialogSettings}>
            {!showAlert ? (
               <Fragment>
                  <p className="alert-message">
                     Bạn có chắc chắc muốn xóa {name} có mã{' '}
                     <strong>{id}</strong> khỏi danh sách hay không?
                  </p>

                  <p>
                     Hành động này đồng nghĩa với việc dữ liệu sẽ bị xóa vĩnh
                     viễn khỏi hệ thống và không thể khôi phục lại được. Để xác
                     nhận, vui lòng nhập <span className="pre">{id}</span> vào
                     khung bên dưới
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
               <p>Xóa vĩnh viễn dữ liệu khỏi hệ thống không thành công!</p>
            )}
         </Dialog>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default DeleteDialog
