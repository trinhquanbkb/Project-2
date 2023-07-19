import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { renderPrice } from '../util/const/function'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

export default function Order({ listSelect }: any) {
	const navigate = useNavigate()
	const totalPrice = () => {
		let count = 0
		listSelect.forEach((item: any) => {
			count += item.totalPrice
		})
		return count
	}
	const grab = () => {
		if (totalPrice() >= 500000) {
			return 0
		} else {
			return 30000
		}
	}
	return (
		<div className="total-price-order d-flex flex-column">
			<p className="fw-bold fs-4">
				Tổng đơn hàng | {listSelect.length} đơn
			</p>
			<div className="d-flex justify-content-between">
				<p>Tạm tính:</p>
				<p>{renderPrice(totalPrice(), 0, [])} vnđ</p>
			</div>
			<div className="d-flex justify-content-between">
				<p>Phí vận chuyển:</p>
				<p>{renderPrice(grab(), 0, [])} vnđ</p>
			</div>
			<div className="line"></div>
			<div className="d-flex justify-content-between mt-4">
				<p className="fs-5 fw-bold">Tổng tiền:</p>
				<p className="fs-5 fw-bold">
					{renderPrice(totalPrice() + grab(), 0, [])} vnđ
				</p>
			</div>
			<span style={{ color: '#b80606', fontSize: '12px' }}>
				*Ưu đãi: mua đơn hàng với giá trên 500.000đ sẽ được free ship
			</span>
			<div className="d-flex justify-content-center mt-3">
				<button
					type="button"
					className="btn btn-warning btn-order"
					data-bs-target=".modal-body"
					onClick={() => {
						localStorage.setItem(
							'orderProduct',
							JSON.stringify(listSelect)
						)
						if (listSelect.length === 0) {
							Swal.fire({
								title: 'Cần chọn sản phẩm để đặt hàng!',
								icon: 'error',
								confirmButtonText: 'Chấp nhận'
							})
						} else {
							navigate('/order-product', {
								replace: false
							})
						}
					}}>
					<FeatherIcon icon="shopping-cart" className="me-2" />
					Đặt hàng
				</button>
			</div>
		</div>
	)
}
