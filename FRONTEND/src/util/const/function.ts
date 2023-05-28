export function renderPrice(
	price: number,
	count: number,
	arr: number[]
): string {
	if (price >= 1000) {
		let priceNew = price / 1000
		let part = price - Math.floor(priceNew) * 1000
		let result: string = renderPrice(Math.floor(priceNew), count + 1, [
			...arr,
			part
		])
		return result
	} else {
		let result: string = price + ''
		for (let i = 0; i < count; i++) {
			result += '.'
			if (arr[count - i - 1] < 10) {
				result += '00' + arr[count - i - 1]
			} else if (arr[count - i - 1] < 100) {
				result += '0' + arr[count - i - 1]
			} else {
				result += arr[count - i - 1]
			}
		}
		return result
	}
}

export function renderCode(id: number): string {
	let x = 3
	let value = id + ''
	if (id < 1000) {
		while (id > 1) {
			id /= 10
			if (id >= 1) {
				x--
			}
		}
		for (let i = 0; i < x; i++) {
			value = '0' + value
		}
		return value
	} else {
		return id + ''
	}
}
