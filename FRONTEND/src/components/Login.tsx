import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../assets/images/facebook.png'
import google from '../assets/images/google.png'
import FormInput from './FormInput'

export default function Login() {
	return (
		<div className="login container">
			<h3 style={{ fontWeight: '600' }}>Đăng nhập</h3>
			<div className="d-flex justify-content-center">
				<div className="d-flex justify-content-evenly w-25">
					<Link
						to="#"
						className="text-decoration-none facebook-login">
						<img
							className="facebook-img"
							src={facebook}
							alt="login-facebook"
						/>{' '}
						Facebook
					</Link>
					<Link to="#" className="text-decoration-none google-login">
						<img
							className="google-img"
							src={google}
							alt="login-facebook"
						/>{' '}
						Google
					</Link>
				</div>
			</div>
			<div className="d-flex mt-3 justify-content-between">
				<div className="login-left d-flex flex-column">
					<p className="fw-bold">Đăng nhập</p>
					<form>
						<ul
							className="form-list"
							style={{ listStyleType: 'none', padding: '0' }}>
							<li>
								<FormInput
									id="email"
									name="email"
									type="email"
									label="Email"
									required={true}
								/>
							</li>
							<li>
								<FormInput
									id="password"
									name="password"
									type="password"
									label="Mật khẩu"
									required={true}
								/>
							</li>
						</ul>
						<div className="d-flex flex-column">
							<span
								className="text-danger"
								style={{ fontSize: '11px' }}>
								* Yêu cầu bắt buộc
							</span>
							<button
								type="button"
								className="btn btn-warning btn-md mt-4 w-50">
								Đăng nhập
							</button>
						</div>
					</form>
				</div>
				<div className="login-right d-flex flex-column">
					<p style={{ fontSize: '13px', fontWeight: 'bold' }}>
						KHÁCH HÀNG MỚI
					</p>
					<p style={{ fontSize: '12px' }} className="mt-2">
						Bằng cách tạo một tài khoản với cửa hàng của chúng tôi ,
						bạn sẽ có thể thực hiện những quy trình mua hàng nhanh
						hơn , lưu trữ nhiều địa chỉ gửi hàng , xem và theo dõi
						đơn đặt hàng của bạn trong tài khoản của bạn và nhiều
						hơn nữa .
					</p>
					<Link
						to="/signin"
						type="button"
						className="btn btn-warning btn-lg mt-5 w-50">
						Tạo tài khoản
					</Link>
				</div>
			</div>
		</div>
	)
}
