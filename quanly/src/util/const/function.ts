export function renderPrice(
  price: number,
  count: number,
  arr: number[]
): string {
  if (price >= 1000) {
    let priceNew = price / 1000;
    let part = price - Math.floor(priceNew) * 1000;
    let result: string = renderPrice(Math.floor(priceNew), count + 1, [
      ...arr,
      part,
    ]);
    return result;
  } else {
    let result: string = price + "";
    for (let i = 0; i < count; i++) {
      result += ".";
      if (arr[count - i - 1] < 10) {
        result += "00" + arr[count - i - 1];
      } else if (arr[count - i - 1] < 100) {
        result += "0" + arr[count - i - 1];
      } else {
        result += arr[count - i - 1];
      }
    }
    return result;
  }
}

export function renderCode(id: number): string {
  let x = 3;
  let value = id + "";
  if (id < 1000) {
    while (id > 1) {
      id /= 10;
      if (id >= 1) {
        x--;
      }
    }
    for (let i = 0; i < x; i++) {
      value = "0" + value;
    }
    return value;
  } else {
    return id + "";
  }
}

export function linkProduct(id: number): string {
  const code = renderCode(id);
  return `id=${code}`;
}

export function parseColor(color: string): string {
  if (color === "white") {
    return "trắng";
  } else if (color === "black") {
    return "đen";
  } else if (color === "yellow") {
    return "vàng";
  } else if (color === "grey") {
    return "xám";
  } else if (color === "brown") {
    return "nâu";
  } else if (color === "red") {
    return "đỏ";
  } else if (color === "orange") {
    return "cam";
  } else if (color === "pink") {
    return "hồng";
  } else if (color === "blue") {
    return "xanh biển";
  } else {
    return "";
  }
}

export function parseDate(dateString: string): string {
  const date = new Date(dateString);
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  // Lấy thông tin thời gian Việt Nam
  const year = vietnamTime.getFullYear();
  const month = vietnamTime.getMonth() + 1;
  const day = vietnamTime.getDate();
  const hours = vietnamTime.getHours();
  const minutes = vietnamTime.getMinutes();
  const seconds = vietnamTime.getSeconds();

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
