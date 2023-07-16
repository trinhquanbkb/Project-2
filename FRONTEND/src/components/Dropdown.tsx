import React from 'react'

interface IDropdown {
	name: string
	item: string[]
}

export default function Dropdown({ name, item }: IDropdown) {
	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle"
				type="button"
				id="filterDropdown"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false">
				{name}
			</button>
			<div className="dropdown-menu" aria-labelledby="filterDropdown">
				{item.map((i) => {
					return (
						<a className="dropdown-item" href="#">
							{i}
						</a>
					)
				})}
			</div>
		</div>
	)
}
