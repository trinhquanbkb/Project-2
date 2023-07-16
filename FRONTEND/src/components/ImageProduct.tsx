import React, { useState } from 'react'

export default function ImageProduct(item: any) {
	const productDetail = item.item

	let listImage = productDetail.listImage
	const [imgChoose, setImgChoose] = useState(
		listImage === undefined ? null : listImage[0].url
	)
	const onClickImg = (event: any) => {
		setImgChoose(event)
	}

	return (
		<div className="d-flex">
			<div className="list-image-product d-flex flex-column">
				{listImage === undefined
					? null
					: listImage.map((item: any, index: number) => {
							if (index % 2 === 0) {
								if (index === listImage.length - 1) {
									return (
										<div className="d-flex">
											<img
												className="img-item-list"
												src={listImage[index].url}
												alt="..."
												key={index}
												onClick={() => {
													onClickImg(
														listImage[index].url
													)
												}}
											/>
										</div>
									)
								} else {
									return (
										<div className="d-flex">
											<img
												className="img-item-list"
												src={listImage[index].url}
												alt="..."
												key={index}
												onClick={() => {
													onClickImg(
														listImage[index].url
													)
												}}
											/>
											<img
												className="img-item-list"
												src={listImage[index + 1].url}
												alt="..."
												key={index + 1}
												onClick={() => {
													onClickImg(
														listImage[index + 1].url
													)
												}}
											/>
										</div>
									)
								}
							} else {
								return null
							}
					  })}
			</div>
			<div className="main-image">
				<img className="img-cover" src={imgChoose} alt="img-main" />
			</div>
		</div>
	)
}
