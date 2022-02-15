type StoreTimeConfigData = {
	year: number,
	time: number,
}
let StoreTimeConfig: { [id: string]: StoreTimeConfigData } = {
    "3": {
        "year": 3,
        "time": 180
    },
    "5": {
        "year": 5,
        "time": 300
    },
    "10": {
        "year": 10,
        "time": 600
    },
    "15": {
        "year": 15,
        "time": 900
    },
    "30": {
        "year": 30,
        "time": 1800
    }
}
export default StoreTimeConfig;