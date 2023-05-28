import React from 'react'
import Slide1 from '../assets/images/slider/Slide1.png'
import Slide2 from '../assets/images/slider/Slide2.png'
import Slide3 from '../assets/images/slider/Slide3.png'

export default function Carousel() {
	return (
		<div
			id="carouselExampleIndicators"
			className="carousel slide"
			data-bs-ride="carousel">
			<div className="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to={0}
					className="active"
					aria-current="true"
					aria-label="Slide 1"
				/>
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to={1}
					aria-label="Slide 2"
				/>
				<button
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide-to={2}
					aria-label="Slide 3"
				/>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img
						src={Slide1}
						className="d-block slide-item"
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src={Slide2}
						className="d-block slide-item"
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src={Slide3}
						className="d-block slide-item"
						alt="..."
					/>
				</div>
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleIndicators"
				data-bs-slide="prev">
				<span
					className="carousel-control-prev-icon"
					aria-hidden="true"
				/>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleIndicators"
				data-bs-slide="next">
				<span
					className="carousel-control-next-icon"
					aria-hidden="true"
				/>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	)
}
