import React, { useEffect } from 'react'
import ItemFlashSale from './ItemFlashSale'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function FlashSale() {
	const dispatch = useDispatch()
	const { listProductSale } = useSelector(
		(state: any) => state.productReducer
	)

	useEffect(() => {
		dispatch({
			type: 'GET_PRODUCT_SALE'
		})
	}, [])

	useEffect(() => {}, [listProductSale])

	const imgMain = (listImg: any): any => {
		let img
		listImg.forEach((item: any) => {
			if (item.isMain === 1) {
				img = item.url
			}
		})
		return img
	}

	const ListSales: any[] = []
	listProductSale.forEach((item: any) => {
		ListSales.push({
			id: item.id,
			sold: item.sold,
			rating: item.rating,
			cate_products_id: item.cate_products_id,
			remain: item.remain,
			description_detail: item.description_detail,
			material: item.material,
			created_at: item.createdAt,
			updated_at: item.updatedAt,
			name_brand: item.name_brand,
			listImage: item.listImage,
			listSize: item.listSize,
			listColor: item.listColor,
			listTag: item.listTag,
			name_product: item.name_product,
			price: item.price,
			percent_sale: item.percent_sale,
			img: imgMain(item.listImage)
		})
	})

	let arrayProduct = []
	if (ListSales.length > 6) {
		for (let i = 0; i < 6; i++) {
			arrayProduct.push(ListSales[i])
		}
	} else {
		for (let i = 0; i < ListSales.length; i++) {
			arrayProduct.push(ListSales[i])
		}
	}

	return (
		<div className="d-flex flex-column">
			<div className="header-title-product d-flex justify-content-between">
				<p className="title-product text-danger">FLASH SALE</p>
				<Link
					to="/all-product"
					onClick={() => {
						localStorage.setItem('isPage', '3')
					}}
					className="view-all">
					Xem tất cả
				</Link>
			</div>
			<div
				className="flash-sale d-flex justify-content-start
			">
				{arrayProduct.map((item: any, index: number) => {
					return <ItemFlashSale item={item} key={index} />
				})}
			</div>
		</div>
	)
}
