import Axios from 'axios'
import { DOMAIN_SERVER } from '../util/const/data'

export const getAllBrand = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/brands/get-all-brand`)
}
