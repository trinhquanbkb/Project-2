import Axios from 'axios'
import { TOKEN_ADMIN, TOKEN_USER, DOMAIN_SERVER } from '../util/const/data'

export const getAllCategory = async (id) => {
	return await Axios.get(`${DOMAIN_SERVER}/categories/get-all-category`)
}
