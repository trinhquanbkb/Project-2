import React, { useState, useEffect } from 'react'
import { renderPrice } from '../util/const/function'
import Button from './Button'
import { renderCode } from '../util/const/function'
import InputQuantity from './InputQuantity'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ORDER_DETAIL_SAGA } from '../redux/type'

export default function ContentProduct(item: any) {
	const dispatch = useDispatch()
	const { statusCreateOrderDetail } = useSelector(
		(state: any) => state.orderDetailReducer
	)

	const productDetail = item.item

	const [colorSelect, setColorSelect] = useState(
		productDetail.listColor.length === 0 ? null : productDetail.listColor[0]
	)
	const [sizeSelect, setSizeSelect] = useState(
		productDetail.listSize.length === 0 ? null : productDetail.listSize[0]
	)
	const [inputValue, setInputValue] = useState(1)

	const handleInputChange = (value: any) => {
		setInputValue(value)
	}

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

	return (
		<div className="d-flex flex-column">
			<p className="name-product mb-2 lh-sm">
				{productDetail.name_product}
			</p>
			<div className="d-flex justify-content-between">
				<p className="price-product">
					Giá:{' '}
					<span className="text-danger fw-bold">
						{renderPrice(productDetail.price, 0, [])}đ
					</span>
				</p>
				<p className="m-0" style={{ fontSize: '14px' }}>
					MSP: #{renderCode(productDetail.id)}
				</p>
			</div>
			<p className="m-0">
				Đánh giá:{' '}
				<span className="fw-bold">{productDetail.rating}/5</span> (Đã
				bán: <span className="fw-bold">{productDetail.sold}</span>)
			</p>
			<p className="m-0">
				Sản phẩm còn lại:{' '}
				<span className="fw-bold">{productDetail.remain}</span>
			</p>
			<p>
				Thương hiệu:{' '}
				<span className="fw-bold">{productDetail.name_brand}</span>
			</p>
			{productDetail.listColor.length === 0 ? null : (
				<div>
					<p className="mt-3 mb-2">Màu sắc:</p>
					<div className="d-flex flex-wrap">
						{productDetail.listColor.map(
							(item: any, index: number) => {
								if (item === colorSelect) {
									return (
										<Button
											key={index}
											color={item}
											click={true}></Button>
									)
								} else {
									return (
										<div
											onClick={() => {
												setColorSelect(item)
											}}>
											<Button
												key={index}
												color={item}
												click={false}></Button>
										</div>
									)
								}
							}
						)}
					</div>
				</div>
			)}
			{productDetail.listSize.length === 0 ? null : (
				<div>
					<p className="mt-2 mb-2">Kích thước:</p>
					<div className="d-flex flex-wrap">
						{productDetail.listSize.map(
							(item: any, index: number) => {
								if (sizeSelect === item) {
									return (
										<div
											key={index}
											onClick={() => {
												setSizeSelect(item)
											}}>
											<Button
												color="#DCDCDC"
												click={true}>
												{item}
											</Button>
										</div>
									)
								} else {
									return (
										<div
											key={index}
											onClick={() => {
												setSizeSelect(item)
											}}>
											<Button
												color="#DCDCDC"
												click={false}>
												{item}
											</Button>
										</div>
									)
								}
							}
						)}
					</div>
				</div>
			)}
			<p className="mt-2 mb-2">Chọn số lượng:</p>
			<InputQuantity
				onInputChange={handleInputChange}
				remain={productDetail.remain}
			/>
			<button
				onClick={() => {
					dispatch({
						type: 'ORDER_DETAIL',
						data: {
							product_id: productDetail.id,
							price: productDetail.price,
							count: inputValue,
							color: colorSelect,
							size: sizeSelect
						}
					})
				}}
				type="button"
				className="btn btn-warning btn-add-to-cart">
				THÊM VÀO GIỎ HÀNG
			</button>
			<div className="mt-4 d-flex flex-wrap">
				<p className="tags">#tags: </p>
				{productDetail.listTag.map((item: any, index: number) => {
					return (
						<button key={index} className="btn-tags">
							{item}
						</button>
					)
				})}
			</div>
		</div>
	)
}
