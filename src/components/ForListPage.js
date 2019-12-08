import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Section from './Section'
import { PAGE_SIZES } from '../constants'
import { formatDateString, scrollTop } from '../utils'
import axios from 'axios'
import { debounce } from 'debounce'
import LoadingIndicator from './LoadingIndicator'
import DeleteDialog from './DeleteDialog'

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
         hasNextPage: false,
         searchData: null,
         loading: true,
         loadingTableData: false,
         showDeleteDialog: false,
         recordToDelete: ''
      }

      this.fetchData = debounce(this.fetchData, 50)
   }

   ///// METHODS FOR REACT LIFECYCLES /////

   componentWillMount() {
      const { initializeSearchData } = this
      const searchData = initializeSearchData()

      this.setState({ searchData })
   }

   componentDidMount() {
      const { fetchData } = this

      scrollTop()
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

   fetchData = async (isFirstLoad = true) => {
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

            if (isFirstLoad) {
               this.setState({
                  totalItems,
                  totalPages,
                  data,
                  statusStatistics,
                  loading: false
               })
            } else {
               this.setState({
                  totalItems,
                  totalPages,
                  data,
                  statusStatistics,
                  loadingTableData: false
               })
            }
         } else {
            this.setState({ loading: false })

            throw new Error(response.errors)
         }
      } catch (error) {
         this.setState({ loading: false })

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
      const { fetchData } = this
      const pageSize = parseInt(e.target.value)

      this.setState({ pageSize, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   changePageNumber = e => {
      const { fetchData } = this
      const pageNumber = parseInt(e.target.value)

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   showPrevPage = () => {
      const { fetchData } = this
      let { pageNumber } = this.state

      if (pageNumber > 1) {
         pageNumber--
      }

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   showNextPage = () => {
      const { fetchData } = this
      let { pageNumber, totalPages } = this.state

      if (pageNumber < totalPages) {
         pageNumber++
      }

      this.setState({ pageNumber, loadingTableData: true }, () =>
         fetchData(false)
      )
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

      this.setState({ sortField, sortOrder, loadingTableData: true }, () =>
         fetchData(false)
      )
   }

   changeSearchData = (e, fieldName) => {
      const { fetchData } = this
      const { searchData } = this.state
      const value = e.target.value

      if (typeof value === 'number') {
         value = parseInt(value)
      }

      searchData[fieldName] = value

      this.setState({ searchData, loadingTableData: true }, () =>
         fetchData(false)
      )
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
            status: 0,
            loading: true
         },
         fetchData
      )
   }

   resetSearchData = () => {
      const { initializeSearchData } = this
      const searchData = initializeSearchData()

      this.setState({ searchData })
   }

   importData = () => {}
   exportData = () => {}
   exportReport = () => {}

   toggleShowDeleteDialog = () => {
      const { showDeleteDialog } = this.state

      this.setState({ showDeleteDialog: !showDeleteDialog })
   }

   deleteById = recordId => {
      const { toggleShowDeleteDialog } = this
      const recordToDelete = recordId

      this.setState({ recordToDelete }, toggleShowDeleteDialog)
   }

   deleteByIdOnSuccess = () => {
      const { toggleShowDeleteDialog, refresh } = this

      toggleShowDeleteDialog()
      refresh()
   }

   ///// METHODS FOR CHECKING VALUES /////

   isBeingSorted = columnName => {
      const { sortField } = this.state

      return sortField === columnName
   }

   ///// METHODS FOR COMPUTING VALUES /////

   initializeSearchData = () => {
      const { settings } = this.props
      const { columns } = settings
      let searchData = {}

      columns.forEach(field => {
         const { search, propForValue } = field
         const { type } = search

         switch (type) {
            case 'input': {
               searchData[propForValue] = ''
               break
            }

            // case 'date': {
            //    searchData[propForValue] = moment().format('YYYY-MM-DD')
            //    break
            // }

            // case 'select': {
            //    const { values, propForItemValue } = field

            //    searchData[propForValue] = values[0][propForItemValue]
            //    break
            // }

            case 'textarea': {
               searchData[propForValue] = ''
               break
            }
         }
      })

      return searchData
   }

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
      const { renderSectionHeaderRight, renderTable, renderPagination } = this
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
            {renderTable()}
            {renderPagination()}
         </Section>
      )
   }

   // renderToolbar = () => {
   //    const { changeKeyword, changeStatus } = this
   //    const { keyword, status, statusStats } = this.state

   //    return (
   //       <div className="section-body-toolbar">
   //          <div className="search-box__wrapper">
   //             <span className="search-button">
   //                <i className="fas fa-search"></i>
   //             </span>

   //             <input
   //                type="text"
   //                className="search-box"
   //                placeholder="Nhập từ khóa cần tìm kiếm"
   //                value={keyword}
   //                onChange={changeKeyword}
   //             />
   //          </div>

   //          <div className="table-tabs">
   //             <span
   //                className={status === 0 ? 'table-tab-active' : 'table-tab'}
   //                onClick={() => changeStatus(0)}
   //             >
   //                Tất cả ({statusStats.all})
   //             </span>

   //             <span
   //                className={
   //                   this.state.status === 1 ? 'table-tab-active' : 'table-tab'
   //                }
   //                onClick={() => changeStatus(1)}
   //             >
   //                Đang hiển thị ({statusStats.active})
   //             </span>

   //             <span
   //                className={status === -1 ? 'table-tab-active' : 'table-tab'}
   //                onClick={() => changeStatus(-1)}
   //             >
   //                Đã xóa ({statusStats.inactive})
   //             </span>
   //          </div>
   //       </div>
   //    )
   // }

   renderTable = () => {
      const { renderTableHeader, renderTableToolbar, renderTableBody } = this

      return (
         <table className="table">
            {renderTableHeader()}
            {renderTableToolbar()}
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

   renderTableToolbar = () => {
      const { renderTableToolbarCell, resetSearchData } = this
      const { searchData } = this.state
      const { settings } = this.props
      const { columns } = settings

      return (
         <thead>
            <tr>
               <th className="thead-cell-centered">
                  {searchData !== null ? (
                     <i
                        className="fas fa-times-circle reset-search-data"
                        onClick={resetSearchData}
                     ></i>
                  ) : (
                     <i className="fas fa-search"></i>
                  )}
               </th>

               {columns.map((column, index) => (
                  <th key={index}>{renderTableToolbarCell(column)}</th>
               ))}
            </tr>
         </thead>
      )
   }

   renderTableToolbarCell = column => {
      const { changeSearchData } = this
      const { searchData } = this.state
      const { search, propForValue } = column
      const { type, placeholder } = search

      switch (type) {
         case 'input': {
            return (
               <input
                  className="form-input-outline"
                  type="text"
                  placeholder={placeholder}
                  value={searchData[propForValue]}
                  onChange={e => changeSearchData(e, propForValue)}
               />
            )
         }

         // case 'date': {
         //    return (
         //       <input
         //          className="form-input-outline"
         //          type="date"
         //          placeholder={placeholder}
         //          value={editingData[propForValue]}
         //          onChange={e => changeEditingData(e, propForValue)}
         //          onFocus={hideAlert}
         //          disabled={disabled}
         //       />
         //    )
         // }

         case 'select': {
            const { search } = column
            const { values, propForItemText, propForItemValue } = search

            return (
               <select
                  className="form-input-outline"
                  value={searchData[propForValue]}
                  onChange={e => changeSearchData(e, propForValue)}
               >
                  <option value="-1">Tất cả</option>
                  {values.length > 0 &&
                     values.map((record, index) => (
                        <option key={index} value={record[propForItemValue]}>
                           {record[propForItemText]}
                        </option>
                     ))}
               </select>
            )
         }
      }
   }

   renderTableBody = () => {
      const { renderTableData, renderEmptyTable } = this
      const { data, loadingTableData } = this.state
      const { settings } = this.props
      const { columns } = settings

      return (
         <LoadingIndicator
            isLoading={false}
            wrapperTag="tbody"
            colSpan={columns.length}
         >
            {data.length > 0 ? renderTableData() : renderEmptyTable()}
         </LoadingIndicator>
      )
   }

   renderTableData = () => {
      const { getCurrentStatusColors, getCurrentStatusText, deleteById } = this
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

                  <li
                     className="table-dropdown-menu-item"
                     onClick={() => deleteById(record[idColumn])}
                  >
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

   renderDialogs = () => {
      const { toggleShowDeleteDialog, deleteByIdOnSuccess } = this
      const { showDeleteDialog, recordToDelete } = this.state
      const { settings } = this.props
      const { entity, api } = settings
      const deleteDialogSettings = {
         isOpen: showDeleteDialog,
         onClose: toggleShowDeleteDialog,
         onSuccess: deleteByIdOnSuccess,
         entity,
         id: recordToDelete,
         api
      }

      return (
         <Fragment>
            <DeleteDialog settings={deleteDialogSettings} />
         </Fragment>
      )
   }

   renderComponent = () => {
      const { renderHeader, renderBody, renderDialogs } = this
      const { loading } = this.state

      return (
         <LoadingIndicator isLoading={loading}>
            {renderHeader()}
            {renderBody()}
            {renderDialogs()}
         </LoadingIndicator>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ForListPage
