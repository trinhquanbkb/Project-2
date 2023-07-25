import React, { useState } from 'react'
import DOMPurify from 'dompurify'

export default function DescriptionProduct({ item }: any) {
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
						{parseHTML(item.description_detail)}
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
						{parseHTML(item.material)}
					</div>
				</div>
			</div>
		</div>
	)
}
