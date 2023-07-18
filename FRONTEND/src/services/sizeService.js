import Axios from 'axios'
import { DOMAIN_SERVER } from '../util/const/data'

export const getAllSize = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/sizes/get-all-size`)
}
