import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Section from './Section'
import { PAGE_SIZES } from '../constants'
import { formatDateString } from '../utils'
import axios from 'axios'
import { debounce } from 'debounce'

class ForListPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         data: [],
         keyword: '',
         status: 0,
         statusStats: {
            all: 0,
            active: 0,
            inactive: 0
         },
         totalPages: 1,
         totalItems: 0,
         pageSize: 10,
         pageNumber: 1,
         sortField: 'ThoiGianTao',
         sortOrder: 'DESC',
         hasNextPage: false
      }

      this.fetchData = debounce(this.fetchData, 50)
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   formRequestParams = () => {
      const params = {}
      const {
         keyword,
         sortField,
         sortOrder,
         pageNumber,
         pageSize,
         status
      } = this.state

      params['keyword'] = keyword
      params['sortField'] = sortField
      params['sortOrder'] = sortOrder
      params['pageNumber'] = pageNumber
      params['pageSize'] = pageSize
      params['trangThai'] = status

      return params
   }

   fetchData = async () => {
      const { formRequestParams } = this
      const { settings } = this.props
      const { api } = settings
      const url = api.getAll
      const params = formRequestParams()

      try {
         const response = await axios.get(url, { params })

         if (response && response.data.status === 'SUCCESS') {
            const {
               data,
               totalItems,
               totalPages,
               statusStatistics
            } = response.data.result

            this.setState({
               totalItems,
               totalPages,
               data,
               statusStatistics
            })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR HANDLING UI EVENTS /////

   changeKeyword = e => {
      const { fetchData } = this
      const keyword = e.target.value

      this.setState({ keyword }, fetchData)
   }

   changeStatus = status => {
      this.setState({ status })
   }

   changePageSize = e => {
      const pageSize = parseInt(e.target.value)

      this.setState({ pageSize })
   }

   changePageNumber = e => {
      const pageNumber = parseInt(e.target.value)

      this.setState({ pageNumber })
   }

   showPrevPage = () => {
      const { fetchData } = this
      let { pageNumber } = this.state

      if (pageNumber > 1) {
         pageNumber--
      }

      this.setState({ pageNumber }, fetchData)
   }

   showNextPage = () => {
      const { fetchData } = this
      let { pageNumber, totalPages } = this.state

      if (pageNumber < totalPages) {
         pageNumber++
      }

      this.setState({ pageNumber }, fetchData)
   }

   sortByColumn = columnName => {
      const { fetchData } = this
      let { sortField, sortOrder } = this.state

      if (sortField !== columnName) {
         sortField = columnName
         sortOrder = 'ASC'
      } else {
         if (sortOrder === 'ASC') {
            sortOrder = 'DESC'
         } else {
            sortOrder = 'ASC'
         }
      }

      this.setState({ sortField, sortOrder }, fetchData)
   }

   refresh = () => {
      const { fetchData } = this

      this.setState(
         {
            sortField: 'ThoiGianTao',
            sortOrder: 'DESC',
            pageNumber: 1,
            pageSize: 10,
            keyword: '',
            status: 0
         },
         fetchData
      )
   }

   importData = () => {}
   exportData = () => {}
   exportReport = () => {}

   ///// METHODS FOR CHECKING VALUES /////

   isBeingSorted = columnName => {
      const { sortField } = this.state

      return sortField === columnName
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getPageNumbers = () => {
      const { totalPages } = this.state
      let pageNumbers = []

      for (let i = 1; i <= totalPages; i++) {
         pageNumbers.push(i)
      }

      return pageNumbers
   }

   getCurrentStatusColors = statusCode => {
      switch (parseInt(statusCode)) {
         case -1:
            return {
               backgroundColor: 'lightgray',
               color: 'gray'
            }

         case 1:
            return {
               backgroundColor: '#0BBE51',
               color: '#fff'
            }
      }
   }

   getCurrentStatusText = statusCode => {
      switch (parseInt(statusCode)) {
         case -1:
            return 'Đã bị xóa'

         case 1:
            return 'Đang hiển thị'
      }
   }

   ///// METHODS FOR RENDERING UI /////

   renderHeader = () => {
      const { settings } = this.props
      const { entity } = settings
      const { name, slug } = entity

      return (
         <section className="breadcrumbs">
            <span className="breadcrumb-home">
               <Link to="/">Mini Football Field Management System (GTMS)</Link>
            </span>

            <span className="breadcrumb-separator">
               <i className="fas fa-chevron-right"></i>
            </span>

            <span className="breadcrumb-active">
               <Link to={`/${slug}`}>Quản lý {name}</Link>
            </span>
         </section>
      )
   }

   renderSectionHeaderRight = () => {
      const { refresh, importData, exportData, exportReport } = this
      const { data } = this.state
      const { settings } = this.props
      const { entity } = settings
      const { slug } = entity

      return (
         <Fragment>
            <span className="button" onClick={refresh}>
               <i className="fas fa-redo"></i>&nbsp;&nbsp;Tải lại
            </span>

            <span className="button">
               <Link to={`/quan-ly/${slug}/them-moi`}>
                  <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Thêm mới
               </Link>
            </span>

            <span className="button" onClick={importData}>
               <i className="fas fa-file-import"></i>&nbsp;&nbsp;Nhập dữ liệu
            </span>

            {data.length !== 0 && (
               <span className="button" onClick={exportData}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất dữ liệu
               </span>
            )}

            {data.length !== 0 && (
               <span className="button" onClick={exportReport}>
                  <i className="fas fa-file-export"></i>&nbsp;&nbsp;Xuất báo cáo
               </span>
            )}
         </Fragment>
      )
   }

   renderBody = () => {
      const {
         renderSectionHeaderRight,
         renderToolbar,
         renderTable,
         renderPagination
      } = this
      const { settings } = this.props
      const { entity } = settings
      const { name } = entity
      const section = {
         title: `Danh sách ${name}`,
         subtitle: `Danh sách tất cả các ${name} hiện đang được quản lý`,
         headerRight: renderSectionHeaderRight()
      }

      return (
         <Section section={section}>
            {renderToolbar()}
            {renderTable()}
            {renderPagination()}
         </Section>
      )
   }

   renderToolbar = () => {
      const { changeKeyword, changeStatus } = this
      const { keyword, status, statusStats } = this.state

      return (
         <div className="section-body-toolbar">
            <div className="search-box__wrapper">
               <span className="search-button">
                  <i className="fas fa-search"></i>
               </span>

               <input
                  type="text"
                  className="search-box"
                  placeholder="Nhập từ khóa cần tìm kiếm"
                  value={keyword}
                  onChange={changeKeyword}
               />
            </div>

            {/* <div className="table-tabs">
               <span
                  className={status === 0 ? 'table-tab-active' : 'table-tab'}
                  onClick={() => changeStatus(0)}
               >
                  Tất cả ({statusStats.all})
               </span>

               <span
                  className={
                     this.state.status === 1 ? 'table-tab-active' : 'table-tab'
                  }
                  onClick={() => changeStatus(1)}
               >
                  Đang hiển thị ({statusStats.active})
               </span>

               <span
                  className={status === -1 ? 'table-tab-active' : 'table-tab'}
                  onClick={() => changeStatus(-1)}
               >
                  Đã xóa ({statusStats.inactive})
               </span>
            </div> */}
         </div>
      )
   }

   renderTable = () => {
      const { renderTableHeader, renderTableBody } = this

      return (
         <table className="table">
            {renderTableHeader()}
            {renderTableBody()}
         </table>
      )
   }

   renderTableHeader = () => {
      const { isBeingSorted, sortByColumn } = this
      const { settings } = this.props
      const { columns } = settings

      return (
         <thead>
            <tr>
               <th></th>
               {columns.map((column, index) => (
                  <th
                     onClick={() => sortByColumn(column.propForSorting)}
                     key={index}
                  >
                     {isBeingSorted(column.propForSorting) && (
                        <i className="fas fa-sort sort-button"></i>
                     )}{' '}
                     {column.text}
                  </th>
               ))}

               {/* <th onClick={() => sortByColumn('TrangThai')}>
                  {isBeingSorted('TrangThai') && (
                     <i className="fas fa-sort sort-button"></i>
                  )}{' '}
                  Trạng thái
               </th> */}
            </tr>
         </thead>
      )
   }

   renderTableBody = () => {
      const { renderTableData, renderEmptyTable } = this
      const { data } = this.state

      return (
         <tbody>
            {data.length > 0 ? renderTableData() : renderEmptyTable()}
         </tbody>
      )
   }

   renderTableData = () => {
      const { getCurrentStatusColors, getCurrentStatusText } = this
      const { data } = this.state
      const { settings } = this.props
      const { entity, columns } = settings
      const { slug } = entity
      const idColumn = columns[0].propForValue

      return data.map((record, index) => (
         <tr key={index}>
            <td className="table-dropdown-menu-wrapper">
               <span className="table-dropdown-menu-toggle">
                  <i className="fas fa-bars"></i>
               </span>

               <ul className="table-dropdown-menu">
                  <li className="table-dropdown-menu-item">
                     <Link
                        to={`/quan-ly/${slug}/xem-thong-tin/${record[idColumn]}`}
                     >
                        Xem chi tiết
                     </Link>
                  </li>

                  <li className="table-dropdown-menu-item">
                     <Link to={'/sinh-vien/cap-nhat/' + record[idColumn]}>
                        Cập nhật thông tin
                     </Link>
                  </li>

                  <li className="table-dropdown-menu-item">
                     <Link to="#">Xóa khỏi danh sách</Link>
                  </li>

                  {/* <li className="table-dropdown-menu-item">
                     <Link to="#">Xóa tạm thời</Link>
                  </li>

                  {record.trangThai === -1 && (
                     <li className="table-dropdown-menu-item">
                        <Link to="#">Khôi phục lại</Link>
                     </li>
                  )}

                  <li className="table-dropdown-menu-item">
                     <Link to="#">Xóa vĩnh viễn</Link>
                  </li> */}
               </ul>
            </td>

            {columns.map((column, index) => (
               <td
                  className={column.isBold ? 'table-text-bold' : ''}
                  key={index}
               >
                  {column.isDateTimeValue
                     ? formatDateString(record[column.propForValue])
                     : record[column.propForValue]}
               </td>
            ))}

            {/* <td>
               <span
                  className="active-badge"
                  style={getCurrentStatusColors(record.trangThai)}
               >
                  {getCurrentStatusText(record.trangThai)}
               </span>
            </td> */}
         </tr>
      ))
   }

   renderEmptyTable = () => {
      const { keyword } = this.state

      return (
         <tr>
            <td className="text-center" colSpan={10}>
               {keyword !== '' ? 'Không tìm thấy kết quả nào' : 'Trống'}
            </td>
         </tr>
      )
   }

   renderPagination = () => {
      const {
         changePageSize,
         changePageNumber,
         getPageNumbers,
         showPrevPage,
         showNextPage
      } = this
      const { totalPages, totalItems, pageSize } = this.state

      return (
         <div className="table-pagination">
            <div className="table-pagination__left">
               {totalItems > 0 ? (
                  <p>
                     Danh sách có tất cả <strong>{totalItems}</strong> kết quả
                  </p>
               ) : (
                  <p>Không có kết quả nào trong danh sách</p>
               )}
            </div>

            <div className="table-pagination__right">
               <label className="table-pagination__label">Hiển thị dòng</label>
               <select
                  className="table-pagination__select"
                  value={pageSize}
                  onChange={changePageSize}
               >
                  {PAGE_SIZES.map((pageSize, index) => (
                     <option key={index} value={pageSize}>
                        {pageSize}
                     </option>
                  ))}
               </select>

               <label className="table-pagination__label">Đến trang</label>
               <select
                  className="table-pagination__select"
                  onChange={changePageNumber}
               >
                  {getPageNumbers().map((pageNumber, index) => (
                     <option key={index} value={pageNumber}>
                        {pageNumber}
                     </option>
                  ))}
               </select>

               <label className="table-pagination__label">
                  {' '}
                  / {totalPages}
               </label>

               <span
                  className="table-pagination__button"
                  onClick={showPrevPage}
               >
                  <i className="fas fa-chevron-left"></i>
               </span>
               <span
                  className="table-pagination__button"
                  onClick={showNextPage}
               >
                  <i className="fas fa-chevron-right"></i>
               </span>
            </div>
         </div>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody } = this

      return (
         <Fragment>
            {renderHeader()}
            {renderBody()}
         </Fragment>
      )
   }

   render() {
      console.log(this.props)
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForListPage
