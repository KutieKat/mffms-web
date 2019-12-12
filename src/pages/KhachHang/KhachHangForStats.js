import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { khachHang } from '../../entities'

class KhachHangForStats extends Component {
    constructor(props) {
        super(props)

        this.settings = {
            entity: khachHang,
            api: apiRoutes.khachHang,
            cards: [{
                    label: 'Tổng số khách hàng',
                    propForValue: 'total', // customers
                    icon: 'fas fa-users',
                    unit: 'Người'
                },
                {
                    label: 'Tổng số học sinh',
                    propForValue: 'student',
                    icon: 'fas fa-users',
                    unit: 'Người'
                },
                {
                    label: 'Tống số thanh niên',
                    propForValue: 'youth',
                    icon: 'fas fa-users',
                    unit: 'Người'
                },
                {
                    label: 'Tổng số người lớn',
                    propForValue: 'adult',
                    icon: 'fas fa-users',
                    unit: 'Người'
                },
            ]
        }
    }

    ///// METHODS FOR RENDERING UI /////

    renderComponent = () => {
        const { settings } = this

        return <ForStatsPage settings = { settings }
        />
    }

    render() {
        const { renderComponent } = this

        return renderComponent()
    }
}

export default KhachHangForStats