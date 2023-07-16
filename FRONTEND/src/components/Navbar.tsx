import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_USER } from '../util/const/data'
import { REGISTER_USER } from '../redux/type'
import Swal from 'sweetalert2'

interface Category {
	parent_id: number | null
	name_category: string | null
	createdAt: string | null
	updatedAt: string | null
	childrent: Category[] | null
	href: string | null
}

export default function Navbar() {
	const navigate = useNavigate()
	const [isHover, setIsHover] = useState('d-none')
	const [isHoverUser, setIsHoverUser] = useState('d-none')
	const [statusSearch, setStatusSearch] = useState(false)
	const initialState: Category[] | null = [
		{
			parent_id: null,
			name_category: null,
			createdAt: null,
			updatedAt: null,
			childrent: [],
			href: null
		}
	]
	const dispatch = useDispatch()
	const { listCategory } = useSelector((state: any) => state.categoryReducer)
	const { listProduct } = useSelector((state: any) => state.productReducer)
	const { statusRegister } = useSelector((state: any) => state.userReducer)

	useEffect(() => {
		dispatch({
			type: 'GET_ALL_CATEGORIES'
		})
		dispatch({
			type: 'GET_PRODUCTS'
		})
		dispatch({
			type: 'GET_PRODUCT_SALE'
		})
		dispatch({
			type: 'GET_ALL_NEW_PRODUCT'
		})
		if (statusRegister === true) {
			Swal.fire({
				title: 'Tạo tài khoản mới thành công!',
				icon: 'success',
				confirmButtonText: 'Chấp nhận'
			})
			dispatch({
				type: REGISTER_USER,
				data: '500'
			})
		}
	}, [])

	useEffect(() => {}, [listCategory, listProduct])

	const [subMenu, setSubMenu] = useState<any>(initialState)

	const renderChildrenCateLv2 = (item: any) => {
		return (
			<div className="d-flex flex-column justify-content-evenly mt-4">
				{item.map((cate: any, index: number) => {
					return (
						<Link
							key={index}
							onClick={() => {
								dispatch({
									type: 'GET_PRODUCT_BY_CATEID',
									data: cate.id
								})
								localStorage.setItem('isPage', '')
							}}
							to={
								cate.href === ''
									? `/list-product?cateid=${cate.id}`
									: cate.href
							}
							className="cate-2">
							{cate.name_category}
						</Link>
					)
				})}
			</div>
		)
	}

	const renderChildrenCateLv1 = (item: Category[]) => {
		return (
			<div className="container-fluid d-flex w-100">
				{item.map((cate: any) => {
					return (
						<div className="sub-menu-1">
							<Link
								onClick={() => {
									dispatch({
										type: 'GET_PRODUCT_BY_CATEID',
										data: cate.id
									})
									localStorage.setItem('isPage', '')
								}}
								to={
									cate.href === ''
										? `/list-product?cateid=${cate.id}`
										: cate.href
								}
								className="cate-1">
								{cate.name_category}
							</Link>
							<div>
								{cate.childrent !== null
									? renderChildrenCateLv2(cate.childrent)
									: null}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="nav-component">
			<div className="header-page">
				<div className="container-fluid">
					<div className="header-navbar d-flex justify-content-between">
						<Link to="/">
							<img className="logo" src={logo} alt="logo"></img>
						</Link>
						<div className="d-flex justify-content-center">
							{listCategory.map((item: any, index: number) => {
								return (
									<Link
										onClick={() => {
											dispatch({
												type: 'GET_PRODUCT_BY_CATEID',
												data: item.id
											})
											localStorage.setItem('isPage', '')
										}}
										to={
											item.href === ''
												? `/list-product?cateid=${item.id}`
												: item.href
										}
										className="category-nav d-flex flex-column justify-content-center"
										key={index}
										onMouseLeave={() => {
											if (item.childrent !== null) {
												setIsHover('d-none')
											}
										}}
										onMouseEnter={() => {
											if (item.childrent.length !== 0) {
												setSubMenu(item.childrent)
												setIsHover('active')
											}
										}}>
										{item.name_category}
									</Link>
								)
							})}
						</div>
						{localStorage.getItem(TOKEN_USER) === null ? (
							<div className="d-flex justify-content-between">
								<div className="d-flex justify-content-center px-2">
									<Link
										to="/cart"
										className="d-flex flex-column justify-content-center text-decoration-none px-2 text-black">
										<FeatherIcon icon="shopping-cart" />
									</Link>
									<div className="d-flex flex-column justify-content-center px-2 search-button text-black">
										<FeatherIcon
											icon="search"
											onClick={() => {
												setStatusSearch(true)
											}}
										/>
									</div>
								</div>
								<Link
									className="d-flex flex-column justify-content-center text-decoration-none"
									to="/login">
									<div className="authen-nav text-black">
										Đăng nhập
									</div>
								</Link>
								<Link
									className="d-flex flex-column justify-content-center text-decoration-none"
									to="/signin">
									<div className="authen-nav text-black">
										Đăng ký
									</div>
								</Link>
							</div>
						) : (
							<div
								className="d-flex flex-column justify-content-center text-decoration-none fw-bold icon-user-infor"
								style={{
									marginRight: '1vw',
									marginLeft: '4vw'
								}}>
								<FeatherIcon
									onMouseLeave={() => {
										setIsHoverUser('d-none')
									}}
									onMouseEnter={() => {
										setIsHoverUser('active')
									}}
									icon="user"
									size="28"
								/>
								<div
									className={`${isHoverUser}`}
									onMouseEnter={() => {
										setIsHoverUser('active')
									}}
									onMouseLeave={() => {
										setIsHoverUser('d-none')
									}}>
									<p
										className="m-0 py-2"
										onClick={() => {
											localStorage.clear()
											setTimeout(() => {
												navigate('/login', {
													replace: true
												})
											}, 500)
										}}>
										Đăng xuất
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					className={`sub-menu ${isHover}`}
					onMouseEnter={() => {
						setIsHover('active')
					}}
					onMouseLeave={() => {
						setIsHover('d-none')
					}}>
					{isHover === 'active'
						? renderChildrenCateLv1(subMenu)
						: null}
				</div>
			</div>
			<div
				className={
					statusSearch === true
						? 'search-nav d-flex justify-content-center'
						: 'd-none'
				}>
				<label className="search-label d-flex justify-content-around">
					<input
						className="input-search"
						placeholder="Tìm kiếm sản phẩm..."></input>
					<i className="fa-solid fa-magnifying-glass search-button"></i>
					<i
						className="fa-solid fa-xmark delete-search"
						onClick={() => {
							setStatusSearch(false)
						}}></i>
				</label>
			</div>
		</div>
	)
}
