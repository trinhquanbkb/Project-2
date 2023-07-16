import React from 'react'

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

	const renderPagination = (countPage: number) => {
		let arrPage = []
		for (let i = 0; i < countPage; i++) {
			arrPage.push(i + 1)
		}
		return arrPage.map((item) => {
			if (item === pageCurrent) {
				return (
					<li className="page-item" onClick={() => pageChange(item)}>
						<a className="page-link bg-dark text-light" href="#">
							{item}
						</a>
					</li>
				)
			} else {
				return (
					<li className="page-item" onClick={() => pageChange(item)}>
						<a className="page-link text-dark" href="#">
							{item}
						</a>
					</li>
				)
			}
		})
	}

	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination mt-4">
					<li className="page-item">
						<a
							className="page-link text-dark"
							href="#"
							aria-label="Previous">
							<span aria-hidden="true">«</span>
						</a>
					</li>
					{renderPagination(countPage)}
					<li className="page-item">
						<a
							className="page-link text-dark"
							href="#"
							aria-label="Next">
							<span aria-hidden="true">»</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}
