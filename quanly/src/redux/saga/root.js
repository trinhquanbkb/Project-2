import { all } from 'redux-saga/effects'
import { categorySaga } from './categorySaga'
import { productSaga } from './productSaga'
import { userSaga } from './userSaga'
import { orderDetailSaga } from './orderDetailSaga'
import { colorSaga } from './colorSaga'
import { sizeSaga } from './sizeSaga'
import { brandSaga } from './brandSaga'

export function* rootSaga() {
	yield all([
		// xử lý user
		categorySaga(),
		productSaga(),
		userSaga(),
		orderDetailSaga(),
		colorSaga(),
		sizeSaga(),
		brandSaga()
	])
}
