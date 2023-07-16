import { takeLatest, put } from 'redux-saga/effects'
import { GET_ORDER_DETAIL_SAGA, ORDER_DETAIL_SAGA } from '../type'
import {
	getAllOrderDetail,
	orderDetail
} from '../../services/orderDetailService'

function* createOrderDetailSaga(action) {
	try {
		let promise = yield orderDetail(action.data)
		if (promise.status === 201) {
			yield put({
				type: ORDER_DETAIL_SAGA,
				data: '201'
			})
		}
	} catch (error) {
		yield put({
			type: ORDER_DETAIL_SAGA,
			data: '400'
		})
	}
}

function* getAllOrderDetailSaga() {
	try {
		let promise = yield getAllOrderDetail()
		yield put({
			type: GET_ORDER_DETAIL_SAGA,
			data: promise.data
		})
	} catch (error) {}
}

export function* orderDetailSaga() {
	yield takeLatest('ORDER_DETAIL', createOrderDetailSaga)
	yield takeLatest('GET_ALL_ORDER_DETAIL', getAllOrderDetailSaga)
}
