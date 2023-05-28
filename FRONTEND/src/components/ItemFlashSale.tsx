import React from 'react'
import { IFlashSale } from './FlashSale'
import { Link } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'
import { renderPrice } from '../util/const/function'

interface Props {
	item: IFlashSale
}

export default function ItemFlashSale(item: Props) {
	const itemSale = item.item
	const priceSale = (itemSale.price * (100 - itemSale.percent_sale)) / 100

	return (
		<Link to="#" className="item-flash-sale d-flex flex-column">
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
				<p className="name-product-sale">{itemSale.name}</p>
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
