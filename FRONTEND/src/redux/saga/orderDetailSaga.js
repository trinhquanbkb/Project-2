import { takeLatest, put } from 'redux-saga/effects'
import {
	DELETE_ORDER_DETAIL_SAGA,
	GET_ORDER_DETAIL_SAGA,
	ORDER_DETAIL_SAGA
} from '../type'
import {
	deleteOrderDetail,
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

function* deleteOrderDetailSaga(action) {
	try {
		yield deleteOrderDetail(action.data)
		yield getAllOrderDetail()
		yield put({
			type: DELETE_ORDER_DETAIL_SAGA,
			data: '200'
		})
	} catch (error) {}
}

export function* orderDetailSaga() {
	yield takeLatest('ORDER_DETAIL', createOrderDetailSaga)
	yield takeLatest('GET_ALL_ORDER_DETAIL', getAllOrderDetailSaga)
	yield takeLatest('DELETE_ORDER_DETAIL', deleteOrderDetailSaga)
}
