import { GET_ALL_SIZE_SAGA } from '../type'

const sizeData = {
	listSize: []
}

const sizeReducer = (state = sizeData, action) => {
	switch (action.type) {
		case GET_ALL_SIZE_SAGA: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listSize = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default sizeReducer
