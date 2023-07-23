import React, { useState, useEffect } from 'react'
import { linkProduct, parseColor, renderCode } from '../util/const/function'
import { renderPrice } from '../util/const/function'
import InputQuantity from './InputQuantity'
import FeatherIcon from 'feather-icons-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function CartItem({
	cart,
	onDelete,
	onSelect,
	onNotSelect
}: any) {
	const [inputValue, setInputValue] = useState(cart.count)
	const [isSelect, setIsSelect] = useState(0)
	const dispatch = useDispatch()
	const url = linkProduct(cart.products_orderDetail_id)

	useEffect(() => {
		if (isSelect === 1) {
			onSelect({
				id: cart.id,
				totalPrice: cart.price * inputValue,
				color: cart.color,
				size: cart.size,
				count: inputValue
			})
		}
	}, [inputValue])

	const handleInputChange = (value: any) => {
		setInputValue(value)
	}

	const handleDeleteClick = () => {
		onDelete()
	}

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked === true) {
			onSelect({
				id: cart.id,
				totalPrice: cart.price * inputValue,
				color: cart.color,
				size: cart.size,
				count: inputValue
			})
			setIsSelect(1)
		} else {
			onNotSelect(cart.id)
			setIsSelect(0)
		}
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
		<div className="card-item-cart d-flex">
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
					onChange={handleCheckboxChange}
				/>
			</div>
			<div className="img-cart">
				<Link
					onClick={() => {
						localStorage.setItem(
							'productDetail',
							JSON.stringify(cart)
						)
					}}
					to={`/product/product-detail?${url}`}>
					<img
						className="img"
						src={imgMain(cart.listImage)}
						alt="img"
					/>
				</Link>
			</div>
			<div className="content-cart d-flex flex-column justify-content-between">
				<div>
					<h4 className="fw-bold mt-0">{cart?.name_product}</h4>
					<p className="mb-0">
						Mã sản phẩm:{' '}
						{cart !== undefined
							? renderCode(cart.products_orderDetail_id)
							: null}
					</p>
					<p className="mb-0">Màu sắc: {parseColor(cart?.color)}</p>
					{cart?.size == null ? null : (
						<p className="mb-0">Kích cỡ: {cart?.size}</p>
					)}

					<p className="mb-2">
						Giá:{' '}
						{cart !== undefined
							? renderPrice(cart.price, 0, [])
							: null}
						đ
					</p>
				</div>
				<div>
					<h5 className="fw-bold mt-1">Số lượng:</h5>
					<div className="d-flex justify-content-between">
						<InputQuantity
							onInputChange={handleInputChange}
							count={cart.count}
						/>
						<h5 className="fw-bold">
							Tổng:{' '}
							{cart !== undefined
								? renderPrice(inputValue * cart.price, 0, [])
								: null}
							đ
						</h5>
					</div>
				</div>
			</div>
			<FeatherIcon
				icon="x-square"
				size={26}
				onClick={() => {
					handleDeleteClick()
					onNotSelect(cart.id)
					dispatch({
						type: 'DELETE_ORDER_DETAIL',
						data: cart.id
					})
				}}
			/>
		</div>
	)
}
