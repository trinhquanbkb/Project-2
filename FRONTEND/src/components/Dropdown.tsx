import React from 'react'

export default function Dropdown({ name, item, onHandle }: any) {
	const handleChange = (item: string) => {
		onHandle(item)
	}
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
				{item.map((i: any) => {
					return (
						<div
							onClick={() => {
								handleChange(i)
							}}
							className="dropdown-item">
							{i}
						</div>
					)
				})}
			</div>
		</div>
	)
}
