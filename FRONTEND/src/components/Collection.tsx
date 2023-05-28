import React from 'react'
import { Link } from 'react-router-dom'
import sleepwear from '../assets/images/collection/do-ngu.png'
import sport from '../assets/images/collection/do-the-thao.png'
import accessory from '../assets/images/collection/phu-kien.png'
import allProduct from '../assets/images/collection/tat-ca-san-pham.png'
import FeatherIcon from 'feather-icons-react'
import { renderPrice } from '../util/const/function'

export default function Collection() {
	const listCollection = [
		{
			title: 'Tất cả sản phẩm',
			img: allProduct
		},
		{
			title: 'Phụ kiện',
			img: accessory
		},
		{
			title: 'Đồ thể thao',
			img: sport
		},
		{
			title: 'Đồ ngủ',
			img: sleepwear
		}
	]

	const listSale = [
		{
			percent: 10,
			orderBy: 400000
		},
		{
			percent: 15,
			orderBy: 1200000
		},
		{
			percent: 20,
			orderBy: 2000000
		}
	]

	return (
		<div className="d-flex flex-column">
			<div className="d-flex justify-content-center">
				{listSale.map((item, index) => {
					return (
						<div
							className="item-infor-sale d-flex flex-column"
							key={index}>
							<div className="sale-top d-flex justify-content-center">
								<div className="d-flex flex-column justify-content-center">
									<div className="div-sale">Giảm</div>
								</div>
								<div className="percent-sale">
									{item.percent}%
								</div>
							</div>
							<div className="sale-bottom">
								Cho đơn hàng từ{' '}
								{renderPrice(item.orderBy, 0, [])}đ
							</div>
						</div>
					)
				})}
				<div className="d-flex flex-column justify-content-end w-25">
					<Link to="#" className="buy-now">
						Mua hàng ngay <FeatherIcon icon="arrow-right" />
					</Link>
				</div>
			</div>
			<p className="title-collection">Bạn tìm gì hôm nay?</p>
			<div className="collection-content d-flex justify-content-between">
				{listCollection.map((item, index) => {
					return (
						<Link to="#" className="collection-item" key={index}>
							<img
								className="img-collection"
								src={item.img}
								alt={item.title}></img>
							<p className="title-item-collection">
								{item.title}
							</p>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
