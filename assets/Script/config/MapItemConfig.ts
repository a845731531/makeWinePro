type MapItemConfigData = {
	id: number,
	buildingId: number,
	name: string,
	areaSize: number[],
	iconRect: number[],
}
let MapItemConfig: { [id: string]: MapItemConfigData } = {
    "1": {
        "id": 1,
        "buildingId": 1,
        "name": "农田",
        "areaSize": [],
        "iconRect": []
    },
    "2": {
        "id": 2,
        "buildingId": 2,
        "name": "大龙井",
        "areaSize": [],
        "iconRect": []
    },
    "3": {
        "id": 3,
        "buildingId": 3,
        "name": "制曲车间",
        "areaSize": [
            4,
            8
        ],
        "iconRect": [
            260,
            125,
            500,
            400
        ]
    },
    "4": {
        "id": 4,
        "buildingId": 4,
        "name": "烤酒车间",
        "areaSize": [],
        "iconRect": []
    },
    "5": {
        "id": 5,
        "buildingId": 5,
        "name": "酒仓",
        "areaSize": [],
        "iconRect": []
    },
    "6": {
        "id": 6,
        "buildingId": 6,
        "name": "酿造厂",
        "areaSize": [
            6,
            10
        ],
        "iconRect": [
            410,
            140,
            700,
            500
        ]
    },
    "7": {
        "id": 7,
        "buildingId": 7,
        "name": "白酒实验室",
        "areaSize": [],
        "iconRect": []
    },
    "8": {
        "id": 8,
        "buildingId": 8,
        "name": "窖池",
        "areaSize": [],
        "iconRect": []
    },
    "9": {
        "id": 9,
        "buildingId": 9,
        "name": "包装车间",
        "areaSize": [],
        "iconRect": []
    },
    "10": {
        "id": 10,
        "buildingId": 10,
        "name": "工业用地",
        "areaSize": [],
        "iconRect": []
    },
    "11": {
        "id": 11,
        "buildingId": 11,
        "name": "榕树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            55,
            20,
            150,
            150
        ]
    },
    "12": {
        "id": 12,
        "buildingId": 12,
        "name": "圣诞树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            55,
            35,
            150,
            150
        ]
    },
    "13": {
        "id": 13,
        "buildingId": 13,
        "name": "樟树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            55,
            35,
            150,
            150
        ]
    },
    "14": {
        "id": 14,
        "buildingId": 14,
        "name": "枫树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            60,
            10,
            150,
            150
        ]
    },
    "15": {
        "id": 15,
        "buildingId": 15,
        "name": "杨树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            60,
            36,
            150,
            150
        ]
    },
    "16": {
        "id": 16,
        "buildingId": 16,
        "name": "松树",
        "areaSize": [
            2,
            2
        ],
        "iconRect": [
            60,
            36,
            150,
            150
        ]
    },
    "17": {
        "id": 17,
        "buildingId": 101,
        "name": "1x1黄格子障碍物",
        "areaSize": [
            1,
            1
        ],
        "iconRect": []
    }
}
export default MapItemConfig;