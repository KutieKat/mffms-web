import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
   render() {
      return (
         <div className="not-found">
            <img
               src="/images/page-not-found.png"
               alt="Not Found"
               className="not-found__image"
            />

            <h3 className="not-found__title">Không tìm thấy trang</h3>

            <p className="not-found__subtitle">
               Xin lỗi! Chúng tôi không tìm thấy trang mà bạn vừa yêu cầu
            </p>

            <span className="button">
               <Link to="/">
                  <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Trở về trang
                  chủ
               </Link>
            </span>
         </div>
      )
   }
}

export default NotFound
