import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_USER } from '../util/const/data'
import Swal from 'sweetalert2'

export default function SignIn() {
	const dispatch = useDispatch()
	const { statusRegister } = useSelector((state: any) => state.userReducer)
	const navigate = useNavigate()
	const [user, setUser] = useState({
		values: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			rePassword: ''
		},
		error: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			rePassword: ''
		}
	})

	useEffect(() => {
		if (localStorage.getItem(TOKEN_USER) !== null) {
			navigate('/', { replace: true })
		}
	}, [])

	useEffect(() => {
		if (statusRegister === true) {
			navigate('/', { replace: true })
		} else if (statusRegister === 'error' || statusRegister === false) {
			Swal.fire({
				title: 'Email đã được sử dụng, hãy nhập email mới!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		}
	}, [statusRegister])

	const handleOnChange = (event: any) => {
		let { name, value, type } = event.target
		//chèn vào key của data.values giá trị là value nếu như người dùng nhập giá trị vào input
		let changeValues: any = { ...user.values, [name]: value }
		let changeErrors: any = { ...user.error }
		//trim() sẽ giúp mảng xóa hết các dấu cách, dòng if này sẽ check dữ liệu của input có trống hay không
		if (value.trim() === '') {
			changeErrors[name] = name + ' không được bỏ trống!'
		} else {
			changeErrors[name] = ''
		}
		//check email
		if (type === 'email') {
			//regex của email
			const regexMail = /\S+@\S+\.\S+/
			//dùng regex test email, nếu email nhập vào là sai sẽ trả ra false, !false sẽ là true và gán giá trị cho changeError
			if (value.trim() === '') {
				changeErrors[name] = name + ' không được bỏ trống!'
			} else if (!regexMail.test(value)) {
				changeErrors[name] = name + ' không hợp lệ!'
			} else {
				changeErrors[name] = ''
			}
		}
		//check phone
		if (name === 'phone') {
			//regex của password
			const regexPhone = /^([0-9]{10})$/g
			//dùng regex test password
			if (value.trim() === '') {
				changeErrors[name] = name + ' không được bỏ trống!'
			} else if (!regexPhone.test(value)) {
				changeErrors[name] = name + ' không hợp lệ!'
			} else {
				changeErrors[name] = ''
			}
		}
		//check password
		if (name === 'password') {
			//regex của password
			const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
			//dùng regex test password
			if (value.trim() === '') {
				changeErrors[name] = name + ' không được bỏ trống!'
			} else if (!regexPassword.test(value)) {
				changeErrors[name] = name + ' không hợp lệ!'
			} else {
				changeErrors[name] = ''
			}
		}
		//check passwordConfirm có giống password đã điền trước hay không
		if (name === 'rePassword') {
			const checkVerifyPassword = user.values.password === value
			if (!checkVerifyPassword) {
				changeErrors[name] = 'password không trùng khớp!'
			} else {
				changeErrors[name] = ''
			}
		}
		setUser({
			values: changeValues,
			error: changeErrors
		})
	}

	const handleSubmit = (event: any) => {
		event.preventDefault()
		const { values, error } = user
		//khởi tạo biến kiểm tra dữ liệu đã nhập vào đúng hết chưa
		let valid = true
		//kiểm tra xem có dữ liệu nào chưa điền hay không
		for (let key in values) {
			if (values[key as keyof typeof values] === '') {
				valid = false
			}
		}
		//kiểm tra xem có dữ liệu nào chưa valid không
		for (let key in error) {
			if (error[key as keyof typeof error] !== '') {
				valid = false
			}
		}
		if (!valid) {
			Swal.fire({
				title: 'Cần nhập đúng dữ liệu!',
				icon: 'error',
				confirmButtonText: 'Chấp nhận'
			})
		} else {
			dispatch({
				type: 'REGISTER',
				data: {
					name_user:
						user.values.firstName + ' ' + user.values.lastName,
					phone_number: user.values.phone,
					password: user.values.password,
					email: user.values.email
				}
			})
		}
	}

	const goBack = () => {
		navigate(-1) // Chuyển hướng về trang trước đó
	}

	return (
		<div className="signin container-fluid">
			<h3 style={{ fontWeight: '600' }}>Đăng ký tài khoản mới</h3>
			<form autoComplete="new-password">
				<div className="d-flex flex-wrap justify-content-between">
					<div className="label-input-form">
						<FormInput
							id="firstName"
							name="firstName"
							type="text"
							label="Tên"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.firstName}
						</span>
					</div>
					<div className="label-input-form">
						<FormInput
							id="lastName"
							name="lastName"
							type="text"
							label="Họ"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.lastName}
						</span>
					</div>
					<div className="label-input-form">
						<FormInput
							id="email"
							name="email"
							type="email"
							label="Email"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.email}
						</span>
					</div>
					<div className="label-input-form">
						<FormInput
							id="phone"
							name="phone"
							type="text"
							label="Số điện thoại"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.phone}
						</span>
					</div>
				</div>
				<div className="d-flex flex-wrap justify-content-between">
					<div className="label-input-form">
						<FormInput
							id="password"
							name="password"
							type="password"
							label="Mật khẩu"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.password}
						</span>
					</div>
					<div className="label-input-form">
						<FormInput
							id="rePassword"
							name="rePassword"
							type="password"
							label="Nhập lại mật khẩu"
							required={true}
							onChange={(event) => {
								handleOnChange(event)
							}}
						/>
						<span
							style={{ fontSize: '12px' }}
							className="text text-danger">
							{user.error.rePassword}
						</span>
					</div>
				</div>
				<p className="mt-3" style={{ fontSize: '12px' }}>
					Những trường <span className="text-danger">*</span> là
					trường bắt buộc
				</p>
				<div className="d-flex w-25 justify-content-between">
					<button
						onClick={() => goBack()}
						type="button"
						className="btn btn-dark btn-md btn-form-signin">
						Quay lại
					</button>
					<button
						type="button"
						onClick={(event) => {
							handleSubmit(event)
						}}
						className="btn btn-dark btn-md btn-form-signin">
						Đăng ký
					</button>
				</div>
			</form>
		</div>
	)
}
