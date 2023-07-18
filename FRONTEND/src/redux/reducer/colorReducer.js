import { GET_ALL_COLOR_SAGA } from '../type'

const colorData = {
	listColor: []
}

const colorReducer = (state = colorData, action) => {
	switch (action.type) {
		case GET_ALL_COLOR_SAGA: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listColor = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default colorReducer
