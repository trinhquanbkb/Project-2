import React from 'react'
import { INewProduct } from './NewProduct'
import { Link } from 'react-router-dom'
import logo_new from '../assets/images/new.png'
import { renderPrice } from '../util/const/function'

interface Props {
	item: INewProduct
}

export default function ItemNewProduct(item: Props) {
	const product = item.item
	let priceSale = null
	if (product.percent_sale !== undefined) {
		priceSale = (product.price * (100 - product.percent_sale)) / 100
	}

	return (
		<Link to="#" className="item-new-product d-flex flex-column">
			<div className="img-new-product">
				<img
					className="img-product"
					src={product.img}
					alt={product.name}></img>
				<img src={logo_new} alt="logo-new" className="logo-new"></img>
			</div>
			<div className="infor-new-product">
				<p className="name-new-product">{product.name}</p>
				{priceSale === null ? (
					<span className="price-product">
						{renderPrice(product.price, 0, []) + 'đ'}
					</span>
				) : (
					<div className="d-flex">
						<span className="new-price">
							{renderPrice(priceSale, 0, []) + 'đ'}
						</span>
						<span className="old-price">
							{renderPrice(product.price, 0, []) + 'đ'}
						</span>
					</div>
				)}
			</div>
		</Link>
	)
}
