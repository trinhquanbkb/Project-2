import React from 'react'
import { Link } from 'react-router-dom'
import { IBreadcumUrl } from '../pages/dashboard/Ecommerce/AllProductPage'

interface IBreadCrumb {
	props: IBreadcumUrl[]
}

export default function BreadCrumb({ props }: IBreadCrumb) {
	return (
		<nav aria-label="breadcrumb" className="mt-4">
			<ol className="breadcrumb mb-2">
				{props.map((item) => {
					if (item.pageCurrent === true) {
						return (
							<li
								className="breadcrumb-item active"
								aria-current="page">
								<Link to={item.url} className="text-breadcrum">
									{item.name}
								</Link>
							</li>
						)
					} else {
						return (
							<li className="breadcrumb-item">
								<Link to={item.url} className="text-breadcrum">
									{item.name}
								</Link>
							</li>
						)
					}
				})}
			</ol>
		</nav>
	)
}
