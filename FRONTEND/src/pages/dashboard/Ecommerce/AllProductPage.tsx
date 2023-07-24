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
import { GET_PRODUCT_SEARCH } from '../../../redux/type'

export interface IBreadcumUrl {
	url: string
	name: string
	pageCurrent: boolean
}

export default function AllProductPage() {
	const dispatch = useDispatch()
	const {
		listProductCate,
		listProduct,
		listProductSale,
		listProductNew,
		listSearch
	} = useSelector((state: any) => state.productReducer)
	const [list, setList] = useState<any[]>([])
	const [currentPagination, setCurrentPagination] = useState(1)
	const [sort, setSort] = useState('')
	const [stop, setStop] = useState(true)
	const [stopFilter, setStopFilter] = useState(true)
	const numberProduct = 15
	const totalPages =
		list.length === 0 ? 1 : Math.ceil(list.length / numberProduct)
	const [colorSelect, setColorSelect] = useState('')
	const [sizeSelect, setSizeSelect] = useState('')
	const [brandSelect, setBrandSelect] = useState('')

	const handleColorSelect = (name: string) => {
		setColorSelect(name)
		setStopFilter(true)
	}

	const handleSizeSelect = (name: string) => {
		setSizeSelect(name)
		setStopFilter(true)
	}

	const handleBrandSelect = (name: string) => {
		setBrandSelect(name)
		setStopFilter(true)
	}

	const handlePageChange = (page: number) => {
		setCurrentPagination(page)
	}

	const handleSort = (item: string) => {
		setSort(item)
		setStop(true)
	}

	useEffect(() => {
		if (localStorage.getItem('keySearch') !== null) {
			dispatch({
				type: 'GET_PRODUCT_BY_NAME',
				data: localStorage.getItem('keySearch')
			})
		}
		if (localStorage.getItem('isCate') !== null) {
			dispatch({
				type: 'GET_PRODUCT_BY_CATEID',
				data: localStorage.getItem('isCate')
			})
		}
		if (localStorage.getItem('isPage') === '0') {
			//tất cả sản phẩm
			dispatch({
				type: 'GET_PRODUCT_BY_CATEID',
				data: 1
			})
			setList(listProduct)
		} else if (localStorage.getItem('isPage') === '1') {
			//trang phụ kiện
			dispatch({
				type: 'GET_PRODUCT_BY_CATEID',
				data: 4
			})
		} else if (localStorage.getItem('isPage') === '2') {
			//tất cả sản phẩm mới
			dispatch({
				type: 'GET_ALL_NEW_PRODUCT'
			})
			setList(listProductNew)
		} else if (localStorage.getItem('isPage') === '3') {
			//tất cả sản phẩm đang sale
			dispatch({
				type: 'GET_PRODUCT_SALE'
			})
			setList(listProductSale)
		} else {
			setList(listProductCate)
		}
	}, [])

	useEffect(() => {
		setCurrentPagination(1)
		if (localStorage.getItem('keySearch') !== null) {
			setList(listSearch)
		}
		if (
			(sort === '' && localStorage.getItem('keySearch') === null) ||
			localStorage.getItem('keySearch') === ''
		) {
			if (localStorage.getItem('isCate') !== null) {
				setList(listProductCate)
			} else if (localStorage.getItem('isPage') === '0') {
				//tất cả sản phẩm
				setList(listProduct)
			} else if (localStorage.getItem('isPage') === '1') {
				setList(listProductCate)
			} else if (localStorage.getItem('isPage') === '2') {
				//tất cả sản phẩm mới
				setList(listProductNew)
			} else if (localStorage.getItem('isPage') === '3') {
				//tất cả sản phẩm đang sale
				setList(listProductSale)
			} else if (
				localStorage.getItem('isPage') === null ||
				localStorage.getItem('isPage') === undefined ||
				localStorage.getItem('isPage') === ''
			) {
				setList(listProductCate)
			} else {
				setList(listProductCate)
			}
		}
		if (stop === true) {
			if (sort === 'Giá từ thấp đến cao') {
				let newList = list.slice()
				newList.sort(function (a, b) {
					let x =
						a.percent_sale == null
							? a.price
							: (a.price * (100 - a.percent_sale)) / 100
					let y =
						b.percent_sale == null
							? b.price
							: (b.price * (100 - b.percent_sale)) / 100
					return x - y
				})
				setList([...newList])
				setStop(false)
			}
			if (sort === 'Giá từ cao đến thấp') {
				let newList = list.slice()
				newList.sort(function (a, b) {
					let x =
						a.percent_sale == null
							? a.price
							: (a.price * (100 - a.percent_sale)) / 100
					let y =
						b.percent_sale == null
							? b.price
							: (b.price * (100 - b.percent_sale)) / 100
					return y - x
				})
				setList(newList)
				setStop(false)
			}
			if (sort === 'Hàng mới nhất xếp trước') {
				let newList = list.slice()
				newList.sort(function (a, b) {
					var dateA: any = new Date(a.createdAt)
					var dateB: any = new Date(b.createdAt)
					return dateB - dateA
				})
				setList(newList)
				setStop(false)
			}
			if (sort === 'Hàng cũ nhất xếp trước') {
				let newList = list.slice()
				newList.sort(function (a, b) {
					var dateA: any = new Date(a.createdAt)
					var dateB: any = new Date(b.createdAt)
					return dateA - dateB
				})
				setList(newList)
				setStop(false)
			}
		}
	}, [
		listProductCate,
		listProductNew,
		listProductSale,
		listProduct,
		listSearch,
		list,
		sort
	])

	const renderDataPage = (pageCurrent: number) => {
		let begin = (pageCurrent - 1) * numberProduct
		let end = pageCurrent * numberProduct - 1
		return list.map((item: any, index: number) => {
			if (index <= end && index >= begin) {
				return (
					<Link
						onClick={() => {
							localStorage.setItem(
								'productDetail',
								JSON.stringify(item)
							)
						}}
						to={`/product/product-detail?${linkProduct(item.id)}`}
						className="item-product-general"
						key={index}>
						<Product item={item} />
					</Link>
				)
			}
		})
	}

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
		'Giá từ thấp đến cao',
		'Giá từ cao đến thấp',
		'Hàng mới nhất xếp trước',
		'Hàng cũ nhất xếp trước'
	]

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
					{/* <Filter
						handleSize={handleSizeSelect}
						handleColor={handleColorSelect}
						handleBrand={handleBrandSelect}
					/> */}
					<div className="d-flex flex-column w-75-md w-100">
						<div className="d-flex sort justify-content-end">
							<p className="text-sort me-2">Sắp xếp: </p>
							<div className="d-flex flex-column justify-content-center">
								<Dropdown
									name={'Thứ tự'}
									onHandle={handleSort}
									item={itemDropdown}
								/>
							</div>
						</div>
						<div
							className="w-100 d-flex justify-content-start flex-wrap"
							style={{ minHeight: '300px' }}>
							{renderDataPage(currentPagination)}
						</div>
						<div className="d-flex justify-content-center">
							<Pagination
								pageCurrent={currentPagination}
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
