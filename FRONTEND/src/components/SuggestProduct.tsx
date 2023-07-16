import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'
import { useSelector } from 'react-redux'
import { linkProduct } from '../util/const/function'

export default function SuggestProduct() {
	const { listProduct } = useSelector((state: any) => state.productReducer)

	useEffect(() => {}, [listProduct])

	let arrayProduct = []
	if (listProduct.length > 12) {
		for (let i = 0; i < 12; i++) {
			arrayProduct.push(listProduct[i])
		}
	} else {
		for (let i = 0; i < listProduct.length; i++) {
			arrayProduct.push(listProduct[i])
		}
	}

	return (
		<div>
			<div className="header-suggest-product">SẢN PHẨM GỢI Ý</div>
			<div className="body-suggest-product d-flex justify-content-start flex-wrap">
				{arrayProduct.map((item: any, index: number) => {
					const url = linkProduct(item.id)
					return (
						<Link
							onClick={() => {
								localStorage.setItem(
									'productDetail',
									JSON.stringify(item)
								)
							}}
							to={`/product/product-detail?${url}`}
							className="item-product-suggest"
							key={index}>
							<Product item={item} />
						</Link>
					)
				})}
			</div>
			<div className="see-more d-flex justify-content-center">
				<Link
					to="/all-product"
					className="view-all bg-dark w-25"
					style={{
						borderRadius: '6px',
						position: 'relative'
					}}>
					<button
						type="button"
						className="btn btn-dark"
						style={{
							width: '100%',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)'
						}}>
						Xem thêm
					</button>
				</Link>
			</div>
		</div>
	)
}
