import React, { useState } from 'react'
import image0 from '../assets/images/demo-detail-product/main.png'
import image1 from '../assets/images/demo-detail-product/image-1.png'
import image2 from '../assets/images/demo-detail-product/image-2.png'
import image3 from '../assets/images/demo-detail-product/image-3.png'
import image4 from '../assets/images/demo-detail-product/image-4.png'
import image5 from '../assets/images/demo-detail-product/image-5.png'
import image6 from '../assets/images/demo-detail-product/image-6.png'

export default function ImageProduct() {
	const listImage = [
		image0,
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image1,
		image2,
		image3,
		image4,
		image5,
		image6,
		image1,
		image2,
		image3,
		image4,
		image5,
		image6
	]
	const [imgChoose, setImgChoose] = useState(image0)
	const onClickImg = (event: any) => {
		setImgChoose(event)
	}

	return (
		<div className="d-flex">
			<div className="list-image-product d-flex flex-column">
				{listImage.map((item, index) => {
					if (index % 2 === 0) {
						if (index === listImage.length - 1) {
							return (
								<div className="d-flex">
									<img
										className="img-item-list"
										src={listImage[index]}
										alt="..."
										key={index}
										onClick={() => {
											onClickImg(listImage[index])
										}}
									/>
								</div>
							)
						} else {
							return (
								<div className="d-flex">
									<img
										className="img-item-list"
										src={listImage[index]}
										alt="..."
										key={index}
										onClick={() => {
											onClickImg(listImage[index])
										}}
									/>
									<img
										className="img-item-list"
										src={listImage[index + 1]}
										alt="..."
										key={index + 1}
										onClick={() => {
											onClickImg(listImage[index + 1])
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
