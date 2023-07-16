import React, { useEffect, useState } from 'react'

interface IInputQuantity {
	onInputChange: any
	remain?: number
}

export default function InputQuantity({
	onInputChange,
	remain
}: IInputQuantity) {
	const [numberProduct, setNumberProduct] = useState(1)

	useEffect(() => {
		onInputChange(numberProduct)
	}, [numberProduct])

	return (
		<div className="number-product d-flex justify-content-between w-50">
			<button
				className="btn-subtract"
				onClick={() => {
					if (numberProduct > 1) {
						setNumberProduct(numberProduct - 1)
					}
				}}>
				-
			</button>
			<input
				className="input-number"
				type="text"
				value={numberProduct}
				onChange={(event) => {
					let value = parseInt(event.target.value)
					if (isNaN(value) || Number(value) < 1) {
						setNumberProduct(1)
					} else if (Number(value) > remain!) {
						setNumberProduct(remain!)
					} else {
						setNumberProduct(parseInt(event.target.value))
					}
				}}
			/>
			<button
				className="btn-plus"
				onClick={() => {
					if (numberProduct === remain!) {
						setNumberProduct(remain!)
					} else {
						setNumberProduct(numberProduct + 1)
					}
				}}>
				+
			</button>
		</div>
	)
}
