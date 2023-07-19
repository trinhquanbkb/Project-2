import { CREATE_ORDER_PRODUCT_SAGA, GET_ALL_ORDER_MANAGER_SAGA } from '../type'

const orderData = {
	statusCreateOrder: '',
	orderManager: []
}

const orderReducer = (state = orderData, action) => {
	switch (action.type) {
		case CREATE_ORDER_PRODUCT_SAGA: {
			if (action.data === true) {
				state.statusCreateOrder = true
			} else if (action.data === false) {
				state.statusCreateOrder = false
			} else {
				state.statusCreateOrder = ''
			}
			return { ...state }
		}
		case GET_ALL_ORDER_MANAGER_SAGA: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.orderManager = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default orderReducer
