import Axios from 'axios'
import { DOMAIN_SERVER } from '../util/const/data'

export const getAllProduct = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/products/get-all-product`)
}

export const getAllProductSale = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/products/get-all-product-sale`)
}

export const getNewProduct = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/products/get-new-product`)
}

export const getProductByCate = async (id) => {
	return await Axios.get(`${DOMAIN_SERVER}/products/get-product-by-cateid`, {
		params: { id: id }
	})
}

export const getProductByName = async ({ name }) => {
	return await Axios.get(`${DOMAIN_SERVER}/products/get-product-by-name`, {
		params: { name: name }
	})
}
