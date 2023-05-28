import React, { useState } from 'react'
import { renderPrice } from '../util/const/function'
import Button from './Button'
import { renderCode } from '../util/const/function'
import InputQuantity from './InputQuantity'

export default function ContentProduct() {
	const product = {
		id: 3,
		name: 'Áo thun chạy bộ nam Advanced Fast & Free Run',
		rating: 4.3,
		sold: 512,
		price: 200000,
		color: [
			'white',
			'black',
			'grey',
			'blue',
			'green',
			'yellow',
			'red',
			'pink'
		],
		size: ['M', 'L', 'XL', '2XL', '3XL'],
		remain: 325,
		tags: ['áo thun', 'áo nam', 'đồ thể thao', 'Advanced Fast & Free Run']
	}
	const [colorSelect, setColorSelect] = useState(product.color[1])
	const [sizeSelect, setSizeSelect] = useState('M')
	const [inputValue, setInputValue] = useState(1)

	const handleInputChange = (value: any) => {
		setInputValue(value)
	}

	return (
		<div className="d-flex flex-column">
			<p className="name-product mb-2 lh-sm">{product.name}</p>
			<div className="d-flex justify-content-between">
				<p className="price-product">
					Giá:{' '}
					<span className="text-danger fw-bold">
						{renderPrice(product.price, 0, [])}đ
					</span>
				</p>
				<p className="m-0" style={{ fontSize: '14px' }}>
					MSP: #{renderCode(product.id)}
				</p>
			</div>
			<p className="m-0">
				Đánh giá: <span className="fw-bold">{product.rating}/5</span>
				(Đã bán: <span className="fw-bold">{product.sold}</span>)
			</p>
			<p>
				Sản phẩm còn lại:{' '}
				<span className="fw-bold">{product.remain}</span>
			</p>
			<p className="mt-3 mb-2">Màu sắc:</p>
			<div className="d-flex flex-wrap">
				{product.color.map((item, index) => {
					if (item === colorSelect) {
						return (
							<Button
								key={index}
								color={item}
								click={true}></Button>
						)
					} else {
						return (
							<div
								onClick={() => {
									setColorSelect(item)
								}}>
								<Button
									key={index}
									color={item}
									click={false}></Button>
							</div>
						)
					}
				})}
			</div>
			<p className="mt-2 mb-2">Kích thước áo:</p>
			<div className="d-flex flex-wrap">
				{product.size.map((item, index) => {
					if (sizeSelect === item) {
						return (
							<div
								key={index}
								onClick={() => {
									setSizeSelect(item)
								}}>
								<Button color="#DCDCDC" click={true}>
									{item}
								</Button>
							</div>
						)
					} else {
						return (
							<div
								key={index}
								onClick={() => {
									setSizeSelect(item)
								}}>
								<Button color="#DCDCDC" click={false}>
									{item}
								</Button>
							</div>
						)
					}
				})}
			</div>
			<p className="mt-2 mb-2">Chọn số lượng:</p>
			<InputQuantity onInputChange={handleInputChange} />
			<button type="button" className="btn btn-warning add-to-cart">
				THÊM VÀO GIỎ HÀNG
			</button>
			<div className="mt-4 d-flex flex-wrap">
				<p className="tags">#tags: </p>
				{product.tags.map((item, index) => {
					return (
						<button key={index} className="btn-tags">
							{item}
						</button>
					)
				})}
			</div>
		</div>
	)
}
