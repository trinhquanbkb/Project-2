import { takeLatest, put } from 'redux-saga/effects'
import { getAllColor } from '../../services/colorService'
import { GET_ALL_COLOR_SAGA } from '../type'

function* getAllColorSaga() {
	try {
		let promise = yield getAllColor()
		yield put({
			type: GET_ALL_COLOR_SAGA,
			data: promise.data
		})
	} catch (error) {}
}

export function* colorSaga() {
	yield takeLatest('GET_ALL_COLOR', getAllColorSaga)
}
