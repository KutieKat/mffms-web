import React, { Component } from 'react'
import Dialog from './Dialog'

class ExportReportDialog extends Component {
   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { settings } = this.props
      const {
         onClose,
         entity,
         isOpen,
         onExportToPdf,
         onExportToXlsx
      } = settings
      const { name } = entity
      const dialogSettings = {
         title: `Xuất báo cáo`,
         onClose,
         isOpen,
         iconUrl: '/images/export.png'
      }

      return (
         <Dialog settings={dialogSettings}>
            <p>Chọn định dạng tập tin mà bạn muốn xuất báo cáo ra</p>
            <div className="file-type-selection">
               <div className="file-type" onClick={onExportToXlsx}>
                  <img src="/images/excel.png" className="file-type-icon" />
                  <p className="file-type-title">XLSX</p>
               </div>

               <div className="file-type" onClick={onExportToPdf}>
                  <img src="/images/pdf.png" className="file-type-icon" />
                  <p className="file-type-title">PDF</p>
               </div>
            </div>
         </Dialog>
      )
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default ExportReportDialog
