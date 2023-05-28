import React from 'react'

interface IButton {
	color?: string
	click?: boolean
	children?: React.ReactNode
}

export default function Button({ color, click, children }: IButton) {
	return (
		<div>
			{click === true ? (
				<button
					style={{
						backgroundColor: color,
						borderRadius: '1rem',
						width: '66px',
						height: '36px',
						margin: '4px 10px 6px 2px',
						outline: '3px solid blue',
						border: '2px solid white',
						boxSizing: 'border-box'
					}}>
					{children}
				</button>
			) : (
				<button
					style={{
						backgroundColor: color,
						borderRadius: '1rem',
						width: '70px',
						height: '40px',
						margin: '2px 8px 2px 0px',
						border: '1px solid #c0b3b3',
						boxSizing: 'border-box'
					}}>
					{children}
				</button>
			)}
		</div>
	)
}
