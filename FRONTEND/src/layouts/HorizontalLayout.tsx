import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export interface ILayoutProp {
	children?: React.ReactNode
}

export default function HorizontalLayout({ children }: ILayoutProp) {
	return (
		<div className="overflow-x-hidden">
			<Navbar />
			{children}
			<Footer />
		</div>
	)
}
