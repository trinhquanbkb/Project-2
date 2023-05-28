import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function AuthNavbar() {
	return (
		<div className="header-page">
			<div className="container">
				<div className="header-navbar d-flex justify-content-between">
					<Link to="/">
						<img className="logo" src={logo} alt="logo"></img>
					</Link>
					<Link to="#" className="title-login">
						Bạn cần giúp đỡ?
					</Link>
				</div>
			</div>
		</div>
	)
}
