type StaffConfigData = {
	staffId: number,
	baseStaff: number,
	star: number,
	nextStaffId: number,
	chipNum: string[],
	manageNum: number,
	riseStarNeed: string[],
	farmSpeed: number,
	zhiquSpeed: number,
	kaojiuSpeed: number,
	wineSuccess: number,
	wineSpeed: number,
	briefText: string,
}
let StaffConfig: { [id: string]: StaffConfigData } = {
    "36001": {
        "staffId": 36001,
        "baseStaff": 1,
        "star": 1,
        "nextStaffId": 36002,
        "chipNum": [
            "46001_5"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46001_20"
        ],
        "farmSpeed": 70,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 180,
        "wineSuccess": 200,
        "wineSpeed": 100,
        "briefText": "农业大师"
    },
    "36002": {
        "staffId": 36002,
        "baseStaff": 1,
        "star": 2,
        "nextStaffId": 36003,
        "chipNum": [
            "46001_10"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46001_20"
        ],
        "farmSpeed": 270,
        "zhiquSpeed": 250,
        "kaojiuSpeed": 380,
        "wineSuccess": 400,
        "wineSpeed": 300,
        "briefText": "农业大师"
    },
    "36003": {
        "staffId": 36003,
        "baseStaff": 1,
        "star": 3,
        "nextStaffId": 36004,
        "chipNum": [
            "46001_15"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46001_20"
        ],
        "farmSpeed": 470,
        "zhiquSpeed": 450,
        "kaojiuSpeed": 580,
        "wineSuccess": 600,
        "wineSpeed": 500,
        "briefText": "农业大师"
    },
    "36004": {
        "staffId": 36004,
        "baseStaff": 1,
        "star": 4,
        "nextStaffId": 36005,
        "chipNum": [
            "46001_20"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46001_20"
        ],
        "farmSpeed": 670,
        "zhiquSpeed": 650,
        "kaojiuSpeed": 780,
        "wineSuccess": 800,
        "wineSpeed": 700,
        "briefText": "农业大师"
    },
    "36005": {
        "staffId": 36005,
        "baseStaff": 1,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46001_25"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46001_0"
        ],
        "farmSpeed": 870,
        "zhiquSpeed": 850,
        "kaojiuSpeed": 980,
        "wineSuccess": 1000,
        "wineSpeed": 900,
        "briefText": "农业大师"
    },
    "36006": {
        "staffId": 36006,
        "baseStaff": 2,
        "star": 1,
        "nextStaffId": 36007,
        "chipNum": [
            "46002_5"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46002_20"
        ],
        "farmSpeed": 200,
        "zhiquSpeed": 120,
        "kaojiuSpeed": 150,
        "wineSuccess": 30,
        "wineSpeed": 100,
        "briefText": "踩曲大师"
    },
    "36007": {
        "staffId": 36007,
        "baseStaff": 2,
        "star": 2,
        "nextStaffId": 36008,
        "chipNum": [
            "46002_10"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46002_20"
        ],
        "farmSpeed": 400,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 350,
        "wineSuccess": 230,
        "wineSpeed": 300,
        "briefText": "踩曲大师"
    },
    "36008": {
        "staffId": 36008,
        "baseStaff": 2,
        "star": 3,
        "nextStaffId": 36009,
        "chipNum": [
            "46002_15"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46002_20"
        ],
        "farmSpeed": 600,
        "zhiquSpeed": 520,
        "kaojiuSpeed": 550,
        "wineSuccess": 430,
        "wineSpeed": 500,
        "briefText": "踩曲大师"
    },
    "36009": {
        "staffId": 36009,
        "baseStaff": 2,
        "star": 4,
        "nextStaffId": 36010,
        "chipNum": [
            "46002_20"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46002_20"
        ],
        "farmSpeed": 800,
        "zhiquSpeed": 720,
        "kaojiuSpeed": 750,
        "wineSuccess": 630,
        "wineSpeed": 700,
        "briefText": "踩曲大师"
    },
    "36010": {
        "staffId": 36010,
        "baseStaff": 2,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46002_25"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46002_0"
        ],
        "farmSpeed": 1000,
        "zhiquSpeed": 920,
        "kaojiuSpeed": 950,
        "wineSuccess": 830,
        "wineSpeed": 900,
        "briefText": "踩曲大师"
    },
    "36011": {
        "staffId": 36011,
        "baseStaff": 3,
        "star": 1,
        "nextStaffId": 36012,
        "chipNum": [
            "46003_5"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46003_20"
        ],
        "farmSpeed": 80,
        "zhiquSpeed": 200,
        "kaojiuSpeed": 20,
        "wineSuccess": 120,
        "wineSpeed": 180,
        "briefText": "烤酒大师"
    },
    "36012": {
        "staffId": 36012,
        "baseStaff": 3,
        "star": 2,
        "nextStaffId": 36013,
        "chipNum": [
            "46003_10"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46003_20"
        ],
        "farmSpeed": 280,
        "zhiquSpeed": 400,
        "kaojiuSpeed": 220,
        "wineSuccess": 320,
        "wineSpeed": 380,
        "briefText": "烤酒大师"
    },
    "36013": {
        "staffId": 36013,
        "baseStaff": 3,
        "star": 3,
        "nextStaffId": 36014,
        "chipNum": [
            "46003_15"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46003_20"
        ],
        "farmSpeed": 480,
        "zhiquSpeed": 600,
        "kaojiuSpeed": 420,
        "wineSuccess": 520,
        "wineSpeed": 580,
        "briefText": "烤酒大师"
    },
    "36014": {
        "staffId": 36014,
        "baseStaff": 3,
        "star": 4,
        "nextStaffId": 36015,
        "chipNum": [
            "46003_20"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46003_20"
        ],
        "farmSpeed": 680,
        "zhiquSpeed": 800,
        "kaojiuSpeed": 620,
        "wineSuccess": 720,
        "wineSpeed": 780,
        "briefText": "烤酒大师"
    },
    "36015": {
        "staffId": 36015,
        "baseStaff": 3,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46003_25"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46003_0"
        ],
        "farmSpeed": 880,
        "zhiquSpeed": 1000,
        "kaojiuSpeed": 820,
        "wineSuccess": 920,
        "wineSpeed": 980,
        "briefText": "烤酒大师"
    },
    "36016": {
        "staffId": 36016,
        "baseStaff": 4,
        "star": 1,
        "nextStaffId": 36017,
        "chipNum": [
            "46004_5"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46004_20"
        ],
        "farmSpeed": 70,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 200,
        "wineSuccess": 180,
        "wineSpeed": 100,
        "briefText": "调酒大师"
    },
    "36017": {
        "staffId": 36017,
        "baseStaff": 4,
        "star": 2,
        "nextStaffId": 36018,
        "chipNum": [
            "46004_10"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46004_20"
        ],
        "farmSpeed": 270,
        "zhiquSpeed": 250,
        "kaojiuSpeed": 400,
        "wineSuccess": 380,
        "wineSpeed": 300,
        "briefText": "调酒大师"
    },
    "36018": {
        "staffId": 36018,
        "baseStaff": 4,
        "star": 3,
        "nextStaffId": 36019,
        "chipNum": [
            "46004_15"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46004_20"
        ],
        "farmSpeed": 470,
        "zhiquSpeed": 450,
        "kaojiuSpeed": 600,
        "wineSuccess": 580,
        "wineSpeed": 500,
        "briefText": "调酒大师"
    },
    "36019": {
        "staffId": 36019,
        "baseStaff": 4,
        "star": 4,
        "nextStaffId": 36020,
        "chipNum": [
            "46004_20"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46004_20"
        ],
        "farmSpeed": 670,
        "zhiquSpeed": 650,
        "kaojiuSpeed": 800,
        "wineSuccess": 780,
        "wineSpeed": 700,
        "briefText": "调酒大师"
    },
    "36020": {
        "staffId": 36020,
        "baseStaff": 4,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46004_25"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46004_0"
        ],
        "farmSpeed": 870,
        "zhiquSpeed": 850,
        "kaojiuSpeed": 1000,
        "wineSuccess": 980,
        "wineSpeed": 900,
        "briefText": "调酒大师"
    },
    "36021": {
        "staffId": 36021,
        "baseStaff": 5,
        "star": 1,
        "nextStaffId": 36022,
        "chipNum": [
            "46005_5"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46005_20"
        ],
        "farmSpeed": 180,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 70,
        "wineSuccess": 100,
        "wineSpeed": 200,
        "briefText": "酿酒大师"
    },
    "36022": {
        "staffId": 36022,
        "baseStaff": 5,
        "star": 2,
        "nextStaffId": 36023,
        "chipNum": [
            "46005_10"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46005_20"
        ],
        "farmSpeed": 380,
        "zhiquSpeed": 250,
        "kaojiuSpeed": 270,
        "wineSuccess": 300,
        "wineSpeed": 400,
        "briefText": "酿酒大师"
    },
    "36023": {
        "staffId": 36023,
        "baseStaff": 5,
        "star": 3,
        "nextStaffId": 36024,
        "chipNum": [
            "46005_15"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46005_20"
        ],
        "farmSpeed": 580,
        "zhiquSpeed": 450,
        "kaojiuSpeed": 470,
        "wineSuccess": 500,
        "wineSpeed": 600,
        "briefText": "酿酒大师"
    },
    "36024": {
        "staffId": 36024,
        "baseStaff": 5,
        "star": 4,
        "nextStaffId": 36025,
        "chipNum": [
            "46005_20"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46005_20"
        ],
        "farmSpeed": 780,
        "zhiquSpeed": 650,
        "kaojiuSpeed": 670,
        "wineSuccess": 700,
        "wineSpeed": 800,
        "briefText": "酿酒大师"
    },
    "36025": {
        "staffId": 36025,
        "baseStaff": 5,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46005_25"
        ],
        "manageNum": 15,
        "riseStarNeed": [
            "46005_0"
        ],
        "farmSpeed": 980,
        "zhiquSpeed": 850,
        "kaojiuSpeed": 870,
        "wineSuccess": 900,
        "wineSpeed": 1000,
        "briefText": "酿酒大师"
    },
    "36026": {
        "staffId": 36026,
        "baseStaff": 6,
        "star": 1,
        "nextStaffId": 36027,
        "chipNum": [
            "46006_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46006_10"
        ],
        "farmSpeed": 110,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 80,
        "wineSuccess": 150,
        "wineSpeed": 10,
        "briefText": "农业精英"
    },
    "36027": {
        "staffId": 36027,
        "baseStaff": 6,
        "star": 2,
        "nextStaffId": 36028,
        "chipNum": [
            "46006_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46006_10"
        ],
        "farmSpeed": 260,
        "zhiquSpeed": 200,
        "kaojiuSpeed": 230,
        "wineSuccess": 300,
        "wineSpeed": 160,
        "briefText": "农业精英"
    },
    "36028": {
        "staffId": 36028,
        "baseStaff": 6,
        "star": 3,
        "nextStaffId": 36029,
        "chipNum": [
            "46006_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46006_10"
        ],
        "farmSpeed": 410,
        "zhiquSpeed": 350,
        "kaojiuSpeed": 380,
        "wineSuccess": 450,
        "wineSpeed": 310,
        "briefText": "农业精英"
    },
    "36029": {
        "staffId": 36029,
        "baseStaff": 6,
        "star": 4,
        "nextStaffId": 36030,
        "chipNum": [
            "46006_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46006_10"
        ],
        "farmSpeed": 560,
        "zhiquSpeed": 500,
        "kaojiuSpeed": 530,
        "wineSuccess": 600,
        "wineSpeed": 460,
        "briefText": "农业精英"
    },
    "36030": {
        "staffId": 36030,
        "baseStaff": 6,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46006_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46006_0"
        ],
        "farmSpeed": 710,
        "zhiquSpeed": 650,
        "kaojiuSpeed": 680,
        "wineSuccess": 750,
        "wineSpeed": 610,
        "briefText": "农业精英"
    },
    "36031": {
        "staffId": 36031,
        "baseStaff": 7,
        "star": 1,
        "nextStaffId": 36032,
        "chipNum": [
            "46007_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46007_10"
        ],
        "farmSpeed": 150,
        "zhiquSpeed": 90,
        "kaojiuSpeed": 50,
        "wineSuccess": 10,
        "wineSpeed": 100,
        "briefText": "踩曲精英"
    },
    "36032": {
        "staffId": 36032,
        "baseStaff": 7,
        "star": 2,
        "nextStaffId": 36033,
        "chipNum": [
            "46007_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46007_10"
        ],
        "farmSpeed": 300,
        "zhiquSpeed": 240,
        "kaojiuSpeed": 200,
        "wineSuccess": 160,
        "wineSpeed": 250,
        "briefText": "踩曲精英"
    },
    "36033": {
        "staffId": 36033,
        "baseStaff": 7,
        "star": 3,
        "nextStaffId": 36034,
        "chipNum": [
            "46007_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46007_10"
        ],
        "farmSpeed": 450,
        "zhiquSpeed": 390,
        "kaojiuSpeed": 350,
        "wineSuccess": 310,
        "wineSpeed": 400,
        "briefText": "踩曲精英"
    },
    "36034": {
        "staffId": 36034,
        "baseStaff": 7,
        "star": 4,
        "nextStaffId": 36035,
        "chipNum": [
            "46007_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46007_10"
        ],
        "farmSpeed": 600,
        "zhiquSpeed": 540,
        "kaojiuSpeed": 500,
        "wineSuccess": 460,
        "wineSpeed": 550,
        "briefText": "踩曲精英"
    },
    "36035": {
        "staffId": 36035,
        "baseStaff": 7,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46007_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46007_0"
        ],
        "farmSpeed": 750,
        "zhiquSpeed": 690,
        "kaojiuSpeed": 650,
        "wineSuccess": 610,
        "wineSpeed": 700,
        "briefText": "踩曲精英"
    },
    "36036": {
        "staffId": 36036,
        "baseStaff": 8,
        "star": 1,
        "nextStaffId": 36037,
        "chipNum": [
            "46008_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46008_10"
        ],
        "farmSpeed": 60,
        "zhiquSpeed": 150,
        "kaojiuSpeed": 10,
        "wineSuccess": 80,
        "wineSpeed": 100,
        "briefText": "烤酒精英"
    },
    "36037": {
        "staffId": 36037,
        "baseStaff": 8,
        "star": 2,
        "nextStaffId": 36038,
        "chipNum": [
            "46008_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46008_10"
        ],
        "farmSpeed": 210,
        "zhiquSpeed": 300,
        "kaojiuSpeed": 160,
        "wineSuccess": 230,
        "wineSpeed": 250,
        "briefText": "烤酒精英"
    },
    "36038": {
        "staffId": 36038,
        "baseStaff": 8,
        "star": 3,
        "nextStaffId": 36039,
        "chipNum": [
            "46008_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46008_10"
        ],
        "farmSpeed": 360,
        "zhiquSpeed": 450,
        "kaojiuSpeed": 310,
        "wineSuccess": 380,
        "wineSpeed": 400,
        "briefText": "烤酒精英"
    },
    "36039": {
        "staffId": 36039,
        "baseStaff": 8,
        "star": 4,
        "nextStaffId": 36040,
        "chipNum": [
            "46008_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46008_10"
        ],
        "farmSpeed": 510,
        "zhiquSpeed": 600,
        "kaojiuSpeed": 460,
        "wineSuccess": 530,
        "wineSpeed": 550,
        "briefText": "烤酒精英"
    },
    "36040": {
        "staffId": 36040,
        "baseStaff": 8,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46008_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46008_0"
        ],
        "farmSpeed": 660,
        "zhiquSpeed": 750,
        "kaojiuSpeed": 610,
        "wineSuccess": 680,
        "wineSpeed": 700,
        "briefText": "烤酒精英"
    },
    "36041": {
        "staffId": 36041,
        "baseStaff": 9,
        "star": 1,
        "nextStaffId": 36042,
        "chipNum": [
            "46009_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46009_10"
        ],
        "farmSpeed": 20,
        "zhiquSpeed": 10,
        "kaojiuSpeed": 160,
        "wineSuccess": 140,
        "wineSpeed": 70,
        "briefText": "调酒精英"
    },
    "36042": {
        "staffId": 36042,
        "baseStaff": 9,
        "star": 2,
        "nextStaffId": 36043,
        "chipNum": [
            "46009_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46009_10"
        ],
        "farmSpeed": 170,
        "zhiquSpeed": 160,
        "kaojiuSpeed": 310,
        "wineSuccess": 290,
        "wineSpeed": 220,
        "briefText": "调酒精英"
    },
    "36043": {
        "staffId": 36043,
        "baseStaff": 9,
        "star": 3,
        "nextStaffId": 36044,
        "chipNum": [
            "46009_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46009_10"
        ],
        "farmSpeed": 320,
        "zhiquSpeed": 310,
        "kaojiuSpeed": 460,
        "wineSuccess": 440,
        "wineSpeed": 370,
        "briefText": "调酒精英"
    },
    "36044": {
        "staffId": 36044,
        "baseStaff": 9,
        "star": 4,
        "nextStaffId": 36045,
        "chipNum": [
            "46009_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46009_10"
        ],
        "farmSpeed": 470,
        "zhiquSpeed": 460,
        "kaojiuSpeed": 610,
        "wineSuccess": 590,
        "wineSpeed": 520,
        "briefText": "调酒精英"
    },
    "36045": {
        "staffId": 36045,
        "baseStaff": 9,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46009_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46009_0"
        ],
        "farmSpeed": 620,
        "zhiquSpeed": 610,
        "kaojiuSpeed": 760,
        "wineSuccess": 740,
        "wineSpeed": 670,
        "briefText": "调酒精英"
    },
    "36046": {
        "staffId": 36046,
        "baseStaff": 10,
        "star": 1,
        "nextStaffId": 36047,
        "chipNum": [
            "46010_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46010_10"
        ],
        "farmSpeed": 140,
        "zhiquSpeed": 10,
        "kaojiuSpeed": 20,
        "wineSuccess": 50,
        "wineSpeed": 180,
        "briefText": "酿酒精英"
    },
    "36047": {
        "staffId": 36047,
        "baseStaff": 10,
        "star": 2,
        "nextStaffId": 36048,
        "chipNum": [
            "46010_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46010_10"
        ],
        "farmSpeed": 290,
        "zhiquSpeed": 160,
        "kaojiuSpeed": 170,
        "wineSuccess": 200,
        "wineSpeed": 330,
        "briefText": "酿酒精英"
    },
    "36048": {
        "staffId": 36048,
        "baseStaff": 10,
        "star": 3,
        "nextStaffId": 36049,
        "chipNum": [
            "46010_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46010_10"
        ],
        "farmSpeed": 440,
        "zhiquSpeed": 310,
        "kaojiuSpeed": 320,
        "wineSuccess": 350,
        "wineSpeed": 480,
        "briefText": "酿酒精英"
    },
    "36049": {
        "staffId": 36049,
        "baseStaff": 10,
        "star": 4,
        "nextStaffId": 36050,
        "chipNum": [
            "46010_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46010_10"
        ],
        "farmSpeed": 590,
        "zhiquSpeed": 460,
        "kaojiuSpeed": 470,
        "wineSuccess": 500,
        "wineSpeed": 630,
        "briefText": "酿酒精英"
    },
    "36050": {
        "staffId": 36050,
        "baseStaff": 10,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46010_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46010_0"
        ],
        "farmSpeed": 740,
        "zhiquSpeed": 610,
        "kaojiuSpeed": 620,
        "wineSuccess": 650,
        "wineSpeed": 780,
        "briefText": "酿酒精英"
    },
    "36051": {
        "staffId": 36051,
        "baseStaff": 11,
        "star": 1,
        "nextStaffId": 36052,
        "chipNum": [
            "46011_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46011_10"
        ],
        "farmSpeed": 60,
        "zhiquSpeed": 100,
        "kaojiuSpeed": 80,
        "wineSuccess": 10,
        "wineSpeed": 150,
        "briefText": "农业精英"
    },
    "36052": {
        "staffId": 36052,
        "baseStaff": 11,
        "star": 2,
        "nextStaffId": 36053,
        "chipNum": [
            "46011_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46011_10"
        ],
        "farmSpeed": 210,
        "zhiquSpeed": 250,
        "kaojiuSpeed": 230,
        "wineSuccess": 160,
        "wineSpeed": 300,
        "briefText": "农业精英"
    },
    "36053": {
        "staffId": 36053,
        "baseStaff": 11,
        "star": 3,
        "nextStaffId": 36054,
        "chipNum": [
            "46011_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46011_10"
        ],
        "farmSpeed": 360,
        "zhiquSpeed": 400,
        "kaojiuSpeed": 380,
        "wineSuccess": 310,
        "wineSpeed": 450,
        "briefText": "农业精英"
    },
    "36054": {
        "staffId": 36054,
        "baseStaff": 11,
        "star": 4,
        "nextStaffId": 36055,
        "chipNum": [
            "46011_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46011_10"
        ],
        "farmSpeed": 510,
        "zhiquSpeed": 550,
        "kaojiuSpeed": 530,
        "wineSuccess": 460,
        "wineSpeed": 600,
        "briefText": "农业精英"
    },
    "36055": {
        "staffId": 36055,
        "baseStaff": 11,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46011_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46011_0"
        ],
        "farmSpeed": 660,
        "zhiquSpeed": 700,
        "kaojiuSpeed": 680,
        "wineSuccess": 610,
        "wineSpeed": 750,
        "briefText": "农业精英"
    },
    "36056": {
        "staffId": 36056,
        "baseStaff": 12,
        "star": 1,
        "nextStaffId": 36057,
        "chipNum": [
            "46012_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46012_10"
        ],
        "farmSpeed": 80,
        "zhiquSpeed": 40,
        "kaojiuSpeed": 20,
        "wineSuccess": 120,
        "wineSpeed": 140,
        "briefText": "踩曲精英"
    },
    "36057": {
        "staffId": 36057,
        "baseStaff": 12,
        "star": 2,
        "nextStaffId": 36058,
        "chipNum": [
            "46012_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46012_10"
        ],
        "farmSpeed": 230,
        "zhiquSpeed": 190,
        "kaojiuSpeed": 170,
        "wineSuccess": 270,
        "wineSpeed": 290,
        "briefText": "踩曲精英"
    },
    "36058": {
        "staffId": 36058,
        "baseStaff": 12,
        "star": 3,
        "nextStaffId": 36059,
        "chipNum": [
            "46012_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46012_10"
        ],
        "farmSpeed": 380,
        "zhiquSpeed": 340,
        "kaojiuSpeed": 320,
        "wineSuccess": 420,
        "wineSpeed": 440,
        "briefText": "踩曲精英"
    },
    "36059": {
        "staffId": 36059,
        "baseStaff": 12,
        "star": 4,
        "nextStaffId": 36060,
        "chipNum": [
            "46012_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46012_10"
        ],
        "farmSpeed": 530,
        "zhiquSpeed": 490,
        "kaojiuSpeed": 470,
        "wineSuccess": 570,
        "wineSpeed": 590,
        "briefText": "踩曲精英"
    },
    "36060": {
        "staffId": 36060,
        "baseStaff": 12,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46012_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46012_0"
        ],
        "farmSpeed": 680,
        "zhiquSpeed": 640,
        "kaojiuSpeed": 620,
        "wineSuccess": 720,
        "wineSpeed": 740,
        "briefText": "踩曲精英"
    },
    "36061": {
        "staffId": 36061,
        "baseStaff": 13,
        "star": 1,
        "nextStaffId": 36062,
        "chipNum": [
            "46013_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46013_10"
        ],
        "farmSpeed": 120,
        "zhiquSpeed": 20,
        "kaojiuSpeed": 30,
        "wineSuccess": 90,
        "wineSpeed": 140,
        "briefText": "烤酒精英"
    },
    "36062": {
        "staffId": 36062,
        "baseStaff": 13,
        "star": 2,
        "nextStaffId": 36063,
        "chipNum": [
            "46013_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46013_10"
        ],
        "farmSpeed": 270,
        "zhiquSpeed": 170,
        "kaojiuSpeed": 180,
        "wineSuccess": 240,
        "wineSpeed": 290,
        "briefText": "烤酒精英"
    },
    "36063": {
        "staffId": 36063,
        "baseStaff": 13,
        "star": 3,
        "nextStaffId": 36064,
        "chipNum": [
            "46013_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46013_10"
        ],
        "farmSpeed": 420,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 330,
        "wineSuccess": 390,
        "wineSpeed": 440,
        "briefText": "烤酒精英"
    },
    "36064": {
        "staffId": 36064,
        "baseStaff": 13,
        "star": 4,
        "nextStaffId": 36065,
        "chipNum": [
            "46013_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46013_10"
        ],
        "farmSpeed": 570,
        "zhiquSpeed": 470,
        "kaojiuSpeed": 480,
        "wineSuccess": 540,
        "wineSpeed": 590,
        "briefText": "烤酒精英"
    },
    "36065": {
        "staffId": 36065,
        "baseStaff": 13,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46013_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46013_0"
        ],
        "farmSpeed": 720,
        "zhiquSpeed": 620,
        "kaojiuSpeed": 630,
        "wineSuccess": 690,
        "wineSpeed": 740,
        "briefText": "烤酒精英"
    },
    "36066": {
        "staffId": 36066,
        "baseStaff": 14,
        "star": 1,
        "nextStaffId": 36067,
        "chipNum": [
            "46014_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46014_10"
        ],
        "farmSpeed": 150,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 60,
        "wineSuccess": 100,
        "wineSpeed": 40,
        "briefText": "调酒精英"
    },
    "36067": {
        "staffId": 36067,
        "baseStaff": 14,
        "star": 2,
        "nextStaffId": 36068,
        "chipNum": [
            "46014_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46014_10"
        ],
        "farmSpeed": 300,
        "zhiquSpeed": 200,
        "kaojiuSpeed": 210,
        "wineSuccess": 250,
        "wineSpeed": 190,
        "briefText": "调酒精英"
    },
    "36068": {
        "staffId": 36068,
        "baseStaff": 14,
        "star": 3,
        "nextStaffId": 36069,
        "chipNum": [
            "46014_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46014_10"
        ],
        "farmSpeed": 450,
        "zhiquSpeed": 350,
        "kaojiuSpeed": 360,
        "wineSuccess": 400,
        "wineSpeed": 340,
        "briefText": "调酒精英"
    },
    "36069": {
        "staffId": 36069,
        "baseStaff": 14,
        "star": 4,
        "nextStaffId": 36070,
        "chipNum": [
            "46014_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46014_10"
        ],
        "farmSpeed": 600,
        "zhiquSpeed": 500,
        "kaojiuSpeed": 510,
        "wineSuccess": 550,
        "wineSpeed": 490,
        "briefText": "调酒精英"
    },
    "36070": {
        "staffId": 36070,
        "baseStaff": 14,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46014_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46014_0"
        ],
        "farmSpeed": 750,
        "zhiquSpeed": 650,
        "kaojiuSpeed": 660,
        "wineSuccess": 700,
        "wineSpeed": 640,
        "briefText": "调酒精英"
    },
    "36071": {
        "staffId": 36071,
        "baseStaff": 15,
        "star": 1,
        "nextStaffId": 36072,
        "chipNum": [
            "46015_8"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46015_10"
        ],
        "farmSpeed": 30,
        "zhiquSpeed": 70,
        "kaojiuSpeed": 130,
        "wineSuccess": 160,
        "wineSpeed": 10,
        "briefText": "酿酒精英"
    },
    "36072": {
        "staffId": 36072,
        "baseStaff": 15,
        "star": 2,
        "nextStaffId": 36073,
        "chipNum": [
            "46015_16"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46015_10"
        ],
        "farmSpeed": 180,
        "zhiquSpeed": 220,
        "kaojiuSpeed": 280,
        "wineSuccess": 310,
        "wineSpeed": 160,
        "briefText": "酿酒精英"
    },
    "36073": {
        "staffId": 36073,
        "baseStaff": 15,
        "star": 3,
        "nextStaffId": 36074,
        "chipNum": [
            "46015_24"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46015_10"
        ],
        "farmSpeed": 330,
        "zhiquSpeed": 370,
        "kaojiuSpeed": 430,
        "wineSuccess": 460,
        "wineSpeed": 310,
        "briefText": "酿酒精英"
    },
    "36074": {
        "staffId": 36074,
        "baseStaff": 15,
        "star": 4,
        "nextStaffId": 36075,
        "chipNum": [
            "46015_32"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46015_10"
        ],
        "farmSpeed": 480,
        "zhiquSpeed": 520,
        "kaojiuSpeed": 580,
        "wineSuccess": 610,
        "wineSpeed": 460,
        "briefText": "酿酒精英"
    },
    "36075": {
        "staffId": 36075,
        "baseStaff": 15,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46015_40"
        ],
        "manageNum": 10,
        "riseStarNeed": [
            "46015_0"
        ],
        "farmSpeed": 630,
        "zhiquSpeed": 670,
        "kaojiuSpeed": 730,
        "wineSuccess": 760,
        "wineSpeed": 610,
        "briefText": "酿酒精英"
    },
    "36076": {
        "staffId": 36076,
        "baseStaff": 16,
        "star": 1,
        "nextStaffId": 36077,
        "chipNum": [
            "46016_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46016_10"
        ],
        "farmSpeed": 70,
        "zhiquSpeed": 20,
        "kaojiuSpeed": 20,
        "wineSuccess": 60,
        "wineSpeed": 30,
        "briefText": "农业小白"
    },
    "36077": {
        "staffId": 36077,
        "baseStaff": 16,
        "star": 2,
        "nextStaffId": 36078,
        "chipNum": [
            "46016_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46016_10"
        ],
        "farmSpeed": 170,
        "zhiquSpeed": 120,
        "kaojiuSpeed": 120,
        "wineSuccess": 160,
        "wineSpeed": 130,
        "briefText": "农业小白"
    },
    "36078": {
        "staffId": 36078,
        "baseStaff": 16,
        "star": 3,
        "nextStaffId": 36079,
        "chipNum": [
            "46016_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46016_10"
        ],
        "farmSpeed": 270,
        "zhiquSpeed": 220,
        "kaojiuSpeed": 220,
        "wineSuccess": 260,
        "wineSpeed": 230,
        "briefText": "农业小白"
    },
    "36079": {
        "staffId": 36079,
        "baseStaff": 16,
        "star": 4,
        "nextStaffId": 36080,
        "chipNum": [
            "46016_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46016_10"
        ],
        "farmSpeed": 370,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 320,
        "wineSuccess": 360,
        "wineSpeed": 330,
        "briefText": "农业小白"
    },
    "36080": {
        "staffId": 36080,
        "baseStaff": 16,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46016_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46016_0"
        ],
        "farmSpeed": 470,
        "zhiquSpeed": 420,
        "kaojiuSpeed": 420,
        "wineSuccess": 460,
        "wineSpeed": 430,
        "briefText": "农业小白"
    },
    "36081": {
        "staffId": 36081,
        "baseStaff": 17,
        "star": 1,
        "nextStaffId": 36082,
        "chipNum": [
            "46017_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46017_10"
        ],
        "farmSpeed": 0,
        "zhiquSpeed": 20,
        "kaojiuSpeed": 40,
        "wineSuccess": 60,
        "wineSpeed": 80,
        "briefText": "踩曲小白"
    },
    "36082": {
        "staffId": 36082,
        "baseStaff": 17,
        "star": 2,
        "nextStaffId": 36083,
        "chipNum": [
            "46017_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46017_10"
        ],
        "farmSpeed": 100,
        "zhiquSpeed": 120,
        "kaojiuSpeed": 140,
        "wineSuccess": 160,
        "wineSpeed": 180,
        "briefText": "踩曲小白"
    },
    "36083": {
        "staffId": 36083,
        "baseStaff": 17,
        "star": 3,
        "nextStaffId": 36084,
        "chipNum": [
            "46017_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46017_10"
        ],
        "farmSpeed": 200,
        "zhiquSpeed": 220,
        "kaojiuSpeed": 240,
        "wineSuccess": 260,
        "wineSpeed": 280,
        "briefText": "踩曲小白"
    },
    "36084": {
        "staffId": 36084,
        "baseStaff": 17,
        "star": 4,
        "nextStaffId": 36085,
        "chipNum": [
            "46017_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46017_10"
        ],
        "farmSpeed": 300,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 340,
        "wineSuccess": 360,
        "wineSpeed": 380,
        "briefText": "踩曲小白"
    },
    "36085": {
        "staffId": 36085,
        "baseStaff": 17,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46017_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46017_0"
        ],
        "farmSpeed": 400,
        "zhiquSpeed": 420,
        "kaojiuSpeed": 440,
        "wineSuccess": 460,
        "wineSpeed": 480,
        "briefText": "踩曲小白"
    },
    "36086": {
        "staffId": 36086,
        "baseStaff": 18,
        "star": 1,
        "nextStaffId": 36087,
        "chipNum": [
            "46018_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46018_10"
        ],
        "farmSpeed": 10,
        "zhiquSpeed": 50,
        "kaojiuSpeed": 80,
        "wineSuccess": 20,
        "wineSpeed": 40,
        "briefText": "烤酒小白"
    },
    "36087": {
        "staffId": 36087,
        "baseStaff": 18,
        "star": 2,
        "nextStaffId": 36088,
        "chipNum": [
            "46018_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46018_10"
        ],
        "farmSpeed": 110,
        "zhiquSpeed": 150,
        "kaojiuSpeed": 180,
        "wineSuccess": 120,
        "wineSpeed": 140,
        "briefText": "烤酒小白"
    },
    "36088": {
        "staffId": 36088,
        "baseStaff": 18,
        "star": 3,
        "nextStaffId": 36089,
        "chipNum": [
            "46018_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46018_10"
        ],
        "farmSpeed": 210,
        "zhiquSpeed": 250,
        "kaojiuSpeed": 280,
        "wineSuccess": 220,
        "wineSpeed": 240,
        "briefText": "烤酒小白"
    },
    "36089": {
        "staffId": 36089,
        "baseStaff": 18,
        "star": 4,
        "nextStaffId": 36090,
        "chipNum": [
            "46018_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46018_10"
        ],
        "farmSpeed": 310,
        "zhiquSpeed": 350,
        "kaojiuSpeed": 380,
        "wineSuccess": 320,
        "wineSpeed": 340,
        "briefText": "烤酒小白"
    },
    "36090": {
        "staffId": 36090,
        "baseStaff": 18,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46018_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46018_0"
        ],
        "farmSpeed": 410,
        "zhiquSpeed": 450,
        "kaojiuSpeed": 480,
        "wineSuccess": 420,
        "wineSpeed": 440,
        "briefText": "烤酒小白"
    },
    "36091": {
        "staffId": 36091,
        "baseStaff": 19,
        "star": 1,
        "nextStaffId": 36092,
        "chipNum": [
            "46019_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46019_10"
        ],
        "farmSpeed": 20,
        "zhiquSpeed": 40,
        "kaojiuSpeed": 20,
        "wineSuccess": 70,
        "wineSpeed": 50,
        "briefText": "调酒小白"
    },
    "36092": {
        "staffId": 36092,
        "baseStaff": 19,
        "star": 2,
        "nextStaffId": 36093,
        "chipNum": [
            "46019_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46019_10"
        ],
        "farmSpeed": 120,
        "zhiquSpeed": 140,
        "kaojiuSpeed": 120,
        "wineSuccess": 170,
        "wineSpeed": 150,
        "briefText": "调酒小白"
    },
    "36093": {
        "staffId": 36093,
        "baseStaff": 19,
        "star": 3,
        "nextStaffId": 36094,
        "chipNum": [
            "46019_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46019_10"
        ],
        "farmSpeed": 220,
        "zhiquSpeed": 240,
        "kaojiuSpeed": 220,
        "wineSuccess": 270,
        "wineSpeed": 250,
        "briefText": "调酒小白"
    },
    "36094": {
        "staffId": 36094,
        "baseStaff": 19,
        "star": 4,
        "nextStaffId": 36095,
        "chipNum": [
            "46019_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46019_10"
        ],
        "farmSpeed": 320,
        "zhiquSpeed": 340,
        "kaojiuSpeed": 320,
        "wineSuccess": 370,
        "wineSpeed": 350,
        "briefText": "调酒小白"
    },
    "36095": {
        "staffId": 36095,
        "baseStaff": 19,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46019_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46019_0"
        ],
        "farmSpeed": 420,
        "zhiquSpeed": 440,
        "kaojiuSpeed": 420,
        "wineSuccess": 470,
        "wineSpeed": 450,
        "briefText": "调酒小白"
    },
    "36096": {
        "staffId": 36096,
        "baseStaff": 20,
        "star": 1,
        "nextStaffId": 36097,
        "chipNum": [
            "46020_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46020_10"
        ],
        "farmSpeed": 30,
        "zhiquSpeed": 70,
        "kaojiuSpeed": 60,
        "wineSuccess": 40,
        "wineSpeed": 0,
        "briefText": "酿酒小白"
    },
    "36097": {
        "staffId": 36097,
        "baseStaff": 20,
        "star": 2,
        "nextStaffId": 36098,
        "chipNum": [
            "46020_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46020_10"
        ],
        "farmSpeed": 130,
        "zhiquSpeed": 170,
        "kaojiuSpeed": 160,
        "wineSuccess": 140,
        "wineSpeed": 100,
        "briefText": "酿酒小白"
    },
    "36098": {
        "staffId": 36098,
        "baseStaff": 20,
        "star": 3,
        "nextStaffId": 36099,
        "chipNum": [
            "46020_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46020_10"
        ],
        "farmSpeed": 230,
        "zhiquSpeed": 270,
        "kaojiuSpeed": 260,
        "wineSuccess": 240,
        "wineSpeed": 200,
        "briefText": "酿酒小白"
    },
    "36099": {
        "staffId": 36099,
        "baseStaff": 20,
        "star": 4,
        "nextStaffId": 36100,
        "chipNum": [
            "46020_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46020_10"
        ],
        "farmSpeed": 330,
        "zhiquSpeed": 370,
        "kaojiuSpeed": 360,
        "wineSuccess": 340,
        "wineSpeed": 300,
        "briefText": "酿酒小白"
    },
    "36100": {
        "staffId": 36100,
        "baseStaff": 20,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46020_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46020_0"
        ],
        "farmSpeed": 430,
        "zhiquSpeed": 470,
        "kaojiuSpeed": 460,
        "wineSuccess": 440,
        "wineSpeed": 400,
        "briefText": "酿酒小白"
    },
    "36101": {
        "staffId": 36101,
        "baseStaff": 21,
        "star": 1,
        "nextStaffId": 36102,
        "chipNum": [
            "46021_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46021_10"
        ],
        "farmSpeed": 40,
        "zhiquSpeed": 80,
        "kaojiuSpeed": 60,
        "wineSuccess": 0,
        "wineSpeed": 20,
        "briefText": "农业小白"
    },
    "36102": {
        "staffId": 36102,
        "baseStaff": 21,
        "star": 2,
        "nextStaffId": 36103,
        "chipNum": [
            "46021_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46021_10"
        ],
        "farmSpeed": 140,
        "zhiquSpeed": 180,
        "kaojiuSpeed": 160,
        "wineSuccess": 100,
        "wineSpeed": 120,
        "briefText": "农业小白"
    },
    "36103": {
        "staffId": 36103,
        "baseStaff": 21,
        "star": 3,
        "nextStaffId": 36104,
        "chipNum": [
            "46021_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46021_10"
        ],
        "farmSpeed": 240,
        "zhiquSpeed": 280,
        "kaojiuSpeed": 260,
        "wineSuccess": 200,
        "wineSpeed": 220,
        "briefText": "农业小白"
    },
    "36104": {
        "staffId": 36104,
        "baseStaff": 21,
        "star": 4,
        "nextStaffId": 36105,
        "chipNum": [
            "46021_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46021_10"
        ],
        "farmSpeed": 340,
        "zhiquSpeed": 380,
        "kaojiuSpeed": 360,
        "wineSuccess": 300,
        "wineSpeed": 320,
        "briefText": "农业小白"
    },
    "36105": {
        "staffId": 36105,
        "baseStaff": 21,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46021_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46021_0"
        ],
        "farmSpeed": 440,
        "zhiquSpeed": 480,
        "kaojiuSpeed": 460,
        "wineSuccess": 400,
        "wineSpeed": 420,
        "briefText": "农业小白"
    },
    "36106": {
        "staffId": 36106,
        "baseStaff": 22,
        "star": 1,
        "nextStaffId": 36107,
        "chipNum": [
            "46022_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46022_10"
        ],
        "farmSpeed": 50,
        "zhiquSpeed": 20,
        "kaojiuSpeed": 10,
        "wineSuccess": 40,
        "wineSpeed": 80,
        "briefText": "踩曲小白"
    },
    "36107": {
        "staffId": 36107,
        "baseStaff": 22,
        "star": 2,
        "nextStaffId": 36108,
        "chipNum": [
            "46022_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46022_10"
        ],
        "farmSpeed": 150,
        "zhiquSpeed": 120,
        "kaojiuSpeed": 110,
        "wineSuccess": 140,
        "wineSpeed": 180,
        "briefText": "踩曲小白"
    },
    "36108": {
        "staffId": 36108,
        "baseStaff": 22,
        "star": 3,
        "nextStaffId": 36109,
        "chipNum": [
            "46022_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46022_10"
        ],
        "farmSpeed": 250,
        "zhiquSpeed": 220,
        "kaojiuSpeed": 210,
        "wineSuccess": 240,
        "wineSpeed": 280,
        "briefText": "踩曲小白"
    },
    "36109": {
        "staffId": 36109,
        "baseStaff": 22,
        "star": 4,
        "nextStaffId": 36110,
        "chipNum": [
            "46022_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46022_10"
        ],
        "farmSpeed": 350,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 310,
        "wineSuccess": 340,
        "wineSpeed": 380,
        "briefText": "踩曲小白"
    },
    "36110": {
        "staffId": 36110,
        "baseStaff": 22,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46022_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46022_0"
        ],
        "farmSpeed": 450,
        "zhiquSpeed": 420,
        "kaojiuSpeed": 410,
        "wineSuccess": 440,
        "wineSpeed": 480,
        "briefText": "踩曲小白"
    },
    "36111": {
        "staffId": 36111,
        "baseStaff": 23,
        "star": 1,
        "nextStaffId": 36112,
        "chipNum": [
            "46023_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46023_10"
        ],
        "farmSpeed": 60,
        "zhiquSpeed": 10,
        "kaojiuSpeed": 30,
        "wineSuccess": 90,
        "wineSpeed": 10,
        "briefText": "烤酒小白"
    },
    "36112": {
        "staffId": 36112,
        "baseStaff": 23,
        "star": 2,
        "nextStaffId": 36113,
        "chipNum": [
            "46023_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46023_10"
        ],
        "farmSpeed": 160,
        "zhiquSpeed": 110,
        "kaojiuSpeed": 130,
        "wineSuccess": 190,
        "wineSpeed": 110,
        "briefText": "烤酒小白"
    },
    "36113": {
        "staffId": 36113,
        "baseStaff": 23,
        "star": 3,
        "nextStaffId": 36114,
        "chipNum": [
            "46023_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46023_10"
        ],
        "farmSpeed": 260,
        "zhiquSpeed": 210,
        "kaojiuSpeed": 230,
        "wineSuccess": 290,
        "wineSpeed": 210,
        "briefText": "烤酒小白"
    },
    "36114": {
        "staffId": 36114,
        "baseStaff": 23,
        "star": 4,
        "nextStaffId": 36115,
        "chipNum": [
            "46023_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46023_10"
        ],
        "farmSpeed": 360,
        "zhiquSpeed": 310,
        "kaojiuSpeed": 330,
        "wineSuccess": 390,
        "wineSpeed": 310,
        "briefText": "烤酒小白"
    },
    "36115": {
        "staffId": 36115,
        "baseStaff": 23,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46023_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46023_0"
        ],
        "farmSpeed": 460,
        "zhiquSpeed": 410,
        "kaojiuSpeed": 430,
        "wineSuccess": 490,
        "wineSpeed": 410,
        "briefText": "烤酒小白"
    },
    "36116": {
        "staffId": 36116,
        "baseStaff": 24,
        "star": 1,
        "nextStaffId": 36117,
        "chipNum": [
            "46024_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46024_10"
        ],
        "farmSpeed": 70,
        "zhiquSpeed": 20,
        "kaojiuSpeed": 50,
        "wineSuccess": 30,
        "wineSpeed": 30,
        "briefText": "调酒小白"
    },
    "36117": {
        "staffId": 36117,
        "baseStaff": 24,
        "star": 2,
        "nextStaffId": 36118,
        "chipNum": [
            "46024_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46024_10"
        ],
        "farmSpeed": 170,
        "zhiquSpeed": 120,
        "kaojiuSpeed": 150,
        "wineSuccess": 130,
        "wineSpeed": 130,
        "briefText": "调酒小白"
    },
    "36118": {
        "staffId": 36118,
        "baseStaff": 24,
        "star": 3,
        "nextStaffId": 36119,
        "chipNum": [
            "46024_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46024_10"
        ],
        "farmSpeed": 270,
        "zhiquSpeed": 220,
        "kaojiuSpeed": 250,
        "wineSuccess": 230,
        "wineSpeed": 230,
        "briefText": "调酒小白"
    },
    "36119": {
        "staffId": 36119,
        "baseStaff": 24,
        "star": 4,
        "nextStaffId": 36120,
        "chipNum": [
            "46024_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46024_10"
        ],
        "farmSpeed": 370,
        "zhiquSpeed": 320,
        "kaojiuSpeed": 350,
        "wineSuccess": 330,
        "wineSpeed": 330,
        "briefText": "调酒小白"
    },
    "36120": {
        "staffId": 36120,
        "baseStaff": 24,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46024_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46024_0"
        ],
        "farmSpeed": 470,
        "zhiquSpeed": 420,
        "kaojiuSpeed": 450,
        "wineSuccess": 430,
        "wineSpeed": 430,
        "briefText": "调酒小白"
    },
    "36121": {
        "staffId": 36121,
        "baseStaff": 25,
        "star": 1,
        "nextStaffId": 36122,
        "chipNum": [
            "46025_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46025_10"
        ],
        "farmSpeed": 40,
        "zhiquSpeed": 30,
        "kaojiuSpeed": 70,
        "wineSuccess": 50,
        "wineSpeed": 10,
        "briefText": "酿酒小白"
    },
    "36122": {
        "staffId": 36122,
        "baseStaff": 25,
        "star": 2,
        "nextStaffId": 36123,
        "chipNum": [
            "46025_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46025_10"
        ],
        "farmSpeed": 140,
        "zhiquSpeed": 130,
        "kaojiuSpeed": 170,
        "wineSuccess": 150,
        "wineSpeed": 110,
        "briefText": "酿酒小白"
    },
    "36123": {
        "staffId": 36123,
        "baseStaff": 25,
        "star": 3,
        "nextStaffId": 36124,
        "chipNum": [
            "46025_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46025_10"
        ],
        "farmSpeed": 240,
        "zhiquSpeed": 230,
        "kaojiuSpeed": 270,
        "wineSuccess": 250,
        "wineSpeed": 210,
        "briefText": "酿酒小白"
    },
    "36124": {
        "staffId": 36124,
        "baseStaff": 25,
        "star": 4,
        "nextStaffId": 36125,
        "chipNum": [
            "46025_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46025_10"
        ],
        "farmSpeed": 340,
        "zhiquSpeed": 330,
        "kaojiuSpeed": 370,
        "wineSuccess": 350,
        "wineSpeed": 310,
        "briefText": "酿酒小白"
    },
    "36125": {
        "staffId": 36125,
        "baseStaff": 25,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46025_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46025_0"
        ],
        "farmSpeed": 440,
        "zhiquSpeed": 430,
        "kaojiuSpeed": 470,
        "wineSuccess": 450,
        "wineSpeed": 410,
        "briefText": "酿酒小白"
    },
    "36126": {
        "staffId": 36126,
        "baseStaff": 26,
        "star": 1,
        "nextStaffId": 36127,
        "chipNum": [
            "46026_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46026_10"
        ],
        "farmSpeed": 20,
        "zhiquSpeed": 40,
        "kaojiuSpeed": 30,
        "wineSuccess": 40,
        "wineSpeed": 70,
        "briefText": "农业小白"
    },
    "36127": {
        "staffId": 36127,
        "baseStaff": 26,
        "star": 2,
        "nextStaffId": 36128,
        "chipNum": [
            "46026_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46026_10"
        ],
        "farmSpeed": 120,
        "zhiquSpeed": 140,
        "kaojiuSpeed": 130,
        "wineSuccess": 140,
        "wineSpeed": 170,
        "briefText": "农业小白"
    },
    "36128": {
        "staffId": 36128,
        "baseStaff": 26,
        "star": 3,
        "nextStaffId": 36129,
        "chipNum": [
            "46026_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46026_10"
        ],
        "farmSpeed": 220,
        "zhiquSpeed": 240,
        "kaojiuSpeed": 230,
        "wineSuccess": 240,
        "wineSpeed": 270,
        "briefText": "农业小白"
    },
    "36129": {
        "staffId": 36129,
        "baseStaff": 26,
        "star": 4,
        "nextStaffId": 36130,
        "chipNum": [
            "46026_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46026_10"
        ],
        "farmSpeed": 320,
        "zhiquSpeed": 340,
        "kaojiuSpeed": 330,
        "wineSuccess": 340,
        "wineSpeed": 370,
        "briefText": "农业小白"
    },
    "36130": {
        "staffId": 36130,
        "baseStaff": 26,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46026_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46026_0"
        ],
        "farmSpeed": 420,
        "zhiquSpeed": 440,
        "kaojiuSpeed": 430,
        "wineSuccess": 440,
        "wineSpeed": 470,
        "briefText": "农业小白"
    },
    "36131": {
        "staffId": 36131,
        "baseStaff": 27,
        "star": 1,
        "nextStaffId": 36132,
        "chipNum": [
            "46027_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46027_10"
        ],
        "farmSpeed": 50,
        "zhiquSpeed": 80,
        "kaojiuSpeed": 50,
        "wineSuccess": 10,
        "wineSpeed": 10,
        "briefText": "踩曲小白"
    },
    "36132": {
        "staffId": 36132,
        "baseStaff": 27,
        "star": 2,
        "nextStaffId": 36133,
        "chipNum": [
            "46027_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46027_10"
        ],
        "farmSpeed": 150,
        "zhiquSpeed": 180,
        "kaojiuSpeed": 150,
        "wineSuccess": 110,
        "wineSpeed": 110,
        "briefText": "踩曲小白"
    },
    "36133": {
        "staffId": 36133,
        "baseStaff": 27,
        "star": 3,
        "nextStaffId": 36134,
        "chipNum": [
            "46027_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46027_10"
        ],
        "farmSpeed": 250,
        "zhiquSpeed": 280,
        "kaojiuSpeed": 250,
        "wineSuccess": 210,
        "wineSpeed": 210,
        "briefText": "踩曲小白"
    },
    "36134": {
        "staffId": 36134,
        "baseStaff": 27,
        "star": 4,
        "nextStaffId": 36135,
        "chipNum": [
            "46027_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46027_10"
        ],
        "farmSpeed": 350,
        "zhiquSpeed": 380,
        "kaojiuSpeed": 350,
        "wineSuccess": 310,
        "wineSpeed": 310,
        "briefText": "踩曲小白"
    },
    "36135": {
        "staffId": 36135,
        "baseStaff": 27,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46027_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46027_0"
        ],
        "farmSpeed": 450,
        "zhiquSpeed": 480,
        "kaojiuSpeed": 450,
        "wineSuccess": 410,
        "wineSpeed": 410,
        "briefText": "踩曲小白"
    },
    "36136": {
        "staffId": 36136,
        "baseStaff": 28,
        "star": 1,
        "nextStaffId": 36137,
        "chipNum": [
            "46028_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46028_10"
        ],
        "farmSpeed": 30,
        "zhiquSpeed": 60,
        "kaojiuSpeed": 70,
        "wineSuccess": 20,
        "wineSpeed": 20,
        "briefText": "烤酒小白"
    },
    "36137": {
        "staffId": 36137,
        "baseStaff": 28,
        "star": 2,
        "nextStaffId": 36138,
        "chipNum": [
            "46028_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46028_10"
        ],
        "farmSpeed": 130,
        "zhiquSpeed": 160,
        "kaojiuSpeed": 170,
        "wineSuccess": 120,
        "wineSpeed": 120,
        "briefText": "烤酒小白"
    },
    "36138": {
        "staffId": 36138,
        "baseStaff": 28,
        "star": 3,
        "nextStaffId": 36139,
        "chipNum": [
            "46028_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46028_10"
        ],
        "farmSpeed": 230,
        "zhiquSpeed": 260,
        "kaojiuSpeed": 270,
        "wineSuccess": 220,
        "wineSpeed": 220,
        "briefText": "烤酒小白"
    },
    "36139": {
        "staffId": 36139,
        "baseStaff": 28,
        "star": 4,
        "nextStaffId": 36140,
        "chipNum": [
            "46028_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46028_10"
        ],
        "farmSpeed": 330,
        "zhiquSpeed": 360,
        "kaojiuSpeed": 370,
        "wineSuccess": 320,
        "wineSpeed": 320,
        "briefText": "烤酒小白"
    },
    "36140": {
        "staffId": 36140,
        "baseStaff": 28,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46028_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46028_0"
        ],
        "farmSpeed": 430,
        "zhiquSpeed": 460,
        "kaojiuSpeed": 470,
        "wineSuccess": 420,
        "wineSpeed": 420,
        "briefText": "烤酒小白"
    },
    "36141": {
        "staffId": 36141,
        "baseStaff": 29,
        "star": 1,
        "nextStaffId": 36142,
        "chipNum": [
            "46029_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46029_10"
        ],
        "farmSpeed": 50,
        "zhiquSpeed": 40,
        "kaojiuSpeed": 10,
        "wineSuccess": 80,
        "wineSpeed": 20,
        "briefText": "调酒小白"
    },
    "36142": {
        "staffId": 36142,
        "baseStaff": 29,
        "star": 2,
        "nextStaffId": 36143,
        "chipNum": [
            "46029_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46029_10"
        ],
        "farmSpeed": 150,
        "zhiquSpeed": 140,
        "kaojiuSpeed": 110,
        "wineSuccess": 180,
        "wineSpeed": 120,
        "briefText": "调酒小白"
    },
    "36143": {
        "staffId": 36143,
        "baseStaff": 29,
        "star": 3,
        "nextStaffId": 36144,
        "chipNum": [
            "46029_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46029_10"
        ],
        "farmSpeed": 250,
        "zhiquSpeed": 240,
        "kaojiuSpeed": 210,
        "wineSuccess": 280,
        "wineSpeed": 220,
        "briefText": "调酒小白"
    },
    "36144": {
        "staffId": 36144,
        "baseStaff": 29,
        "star": 4,
        "nextStaffId": 36145,
        "chipNum": [
            "46029_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46029_10"
        ],
        "farmSpeed": 350,
        "zhiquSpeed": 340,
        "kaojiuSpeed": 310,
        "wineSuccess": 380,
        "wineSpeed": 320,
        "briefText": "调酒小白"
    },
    "36145": {
        "staffId": 36145,
        "baseStaff": 29,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46029_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46029_0"
        ],
        "farmSpeed": 450,
        "zhiquSpeed": 440,
        "kaojiuSpeed": 410,
        "wineSuccess": 480,
        "wineSpeed": 420,
        "briefText": "调酒小白"
    },
    "36146": {
        "staffId": 36146,
        "baseStaff": 30,
        "star": 1,
        "nextStaffId": 36147,
        "chipNum": [
            "46030_10"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46030_10"
        ],
        "farmSpeed": 20,
        "zhiquSpeed": 30,
        "kaojiuSpeed": 50,
        "wineSuccess": 30,
        "wineSpeed": 90,
        "briefText": "酿酒小白"
    },
    "36147": {
        "staffId": 36147,
        "baseStaff": 30,
        "star": 2,
        "nextStaffId": 36148,
        "chipNum": [
            "46030_20"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46030_10"
        ],
        "farmSpeed": 120,
        "zhiquSpeed": 130,
        "kaojiuSpeed": 150,
        "wineSuccess": 130,
        "wineSpeed": 190,
        "briefText": "酿酒小白"
    },
    "36148": {
        "staffId": 36148,
        "baseStaff": 30,
        "star": 3,
        "nextStaffId": 36149,
        "chipNum": [
            "46030_30"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46030_10"
        ],
        "farmSpeed": 220,
        "zhiquSpeed": 230,
        "kaojiuSpeed": 250,
        "wineSuccess": 230,
        "wineSpeed": 290,
        "briefText": "酿酒小白"
    },
    "36149": {
        "staffId": 36149,
        "baseStaff": 30,
        "star": 4,
        "nextStaffId": 36150,
        "chipNum": [
            "46030_40"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46030_10"
        ],
        "farmSpeed": 320,
        "zhiquSpeed": 330,
        "kaojiuSpeed": 350,
        "wineSuccess": 330,
        "wineSpeed": 390,
        "briefText": "酿酒小白"
    },
    "36150": {
        "staffId": 36150,
        "baseStaff": 30,
        "star": 5,
        "nextStaffId": 0,
        "chipNum": [
            "46030_50"
        ],
        "manageNum": 5,
        "riseStarNeed": [
            "46030_0"
        ],
        "farmSpeed": 420,
        "zhiquSpeed": 430,
        "kaojiuSpeed": 450,
        "wineSuccess": 430,
        "wineSpeed": 490,
        "briefText": "酿酒小白"
    }
}
export default StaffConfig;