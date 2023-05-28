import React from 'react'
import ItemFlashSale from './ItemFlashSale'
import { Link } from 'react-router-dom'
import sale1 from '../assets/images/product-sale/sale1.png'
import sale2 from '../assets/images/product-sale/sale2.png'
import sale3 from '../assets/images/product-sale/sale3.png'
import sale4 from '../assets/images/product-sale/sale4.png'
import sale5 from '../assets/images/product-sale/sale5.png'
import sale6 from '../assets/images/product-sale/sale6.png'

export interface IFlashSale {
	name: string
	price: number
	img: string
	percent_sale: number
}

export default function FlashSale() {
	const ListSales: IFlashSale[] = [
		{
			name: 'Quần Jeans dáng Slim Fit - Xanh nhạt',
			price: 280000,
			percent_sale: 40,
			img: sale1
		},
		{
			name: 'Đầm Thắt nút họa tiết hoa Boho',
			price: 250000,
			percent_sale: 50,
			img: sale2
		},
		{
			name: ' Quần jean nữ Dây kéo Nút',
			price: 420000,
			percent_sale: 30,
			img: sale3
		},
		{
			name: 'Kính mắt chống ánh sáng xanh mắt mèo',
			price: 120000,
			percent_sale: 30,
			img: sale4
		},
		{
			name: 'Quần shorts nam thể thao 7" V2 ',
			price: 210000,
			percent_sale: 35,
			img: sale5
		},
		{
			name: 'Áo thun nam Cotton Coolmate Basics',
			price: 180000,
			percent_sale: 60,
			img: sale6
		}
	]

	return (
		<div className="d-flex flex-column">
			<div className="header-title-product d-flex justify-content-between">
				<p className="title-product text-danger">FLASH SALE</p>
				<Link to="#" className="view-all">
					Xem tất cả
				</Link>
			</div>
			<div className="flash-sale d-flex justify-content-between">
				{ListSales.map((item: IFlashSale, index: number) => {
					return <ItemFlashSale item={item} key={index} />
				})}
			</div>
		</div>
	)
}
