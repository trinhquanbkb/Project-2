import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import Order from './Order'
import { useDispatch, useSelector } from 'react-redux'

interface IListSelect {
	id: number
	totalPrice: number
	color: string
	size: string
}
export default function Cart() {
	const dispatch = useDispatch()
	const { listOrderDetail, statusDelete } = useSelector(
		(state: any) => state.orderDetailReducer
	)
	const [isDelete, setIsDelete] = useState(0)
	const [listSelect, setListSelect] = useState<IListSelect[]>([])

	const handleDeleteItem = () => {
		setIsDelete(1)
	}

	const handleSelectItem = (info: IListSelect) => {
		let result: IListSelect[] = []
		if (listSelect.length === 0) {
			result.push(info)
		} else {
			let x = 0
			listSelect.forEach((item) => {
				if (
					info.id === item.id &&
					info.color === item.color &&
					info.size === item.size
				) {
					result.push(info)
					x++
				} else {
					result.push(item)
				}
			})
			if (x === 0) {
				result.push(info)
			}
		}
		setListSelect(result)
	}

	const handleDeleteSelectItem = (id: number) => {
		let result: IListSelect[] = []
		listSelect.forEach((item) => {
			if (id !== item.id) {
				result.push(item)
			}
		})
		setListSelect(result)
	}

	useEffect(() => {
		dispatch({
			type: 'GET_ALL_ORDER_DETAIL'
		})
	}, [])

	useEffect(() => {
		dispatch({
			type: 'GET_ALL_ORDER_DETAIL'
		})
		setIsDelete(0)
	}, [statusDelete, isDelete, listSelect])

	return (
		<div className="cart-page container-fluid">
			<h2 className="fw-bold">Giỏ hàng</h2>
			<div
				className="flex-row d-flex justify-content-between"
				style={{ position: 'relative' }}>
				<div className="d-flex flex-column" style={{ width: '55%' }}>
					{listOrderDetail.map((item: any, index: number) => {
						return (
							<div key={index}>
								<CartItem
									cart={item}
									onDelete={handleDeleteItem}
									onSelect={handleSelectItem}
									onNotSelect={handleDeleteSelectItem}
								/>
							</div>
						)
					})}
				</div>
				<Order listSelect={listSelect} />
			</div>
		</div>
	)
}
