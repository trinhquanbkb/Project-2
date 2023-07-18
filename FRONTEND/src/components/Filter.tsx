import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Filter({ handleBrand, handleColor, handleSize }: any) {
	const dispatch = useDispatch()
	const { listBrand } = useSelector((state: any) => state.brandReducer)
	const { listColor } = useSelector((state: any) => state.colorReducer)
	const { listSize } = useSelector((state: any) => state.sizeReducer)

	useEffect(() => {
		dispatch({
			type: 'GET_ALL_BRAND'
		})
		dispatch({
			type: 'GET_ALL_COLOR'
		})
		dispatch({
			type: 'GET_ALL_SIZE'
		})
	}, [])

	useEffect(() => {}, [listBrand, listColor, listSize])

	const renderFilter = (list: any, content: string, attr: string) => {
		return (
			<div>
				<div className="module-title-filter">
					<h2 className="title-head-filter">{content}</h2>
				</div>
				<div className="d-flex flex-wrap content-filter">
					<ul>
						{list.map((item: any, index: number) => {
							return (
								<li
									onClick={() => {
										if (attr === 'size') {
											handleSize(item[attr])
										} else if (attr === 'name_brand') {
											handleBrand(item[attr])
										}
									}}
									key={index}
									className="filter-item">
									{item[attr]}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}

	const renderColor = () => {
		return (
			<div>
				<div className="module-title-filter">
					<h2 className="title-head-filter">Màu sắc</h2>
				</div>
				<div className="d-flex flex-wrap content-filter">
					<ul className="d-flex flex-wrap">
						{listColor.map((item: any, index: number) => {
							return (
								<div
									onClick={() => {
										handleColor(item.color)
									}}
									key={index}
									style={{
										backgroundColor: item.color,
										borderRadius: '4px',
										border: '1px solid black',
										marginRight: '8px',
										marginBottom: '4px',
										width: '25px',
										height: '25px'
									}}></div>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}

	return (
		<div className="filter-product d-flex flex-column">
			{renderFilter(listSize, 'Kích thước', 'size')}
			{renderFilter(listBrand, 'Thương hiệu', 'name_brand')}
			{renderColor()}
		</div>
	)
}
