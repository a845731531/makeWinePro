type WeatherConfigData = {
	month: number,
	lowTemp: number,
	highTemp: number,
	weatherWeight: number[],
}
let WeatherConfig: { [id: string]: WeatherConfigData } = {
    "3": {
        "month": 3,
        "lowTemp": 9,
        "highTemp": 16,
        "weatherWeight": [
            20,
            20,
            20,
            40,
            0
        ]
    },
    "4": {
        "month": 4,
        "lowTemp": 13,
        "highTemp": 21,
        "weatherWeight": [
            40,
            20,
            20,
            20,
            0
        ]
    },
    "5": {
        "month": 5,
        "lowTemp": 16,
        "highTemp": 24,
        "weatherWeight": [
            25,
            25,
            25,
            25,
            0
        ]
    },
    "6": {
        "month": 6,
        "lowTemp": 20,
        "highTemp": 25,
        "weatherWeight": [
            25,
            25,
            25,
            25,
            0
        ]
    },
    "7": {
        "month": 7,
        "lowTemp": 26,
        "highTemp": 30,
        "weatherWeight": [
            10,
            20,
            10,
            50,
            0
        ]
    },
    "8": {
        "month": 8,
        "lowTemp": 25,
        "highTemp": 35,
        "weatherWeight": [
            50,
            20,
            10,
            20,
            0
        ]
    },
    "9": {
        "month": 9,
        "lowTemp": 18,
        "highTemp": 25,
        "weatherWeight": [
            25,
            5,
            20,
            50,
            0
        ]
    },
    "10": {
        "month": 10,
        "lowTemp": 13,
        "highTemp": 20,
        "weatherWeight": [
            25,
            25,
            25,
            25,
            0
        ]
    },
    "11": {
        "month": 11,
        "lowTemp": 9,
        "highTemp": 15,
        "weatherWeight": [
            25,
            25,
            25,
            25,
            0
        ]
    },
    "12": {
        "month": 12,
        "lowTemp": 3,
        "highTemp": 9,
        "weatherWeight": [
            25,
            25,
            25,
            20,
            5
        ]
    },
    "1": {
        "month": 1,
        "lowTemp": 0,
        "highTemp": 8,
        "weatherWeight": [
            20,
            20,
            35,
            20,
            10
        ]
    },
    "2": {
        "month": 2,
        "lowTemp": -5,
        "highTemp": 10,
        "weatherWeight": [
            20,
            10,
            20,
            10,
            40
        ]
    }
}
export default WeatherConfig;