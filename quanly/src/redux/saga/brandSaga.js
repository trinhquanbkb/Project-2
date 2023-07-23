import { takeLatest, put } from 'redux-saga/effects'
import { getAllBrand } from '../../services/brandService'
import { GET_ALL_BRAND_SAGA } from '../type'

function* getAllBrandSaga() {
	try {
		let promise = yield getAllBrand()
		yield put({
			type: GET_ALL_BRAND_SAGA,
			data: promise.data
		})
	} catch (error) {}
}

export function* brandSaga() {
	yield takeLatest('GET_ALL_BRAND', getAllBrandSaga)
}
