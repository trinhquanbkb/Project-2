import { LOGIN_USER, REGISTER_USER, USER_INFO_SAGA } from '../type'

const userData = {
	statusLogin: '',
	statusRegister: '',
	userInfo: null
}

const userReducer = (state = userData, action) => {
	switch (action.type) {
		case LOGIN_USER: {
			if (action.data === '200') {
				state.statusLogin = true
			} else if (action.data === '401') {
				state.statusLogin = false
			} else {
				state.statusLogin = ''
			}
			return { ...state }
		}
		case REGISTER_USER: {
			if (action.data === '201') {
				state.statusRegister = true
			} else if (action.data === '500') {
				if (state.statusRegister === '') {
					state.statusRegister = false
				} else if (state.statusRegister === false) {
					state.statusRegister = 'error'
				} else if (state.statusRegister === 'error') {
					state.statusRegister = false
				} else {
					state.statusRegister = ''
				}
			}
			return { ...state }
		}
		case USER_INFO_SAGA: {
			state.userInfo = { ...action.data }
			return { ...state }
		}
		default: {
			return { ...state }
		}
	}
}

export default userReducer
