import React, { useEffect } from 'react'
import FeatherIcon from 'feather-icons-react'
import { renderPrice } from '../util/const/function'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ORDER_DETAIL_SAGA } from '../redux/type'

export default function Product(item: any) {
	const dispatch = useDispatch()
	const { statusCreateOrderDetail } = useSelector(
		(state: any) => state.orderDetailReducer
	)

	useEffect(() => {
		if (statusCreateOrderDetail === true) {
			Swal.fire({
				title: 'Thêm vào giỏ hàng thành công!',
				icon: 'success',
				confirmButtonText: 'Chấp nhận'
			})
			dispatch({
				type: ORDER_DETAIL_SAGA,
				data: '500'
			})
		} else if (
			statusCreateOrderDetail === 'error' ||
			statusCreateOrderDetail === false
		) {
			Swal.fire({
				title: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		}
	}, [statusCreateOrderDetail])

	const product = item.item
	let priceSale = null
	if (product.percent_sale !== undefined) {
		priceSale = (product.price * (100 - product.percent_sale)) / 100
	}

	const imgMain = (listImg: any): any => {
		let img
		listImg.forEach((item: any) => {
			if (item.isMain === 1) {
				img = item.url
			}
		})
		return img
	}

	return (
		<div className="d-flex flex-column h-100">
			<div className="bg-product">
				<img
					className="img-product"
					src={imgMain(product.listImage)}
					alt={product.name}></img>
				{product.percent_sale == null ? null : (
					<div className="bg-sale">
						<FeatherIcon icon="zap" className="icon-hot mt-1" />
						<p className="percent-hot">
							{'-' + product.percent_sale + '%'}
						</p>
					</div>
				)}
			</div>
			<div className="infor-product">
				<p className="name-product">{product.name_product}</p>
				{priceSale === null ? (
					<div className="d-flex">
						{' '}
						<span className="price-product">
							{renderPrice(product.price, 0, []) + 'đ'}
						</span>
					</div>
				) : (
					<div className="d-flex">
						<span className="new-price">
							{renderPrice(priceSale, 0, []) + 'đ'}
						</span>
						<span className="old-price">
							{renderPrice(product.price, 0, []) + 'đ'}
						</span>
					</div>
				)}
			</div>
			<div
				className="add-to-cart"
				onClick={() => {
					dispatch({
						type: 'ORDER_DETAIL',
						data: {
							product_id: product.id,
							price: product.price,
							count: 1,
							color:
								product.listColor.length > 0
									? product.listColor[0]
									: null,
							size:
								product.listSize.length > 0
									? product.listSize[0]
									: null
						}
					})
				}}>
				Thêm vào giỏ hàng
			</div>
		</div>
	)
}
