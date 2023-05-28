import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'

export default function SignIn() {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1) // Chuyển hướng về trang trước đó
	}

	return (
		<div className="signin container">
			<h3 style={{ fontWeight: '600' }}>Đăng ký tài khoản mới</h3>
			<form>
				<div className="d-flex flex-wrap justify-content-between">
					<div className="label-input-form">
						<FormInput
							id="first-name"
							name="first-name"
							type="text"
							label="Tên"
							required={true}
						/>
					</div>
					<div className="label-input-form">
						<FormInput
							id="last-name"
							name="last-name"
							type="text"
							label="Họ"
							required={true}
						/>
					</div>
					<div className="label-input-form">
						<FormInput
							id="email"
							name="email"
							type="email"
							label="Email"
							required={true}
						/>
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
						/>
					</div>
					<div className="label-input-form">
						<FormInput
							id="re-password"
							name="re-password"
							type="password"
							label="Nhập lại mật khẩu"
							required={true}
						/>
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
						className="btn btn-dark btn-md btn-form-signin">
						Đăng ký
					</button>
				</div>
			</form>
		</div>
	)
}
