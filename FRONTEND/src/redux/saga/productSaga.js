import { takeLatest, put } from 'redux-saga/effects'
import {
	GET_ALL_PRODUCT,
	GET_ALL_PRODUCT_SALE,
	GET_NEW_PRODUCT,
	GET_PRODUCT_CATE,
	GET_PRODUCT_SEARCH
} from '../type'
import {
	getAllProduct,
	getAllProductSale,
	getNewProduct,
	getProductByCate,
	getProductByName
} from '../../services/productService'

function* getProducts() {
	try {
		let promise = yield getAllProduct()
		yield put({
			type: GET_ALL_PRODUCT,
			data: promise.data
		})
	} catch (error) {}
}

function* getProductSale() {
	try {
		let promise = yield getAllProductSale()
		yield put({
			type: GET_ALL_PRODUCT_SALE,
			data: promise.data
		})
	} catch (error) {}
}

function* getProductNew() {
	try {
		let promise = yield getNewProduct()
		yield put({
			type: GET_NEW_PRODUCT,
			data: promise.data
		})
	} catch (error) {}
}

function* getProductCateID(action) {
	try {
		let promise = yield getProductByCate(action.data)
		yield put({
			type: GET_PRODUCT_CATE,
			data: promise.data
		})
	} catch (error) {
		yield put({
			type: GET_PRODUCT_CATE,
			data: []
		})
	}
}

function* getProductByNameSaga(action) {
	try {
		let promise = yield getProductByName({ name: action.data })
		yield put({
			type: GET_PRODUCT_SEARCH,
			data: promise.data
		})
	} catch (error) {
		yield put({
			type: GET_PRODUCT_SEARCH,
			data: []
		})
	}
}

export function* productSaga() {
	yield takeLatest('GET_PRODUCTS', getProducts)
	yield takeLatest('GET_PRODUCT_SALE', getProductSale)
	yield takeLatest('GET_ALL_NEW_PRODUCT', getProductNew)
	yield takeLatest('GET_PRODUCT_BY_CATEID', getProductCateID)
	yield takeLatest('GET_PRODUCT_BY_NAME', getProductByNameSaga)
}
