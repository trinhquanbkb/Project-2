import { GET_ALL_BRAND_SAGA } from '../type'

const brandData = {
	listBrand: []
}

const brandReducer = (state = brandData, action) => {
	switch (action.type) {
		case GET_ALL_BRAND_SAGA: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listBrand = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default brandReducer
