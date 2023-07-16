import { GET_ORDER_DETAIL_SAGA, ORDER_DETAIL_SAGA } from '../type'

const orderDetailData = {
	statusCreateOrderDetail: '',
	listOrderDetail: []
}

const orderDetailReducer = (state = orderDetailData, action) => {
	switch (action.type) {
		case ORDER_DETAIL_SAGA: {
			if (action.data === '201') {
				state.statusCreateOrderDetail = true
			} else if (action.data === '400') {
				if (state.statusCreateOrderDetail === '') {
					state.statusCreateOrderDetail = false
				} else if (state.statusCreateOrderDetail === false) {
					state.statusCreateOrderDetail = 'error'
				} else if (state.statusCreateOrderDetail === 'error') {
					state.statusCreateOrderDetail = false
				}
			} else {
				state.statusCreateOrderDetail = ''
			}
			return { ...state }
		}
		case GET_ORDER_DETAIL_SAGA: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listOrderDetail = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default orderDetailReducer