import React from 'react'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import bank1 from '../assets/images/banking/bank1.png'
import bank2 from '../assets/images/banking/bank2.png'
import bank3 from '../assets/images/banking/bank3.png'
import bank4 from '../assets/images/banking/bank4.png'
import bank5 from '../assets/images/banking/bank5.png'
import bank6 from '../assets/images/banking/bank6.png'
import bank7 from '../assets/images/banking/bank7.png'

export default function Footer() {
	return (
		<div className="footer-page">
			<div className="container d-flex justify-content-between">
				<div className="footer-left d-flex justify-content-between">
					<div className="d-flex flex-column">
						<p className="title-footer">THÔNG TIN CÔNG TY</p>
						<Link to="#" className="info">
							Giới thiệu về công ty
						</Link>
						<Link to="#" className="info">
							Tuyển dụng
						</Link>
						<Link to="#" className="info">
							Điều khoản bảo mật
						</Link>
					</div>
					<div className="d-flex flex-column">
						<p className="title-footer">HỖ TRỢ KHÁCH HÀNG</p>
						<Link to="#" className="info">
							Phí vận chuyển
						</Link>
						<Link to="#" className="info">
							Trả hàng & Hoàn tiền
						</Link>
						<Link to="#" className="info">
							Hướng dẫn đặt hàng
						</Link>
						<Link to="#" className="info">
							Trung tâm trợ giúp
						</Link>
						<Link to="#" className="info">
							Chính sách bảo hành
						</Link>
						<Link to="#" className="info">
							Liên hệ với chúng tôi
						</Link>
					</div>
					<div className="d-flex flex-column w-25	">
						<p className="title-footer">CHÚNG TÔI CHẤP NHẬN</p>
						<div className="d-flex flex-wrap">
							<img src={bank1} alt="bank1" className="bank" />
							<img src={bank2} alt="bank2" className="bank" />
							<img src={bank3} alt="bank3" className="bank" />
							<img src={bank4} alt="bank4" className="bank" />
							<img src={bank5} alt="bank5" className="bank" />
							<img src={bank6} alt="bank6" className="bank" />
							<img src={bank7} alt="bank7" className="bank" />
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-end footer-right">
					<div className="d-flex flex-column justify-content-between w-75">
						<div className="d-flex flex-column">
							<p className="title-footer">
								KẾT NỐI VỚI CHÚNG TÔI
							</p>
							<div className="d-flex">
								<FeatherIcon
									icon="facebook"
									className="icon"></FeatherIcon>
								<FeatherIcon
									icon="instagram"
									className="icon"></FeatherIcon>
								<FeatherIcon
									icon="twitter"
									className="icon"></FeatherIcon>
								<FeatherIcon
									icon="github"
									className="icon"></FeatherIcon>
								<FeatherIcon
									icon="linkedin"
									className="icon"></FeatherIcon>
							</div>
						</div>
						<div className="d-flex flex-column">
							<p className="title-footer">
								ĐĂNG KÝ NHẬN TIN TỪ CHÚNG TÔI
							</p>
							<div className="input-register">
								<input
									className="w-100 px-3 h-100"
									placeholder="Địa chỉ email của bạn"></input>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
