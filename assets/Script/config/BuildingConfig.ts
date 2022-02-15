type BuildingConfigData = {
	buildingId: number,
	name: string,
	initNum: number,
	yieldOptions: number[],
	price: number,
	useType: number,
	worldLandTab: number,
	buildTime: number,
	desc: string,
}
let BuildingConfig: { [id: string]: BuildingConfigData } = {
    "1": {
        "buildingId": 1,
        "name": "农田",
        "initNum": 2,
        "yieldOptions": [
            1500,
            3000,
            4500,
            6000,
            7500
        ],
        "price": 210000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 0,
        "desc": "获得粮食作物"
    },
    "2": {
        "buildingId": 2,
        "name": "大龙井",
        "initNum": 1,
        "yieldOptions": [
            40000,
            80000,
            120000,
            160000,
            200000
        ],
        "price": 0,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 0,
        "desc": "取水的建筑物"
    },
    "3": {
        "buildingId": 3,
        "name": "制曲车间",
        "initNum": 1,
        "yieldOptions": [
            1250,
            2500,
            3750,
            5000,
            6250
        ],
        "price": 30000000000,
        "useType": 0,
        "worldLandTab": 1,
        "buildTime": 31536000,
        "desc": "获得曲粉的车间"
    },
    "4": {
        "buildingId": 4,
        "name": "烤酒车间",
        "initNum": 1,
        "yieldOptions": [],
        "price": 40000000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 31536000,
        "desc": "获得轮次酒的车间"
    },
    "5": {
        "buildingId": 5,
        "name": "酒库",
        "initNum": 1,
        "yieldOptions": [
            500,
            1000,
            1500,
            2000,
            2500
        ],
        "price": 50000000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 31536000,
        "desc": "储酒的仓库"
    },
    "6": {
        "buildingId": 6,
        "name": "酿造厂",
        "initNum": 1,
        "yieldOptions": [
            500,
            1000,
            1500,
            2000,
            2500
        ],
        "price": 60000000000,
        "useType": 0,
        "worldLandTab": 1,
        "buildTime": 31536000,
        "desc": "获得酒液的车间"
    },
    "7": {
        "buildingId": 7,
        "name": "白酒实验室",
        "initNum": 1,
        "yieldOptions": [
            100,
            200,
            300,
            400,
            500
        ],
        "price": 20000000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 31536000,
        "desc": "获得配方"
    },
    "8": {
        "buildingId": 8,
        "name": "窖池",
        "initNum": 1,
        "yieldOptions": [
            500,
            1000,
            1500,
            2000,
            2500
        ],
        "price": 100000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 31536000,
        "desc": "烤酒必备的设施"
    },
    "9": {
        "buildingId": 9,
        "name": "包装车间",
        "initNum": 1,
        "yieldOptions": [],
        "price": 20000000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 31536000,
        "desc": "自定义包装酒液"
    },
    "10": {
        "buildingId": 10,
        "name": "工业用地",
        "initNum": 0,
        "yieldOptions": [],
        "price": 1200000000,
        "useType": 1,
        "worldLandTab": 0,
        "buildTime": 0,
        "desc": ""
    },
    "11": {
        "buildingId": 11,
        "name": "榕树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    },
    "12": {
        "buildingId": 12,
        "name": "圣诞树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    },
    "13": {
        "buildingId": 13,
        "name": "樟树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    },
    "14": {
        "buildingId": 14,
        "name": "枫树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    },
    "15": {
        "buildingId": 15,
        "name": "杨树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    },
    "16": {
        "buildingId": 16,
        "name": "松树",
        "initNum": 0,
        "yieldOptions": [],
        "price": 200000000,
        "useType": 2,
        "worldLandTab": 2,
        "buildTime": 0,
        "desc": ""
    }
}
export default BuildingConfig;