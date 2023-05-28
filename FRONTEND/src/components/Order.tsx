import React from 'react'

export default function Order() {
	const order = {
		totalProduct: 3,
		provisional: '...',
		sale: '...',
		delivery: '...',
		totalPrice: '...'
	}

	return (
		<div className="total-price-order d-flex flex-column">
			<p className="fw-bold fs-4">
				Tổng đơn hàng | {order.totalProduct} sản phẩm
			</p>
			<div className="d-flex justify-content-between">
				<p>Tạm tính:</p>
				<p>{order.provisional}</p>
			</div>
			<div className="d-flex justify-content-between">
				<p>Giảm giá:</p>
				<p>{order.sale}</p>
			</div>
			<div className="d-flex justify-content-between">
				<p>Phí vận chuyển:</p>
				<p>{order.delivery}</p>
			</div>
			<div className="line"></div>
			<div className="d-flex justify-content-between mt-4">
				<p className="fs-5 fw-bold">Tổng tiền:</p>
				<p className="fs-5 fw-bold">{order.totalPrice}</p>
			</div>
		</div>
	)
}
