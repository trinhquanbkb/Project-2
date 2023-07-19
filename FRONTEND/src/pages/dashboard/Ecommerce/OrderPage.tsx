import React, { useEffect, useState } from 'react'
import HorizontalLayout from '../../../layouts/HorizontalLayout'
import Order from '../../../components/Order'
import FormInput from '../../../components/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { CREATE_ORDER_PRODUCT_SAGA } from '../../../redux/type'

export default function OrderPage() {
	const listSelect: any = JSON.parse(
		localStorage.getItem('orderProduct') || '[]'
	)
	const dispatch = useDispatch()
	const { userInfo } = useSelector((state: any) => state.userReducer)
	const { statusCreateOrder } = useSelector(
		(state: any) => state.orderReducer
	)
	const navigate = useNavigate()
	const [user, setUser] = useState({
		name: '',
		phone: '',
		address: '',
		note: ''
	})

	useEffect(() => {
		dispatch({
			type: 'GET_USER_INFO'
		})
	}, [])

	useEffect(() => {
		if (userInfo !== null) {
			setUser({
				...user,
				name: userInfo.name_user,
				phone: userInfo.phone_number
			})
		}
		if (statusCreateOrder === true) {
			Swal.fire({
				title: 'Tạo đơn hàng thành công!',
				icon: 'success',
				confirmButtonText: 'Chấp nhận'
			})
			dispatch({
				type: CREATE_ORDER_PRODUCT_SAGA,
				data: ''
			})
			dispatch({
				type: 'GET_ALL_ORDER_DETAIL'
			})
			localStorage.setItem('orderProduct', '[]')
			setUser({ name: '', phone: '', address: '', note: '' })
			setTimeout(() => {
				navigate('/cart', {
					replace: true
				})
			}, 500)
		} else if (statusCreateOrder === false) {
			Swal.fire({
				title: 'Lỗi server: chưa thể tạo đơn!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		}
	}, [userInfo, statusCreateOrder])

	const handleSubmit = (e: any) => {
		let listOrderDetail: any[] = []
		listSelect.forEach((item: any) => {
			listOrderDetail.push({
				id: item.id,
				price: item.totalPrice
			})
		})
		e.preventDefault()
		let valid = true

		//check name
		if (user.name.trim() === '') {
			valid = false
		}
		//check phone
		const regexPhone = /^([0-9]{10})$/g
		if (user.phone.trim() === '') {
			valid = false
		} else if (!regexPhone.test(user.phone)) {
			Swal.fire({
				title: 'Số điện thoại không hợp lệ!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		}
		//check address
		if (user.address.trim() === '') {
			valid = false
		}
		if (!valid) {
			Swal.fire({
				title: 'Cần nhập đủ dữ liệu cần thiết!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		} else {
			dispatch({
				type: 'CREATE_ORDER',
				data: {
					address_detail: user.address,
					name_user: user.name,
					email: userInfo.email,
					phoneNumber: user.phone,
					note: user.note,
					status: 1,
					listOrderDetail: listOrderDetail
				}
			})
		}
	}

	return (
		<HorizontalLayout>
			<div className="cart-page container-fluid">
				<div
					className="flex-row d-flex justify-content-between"
					style={{ position: 'relative' }}>
					<form style={{ width: '55%' }}>
						<h2>Thông tin nhận hàng</h2>
						<ul
							className="form-list"
							style={{ listStyleType: 'none', padding: '0' }}>
							<li>
								<FormInput
									id="name"
									name="name"
									type="text"
									label="Họ tên"
									value={user.name}
									required={true}
									onChange={(e) =>
										setUser({
											...user,
											name: e.target.value
										})
									}
								/>
							</li>
							<li>
								<FormInput
									id="phone"
									name="phone"
									type="text"
									label="Số điện thoại"
									value={user.phone}
									required={true}
									onChange={(e) => {
										setUser({
											...user,
											phone: e.target.value
										})
									}}
								/>
							</li>
							<li>
								<FormInput
									id="address"
									name="address"
									type="text"
									label="Địa chỉ nhận hàng"
									required={true}
									onChange={(e) =>
										setUser({
											...user,
											address: e.target.value
										})
									}
								/>
							</li>
							<li>
								<label
									className="label-form"
									htmlFor="w3review">
									Lưu ý:
								</label>
								<br />
								<textarea
									className="input-text textarea required-entry"
									id="w3review"
									name="w3review"
									onChange={(e) =>
										setUser({
											...user,
											note: e.target.value
										})
									}
									placeholder="thông tin cần lưu ý ..."></textarea>
							</li>
						</ul>
						<button
							onClick={(e) => {
								handleSubmit(e)
							}}
							type="button"
							className="btn btn-warning btn-md mt-4 w-25">
							Xác nhận
						</button>
					</form>
					<Order listSelect={listSelect} />
				</div>
			</div>
		</HorizontalLayout>
	)
}
