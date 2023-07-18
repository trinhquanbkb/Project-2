import { takeLatest, put } from 'redux-saga/effects'
import { GET_ALL_SIZE_SAGA } from '../type'
import { getAllSize } from '../../services/sizeService'

function* getAllSizeSaga() {
	try {
		let promise = yield getAllSize()
		yield put({
			type: GET_ALL_SIZE_SAGA,
			data: promise.data
		})
	} catch (error) {}
}

export function* sizeSaga() {
	yield takeLatest('GET_ALL_SIZE', getAllSizeSaga)
}
