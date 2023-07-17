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
