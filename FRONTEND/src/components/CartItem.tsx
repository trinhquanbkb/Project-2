import React, { useState } from 'react'
import { renderCode } from '../util/const/function'
import { renderPrice } from '../util/const/function'
import InputQuantity from './InputQuantity'
import FeatherIcon from 'feather-icons-react'
import { ICart } from './Cart'

interface ICartItem {
	cart?: ICart
}

export default function CartItem({ cart }: ICartItem) {
	const [inputValue, setInputValue] = useState(1)

	const handleInputChange = (value: any) => {
		setInputValue(value)
	}

	return (
		<div className="card-item-cart d-flex">
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
				/>
			</div>
			<div className="img-cart">
				<img className="img" src={cart?.img} alt="img" />
			</div>
			<div className="content-cart d-flex flex-column">
				<h4 className="fw-bold mt-0">{cart?.name}</h4>
				<p className="mb-0">
					Mã sản phẩm:{' '}
					{cart !== undefined ? renderCode(cart.id) : null}
				</p>
				<p className="mb-0">Đánh giá: {cart?.rating}/5</p>
				<p className="mb-0">Màu sắc: {cart?.color}</p>
				<p className="mb-0">Kích cỡ: {cart?.size}</p>
				<p className="mb-2">
					Giá:{' '}
					{cart !== undefined ? renderPrice(cart.price, 0, []) : null}
					đ
				</p>
				<h5 className="fw-bold mt-1">Số lượng:</h5>
				<div className="d-flex justify-content-between">
					<InputQuantity onInputChange={handleInputChange} />
					<h5 className="fw-bold">
						Tổng:{' '}
						{cart !== undefined
							? renderPrice(inputValue * cart.price, 0, [])
							: null}
						đ
					</h5>
				</div>
			</div>
			<FeatherIcon
				icon="x-square"
				size={26}
				onClick={() => console.log('gsdfsd')}
			/>
		</div>
	)
}
