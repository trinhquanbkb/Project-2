import React from 'react'
import { Link } from 'react-router-dom'
import ItemNewProduct from './ItemNewProduct'
import product1 from '../assets/images/new-product/product1.png'
import product2 from '../assets/images/new-product/product2.png'
import product3 from '../assets/images/new-product/product3.png'
import product4 from '../assets/images/new-product/product4.png'
import product5 from '../assets/images/new-product/product5.png'
import product6 from '../assets/images/new-product/product6.png'

export interface INewProduct {
	name: string
	price: number
	img: string
	percent_sale?: number
}

export default function NewProduct() {
	const ListSales: INewProduct[] = [
		{
			name: 'Áo Sơ mi nam Excool Limited ngắn tay chui đầu',
			price: 180000,
			img: product1
		},
		{
			name: 'Áo thun Cotton Care &Share Tuổi thơ dữ dội',
			price: 220000,
			img: product2
		},
		{
			name: 'Quần shorts chạy bộ Ultra Fast & Free Run',
			price: 120000,
			img: product3
		},
		{
			name: 'Combo 2 đôi tất/vớ cổ trung Care & Share Cotton thoáng khí',
			price: 50000,
			img: product4,
			percent_sale: 20
		},
		{
			name: 'Mũ/Nón Bucket Hat thêu Care & Share Handwriting',
			price: 120000,
			img: product5
		},
		{
			name: 'Unity Áo thun nữ Lá thư Nhiệt đới Giải trí',
			price: 180000,
			img: product6
		}
	]

	return (
		<div className="d-flex flex-column">
			<div className="header-title-product d-flex justify-content-between">
				<p className="title-product">Sản phẩm mới ra mắt</p>
				<Link to="#" className="view-all">
					Xem tất cả
				</Link>
			</div>
			<div className="new-product d-flex justify-content-between">
				{ListSales.map((item: INewProduct, index: number) => {
					return <ItemNewProduct item={item} key={index} />
				})}
			</div>
		</div>
	)
}
