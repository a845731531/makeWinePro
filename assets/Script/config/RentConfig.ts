type RentConfigData = {
	type: number,
	price: number,
}
let RentConfig: { [id: string]: RentConfigData } = {
    "8": {
        "type": 8,
        "price": 1000000
    },
    "1": {
        "type": 1,
        "price": 1000000
    },
    "9": {
        "type": 9,
        "price": 1000000
    },
    "5": {
        "type": 5,
        "price": 1000000
    }
}
export default RentConfig;