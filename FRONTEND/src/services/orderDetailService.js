import Axios from 'axios'
import { TOKEN_USER, DOMAIN_SERVER } from '../util/const/data'

export const orderDetail = async ({
	product_id,
	price,
	count,
	color,
	size
}) => {
	return await Axios.post(
		`${DOMAIN_SERVER}/orderDetails/create-order-detail`,
		{
			product_id,
			price,
			count,
			color,
			size
		},
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const getAllOrderDetail = async () => {
	return await Axios.get(
		`${DOMAIN_SERVER}/orderDetails/get-all-order-detail`,
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const deleteOrderDetail = async (id) => {
	return await Axios.delete(
		`${DOMAIN_SERVER}/orderDetails/delete-order-detail?id=${id}`,
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const createOrder = async (item) => {
	return await Axios.post(
		`${DOMAIN_SERVER}/orders/create-order-product`,
		item,
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const getOrderManager = async () => {
	return await Axios.get(
		`${DOMAIN_SERVER}/orderDetails/get-order-detail-manager`,
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const updateRating = async ({ id, value }) => {
	return await Axios.put(
		`${DOMAIN_SERVER}/orderDetails/update-order-detail-rating?id=${id}`,
		{ value: value },
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}

export const updateStatusOrder = async (id) => {
	return await Axios.put(
		`${DOMAIN_SERVER}/orders/update-status-order?id=${id}`,
		{
			params: { id: id }
		},
		{
			headers: {
				token: localStorage.getItem(TOKEN_USER)
			}
		}
	)
}
