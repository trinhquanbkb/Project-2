import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemNewProduct from './ItemNewProduct'
import { useSelector } from 'react-redux'

export default function ReviewProduct() {
	const { listProductNew } = useSelector((state: any) => state.productReducer)

	useEffect(() => {}, [listProductNew])

	let arrayProduct = []
	if (listProductNew.length > 6) {
		for (let i = 0; i < 6; i++) {
			arrayProduct.push(listProductNew[i])
		}
	} else {
		for (let i = 0; i < listProductNew.length; i++) {
			arrayProduct.push(listProductNew[i])
		}
	}

	return (
		<div className="d-flex flex-column">
			<div className="header-title-product d-flex justify-content-between">
				<p className="title-product">Sản phẩm mới ra mắt</p>
				<Link
					to="/all-product"
					onClick={() => {
						localStorage.setItem('isPage', '2')
					}}
					className="view-all">
					Xem tất cả
				</Link>
			</div>
			<div className="new-product d-flex justify-content-start">
				{arrayProduct.map((item: any, index: number) => {
					return <ItemNewProduct item={item} key={index} />
				})}
			</div>
		</div>
	)
}
