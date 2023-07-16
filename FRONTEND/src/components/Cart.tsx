import React from 'react'
import imgCart from '../assets/images/demo-detail-product/main.png'
import CartItem from './CartItem'
import Order from './Order'

export interface ICart {
	id: number
	name: string
	rating: number
	sold: number
	price: number
	color: string
	size: string
	remain: number
	img: string
}

export default function Cart() {
	const cart: ICart = {
		id: 3,
		name: 'Áo thun chạy bộ nam Advanced Fast & Free Run',
		rating: 4.3,
		sold: 512,
		price: 200000,
		color: 'trắng',
		size: 'XL',
		remain: 325,
		img: imgCart
	}

	return (
		<div className="cart-page container-fluid">
			<h2 className="fw-bold">Giỏ hàng</h2>
			<div
				className="flex-row d-flex justify-content-between"
				style={{ position: 'relative' }}>
				<div className="d-flex flex-column" style={{ width: '55%' }}>
					<CartItem cart={cart} />
					<CartItem cart={cart} />
					<CartItem cart={cart} />
				</div>
				<Order />
			</div>
		</div>
	)
}
