import React from 'react'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { linkProduct, renderPrice } from '../util/const/function'

export default function ItemFlashSale(item: any) {
	const itemSale = item.item
	const url = linkProduct(itemSale.id)
	const priceSale = (itemSale.price * (100 - itemSale.percent_sale)) / 100

	return (
		<Link
			onClick={() => {
				localStorage.setItem('productDetail', JSON.stringify(itemSale))
			}}
			to={`/product/product-detail?${url}`}
			className="item-flash-sale d-flex flex-column">
			<div className="img-sale">
				<img
					className="img-product"
					src={itemSale.img}
					alt={itemSale.name}></img>
				<div className="bg-sale">
					<FeatherIcon icon="zap" className="icon-hot" />
					<p className="text-center fw-bold fs-5">
						{'-' + itemSale.percent_sale + '%'}
					</p>
				</div>
			</div>

			<div className="infor-flash-sale">
				<p className="name-product-sale">{itemSale.name_product}</p>
				<div className="d-flex">
					<span className="new-price">
						{renderPrice(priceSale, 0, []) + 'đ'}
					</span>
					<span className="old-price">
						{renderPrice(itemSale.price, 0, []) + 'đ'}
					</span>
				</div>
			</div>
		</Link>
	)
}
