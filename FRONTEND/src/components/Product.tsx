import React from 'react'
import FeatherIcon from 'feather-icons-react'
import { IProduct } from './SuggestProduct'
import { renderPrice } from '../util/const/function'

interface Props {
	item: IProduct
}

export default function Product(item: Props) {
	const product = item.item
	let priceSale = null
	if (product.percent_sale !== undefined) {
		priceSale = (product.price * (100 - product.percent_sale)) / 100
	}

	return (
		<div className="d-flex flex-column h-100">
			<div className="img-product-suggest">
				<img
					className="img-product"
					src={product.img}
					alt={product.name}></img>
				{product.percent_sale == null ? null : (
					<div className="bg-sale">
						<FeatherIcon icon="zap" className="icon-hot" />
						<p className="text-center fw-bold fs-5">
							{'-' + product.percent_sale + '%'}
						</p>
					</div>
				)}
			</div>
			<div className="infor-suggest-product">
				<p className="name-suggest-product">{product.name}</p>
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
			<div className="add-to-cart">Thêm vào giỏ hàng</div>
		</div>
	)
}
