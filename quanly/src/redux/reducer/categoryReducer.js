import { GET_ALL_CATEGORY } from '../type'

const categoryData = {
	listCategory: []
}

const categoryReducer = (state = categoryData, action) => {
	switch (action.type) {
		case GET_ALL_CATEGORY: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listCategory = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default categoryReducer
