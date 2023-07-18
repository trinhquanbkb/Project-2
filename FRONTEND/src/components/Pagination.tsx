import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface IPagination {
	pageCurrent: number
	countPage: number
	onHandleChangePage: any
}

export default function Pagination({
	pageCurrent,
	countPage,
	onHandleChangePage
}: IPagination) {
	const pageChange = (page: number) => {
		onHandleChangePage(page)
	}
	const [isClick, setIsClick] = useState(pageCurrent)

	useEffect(() => {
		setIsClick(pageCurrent)
	}, [pageCurrent])
	const renderPagination = (countPage: number) => {
		let arrPage = []
		for (let i = 0; i < countPage; i++) {
			arrPage.push(i + 1)
		}
		return arrPage.map((item) => {
			return (
				<li
					className="page-item"
					onClick={() => {
						pageChange(item)
						setIsClick(item)
					}}>
					<Link
						className={
							isClick === item
								? `page-link bg-dark text-light`
								: `page-link text-dark`
						}
						to="#">
						{item}
					</Link>
				</li>
			)
		})
	}

	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination mt-4">
					<li
						className="page-item"
						onClick={() => {
							if (pageCurrent === 1) {
								pageChange(1)
							} else if (pageCurrent > 1) {
								pageChange(pageCurrent - 1)
								setIsClick(pageCurrent - 1)
							}
						}}>
						<Link
							className="page-link text-dark"
							to="#"
							aria-label="Previous">
							<span aria-hidden="true">«</span>
						</Link>
					</li>
					{renderPagination(countPage)}
					<li
						className="page-item"
						onClick={() => {
							if (pageCurrent === countPage) {
								pageChange(countPage)
							} else if (pageCurrent < countPage) {
								pageChange(pageCurrent + 1)
								setIsClick(pageCurrent + 1)
							}
						}}>
						<Link
							className="page-link text-dark"
							to="#"
							aria-label="Next">
							<span aria-hidden="true">»</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
