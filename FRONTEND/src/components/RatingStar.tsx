import React from 'react'
import FeatherIcon from 'feather-icons-react'

export interface IRatingStar {
	size: string //"sm", "md", "lg", "xl"
	value: number
	maxValue: number
}

const renderStar = (size: string, value: number, maxValue: number) => {
	const stars = []
	const filledStars = Math.floor(value)
	const hasHalfStar = value % 1 !== 0
	const percentStar = (100 - (value % 1) * 100) * 0.6 + 20
	let sizeIcon = 16
	if (size === 'md') {
		sizeIcon = 24
	} else if (size === 'lg') {
		sizeIcon = 36
	} else if (size === 'xl') {
		sizeIcon = 48
	}
	for (let i = 1; i <= maxValue; i++) {
		if (i <= filledStars) {
			stars.push(
				<FeatherIcon
					icon="star"
					size={sizeIcon}
					className="star-full"
				/>
			)
		} else if (i === filledStars + 1 && hasHalfStar) {
			stars.push(
				<div
					className="star-container"
					style={{ width: `${sizeIcon}px`, height: `${sizeIcon}px` }}>
					<FeatherIcon
						icon="star"
						className="star-wrapper w-100 h-100"
					/>
					<FeatherIcon
						icon="star"
						size={sizeIcon}
						className="star-half h-100"
						style={{ clipPath: `inset(0% ${percentStar}% 0% 0%)` }}
					/>
				</div>
			)
		}
	}
	return stars
}

export default function RatingStar({ size, value, maxValue }: IRatingStar) {
	return (
		<div className="d-flex flex-row justify-content-center">
			{renderStar(size, value, maxValue)}
		</div>
	)
}
