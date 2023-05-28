import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { categories } from '../util/fake-api/categories'

interface Category {
	parent_id: number
	name_category: string
	createdAt: string
	updatedAt: string
	children: Category[] | null
	href: string
}

export default function Navbar() {
	const isAuthen = false
	const [isHover, setIsHover] = useState('d-none')
	const initialState: Category[] | null = [
		{
			parent_id: 2,
			name_category: 'Quần nam',
			createdAt: '2023-05-12 02:39:24',
			updatedAt: '2023-05-12 02:39:24',
			children: null,
			href: '#'
		}
	]
	const [subMenu, setSubMenu] = useState<any>(initialState)

	const renderChildrenCateLv2 = (item: any) => {
		return (
			<div className="d-flex flex-column justify-content-evenly mt-4">
				{item.map((cate: any) => {
					return (
						<Link
							to={cate.href === null ? '#' : cate.href}
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
			<div className="container d-flex w-100">
				{item.map((cate: any) => {
					return (
						<div className="sub-menu-1">
							<Link
								to={cate.href === null ? '#' : cate.href}
								className="cate-1">
								{cate.name_category}
							</Link>
							<div>
								{cate.children !== null
									? renderChildrenCateLv2(cate.children)
									: null}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="header-page">
			<div className="container">
				<div className="header-navbar d-flex justify-content-between">
					<Link to="/">
						<img className="logo" src={logo} alt="logo"></img>
					</Link>
					<div className="d-flex justify-content-center">
						{categories.map((item, index) => {
							return (
								<Link
									to={item.href === null ? '#' : item.href}
									className="category-nav d-flex flex-column justify-content-center"
									key={index}
									onMouseLeave={() => {
										if (item.children !== null) {
											setIsHover('d-none')
										}
									}}
									onMouseEnter={() => {
										if (item.children !== null) {
											setSubMenu(item.children)
											setIsHover('active')
										}
									}}>
									{item.name_category}
								</Link>
							)
						})}
					</div>
					{isAuthen === false ? (
						<div className="d-flex justify-content-between">
							<div className="d-flex justify-content-center px-2">
								<Link
									to="/cart"
									className="d-flex flex-column justify-content-center text-decoration-none px-2">
									<FeatherIcon icon="shopping-cart" />
								</Link>
								<div className="d-flex flex-column justify-content-center px-2 search-button">
									<FeatherIcon icon="search" />
								</div>
							</div>
							<Link
								className="d-flex flex-column justify-content-center text-decoration-none"
								to="/login">
								<div className="authen-nav">Đăng nhập</div>
							</Link>
							<Link
								className="d-flex flex-column justify-content-center text-decoration-none"
								to="/signin">
								<div className="authen-nav">Đăng ký</div>
							</Link>
						</div>
					) : null}
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
				{isHover === 'active' ? renderChildrenCateLv1(subMenu) : null}
			</div>
		</div>
	)
}
