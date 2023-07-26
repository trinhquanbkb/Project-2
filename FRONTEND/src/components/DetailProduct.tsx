import React, { useEffect } from 'react'
import ImageProduct from './ImageProduct'
import ContentProduct from './ContentProduct'
import DescriptionProduct from './DescriptionProduct'
import size from '../assets/images/bang_size.png'
import ReviewProduct from './ReviewProduct'

interface IBreadcumUrl {
	url: string
	name: string
	pageCurrent: boolean
}

export default function DetailProduct() {
	let productDetail = {}
	const jsonString = localStorage.getItem('productDetail')

	if (jsonString !== null) {
		productDetail = JSON.parse(jsonString)
	}

	const breadcumUrl: IBreadcumUrl[] = [
		{
			url: '/',
			name: 'Trang chủ',
			pageCurrent: false
		},
		{
			url: '#',
			name: 'Đồ nam',
			pageCurrent: false
		},
		{
			url: '#',
			name: 'Áo nam',
			pageCurrent: false
		},
		{
			url: '#',
			name: 'Áo thun',
			pageCurrent: true
		}
	]

	return (
		<div className="container-fluid detail-product">
			{/* <BreadCrumb props={breadcumUrl} /> */}
			<div className="line"></div>
			<div className="d-flex mt-4">
				<div className="detail-product-left">
					<ImageProduct item={productDetail} />
				</div>
				<div className="detail-product-right">
					<ContentProduct item={productDetail} />
				</div>
			</div>
			<DescriptionProduct item={productDetail} />
			<div
				style={{
					marginTop: '3rem',
					width: '100%',
					height: '700px',
					backgroundImage: `url(${size})`,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}></div>
		</div>
	)
}
