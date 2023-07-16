import React from 'react'
import { Link } from 'react-router-dom'
import logo_new from '../assets/images/new.png'
import { linkProduct, renderPrice } from '../util/const/function'

const imgMain = (listImg: any): any => {
	let img
	listImg.forEach((item: any) => {
		if (item.isMain === 1) {
			img = item.url
		}
	})
	return img
}

export default function ItemNewProduct(item: any) {
	const product = item.item
	let priceSale = null
	const url = linkProduct(product.id)
	if (product.percent_sale !== undefined) {
		priceSale = (product.price * (100 - product.percent_sale)) / 100
	}

	return (
		<Link
			onClick={() => {
				localStorage.setItem('productDetail', JSON.stringify(product))
			}}
			to={`/product/product-detail?${url}`}
			className="item-new-product d-flex flex-column">
			<div className="img-new-product">
				<img
					className="img-product"
					src={imgMain(product.listImage)}
					alt={product.name_product}></img>
				<img src={logo_new} alt="logo-new" className="logo-new"></img>
			</div>
			<div className="infor-new-product">
				<p className="name-new-product">{product.name_product}</p>
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
