import React from 'react'
import Carousel from './Carousel'
import Collection from './Collection'
import HashTag from './HashTag'
import FlashSale from './FlashSale'
import NewProduct from './NewProduct'
import SuggestProduct from './SuggestProduct'

export default function ContentPage() {
	return (
		<div>
			<Carousel />
			<div className="container">
				<Collection />
			</div>
			<HashTag />
			<div className="container">
				<FlashSale />
				<NewProduct />
				<SuggestProduct />
			</div>
		</div>
	)
}
