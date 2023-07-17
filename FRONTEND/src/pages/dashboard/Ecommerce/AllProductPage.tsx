import React, { useState, useEffect } from 'react'
import HorizontalLayout from '../../../layouts/HorizontalLayout'
import bg from '../../../assets/images/background_all_product.png'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'
import { Link } from 'react-router-dom'
import Product from '../../../components/Product'
import Pagination from '../../../components/Pagination'
import Dropdown from '../../../components/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { linkProduct } from '../../../util/const/function'

export interface IBreadcumUrl {
	url: string
	name: string
	pageCurrent: boolean
}

export default function AllProductPage() {
	const dispatch = useDispatch()
	const { listProductCate, listProduct, listProductSale, listProductNew } =
		useSelector((state: any) => state.productReducer)
	let [list, setList] = useState<any[]>([])

	useEffect(() => {
		if (localStorage.getItem('isPage') === '0') {
			//tất cả sản phẩm
			setList(listProduct)
		} else if (localStorage.getItem('isPage') === '1') {
			//trang phụ kiện
			dispatch({
				type: 'GET_PRODUCT_BY_CATEID',
				data: 4
			})
		} else if (localStorage.getItem('isPage') === '2') {
			//tất cả sản phẩm mới
			setList(listProductNew)
		} else if (localStorage.getItem('isPage') === '3') {
			//tất cả sản phẩm đang sale
			setList(listProductSale)
		} else {
			console.log(listProductCate)
			setList(listProductCate)
		}
	}, [])

	useEffect(() => {
		if (localStorage.getItem('isPage') === '1') {
			setList(listProductCate)
		} else if (
			localStorage.getItem('isPage') === null ||
			localStorage.getItem('isPage') === undefined ||
			localStorage.getItem('isPage') === ''
		) {
			setList(listProductCate)
		}
	}, [listProductCate, list])

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

	const itemDropdown = [
		'Giá tăng dần',
		'Giá giảm dần',
		'A -> Z',
		'Z -> A',
		'Hàng mới nhất',
		'Hàng cũ nhất'
	]

	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10 // Số trang tổng cần hiển thị

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		// Thực hiện các thay đổi khác khi người dùng chọn trang mới
	}

	return (
		<HorizontalLayout>
			<div className="container-fluid all-product-page">
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
					<div className="d-flex flex-column w-75-md w-100">
						<div className="d-flex sort justify-content-end">
							<p className="text-sort me-2">Sắp xếp: </p>
							<div className="d-flex flex-column justify-content-center">
								<Dropdown name={'Thứ tự'} item={itemDropdown} />
							</div>
						</div>
						<div
							className="w-100 d-flex justify-content-start flex-wrap"
							style={{ minHeight: '300px' }}>
							{list.map((item: any, index: number) => {
								return (
									<Link
										onClick={() => {
											localStorage.setItem(
												'productDetail',
												JSON.stringify(item)
											)
										}}
										to={`/product/product-detail?${linkProduct(
											item.id
										)}`}
										className="item-product-general"
										key={index}>
										<Product item={item} />
									</Link>
								)
							})}
						</div>
						<div className="d-flex justify-content-center">
							<Pagination
								pageCurrent={currentPage}
								countPage={totalPages}
								onHandleChangePage={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</HorizontalLayout>
	)
}
