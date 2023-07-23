import { takeLatest, put } from 'redux-saga/effects'
import { GET_ALL_CATEGORY } from '../type'
import { getAllCategory } from '../../services/categoryService'

function* getAllCategories(action) {
	try {
		let promise = yield getAllCategory()
		yield put({
			type: GET_ALL_CATEGORY,
			data: promise.data
		})
	} catch (error) {}
}

export function* categorySaga() {
	yield takeLatest('GET_ALL_CATEGORIES', getAllCategories)
}
