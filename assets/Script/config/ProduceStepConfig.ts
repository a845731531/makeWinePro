type ProduceStepConfigData = {
	id: number,
	buildingType: number,
	stepId: number,
	stepName: string,
	subStepId: number,
	subStepName: string,
	timeRate: number,
}
let ProduceStepConfig: { [id: string]: ProduceStepConfigData } = {
    "1": {
        "id": 1,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 1,
        "subStepName": "松土",
        "timeRate": 86400
    },
    "2": {
        "id": 2,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 2,
        "subStepName": "播种",
        "timeRate": 86400
    },
    "3": {
        "id": 3,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 3,
        "subStepName": "浇水",
        "timeRate": 43200
    },
    "4": {
        "id": 4,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 4,
        "subStepName": "施肥",
        "timeRate": 7200
    },
    "5": {
        "id": 5,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 5,
        "subStepName": "除草",
        "timeRate": 86400
    },
    "6": {
        "id": 6,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 6,
        "subStepName": "发芽",
        "timeRate": 432000
    },
    "7": {
        "id": 7,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 7,
        "subStepName": "返青",
        "timeRate": 432000
    },
    "8": {
        "id": 8,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 8,
        "subStepName": "孕穗",
        "timeRate": 691200
    },
    "9": {
        "id": 9,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 9,
        "subStepName": "开花",
        "timeRate": 777600
    },
    "10": {
        "id": 10,
        "buildingType": 1,
        "stepId": 0,
        "stepName": "农田",
        "subStepId": 10,
        "subStepName": "成熟",
        "timeRate": 10368000
    },
    "11": {
        "id": 11,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 1,
        "subStepName": "撒水",
        "timeRate": 1800
    },
    "12": {
        "id": 12,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 2,
        "subStepName": "磨碎",
        "timeRate": 120
    },
    "13": {
        "id": 13,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 3,
        "subStepName": "搅拌",
        "timeRate": 120
    },
    "14": {
        "id": 14,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 4,
        "subStepName": "踩曲",
        "timeRate": 120
    },
    "15": {
        "id": 15,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 5,
        "subStepName": "培养",
        "timeRate": 3628800
    },
    "16": {
        "id": 16,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 6,
        "subStepName": "贮存",
        "timeRate": 15552000
    },
    "17": {
        "id": 17,
        "buildingType": 3,
        "stepId": 1,
        "stepName": "制曲",
        "subStepId": 7,
        "subStepName": "粉碎",
        "timeRate": 1800
    },
    "18": {
        "id": 18,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 1,
        "subStepName": "配料",
        "timeRate": 3600
    },
    "19": {
        "id": 19,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 2,
        "subStepName": "蒸粮",
        "timeRate": 7200
    },
    "20": {
        "id": 20,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 3,
        "subStepName": "泼量水",
        "timeRate": 300
    },
    "21": {
        "id": 21,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 4,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "22": {
        "id": 22,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 5,
        "subStepName": "洒尾酒",
        "timeRate": 300
    },
    "23": {
        "id": 23,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 6,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "24": {
        "id": 24,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 7,
        "subStepName": "堆积",
        "timeRate": 259200
    },
    "25": {
        "id": 25,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 8,
        "subStepName": "下窖",
        "timeRate": 5400
    },
    "26": {
        "id": 26,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 9,
        "subStepName": "封窖",
        "timeRate": 1800
    },
    "27": {
        "id": 27,
        "buildingType": 8,
        "stepId": 1,
        "stepName": "下沙",
        "subStepId": 10,
        "subStepName": "开窖",
        "timeRate": 1800
    },
    "28": {
        "id": 28,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 1,
        "subStepName": "配料",
        "timeRate": 3600
    },
    "29": {
        "id": 29,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 2,
        "subStepName": "蒸粮",
        "timeRate": 7200
    },
    "30": {
        "id": 30,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 3,
        "subStepName": "泼量水",
        "timeRate": 300
    },
    "31": {
        "id": 31,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 4,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "32": {
        "id": 32,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 5,
        "subStepName": "洒尾酒",
        "timeRate": 300
    },
    "33": {
        "id": 33,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 6,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "34": {
        "id": 34,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 7,
        "subStepName": "堆积",
        "timeRate": 259200
    },
    "35": {
        "id": 35,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 8,
        "subStepName": "下窖",
        "timeRate": 5400
    },
    "36": {
        "id": 36,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 9,
        "subStepName": "封窖",
        "timeRate": 1800
    },
    "37": {
        "id": 37,
        "buildingType": 8,
        "stepId": 2,
        "stepName": "糙沙",
        "subStepId": 10,
        "subStepName": "开窖",
        "timeRate": 1800
    },
    "38": {
        "id": 38,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "39": {
        "id": 39,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "40": {
        "id": 40,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "41": {
        "id": 41,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "42": {
        "id": 42,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "43": {
        "id": 43,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "44": {
        "id": 44,
        "buildingType": 8,
        "stepId": 3,
        "stepName": "一次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "45": {
        "id": 45,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "46": {
        "id": 46,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "47": {
        "id": 47,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "48": {
        "id": 48,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "49": {
        "id": 49,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "50": {
        "id": 50,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "51": {
        "id": 51,
        "buildingType": 8,
        "stepId": 4,
        "stepName": "二次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "52": {
        "id": 52,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "53": {
        "id": 53,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "54": {
        "id": 54,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "55": {
        "id": 55,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "56": {
        "id": 56,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "57": {
        "id": 57,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "58": {
        "id": 58,
        "buildingType": 8,
        "stepId": 5,
        "stepName": "三次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "59": {
        "id": 59,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "60": {
        "id": 60,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "61": {
        "id": 61,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "62": {
        "id": 62,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "63": {
        "id": 63,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "64": {
        "id": 64,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "65": {
        "id": 65,
        "buildingType": 8,
        "stepId": 6,
        "stepName": "四次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "66": {
        "id": 66,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "67": {
        "id": 67,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "68": {
        "id": 68,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "69": {
        "id": 69,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "70": {
        "id": 70,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "71": {
        "id": 71,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "72": {
        "id": 72,
        "buildingType": 8,
        "stepId": 7,
        "stepName": "五次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "73": {
        "id": 73,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "74": {
        "id": 74,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "75": {
        "id": 75,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "76": {
        "id": 76,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "77": {
        "id": 77,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "78": {
        "id": 78,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "79": {
        "id": 79,
        "buildingType": 8,
        "stepId": 8,
        "stepName": "六次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "80": {
        "id": 80,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 1,
        "subStepName": "蒸酒",
        "timeRate": 1800
    },
    "81": {
        "id": 81,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 2,
        "subStepName": "摊凉",
        "timeRate": 1800
    },
    "82": {
        "id": 82,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 3,
        "subStepName": "撒曲",
        "timeRate": 600
    },
    "83": {
        "id": 83,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 4,
        "subStepName": "堆积",
        "timeRate": 518400
    },
    "84": {
        "id": 84,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 5,
        "subStepName": "下窖",
        "timeRate": 129600
    },
    "85": {
        "id": 85,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 6,
        "subStepName": "封窖",
        "timeRate": 172800
    },
    "86": {
        "id": 86,
        "buildingType": 8,
        "stepId": 9,
        "stepName": "七次酒",
        "subStepId": 7,
        "subStepName": "开窖",
        "timeRate": 43200
    },
    "87": {
        "id": 87,
        "buildingType": 6,
        "stepId": 1,
        "stepName": "酒液",
        "subStepId": 1,
        "subStepName": "入罐",
        "timeRate": 86400
    },
    "88": {
        "id": 88,
        "buildingType": 6,
        "stepId": 1,
        "stepName": "酒液",
        "subStepId": 2,
        "subStepName": "混合",
        "timeRate": 43200
    },
    "89": {
        "id": 89,
        "buildingType": 6,
        "stepId": 1,
        "stepName": "酒液",
        "subStepId": 3,
        "subStepName": "搅拌",
        "timeRate": 43200
    },
    "90": {
        "id": 90,
        "buildingType": 6,
        "stepId": 1,
        "stepName": "酒液",
        "subStepId": 4,
        "subStepName": "沉淀",
        "timeRate": 259200
    },
    "91": {
        "id": 91,
        "buildingType": 6,
        "stepId": 1,
        "stepName": "酒液",
        "subStepId": 5,
        "subStepName": "过滤",
        "timeRate": 86400
    }
}
export default ProduceStepConfig;