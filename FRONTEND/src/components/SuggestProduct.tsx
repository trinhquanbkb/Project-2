import React from 'react'
import { Link } from 'react-router-dom'
import sale1 from '../assets/images/product-sale/sale1.png'
import sale2 from '../assets/images/product-sale/sale2.png'
import sale3 from '../assets/images/product-sale/sale3.png'
import sale4 from '../assets/images/product-sale/sale4.png'
import sale5 from '../assets/images/product-sale/sale5.png'
import sale6 from '../assets/images/product-sale/sale6.png'
import product1 from '../assets/images/new-product/product1.png'
import product2 from '../assets/images/new-product/product2.png'
import product3 from '../assets/images/new-product/product3.png'
import product4 from '../assets/images/new-product/product4.png'
import product5 from '../assets/images/new-product/product5.png'
import product6 from '../assets/images/new-product/product6.png'
import Product from './Product'

export interface IProduct {
	name: string
	price: number
	img: string
	percent_sale?: number
	countSold: number
}

export default function SuggestProduct() {
	const listProduct: IProduct[] = [
		{
			name: 'Quần Jeans dáng Slim Fit - Xanh nhạt',
			price: 280000,
			percent_sale: 40,
			img: sale1,
			countSold: 254
		},
		{
			name: ' Quần jean nữ Dây kéo Nút',
			price: 420000,
			percent_sale: 30,
			img: sale3,
			countSold: 178
		},
		{
			name: 'Mũ/Nón Bucket Hat thêu Care & Share Handwriting',
			price: 120000,
			img: product5,
			countSold: 21
		},
		{
			name: 'Unity Áo thun nữ Lá thư Nhiệt đới Giải trí',
			price: 180000,
			img: product6,
			countSold: 42
		},
		{
			name: 'Kính mắt chống ánh sáng xanh mắt mèo',
			price: 120000,
			percent_sale: 30,
			img: sale4,
			countSold: 584
		},
		{
			name: 'Quần shorts nam thể thao 7" V2 ',
			price: 210000,
			percent_sale: 35,
			img: sale5,
			countSold: 354
		},
		{
			name: 'Áo thun nam Cotton Coolmate Basics',
			price: 180000,
			percent_sale: 60,
			img: sale6,
			countSold: 478
		},
		{
			name: 'Áo Sơ mi nam Excool Limited ngắn tay chui đầu',
			price: 180000,
			img: product1,
			countSold: 2
		},
		{
			name: 'Đầm Thắt nút họa tiết hoa Boho',
			price: 250000,
			percent_sale: 50,
			img: sale2,
			countSold: 2145
		},
		{
			name: 'Áo thun Cotton Care &Share Tuổi thơ dữ dội',
			price: 220000,
			img: product2,
			countSold: 14
		},
		{
			name: 'Quần shorts chạy bộ Ultra Fast & Free Run',
			price: 120000,
			img: product3,
			countSold: 72
		},
		{
			name: 'Combo 2 đôi tất/vớ cổ trung Care & Share Cotton thoáng khí',
			price: 50000,
			img: product4,
			percent_sale: 10,
			countSold: 8
		}
	]
	return (
		<div>
			<div className="header-suggest-product">SẢN PHẨM GỢI Ý</div>
			<div className="body-suggest-product d-flex justify-content-around flex-wrap">
				{listProduct.map((item: IProduct, index: number) => {
					return (
						<Link
							to="#"
							className="item-product-suggest"
							key={index}>
							<Product item={item} />
						</Link>
					)
				})}
			</div>
			<div className="see-more d-flex justify-content-center">
				<button type="button" className="btn btn-dark w-25">
					Xem thêm
				</button>
			</div>
		</div>
	)
}
