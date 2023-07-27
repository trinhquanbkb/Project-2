import React, { useEffect } from 'react'
import HorizontalLayout from '../../../layouts/HorizontalLayout'
import { useDispatch, useSelector } from 'react-redux'
import RatingStar from '../../../components/RatingStar'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { linkProduct } from '../../../util/const/function'

export default function Ordermanager() {
	const dispatch = useDispatch()
	const { orderManager } = useSelector((state: any) => state.orderReducer)
	const { listProduct } = useSelector((state: any) => state.productReducer)
	useEffect(() => {
		dispatch({
			type: 'GET_ALL_ORDER_MANAGER'
		})
		dispatch({
			type: 'GET_PRODUCTS'
		})
	}, [])

	useEffect(() => {}, [orderManager, listProduct])

	const renderStatus = (item: any) => {
		if (item.status === 1) {
			return (
				<div>
					<p className="text-danger">Sản phẩm đang chờ để duyệt</p>
					<button
						className="btn btn-danger"
						onClick={() => {
							Swal.fire({
								title: 'Bạn có chắc chắn hủy đơn hàng này không?',
								icon: 'warning',
								confirmButtonText: 'Xác nhận',
								showCancelButton: true,
								preConfirm: () => {
									dispatch({
										type: 'DELETE_ORDER_DETAIL',
										data: item.id
									})
									setTimeout(() => {
										dispatch({
											type: 'GET_ALL_ORDER_MANAGER'
										})
									}, 300)
									setTimeout(() => {
										Swal.fire({
											title: 'Hủy đơn thành công.',
											icon: 'success',
											confirmButtonText: 'OK'
										})
									}, 500)
								}
							})
						}}>
						Hủy đơn
					</button>
				</div>
			)
		} else if (item.status === 2) {
			return (
				<div>
					<p className="text-warning">Sản phẩm đang được giao</p>
					<button
						className="btn btn-danger"
						onClick={() => {
							Swal.fire({
								title: 'Bạn có chắc chắn đã nhận đơn hàng này không?',
								icon: 'warning',
								confirmButtonText: 'Xác nhận',
								showCancelButton: true,
								preConfirm: () => {
									dispatch({
										type: 'ORDER_BROWSING',
										data: item.orders_orderDetail_id
									})
									setTimeout(() => {
										dispatch({
											type: 'GET_ALL_ORDER_MANAGER'
										})
									}, 300)
									setTimeout(() => {
										Swal.fire({
											title: 'Cảm ơn bạn, hãy đánh giá 5 sao cho chúng tôi nhé!',
											icon: 'success',
											confirmButtonText: 'OK'
										})
									}, 500)
								}
							})
						}}>
						Đã nhận hàng?
					</button>
				</div>
			)
		} else if (item.status === 3) {
			return (
				<div>
					<p className="text-success">Đã mua</p>
					<button
						className="btn btn-success"
						onClick={() => {
							Swal.fire({
								title: 'Bạn có chắc chắn xóa đơn hàng đã mua này ra khỏi danh sách không?',
								icon: 'warning',
								confirmButtonText: 'Xác nhận',
								showCancelButton: true,
								preConfirm: () => {
									dispatch({
										type: 'DELETE_ORDER_DETAIL',
										data: item.id
									})
									setTimeout(() => {
										dispatch({
											type: 'GET_ALL_ORDER_MANAGER'
										})
									}, 300)
									setTimeout(() => {
										Swal.fire({
											title: 'Xóa đơn hàng ra khỏi danh sách thành công.',
											icon: 'success',
											confirmButtonText: 'OK'
										})
									}, 500)
								}
							})
						}}>
						Xóa đơn
					</button>
				</div>
			)
		}
	}

	const renderRating = (item: any) => {
		if (item.status === 1) {
			return (
				<p style={{ color: '#6c757d' }}>
					Bạn chưa thể đánh giá sản phẩm này
				</p>
			)
		} else if (item.status === 2) {
			return (
				<p style={{ color: '#6c757d' }}>
					Bạn chưa thể đánh giá sản phẩm này
				</p>
			)
		} else if (item.status === 3) {
			if (item.rating === null) {
				return (
					<button
						className="btn btn-success"
						onClick={() => {
							Swal.fire({
								title: 'Bạn đánh giá sản phẩm bao nhiêu điểm',
								icon: 'question',
								input: 'select',
								inputOptions: {
									1: 1,
									2: 2,
									3: 3,
									4: 4,
									5: 5
								},
								inputPlaceholder:
									'Đánh giá trên thang từ 1 đến 5',
								confirmButtonText: 'Xác nhận',
								showCancelButton: true,
								preConfirm: (value) => {
									dispatch({
										type: 'UPDATE_RATING_ORDER',
										data: {
											id: item.id,
											value: value
										}
									})
									setTimeout(() => {
										Swal.fire({
											title: 'Đã đánh giá thành công.',
											icon: 'success',
											confirmButtonText: 'OK'
										})
									}, 300)
									setTimeout(() => {
										dispatch({
											type: 'GET_ALL_ORDER_MANAGER'
										})
									}, 600)
								}
							})
						}}>
						Đánh giá sản phẩm
					</button>
				)
			} else {
				return (
					<div>
						<RatingStar
							size={'sm'}
							maxValue={5}
							value={item.rating}
						/>
						<button
							className="btn btn-warning mt-4"
							onClick={() => {
								Swal.fire({
									title: 'Bạn đánh giá sản phẩm bao nhiêu điểm',
									icon: 'question',
									input: 'select',
									inputOptions: {
										1: 1,
										2: 2,
										3: 3,
										4: 4,
										5: 5
									},
									inputPlaceholder:
										'Đánh giá trên thang từ 1 đến 5',
									confirmButtonText: 'Xác nhận',
									showCancelButton: true,
									preConfirm: (value) => {
										dispatch({
											type: 'UPDATE_RATING_ORDER',
											data: {
												id: item.id,
												value: value
											}
										})
										setTimeout(() => {
											dispatch({
												type: 'GET_ALL_ORDER_MANAGER'
											})
										}, 300)
										setTimeout(() => {
											Swal.fire({
												title: 'Đã đánh giá thành công.',
												icon: 'success',
												confirmButtonText: 'OK'
											})
										}, 500)
									}
								})
							}}>
							Bạn muốn đánh giá lại?
						</button>
					</div>
				)
			}
		}
	}
	const renderOrder = () => {
		return orderManager.map((item: any, index: number) => {
			return (
				<tr key={index}>
					<td className="id-order-manager">
						{item.orders_orderDetail_id}
					</td>
					<td className="img-order-manager">
						<Link
							onClick={() => {
								listProduct.forEach((i: any) => {
									if (i.id === item.products_orderDetail_id) {
										localStorage.setItem(
											'productDetail',
											JSON.stringify(i)
										)
									}
								})
							}}
							to={`/product/product-detail?${linkProduct(
								item.id
							)}`}>
							<img src={item.image} alt={item.name_product} />
						</Link>
					</td>
					<td className="name-order-manager">{item.name_product}</td>
					<td className="count-order-manager">{item.count}</td>
					<td className="price-order-manager">{item.price}</td>
					<td className="rating-order-manager">
						{renderRating(item)}
					</td>
					<td className="status-order-manager">
						{renderStatus(item)}
					</td>
				</tr>
			)
		})
	}

	return (
		<HorizontalLayout>
			<div className="container-fluid">
				<table className="table manager-order-page">
					<thead>
						<tr>
							<th scope="col" className="text-center">
								ID
							</th>
							<th scope="col" className="text-center">
								Hình ảnh
							</th>
							<th scope="col" className="text-center">
								Tên sản phẩm
							</th>
							<th scope="col" className="text-center">
								Số lượng
							</th>
							<th scope="col" className="text-center">
								Tổng Giá
							</th>
							<th scope="col" className="text-center">
								Đánh giá
							</th>
							<th scope="col" className="text-center">
								Trạng thái
							</th>
						</tr>
					</thead>
					<tbody>
						{orderManager.length > 0 ? renderOrder() : null}
					</tbody>
				</table>
				{orderManager.length === 0 ? (
					<p className="text-center mt-5 fs-2">
						Bạn chưa có đơn hàng nào!
					</p>
				) : null}
			</div>
		</HorizontalLayout>
	)
}
