import Axios from 'axios'
import { DOMAIN_SERVER } from '../util/const/data'

export const getAllColor = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/colors/get-all-color`)
}
