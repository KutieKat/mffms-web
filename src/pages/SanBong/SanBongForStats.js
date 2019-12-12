import React, { Component } from 'react'
import ForStatsPage from '../../components/ForStatsPage'
import apiRoutes from '../../routes/apis'
import { sanBong } from '../../entities'

class SanBongForStats extends Component {
    constructor(props) {
        super(props)

        this.settings = {
            entity: sanBong,
            api: apiRoutes.sanBong,
            cards: [{
                    label: 'Tổng số sân bóng',
                    propForValue: 'total',
                    icon: 'far fa-futbol',
                    unit: 'Sân'
                },
                {
                    label: 'Diện tích nhỏ nhất',
                    propForValue: 'minArea',
                    icon: 'fas fa-ruler',
                    unit: 'm2'
                },
                {
                    label: 'Diện tích lớn nhất',
                    propForValue: 'maxArea',
                    icon: 'fas fa-ruler',
                    unit: 'm2'
                }
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

export default SanBongForStats