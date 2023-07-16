import React, { useState } from 'react'
import DOMPurify from 'dompurify'

export default function DescriptionProduct() {
	const description =
		'<p className="m-0">- Đường viền đan thoáng khí.</p><p className="m-0">- Chống tia cực tím.</p><p className="m-0">- Công nghệ "DRY-EX" khô nhanh.</p><p className="m-0">- Được làm bằng vải siêu co giãn.</p><p className="m-0">- Tay áo Raglan giúp cử động cánh tay dễ dàng.</p><p className="m-0">- Túi bên có khóa kéo.</p>'
	const material =
		'<p>[01 OFF WHITE, 09 BLACK, 53 GREEN, 63 BLUE]</p> Thân:100% Polyeste ( 39% Sử Dụng Sợi Polyeste Tái Chế )/Vải Túi: 100% Polyeste [02 LIGHT GRAY, 08 DARK GRAY]Thân: 100% Polyeste ( 35% Sử Dụng Sợi Polyeste TáiChế )/ Vải Túi: 100% Polyeste'
	const [isOpen1, setIsOpen1] = useState({ item: 0 })
	const [isOpen2, setIsOpen2] = useState({ item: 0 })

	const parseHTML = (htmlString: string) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString)
		return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
	}

	return (
		<div className="collapse-product d-flex flex-column mt-5">
			<h3 className="fw-bold">Mô tả</h3>
			<div className="mt-4">
				<div>
					<div className="line"></div>
					<div
						className="collapse-title d-flex justify-content-between"
						onClick={() => {
							if (isOpen1.item === 0) {
								setIsOpen1({ item: 1 })
							} else {
								setIsOpen1({ item: 0 })
							}
						}}>
						<p>Tổng quan</p>
						<i
							className={
								isOpen1.item === 1
									? 'fa-solid fa-chevron-up fs-5'
									: 'fa-solid fa-chevron-down fs-5'
							}></i>
					</div>

					<div
						className={`collapse mb-4 ${
							isOpen1.item === 1 ? 'show' : ''
						}`}>
						{parseHTML(description)}
					</div>
				</div>
				<div>
					<div className="line"></div>
					<div
						className="collapse-title d-flex justify-content-between"
						onClick={() => {
							if (isOpen2.item === 0) {
								setIsOpen2({ item: 1 })
							} else {
								setIsOpen2({ item: 0 })
							}
						}}>
						<p>Chất liệu</p>
						<i
							className={
								isOpen2.item === 1
									? 'fa-solid fa-chevron-up fs-5'
									: 'fa-solid fa-chevron-down fs-5'
							}></i>
					</div>

					<div
						className={`collapse mb-4 ${
							isOpen2.item === 1 ? 'show' : ''
						}`}>
						{parseHTML(material)}
					</div>
				</div>
			</div>
		</div>
	)
}
