import React from 'react'
import Footer from '../components/Footer'
import AuthNavbar from '../components/AuthNavbar'

export interface IAuthLayoutProp {
	children?: React.ReactNode
}

export default function AuthLayout({ children }: IAuthLayoutProp) {
	return (
		<div className="overflow-x-hidden">
			<AuthNavbar />
			{children}
			<Footer />
		</div>
	)
}
