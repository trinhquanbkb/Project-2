import {
	GET_ALL_PRODUCT,
	GET_ALL_PRODUCT_SALE,
	GET_NEW_PRODUCT,
	GET_PRODUCT_CATE,
	GET_PRODUCT_SEARCH
} from '../type'

const productData = {
	listProduct: [],
	listProductSale: [],
	listProductNew: [],
	listProductCate: [],
	listSearch: []
}

const productReducer = (state = productData, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCT: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listProduct = [...array]
			return { ...state }
		}
		case GET_ALL_PRODUCT_SALE: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listProductSale = [...array]
			return { ...state }
		}
		case GET_NEW_PRODUCT: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listProductNew = [...array]
			return { ...state }
		}
		case GET_PRODUCT_CATE: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listProductCate = [...array]
			return { ...state }
		}
		case GET_PRODUCT_SEARCH: {
			let array = []
			action.data.forEach((item) => {
				array.push(item)
			})
			state.listSearch = [...array]
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default productReducer
