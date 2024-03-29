import Axios from 'axios'
import { TOKEN_USER, DOMAIN_SERVER } from '../util/const/data'

export const loginUserInfor = async (email, password) => {
	return await Axios.post(`${DOMAIN_SERVER}/users/login-user`, {
		email,
		password
	})
}

export const getUserInfor = async () => {
	return await Axios.get(`${DOMAIN_SERVER}/users/get-user-info`, {
		headers: {
			token: localStorage.getItem(TOKEN_USER)
		}
	})
}

export const registerUserInfor = async ({
	name_user,
	phone_number,
	password,
	email
}) => {
	return await Axios.post(`${DOMAIN_SERVER}/users/register-user`, {
		name_user,
		phone_number,
		password,
		email
	})
}
