import React from 'react'
import { Link } from 'react-router-dom'
import sale from '../assets/images/collection/sale.png'
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
			title: 'Sản phẩm mới',
			img: sport
		},
		{
			title: 'Flash sale',
			img: sale
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
					<Link
						to="/all-product"
						onClick={() => {
							// isPage là 1 tức là trang các sản phẩm đang được sale
							localStorage.setItem('isPage', '3')
						}}
						className="buy-now">
						Mua hàng ngay <FeatherIcon icon="arrow-right" />
					</Link>
				</div>
			</div>
			<p className="title-collection">Bạn tìm gì hôm nay?</p>
			<div className="collection-content d-flex justify-content-between">
				{listCollection.map((item, index) => {
					return (
						<Link
							to="/all-product"
							className="collection-item"
							onClick={() => {
								// isPage là 0 tức là trang tất cả các sản phẩm
								// isPage là 1 tức là trang phụ kiện
								// isPage là 2 tức là trang tất cả các sản phẩm mới
								// isPage là 3 tức là trang tất cả các sản phẩm đang được sale
								localStorage.removeItem('keySearch')
								localStorage.setItem('isPage', index.toString())
							}}
							key={index}>
							<div
								className="img-collection"
								style={{
									backgroundImage: `url(${item.img})`,
									backgroundSize: 'cover'
								}}>
								<div
									style={{
										borderRadius: '8px',
										width: '100%',
										height: '100%',
										backgroundColor: 'rgb(0 0 0 / 40%)'
									}}></div>
							</div>
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
