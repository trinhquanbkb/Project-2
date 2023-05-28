import React from 'react'
import ImageProduct from './ImageProduct'
import ContentProduct from './ContentProduct'
import DescriptionProduct from './DescriptionProduct'
import BreadCrumb from './BreadCrumb'

interface IBreadcumUrl {
	url: string
	name: string
	pageCurrent: boolean
}

export default function DetailProduct() {
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
			name: 'Áo thun',
			pageCurrent: true
		}
	]

	return (
		<div className="container detail-product">
			<BreadCrumb props={breadcumUrl} />
			<div className="line"></div>
			<div className="d-flex mt-4">
				<div className="detail-product-left">
					<ImageProduct />
				</div>
				<div className="detail-product-right">
					<ContentProduct />
				</div>
			</div>
			<DescriptionProduct />
			<div
				className="bg-success mt-5"
				style={{ width: '100%', height: '600px' }}>
				bình luận
			</div>
		</div>
	)
}
