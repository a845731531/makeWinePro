type SmallGameBuffConfigData = {
	id: number,
	intervalMin: number,
	intervalMax: number,
	buffRate: number,
}
let SmallGameBuffConfig: { [id: string]: SmallGameBuffConfigData } = {
    "1": {
        "id": 1,
        "intervalMin": 0,
        "intervalMax": 100,
        "buffRate": 0.005
    },
    "2": {
        "id": 2,
        "intervalMin": 101,
        "intervalMax": 500,
        "buffRate": 0.01
    },
    "3": {
        "id": 3,
        "intervalMin": 501,
        "intervalMax": 100000,
        "buffRate": 0.01
    }
}
export default SmallGameBuffConfig;