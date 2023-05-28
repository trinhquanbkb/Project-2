import React from 'react'
import HorizontalLayout from '../../../layouts/HorizontalLayout'
import bg from '../../../assets/images/background_all_product.png'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'

export interface IBreadcumUrl {
	url: string
	name: string
	pageCurrent: boolean
}

export default function AllProductPage() {
	const breadcumUrl: IBreadcumUrl[] = [
		{
			url: '/',
			name: 'Trang chủ',
			pageCurrent: false
		},
		{
			url: '/all-product',
			name: 'Tất cả sản phẩm',
			pageCurrent: true
		}
	]

	return (
		<HorizontalLayout>
			<div className="container all-product-page">
				<div className="bg-all-product">
					<img
						className="img-all-product"
						src={bg}
						alt="all-product-page"
					/>
					<div className="title-all-product">
						<p className="t1">IZ'S CLOSET</p>
						<p className="t2">
							Sự kết hợp giữa{' '}
							<span className="fw-bold">
								"Truyền thống và hiện đại"
							</span>
							,{' '}
							<span className="fw-bold">
								"Công nghệ và thủ công"
							</span>
							.
						</p>
					</div>
				</div>
				<BreadCrumb props={breadcumUrl} />
				<div className="line"></div>
				<div className="d-flex">
					<Filter />
					<div className="bg-success w-75"></div>
				</div>
			</div>
		</HorizontalLayout>
	)
}
