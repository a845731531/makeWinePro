type ProductConfigData = {
	productId: number,
	buildingType: number,
	minBuildingLevel: number,
	minPlayerLevel: number,
	materials: string[],
	dropId: number,
	produceTime: number,
	speedCost: number,
}
let ProductConfig: { [id: string]: ProductConfigData } = {
    "31006": {
        "productId": 31006,
        "buildingType": 2,
        "minBuildingLevel": 6,
        "minPlayerLevel": 1,
        "materials": [],
        "dropId": 1,
        "produceTime": 43200,
        "speedCost": 100
    },
    "31012": {
        "productId": 31012,
        "buildingType": 1,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31036_1"
        ],
        "dropId": 2,
        "produceTime": 20736000,
        "speedCost": 10000
    },
    "31018": {
        "productId": 31018,
        "buildingType": 1,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31042_1"
        ],
        "dropId": 3,
        "produceTime": 13010400,
        "speedCost": 28000
    },
    "31022": {
        "productId": 31022,
        "buildingType": 3,
        "minBuildingLevel": 4,
        "minPlayerLevel": 1,
        "materials": [
            "31006_0.5",
            "31012_1.2"
        ],
        "dropId": 4,
        "produceTime": 19184760,
        "speedCost": 1000
    },
    "31023": {
        "productId": 31023,
        "buildingType": 3,
        "minBuildingLevel": 5,
        "minPlayerLevel": 1,
        "materials": [
            "31006_0.5",
            "31012_1.2"
        ],
        "dropId": 5,
        "produceTime": 19184760,
        "speedCost": 2000
    },
    "31024": {
        "productId": 31024,
        "buildingType": 3,
        "minBuildingLevel": 6,
        "minPlayerLevel": 1,
        "materials": [
            "31006_0.5",
            "31012_1.2"
        ],
        "dropId": 6,
        "produceTime": 19184760,
        "speedCost": 4000
    },
    "30003": {
        "productId": 30003,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 7,
        "produceTime": 6641400,
        "speedCost": 615500
    },
    "30004": {
        "productId": 30004,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 8,
        "produceTime": 6641400,
        "speedCost": 690700
    },
    "30005": {
        "productId": 30005,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 9,
        "produceTime": 6641400,
        "speedCost": 764300
    },
    "30006": {
        "productId": 30006,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 10,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30007": {
        "productId": 30007,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 11,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30008": {
        "productId": 30008,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 12,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30009": {
        "productId": 30009,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 13,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30010": {
        "productId": 30010,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 14,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30011": {
        "productId": 30011,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 15,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30012": {
        "productId": 30012,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 16,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30013": {
        "productId": 30013,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 17,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30014": {
        "productId": 30014,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 18,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30015": {
        "productId": 30015,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 19,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30016": {
        "productId": 30016,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 20,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30017": {
        "productId": 30017,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 21,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30018": {
        "productId": 30018,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 22,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30019": {
        "productId": 30019,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 23,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30020": {
        "productId": 30020,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 24,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30021": {
        "productId": 30021,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 25,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30022": {
        "productId": 30022,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 26,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30023": {
        "productId": 30023,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 27,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "30024": {
        "productId": 30024,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31022_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 28,
        "produceTime": 6641400,
        "speedCost": 8000
    },
    "30025": {
        "productId": 30025,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31023_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 29,
        "produceTime": 6641400,
        "speedCost": 16000
    },
    "30026": {
        "productId": 30026,
        "buildingType": 8,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "31024_2.5",
            "31006_79.5",
            "31018_2.5"
        ],
        "dropId": 30,
        "produceTime": 6641400,
        "speedCost": 32000
    },
    "33000": {
        "productId": 33000,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35005_0.1429",
            "35146_0.1429",
            "35287_0.1429",
            "35428_0.1429",
            "35569_0.1429",
            "35710_0.1429",
            "35851_0.1429"
        ],
        "dropId": 31,
        "produceTime": 518400,
        "speedCost": 5000
    },
    "33003": {
        "productId": 33003,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.31",
            "35426_0.06",
            "35567_0.136",
            "35015_0.43",
            "35156_0.03",
            "35720_0.02",
            "35861_0.014"
        ],
        "dropId": 33,
        "produceTime": 518400,
        "speedCost": 8000
    },
    "33004": {
        "productId": 33004,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.26",
            "35426_0.15",
            "35567_0.097",
            "35015_0.31",
            "35156_0.1",
            "35720_0.03",
            "35861_0.083"
        ],
        "dropId": 34,
        "produceTime": 518400,
        "speedCost": 12000
    },
    "33005": {
        "productId": 33005,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.3",
            "35426_0.16",
            "35567_0.048",
            "35015_0.11",
            "35156_0.13",
            "35720_0.16",
            "35861_0.092"
        ],
        "dropId": 35,
        "produceTime": 518400,
        "speedCost": 12000
    },
    "33006": {
        "productId": 33006,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.35",
            "35426_0.1",
            "35567_0.057",
            "35015_0.24",
            "35156_0.07",
            "35720_0.11",
            "35861_0.073"
        ],
        "dropId": 36,
        "produceTime": 518400,
        "speedCost": 12000
    },
    "33007": {
        "productId": 33007,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.13",
            "35426_0.2",
            "35567_0.179",
            "35015_0.08",
            "35156_0.14",
            "35720_0.12",
            "35861_0.151"
        ],
        "dropId": 37,
        "produceTime": 518400,
        "speedCost": 14000
    },
    "33008": {
        "productId": 33008,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35289_0.1",
            "35430_0.14",
            "35571_0.322",
            "35016_0.05",
            "35157_0.1",
            "35721_0.08",
            "35862_0.208"
        ],
        "dropId": 38,
        "produceTime": 518400,
        "speedCost": 18000
    },
    "33009": {
        "productId": 33009,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.09",
            "35426_0.1",
            "35567_0.32",
            "35015_0.15",
            "35156_0.13",
            "35720_0.09",
            "35861_0.12"
        ],
        "dropId": 39,
        "produceTime": 518400,
        "speedCost": 14000
    },
    "33010": {
        "productId": 33010,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35286_0.07",
            "35427_0.08",
            "35568_0.413",
            "35016_0.02",
            "35157_0.02",
            "35721_0.04",
            "35862_0.357"
        ],
        "dropId": 40,
        "produceTime": 518400,
        "speedCost": 18000
    },
    "33011": {
        "productId": 33011,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35286_0.12",
            "35427_0.1",
            "35568_0.34",
            "35016_0.09",
            "35157_0.08",
            "35721_0.08",
            "35862_0.19"
        ],
        "dropId": 41,
        "produceTime": 518400,
        "speedCost": 16000
    },
    "33012": {
        "productId": 33012,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.08",
            "35433_0.1",
            "35574_0.385",
            "35016_0.08",
            "35157_0.03",
            "35721_0.04",
            "35862_0.285"
        ],
        "dropId": 42,
        "produceTime": 518400,
        "speedCost": 22000
    },
    "33013": {
        "productId": 33013,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35296_0.05",
            "35437_0.04",
            "35578_0.483",
            "35023_0.03",
            "35164_0.08",
            "35728_0.03",
            "35869_0.287"
        ],
        "dropId": 43,
        "produceTime": 518400,
        "speedCost": 30000
    },
    "33014": {
        "productId": 33014,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.1",
            "35433_0.04",
            "35574_0.426",
            "35016_0.04",
            "35157_0.05",
            "35721_0.06",
            "35862_0.284"
        ],
        "dropId": 44,
        "produceTime": 518400,
        "speedCost": 24000
    },
    "33015": {
        "productId": 33015,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35296_0.03",
            "35437_0.02",
            "35578_0.524",
            "35023_0.02",
            "35164_0.04",
            "35728_0.1",
            "35869_0.266"
        ],
        "dropId": 45,
        "produceTime": 518400,
        "speedCost": 36000
    },
    "33016": {
        "productId": 33016,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35299_0.01",
            "35440_0.03",
            "35581_0.592",
            "35026_0.01",
            "35167_0.02",
            "35731_0.04",
            "35872_0.298"
        ],
        "dropId": 46,
        "produceTime": 518400,
        "speedCost": 44000
    },
    "33017": {
        "productId": 33017,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.1",
            "35433_0.12",
            "35574_0.347",
            "35022_0.1",
            "35163_0.11",
            "35727_0.09",
            "35868_0.133"
        ],
        "dropId": 47,
        "produceTime": 518400,
        "speedCost": 24000
    },
    "33018": {
        "productId": 33018,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35302_0.25",
            "35443_0.15",
            "35584_0.173",
            "35029_0.12",
            "35170_0.11",
            "35734_0.13",
            "35875_0.067"
        ],
        "dropId": 48,
        "produceTime": 518400,
        "speedCost": 32000
    },
    "33019": {
        "productId": 33019,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35296_0.06",
            "35437_0.12",
            "35578_0.392",
            "35023_0.05",
            "35164_0.08",
            "35728_0.08",
            "35869_0.218"
        ],
        "dropId": 49,
        "produceTime": 518400,
        "speedCost": 34000
    },
    "33020": {
        "productId": 33020,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35302_0.056",
            "35443_0.24",
            "35584_0.177",
            "35029_0.08",
            "35170_0.05",
            "35734_0.12",
            "35875_0.173"
        ],
        "dropId": 50,
        "produceTime": 518400,
        "speedCost": 38000
    },
    "33021": {
        "productId": 33021,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35305_0.18",
            "35446_0.26",
            "35587_0.135",
            "35029_0.16",
            "35170_0.06",
            "35734_0.16",
            "35875_0.045"
        ],
        "dropId": 51,
        "produceTime": 518400,
        "speedCost": 36000
    },
    "33022": {
        "productId": 33022,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35299_0.15",
            "35440_0.12",
            "35581_0.3",
            "35020_0.06",
            "35161_0.08",
            "35725_0.05",
            "35866_0.24"
        ],
        "dropId": 52,
        "produceTime": 518400,
        "speedCost": 30000
    },
    "33023": {
        "productId": 33023,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35299_0.12",
            "35440_0.08",
            "35581_0.429",
            "35029_0.06",
            "35170_0.04",
            "35734_0.03",
            "35875_0.241"
        ],
        "dropId": 53,
        "produceTime": 518400,
        "speedCost": 44000
    },
    "33024": {
        "productId": 33024,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35299_0.1",
            "35440_0.13",
            "35581_0.408",
            "35038_0.04",
            "35179_0.055",
            "35743_0.12",
            "35884_0.147"
        ],
        "dropId": 54,
        "produceTime": 518400,
        "speedCost": 60000
    },
    "33025": {
        "productId": 33025,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.11",
            "35433_0.14",
            "35574_0.314",
            "35016_0.02",
            "35157_0.04",
            "35721_0.065",
            "35862_0.311"
        ],
        "dropId": 55,
        "produceTime": 518400,
        "speedCost": 22000
    },
    "33026": {
        "productId": 33026,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35305_0.17",
            "35446_0.16",
            "35587_0.301",
            "35029_0.1",
            "35170_0.12",
            "35734_0.08",
            "35875_0.069"
        ],
        "dropId": 56,
        "produceTime": 518400,
        "speedCost": 42000
    },
    "33027": {
        "productId": 33027,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35311_0.16",
            "35452_0.35",
            "35593_0.134",
            "35038_0.1",
            "35179_0.1",
            "35743_0.06",
            "35884_0.096"
        ],
        "dropId": 57,
        "produceTime": 518400,
        "speedCost": 56000
    },
    "33028": {
        "productId": 33028,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35320_0.6",
            "35461_0.05",
            "35602_0.064",
            "35047_0.11",
            "35188_0.05",
            "35752_0.04",
            "35893_0.086"
        ],
        "dropId": 58,
        "produceTime": 518400,
        "speedCost": 82000
    },
    "33029": {
        "productId": 33029,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35311_0.18",
            "35452_0.24",
            "35593_0.226",
            "35038_0.1",
            "35179_0.1",
            "35743_0.08",
            "35884_0.074"
        ],
        "dropId": 59,
        "produceTime": 518400,
        "speedCost": 68000
    },
    "33030": {
        "productId": 33030,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35320_0.29",
            "35461_0.3",
            "35602_0.215",
            "35053_0.03",
            "35194_0.04",
            "35758_0.05",
            "35899_0.075"
        ],
        "dropId": 60,
        "produceTime": 518400,
        "speedCost": 107000
    },
    "33031": {
        "productId": 33031,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35335_0.26",
            "35476_0.37",
            "35617_0.063",
            "35068_0.1",
            "35209_0.018",
            "35773_0.01",
            "35914_0.029"
        ],
        "dropId": 61,
        "produceTime": 518400,
        "speedCost": 140000
    },
    "33032": {
        "productId": 33032,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35341_0.35",
            "35482_0.4",
            "35623_0.086",
            "35083_0.02",
            "35224_0.01",
            "35788_0.01",
            "35929_0.014"
        ],
        "dropId": 62,
        "produceTime": 518400,
        "speedCost": 184000
    },
    "33033": {
        "productId": 33033,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35320_0.28",
            "35461_0.3",
            "35602_0.136",
            "35038_0.08",
            "35179_0.08",
            "35743_0.08",
            "35884_0.044"
        ],
        "dropId": 63,
        "produceTime": 518400,
        "speedCost": 45000
    },
    "33034": {
        "productId": 33034,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.1",
            "35433_0.15",
            "35574_0.315",
            "35016_0.06",
            "35157_0.1",
            "35721_0.1",
            "35862_0.175"
        ],
        "dropId": 64,
        "produceTime": 518400,
        "speedCost": 34000
    },
    "33035": {
        "productId": 33035,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.21",
            "35426_0.35",
            "35567_0.24",
            "35015_0.1",
            "35156_0.02",
            "35720_0.02",
            "35861_0.06"
        ],
        "dropId": 65,
        "produceTime": 518400,
        "speedCost": 21000
    },
    "33036": {
        "productId": 33036,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.22",
            "35426_0.36",
            "35567_0.22",
            "35015_0.09",
            "35156_0.01",
            "35720_0.04",
            "35861_0.06"
        ],
        "dropId": 66,
        "produceTime": 518400,
        "speedCost": 22000
    },
    "33037": {
        "productId": 33037,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.24",
            "35426_0.38",
            "35567_0.18",
            "35015_0.06",
            "35156_0.03",
            "35720_0.03",
            "35861_0.08"
        ],
        "dropId": 67,
        "produceTime": 518400,
        "speedCost": 21000
    },
    "33038": {
        "productId": 33038,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35291_0.36",
            "35432_0.36",
            "35573_0.13",
            "35015_0.07",
            "35156_0.01",
            "35720_0.025",
            "35861_0.045"
        ],
        "dropId": 68,
        "produceTime": 518400,
        "speedCost": 40000
    },
    "33039": {
        "productId": 33039,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35291_0.45",
            "35432_0.22",
            "35573_0.19",
            "35015_0.06",
            "35156_0.015",
            "35720_0.015",
            "35861_0.05"
        ],
        "dropId": 69,
        "produceTime": 518400,
        "speedCost": 40000
    },
    "33040": {
        "productId": 33040,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.25",
            "35426_0.24",
            "35567_0.019",
            "35015_0.2",
            "35156_0.08",
            "35720_0.04",
            "35861_0.171"
        ],
        "dropId": 70,
        "produceTime": 518400,
        "speedCost": 20000
    },
    "33041": {
        "productId": 33041,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35286_0.06",
            "35427_0.05",
            "35568_0.452",
            "35016_0.08",
            "35157_0.1",
            "35721_0.04",
            "35862_0.218"
        ],
        "dropId": 71,
        "produceTime": 518400,
        "speedCost": 28000
    },
    "33042": {
        "productId": 33042,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.21",
            "35433_0.25",
            "35574_0.105",
            "35016_0.02",
            "35157_0.02",
            "35721_0.06",
            "35862_0.335"
        ],
        "dropId": 72,
        "produceTime": 518400,
        "speedCost": 34000
    },
    "33043": {
        "productId": 33043,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.41",
            "35426_0.051",
            "35567_0.047",
            "35015_0.26",
            "35156_0.04",
            "35720_0.07",
            "35861_0.122"
        ],
        "dropId": 73,
        "produceTime": 518400,
        "speedCost": 18000
    },
    "33044": {
        "productId": 33044,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35289_0.02",
            "35430_0.36",
            "35571_0.183",
            "35016_0.14",
            "35157_0.042",
            "35721_0.08",
            "35862_0.175"
        ],
        "dropId": 74,
        "produceTime": 518400,
        "speedCost": 27000
    },
    "33045": {
        "productId": 33045,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35293_0.03",
            "35434_0.011",
            "35575_0.533",
            "35023_0.01",
            "35164_0.023",
            "35728_0.02",
            "35869_0.373"
        ],
        "dropId": 75,
        "produceTime": 518400,
        "speedCost": 30000
    },
    "33046": {
        "productId": 33046,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.32",
            "35426_0.162",
            "35567_0.026",
            "35015_0.15",
            "35156_0.2",
            "35720_0.1",
            "35861_0.042"
        ],
        "dropId": 76,
        "produceTime": 518400,
        "speedCost": 18000
    },
    "33047": {
        "productId": 33047,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35289_0.25",
            "35430_0.1",
            "35571_0.212",
            "35016_0.05",
            "35157_0.1",
            "35721_0.15",
            "35862_0.138"
        ],
        "dropId": 77,
        "produceTime": 518400,
        "speedCost": 26000
    },
    "33048": {
        "productId": 33048,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35289_0.46",
            "35430_0.02",
            "35571_0.025",
            "35007_0.35",
            "35148_0.07",
            "35712_0.065",
            "35853_0.01"
        ],
        "dropId": 78,
        "produceTime": 518400,
        "speedCost": 25000
    },
    "33049": {
        "productId": 33049,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.1",
            "35433_0.16",
            "35574_0.309",
            "35022_0.18",
            "35163_0.028",
            "35727_0.11",
            "35868_0.113"
        ],
        "dropId": 79,
        "produceTime": 518400,
        "speedCost": 27000
    },
    "33050": {
        "productId": 33050,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35286_0.2",
            "35427_0.08",
            "35568_0.282",
            "35016_0.12",
            "35157_0.022",
            "35721_0.042",
            "35862_0.254"
        ],
        "dropId": 80,
        "produceTime": 518400,
        "speedCost": 26000
    },
    "33051": {
        "productId": 33051,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.352",
            "35426_0.07",
            "35567_0.086",
            "35015_0.3",
            "35156_0.06",
            "35720_0.06",
            "35861_0.072"
        ],
        "dropId": 81,
        "produceTime": 518400,
        "speedCost": 17000
    },
    "33052": {
        "productId": 33052,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35292_0.04",
            "35433_0.12",
            "35574_0.409",
            "35016_0.04",
            "35157_0.05",
            "35721_0.12",
            "35862_0.221"
        ],
        "dropId": 82,
        "produceTime": 518400,
        "speedCost": 40000
    },
    "33053": {
        "productId": 33053,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35285_0.04",
            "35426_0.05",
            "35567_0.55",
            "35015_0.02",
            "35156_0.02",
            "35720_0.01",
            "35861_0.31"
        ],
        "dropId": 83,
        "produceTime": 518400,
        "speedCost": 78000
    },
    "35003": {
        "productId": 35003,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 84,
        "produceTime": 94608000,
        "speedCost": 23000
    },
    "35004": {
        "productId": 35004,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 85,
        "produceTime": 94608000,
        "speedCost": 26000
    },
    "35005": {
        "productId": 35005,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 86,
        "produceTime": 94608000,
        "speedCost": 29000
    },
    "35006": {
        "productId": 35006,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 87,
        "produceTime": 157680000,
        "speedCost": 32000
    },
    "35007": {
        "productId": 35007,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 88,
        "produceTime": 157680000,
        "speedCost": 36000
    },
    "35008": {
        "productId": 35008,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 89,
        "produceTime": 157680000,
        "speedCost": 40000
    },
    "35009": {
        "productId": 35009,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 90,
        "produceTime": 189216000,
        "speedCost": 48000
    },
    "35010": {
        "productId": 35010,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 91,
        "produceTime": 189216000,
        "speedCost": 53000
    },
    "35011": {
        "productId": 35011,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 92,
        "produceTime": 189216000,
        "speedCost": 58000
    },
    "35012": {
        "productId": 35012,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 93,
        "produceTime": 220752000,
        "speedCost": 60000
    },
    "35013": {
        "productId": 35013,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 94,
        "produceTime": 220752000,
        "speedCost": 67000
    },
    "35014": {
        "productId": 35014,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 95,
        "produceTime": 220752000,
        "speedCost": 74000
    },
    "35015": {
        "productId": 35015,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 96,
        "produceTime": 252288000,
        "speedCost": 69000
    },
    "35016": {
        "productId": 35016,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 97,
        "produceTime": 252288000,
        "speedCost": 77000
    },
    "35017": {
        "productId": 35017,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 98,
        "produceTime": 252288000,
        "speedCost": 85000
    },
    "35018": {
        "productId": 35018,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 99,
        "produceTime": 283824000,
        "speedCost": 97000
    },
    "35019": {
        "productId": 35019,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 100,
        "produceTime": 283824000,
        "speedCost": 108000
    },
    "35020": {
        "productId": 35020,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 101,
        "produceTime": 283824000,
        "speedCost": 119000
    },
    "35021": {
        "productId": 35021,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 102,
        "produceTime": 315360000,
        "speedCost": 115000
    },
    "35022": {
        "productId": 35022,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 103,
        "produceTime": 315360000,
        "speedCost": 128000
    },
    "35023": {
        "productId": 35023,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 104,
        "produceTime": 315360000,
        "speedCost": 141000
    },
    "35024": {
        "productId": 35024,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 105,
        "produceTime": 346896000,
        "speedCost": 135000
    },
    "35025": {
        "productId": 35025,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 106,
        "produceTime": 346896000,
        "speedCost": 150000
    },
    "35026": {
        "productId": 35026,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 107,
        "produceTime": 346896000,
        "speedCost": 165000
    },
    "35027": {
        "productId": 35027,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 108,
        "produceTime": 378432000,
        "speedCost": 164000
    },
    "35028": {
        "productId": 35028,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 109,
        "produceTime": 378432000,
        "speedCost": 182000
    },
    "35029": {
        "productId": 35029,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 110,
        "produceTime": 378432000,
        "speedCost": 200000
    },
    "35030": {
        "productId": 35030,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 111,
        "produceTime": 409968000,
        "speedCost": 206000
    },
    "35031": {
        "productId": 35031,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 112,
        "produceTime": 409968000,
        "speedCost": 229000
    },
    "35032": {
        "productId": 35032,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 113,
        "produceTime": 409968000,
        "speedCost": 252000
    },
    "35033": {
        "productId": 35033,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 114,
        "produceTime": 441504000,
        "speedCost": 252000
    },
    "35034": {
        "productId": 35034,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 115,
        "produceTime": 441504000,
        "speedCost": 280000
    },
    "35035": {
        "productId": 35035,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 116,
        "produceTime": 441504000,
        "speedCost": 308000
    },
    "35036": {
        "productId": 35036,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 117,
        "produceTime": 473040000,
        "speedCost": 302000
    },
    "35037": {
        "productId": 35037,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 118,
        "produceTime": 473040000,
        "speedCost": 336000
    },
    "35038": {
        "productId": 35038,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 119,
        "produceTime": 473040000,
        "speedCost": 370000
    },
    "35039": {
        "productId": 35039,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 120,
        "produceTime": 504576000,
        "speedCost": 392000
    },
    "35040": {
        "productId": 35040,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 121,
        "produceTime": 504576000,
        "speedCost": 435000
    },
    "35041": {
        "productId": 35041,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 122,
        "produceTime": 504576000,
        "speedCost": 479000
    },
    "35042": {
        "productId": 35042,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 123,
        "produceTime": 536112000,
        "speedCost": 465000
    },
    "35043": {
        "productId": 35043,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 124,
        "produceTime": 536112000,
        "speedCost": 517000
    },
    "35044": {
        "productId": 35044,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 125,
        "produceTime": 536112000,
        "speedCost": 569000
    },
    "35045": {
        "productId": 35045,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 126,
        "produceTime": 567648000,
        "speedCost": 571000
    },
    "35046": {
        "productId": 35046,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 127,
        "produceTime": 567648000,
        "speedCost": 634000
    },
    "35047": {
        "productId": 35047,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 128,
        "produceTime": 567648000,
        "speedCost": 697000
    },
    "35048": {
        "productId": 35048,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 129,
        "produceTime": 599184000,
        "speedCost": 684000
    },
    "35049": {
        "productId": 35049,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 130,
        "produceTime": 599184000,
        "speedCost": 760000
    },
    "35050": {
        "productId": 35050,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 131,
        "produceTime": 599184000,
        "speedCost": 836000
    },
    "35051": {
        "productId": 35051,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 132,
        "produceTime": 630720000,
        "speedCost": 806000
    },
    "35052": {
        "productId": 35052,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 133,
        "produceTime": 630720000,
        "speedCost": 896000
    },
    "35053": {
        "productId": 35053,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 134,
        "produceTime": 630720000,
        "speedCost": 986000
    },
    "35054": {
        "productId": 35054,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 135,
        "produceTime": 662256000,
        "speedCost": 1058000
    },
    "35055": {
        "productId": 35055,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 136,
        "produceTime": 662256000,
        "speedCost": 1176000
    },
    "35056": {
        "productId": 35056,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 137,
        "produceTime": 662256000,
        "speedCost": 1294000
    },
    "35057": {
        "productId": 35057,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 138,
        "produceTime": 693792000,
        "speedCost": 1236000
    },
    "35058": {
        "productId": 35058,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 139,
        "produceTime": 693792000,
        "speedCost": 1373000
    },
    "35059": {
        "productId": 35059,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 140,
        "produceTime": 693792000,
        "speedCost": 1510000
    },
    "35060": {
        "productId": 35060,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 141,
        "produceTime": 725328000,
        "speedCost": 1507000
    },
    "35061": {
        "productId": 35061,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 142,
        "produceTime": 725328000,
        "speedCost": 1674000
    },
    "35062": {
        "productId": 35062,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 143,
        "produceTime": 725328000,
        "speedCost": 1841000
    },
    "35063": {
        "productId": 35063,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 144,
        "produceTime": 756864000,
        "speedCost": 1728000
    },
    "35064": {
        "productId": 35064,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 145,
        "produceTime": 756864000,
        "speedCost": 1920000
    },
    "35065": {
        "productId": 35065,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 146,
        "produceTime": 756864000,
        "speedCost": 2112000
    },
    "35066": {
        "productId": 35066,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 147,
        "produceTime": 788400000,
        "speedCost": 2160000
    },
    "35067": {
        "productId": 35067,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 148,
        "produceTime": 788400000,
        "speedCost": 2400000
    },
    "35068": {
        "productId": 35068,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 149,
        "produceTime": 788400000,
        "speedCost": 2640000
    },
    "35069": {
        "productId": 35069,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 150,
        "produceTime": 819936000,
        "speedCost": 2770000
    },
    "35070": {
        "productId": 35070,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 151,
        "produceTime": 819936000,
        "speedCost": 3078000
    },
    "35071": {
        "productId": 35071,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 152,
        "produceTime": 819936000,
        "speedCost": 3386000
    },
    "35072": {
        "productId": 35072,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 153,
        "produceTime": 851472000,
        "speedCost": 3344000
    },
    "35073": {
        "productId": 35073,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 154,
        "produceTime": 851472000,
        "speedCost": 3715000
    },
    "35074": {
        "productId": 35074,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 155,
        "produceTime": 851472000,
        "speedCost": 4087000
    },
    "35075": {
        "productId": 35075,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 156,
        "produceTime": 883008000,
        "speedCost": 3911000
    },
    "35076": {
        "productId": 35076,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 157,
        "produceTime": 883008000,
        "speedCost": 4346000
    },
    "35077": {
        "productId": 35077,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 158,
        "produceTime": 883008000,
        "speedCost": 4781000
    },
    "35078": {
        "productId": 35078,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 159,
        "produceTime": 914544000,
        "speedCost": 4719000
    },
    "35079": {
        "productId": 35079,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 160,
        "produceTime": 914544000,
        "speedCost": 5243000
    },
    "35080": {
        "productId": 35080,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 161,
        "produceTime": 914544000,
        "speedCost": 5767000
    },
    "35081": {
        "productId": 35081,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 162,
        "produceTime": 946080000,
        "speedCost": 5767000
    },
    "35082": {
        "productId": 35082,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 163,
        "produceTime": 946080000,
        "speedCost": 6408000
    },
    "35083": {
        "productId": 35083,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 164,
        "produceTime": 946080000,
        "speedCost": 7049000
    },
    "35084": {
        "productId": 35084,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 165,
        "produceTime": 977616000,
        "speedCost": 7343000
    },
    "35085": {
        "productId": 35085,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 166,
        "produceTime": 977616000,
        "speedCost": 8159000
    },
    "35086": {
        "productId": 35086,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 167,
        "produceTime": 977616000,
        "speedCost": 8975000
    },
    "35087": {
        "productId": 35087,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 168,
        "produceTime": 1009152000,
        "speedCost": 8686000
    },
    "35088": {
        "productId": 35088,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 169,
        "produceTime": 1009152000,
        "speedCost": 9651000
    },
    "35089": {
        "productId": 35089,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 170,
        "produceTime": 1009152000,
        "speedCost": 10616000
    },
    "35090": {
        "productId": 35090,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 171,
        "produceTime": 1040688000,
        "speedCost": 10407000
    },
    "35091": {
        "productId": 35091,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 172,
        "produceTime": 1040688000,
        "speedCost": 11563000
    },
    "35092": {
        "productId": 35092,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 173,
        "produceTime": 1040688000,
        "speedCost": 12719000
    },
    "35093": {
        "productId": 35093,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 174,
        "produceTime": 1072224000,
        "speedCost": 12852000
    },
    "35094": {
        "productId": 35094,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 175,
        "produceTime": 1072224000,
        "speedCost": 14280000
    },
    "35095": {
        "productId": 35095,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 176,
        "produceTime": 1072224000,
        "speedCost": 15708000
    },
    "35096": {
        "productId": 35096,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 177,
        "produceTime": 1103760000,
        "speedCost": 15296000
    },
    "35097": {
        "productId": 35097,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 178,
        "produceTime": 1103760000,
        "speedCost": 16996000
    },
    "35098": {
        "productId": 35098,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 179,
        "produceTime": 1103760000,
        "speedCost": 18696000
    },
    "35099": {
        "productId": 35099,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 180,
        "produceTime": 1135296000,
        "speedCost": 19181000
    },
    "35100": {
        "productId": 35100,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 181,
        "produceTime": 1135296000,
        "speedCost": 21312000
    },
    "35101": {
        "productId": 35101,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 182,
        "produceTime": 1135296000,
        "speedCost": 23443000
    },
    "35102": {
        "productId": 35102,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 183,
        "produceTime": 1166832000,
        "speedCost": 23337000
    },
    "35103": {
        "productId": 35103,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 184,
        "produceTime": 1166832000,
        "speedCost": 25930000
    },
    "35104": {
        "productId": 35104,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 185,
        "produceTime": 1166832000,
        "speedCost": 28523000
    },
    "35105": {
        "productId": 35105,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 186,
        "produceTime": 1198368000,
        "speedCost": 28509000
    },
    "35106": {
        "productId": 35106,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 187,
        "produceTime": 1198368000,
        "speedCost": 31677000
    },
    "35107": {
        "productId": 35107,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 188,
        "produceTime": 1198368000,
        "speedCost": 34845000
    },
    "35108": {
        "productId": 35108,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 189,
        "produceTime": 1229904000,
        "speedCost": 33696000
    },
    "35109": {
        "productId": 35109,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 190,
        "produceTime": 1229904000,
        "speedCost": 37440000
    },
    "35110": {
        "productId": 35110,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 191,
        "produceTime": 1229904000,
        "speedCost": 41184000
    },
    "35111": {
        "productId": 35111,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 192,
        "produceTime": 1261440000,
        "speedCost": 38880000
    },
    "35112": {
        "productId": 35112,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 193,
        "produceTime": 1261440000,
        "speedCost": 43200000
    },
    "35113": {
        "productId": 35113,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 194,
        "produceTime": 1261440000,
        "speedCost": 47520000
    },
    "35114": {
        "productId": 35114,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 195,
        "produceTime": 1292976000,
        "speedCost": 50627000
    },
    "35115": {
        "productId": 35115,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 196,
        "produceTime": 1292976000,
        "speedCost": 56252000
    },
    "35116": {
        "productId": 35116,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 197,
        "produceTime": 1292976000,
        "speedCost": 61877000
    },
    "35117": {
        "productId": 35117,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 198,
        "produceTime": 1324512000,
        "speedCost": 60178000
    },
    "35118": {
        "productId": 35118,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 199,
        "produceTime": 1324512000,
        "speedCost": 66864000
    },
    "35119": {
        "productId": 35119,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 200,
        "produceTime": 1324512000,
        "speedCost": 73550000
    },
    "35120": {
        "productId": 35120,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 201,
        "produceTime": 1356048000,
        "speedCost": 72509000
    },
    "35121": {
        "productId": 35121,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 202,
        "produceTime": 1356048000,
        "speedCost": 80565000
    },
    "35122": {
        "productId": 35122,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 203,
        "produceTime": 1356048000,
        "speedCost": 88622000
    },
    "35123": {
        "productId": 35123,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 204,
        "produceTime": 1387584000,
        "speedCost": 87564000
    },
    "35124": {
        "productId": 35124,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 205,
        "produceTime": 1387584000,
        "speedCost": 97293000
    },
    "35125": {
        "productId": 35125,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 206,
        "produceTime": 1387584000,
        "speedCost": 107022000
    },
    "35126": {
        "productId": 35126,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 207,
        "produceTime": 1419120000,
        "speedCost": 103972000
    },
    "35127": {
        "productId": 35127,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 208,
        "produceTime": 1419120000,
        "speedCost": 115524000
    },
    "35128": {
        "productId": 35128,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 209,
        "produceTime": 1419120000,
        "speedCost": 127076000
    },
    "35129": {
        "productId": 35129,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 210,
        "produceTime": 1450656000,
        "speedCost": 132480000
    },
    "35130": {
        "productId": 35130,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 211,
        "produceTime": 1450656000,
        "speedCost": 147200000
    },
    "35131": {
        "productId": 35131,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 212,
        "produceTime": 1450656000,
        "speedCost": 161920000
    },
    "35132": {
        "productId": 35132,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 213,
        "produceTime": 1482192000,
        "speedCost": 158405000
    },
    "35133": {
        "productId": 35133,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 214,
        "produceTime": 1482192000,
        "speedCost": 176006000
    },
    "35134": {
        "productId": 35134,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 215,
        "produceTime": 1482192000,
        "speedCost": 193607000
    },
    "35135": {
        "productId": 35135,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 216,
        "produceTime": 1513728000,
        "speedCost": 187212000
    },
    "35136": {
        "productId": 35136,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 217,
        "produceTime": 1513728000,
        "speedCost": 208013000
    },
    "35137": {
        "productId": 35137,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 218,
        "produceTime": 1513728000,
        "speedCost": 228814000
    },
    "35138": {
        "productId": 35138,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 219,
        "produceTime": 1545264000,
        "speedCost": 230414000
    },
    "35139": {
        "productId": 35139,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 220,
        "produceTime": 1545264000,
        "speedCost": 256015000
    },
    "35140": {
        "productId": 35140,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 221,
        "produceTime": 1545264000,
        "speedCost": 281617000
    },
    "35141": {
        "productId": 35141,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32003_1"
        ],
        "dropId": 222,
        "produceTime": 1576800000,
        "speedCost": 288000000
    },
    "35142": {
        "productId": 35142,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32004_1"
        ],
        "dropId": 223,
        "produceTime": 1576800000,
        "speedCost": 320000000
    },
    "35143": {
        "productId": 35143,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32005_1"
        ],
        "dropId": 224,
        "produceTime": 1576800000,
        "speedCost": 352000000
    },
    "35144": {
        "productId": 35144,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 225,
        "produceTime": 94608000,
        "speedCost": 30000
    },
    "35145": {
        "productId": 35145,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 226,
        "produceTime": 94608000,
        "speedCost": 33000
    },
    "35146": {
        "productId": 35146,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 227,
        "produceTime": 94608000,
        "speedCost": 36000
    },
    "35147": {
        "productId": 35147,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 228,
        "produceTime": 157680000,
        "speedCost": 41000
    },
    "35148": {
        "productId": 35148,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 229,
        "produceTime": 157680000,
        "speedCost": 45000
    },
    "35149": {
        "productId": 35149,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 230,
        "produceTime": 157680000,
        "speedCost": 50000
    },
    "35150": {
        "productId": 35150,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 231,
        "produceTime": 189216000,
        "speedCost": 59000
    },
    "35151": {
        "productId": 35151,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 232,
        "produceTime": 189216000,
        "speedCost": 66000
    },
    "35152": {
        "productId": 35152,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 233,
        "produceTime": 189216000,
        "speedCost": 73000
    },
    "35153": {
        "productId": 35153,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 234,
        "produceTime": 220752000,
        "speedCost": 76000
    },
    "35154": {
        "productId": 35154,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 235,
        "produceTime": 220752000,
        "speedCost": 84000
    },
    "35155": {
        "productId": 35155,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 236,
        "produceTime": 220752000,
        "speedCost": 92000
    },
    "35156": {
        "productId": 35156,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 237,
        "produceTime": 252288000,
        "speedCost": 86000
    },
    "35157": {
        "productId": 35157,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 238,
        "produceTime": 252288000,
        "speedCost": 96000
    },
    "35158": {
        "productId": 35158,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 239,
        "produceTime": 252288000,
        "speedCost": 106000
    },
    "35159": {
        "productId": 35159,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 240,
        "produceTime": 283824000,
        "speedCost": 122000
    },
    "35160": {
        "productId": 35160,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 241,
        "produceTime": 283824000,
        "speedCost": 135000
    },
    "35161": {
        "productId": 35161,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 242,
        "produceTime": 283824000,
        "speedCost": 149000
    },
    "35162": {
        "productId": 35162,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 243,
        "produceTime": 315360000,
        "speedCost": 144000
    },
    "35163": {
        "productId": 35163,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 244,
        "produceTime": 315360000,
        "speedCost": 160000
    },
    "35164": {
        "productId": 35164,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 245,
        "produceTime": 315360000,
        "speedCost": 176000
    },
    "35165": {
        "productId": 35165,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 246,
        "produceTime": 346896000,
        "speedCost": 168000
    },
    "35166": {
        "productId": 35166,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 247,
        "produceTime": 346896000,
        "speedCost": 187000
    },
    "35167": {
        "productId": 35167,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 248,
        "produceTime": 346896000,
        "speedCost": 206000
    },
    "35168": {
        "productId": 35168,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 249,
        "produceTime": 378432000,
        "speedCost": 205000
    },
    "35169": {
        "productId": 35169,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 250,
        "produceTime": 378432000,
        "speedCost": 228000
    },
    "35170": {
        "productId": 35170,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 251,
        "produceTime": 378432000,
        "speedCost": 251000
    },
    "35171": {
        "productId": 35171,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 252,
        "produceTime": 409968000,
        "speedCost": 257000
    },
    "35172": {
        "productId": 35172,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 253,
        "produceTime": 409968000,
        "speedCost": 286000
    },
    "35173": {
        "productId": 35173,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 254,
        "produceTime": 409968000,
        "speedCost": 315000
    },
    "35174": {
        "productId": 35174,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 255,
        "produceTime": 441504000,
        "speedCost": 315000
    },
    "35175": {
        "productId": 35175,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 256,
        "produceTime": 441504000,
        "speedCost": 350000
    },
    "35176": {
        "productId": 35176,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 257,
        "produceTime": 441504000,
        "speedCost": 385000
    },
    "35177": {
        "productId": 35177,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 258,
        "produceTime": 473040000,
        "speedCost": 378000
    },
    "35178": {
        "productId": 35178,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 259,
        "produceTime": 473040000,
        "speedCost": 420000
    },
    "35179": {
        "productId": 35179,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 260,
        "produceTime": 473040000,
        "speedCost": 462000
    },
    "35180": {
        "productId": 35180,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 261,
        "produceTime": 504576000,
        "speedCost": 490000
    },
    "35181": {
        "productId": 35181,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 262,
        "produceTime": 504576000,
        "speedCost": 544000
    },
    "35182": {
        "productId": 35182,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 263,
        "produceTime": 504576000,
        "speedCost": 598000
    },
    "35183": {
        "productId": 35183,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 264,
        "produceTime": 536112000,
        "speedCost": 581000
    },
    "35184": {
        "productId": 35184,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 265,
        "produceTime": 536112000,
        "speedCost": 646000
    },
    "35185": {
        "productId": 35185,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 266,
        "produceTime": 536112000,
        "speedCost": 711000
    },
    "35186": {
        "productId": 35186,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 267,
        "produceTime": 567648000,
        "speedCost": 713000
    },
    "35187": {
        "productId": 35187,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 268,
        "produceTime": 567648000,
        "speedCost": 792000
    },
    "35188": {
        "productId": 35188,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 269,
        "produceTime": 567648000,
        "speedCost": 871000
    },
    "35189": {
        "productId": 35189,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 270,
        "produceTime": 599184000,
        "speedCost": 855000
    },
    "35190": {
        "productId": 35190,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 271,
        "produceTime": 599184000,
        "speedCost": 950000
    },
    "35191": {
        "productId": 35191,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 272,
        "produceTime": 599184000,
        "speedCost": 1045000
    },
    "35192": {
        "productId": 35192,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 273,
        "produceTime": 630720000,
        "speedCost": 1008000
    },
    "35193": {
        "productId": 35193,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 274,
        "produceTime": 630720000,
        "speedCost": 1120000
    },
    "35194": {
        "productId": 35194,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 275,
        "produceTime": 630720000,
        "speedCost": 1232000
    },
    "35195": {
        "productId": 35195,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 276,
        "produceTime": 662256000,
        "speedCost": 1323000
    },
    "35196": {
        "productId": 35196,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 277,
        "produceTime": 662256000,
        "speedCost": 1470000
    },
    "35197": {
        "productId": 35197,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 278,
        "produceTime": 662256000,
        "speedCost": 1617000
    },
    "35198": {
        "productId": 35198,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 279,
        "produceTime": 693792000,
        "speedCost": 1544000
    },
    "35199": {
        "productId": 35199,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 280,
        "produceTime": 693792000,
        "speedCost": 1716000
    },
    "35200": {
        "productId": 35200,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 281,
        "produceTime": 693792000,
        "speedCost": 1888000
    },
    "35201": {
        "productId": 35201,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 282,
        "produceTime": 725328000,
        "speedCost": 1884000
    },
    "35202": {
        "productId": 35202,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 283,
        "produceTime": 725328000,
        "speedCost": 2093000
    },
    "35203": {
        "productId": 35203,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 284,
        "produceTime": 725328000,
        "speedCost": 2302000
    },
    "35204": {
        "productId": 35204,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 285,
        "produceTime": 756864000,
        "speedCost": 2160000
    },
    "35205": {
        "productId": 35205,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 286,
        "produceTime": 756864000,
        "speedCost": 2400000
    },
    "35206": {
        "productId": 35206,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 287,
        "produceTime": 756864000,
        "speedCost": 2640000
    },
    "35207": {
        "productId": 35207,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 288,
        "produceTime": 788400000,
        "speedCost": 2700000
    },
    "35208": {
        "productId": 35208,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 289,
        "produceTime": 788400000,
        "speedCost": 3000000
    },
    "35209": {
        "productId": 35209,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 290,
        "produceTime": 788400000,
        "speedCost": 3300000
    },
    "35210": {
        "productId": 35210,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 291,
        "produceTime": 819936000,
        "speedCost": 3463000
    },
    "35211": {
        "productId": 35211,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 292,
        "produceTime": 819936000,
        "speedCost": 3848000
    },
    "35212": {
        "productId": 35212,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 293,
        "produceTime": 819936000,
        "speedCost": 4233000
    },
    "35213": {
        "productId": 35213,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 294,
        "produceTime": 851472000,
        "speedCost": 4180000
    },
    "35214": {
        "productId": 35214,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 295,
        "produceTime": 851472000,
        "speedCost": 4644000
    },
    "35215": {
        "productId": 35215,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 296,
        "produceTime": 851472000,
        "speedCost": 5108000
    },
    "35216": {
        "productId": 35216,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 297,
        "produceTime": 883008000,
        "speedCost": 4889000
    },
    "35217": {
        "productId": 35217,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 298,
        "produceTime": 883008000,
        "speedCost": 5432000
    },
    "35218": {
        "productId": 35218,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 299,
        "produceTime": 883008000,
        "speedCost": 5975000
    },
    "35219": {
        "productId": 35219,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 300,
        "produceTime": 914544000,
        "speedCost": 5899000
    },
    "35220": {
        "productId": 35220,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 301,
        "produceTime": 914544000,
        "speedCost": 6554000
    },
    "35221": {
        "productId": 35221,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 302,
        "produceTime": 914544000,
        "speedCost": 7209000
    },
    "35222": {
        "productId": 35222,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 303,
        "produceTime": 946080000,
        "speedCost": 7209000
    },
    "35223": {
        "productId": 35223,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 304,
        "produceTime": 946080000,
        "speedCost": 8010000
    },
    "35224": {
        "productId": 35224,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 305,
        "produceTime": 946080000,
        "speedCost": 8811000
    },
    "35225": {
        "productId": 35225,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 306,
        "produceTime": 977616000,
        "speedCost": 9179000
    },
    "35226": {
        "productId": 35226,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 307,
        "produceTime": 977616000,
        "speedCost": 10199000
    },
    "35227": {
        "productId": 35227,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 308,
        "produceTime": 977616000,
        "speedCost": 11219000
    },
    "35228": {
        "productId": 35228,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 309,
        "produceTime": 1009152000,
        "speedCost": 10858000
    },
    "35229": {
        "productId": 35229,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 310,
        "produceTime": 1009152000,
        "speedCost": 12064000
    },
    "35230": {
        "productId": 35230,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 311,
        "produceTime": 1009152000,
        "speedCost": 13270000
    },
    "35231": {
        "productId": 35231,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 312,
        "produceTime": 1040688000,
        "speedCost": 13009000
    },
    "35232": {
        "productId": 35232,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 313,
        "produceTime": 1040688000,
        "speedCost": 14454000
    },
    "35233": {
        "productId": 35233,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 314,
        "produceTime": 1040688000,
        "speedCost": 15899000
    },
    "35234": {
        "productId": 35234,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 315,
        "produceTime": 1072224000,
        "speedCost": 16065000
    },
    "35235": {
        "productId": 35235,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 316,
        "produceTime": 1072224000,
        "speedCost": 17850000
    },
    "35236": {
        "productId": 35236,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 317,
        "produceTime": 1072224000,
        "speedCost": 19635000
    },
    "35237": {
        "productId": 35237,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 318,
        "produceTime": 1103760000,
        "speedCost": 19121000
    },
    "35238": {
        "productId": 35238,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 319,
        "produceTime": 1103760000,
        "speedCost": 21245000
    },
    "35239": {
        "productId": 35239,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 320,
        "produceTime": 1103760000,
        "speedCost": 23370000
    },
    "35240": {
        "productId": 35240,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 321,
        "produceTime": 1135296000,
        "speedCost": 23976000
    },
    "35241": {
        "productId": 35241,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 322,
        "produceTime": 1135296000,
        "speedCost": 26640000
    },
    "35242": {
        "productId": 35242,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 323,
        "produceTime": 1135296000,
        "speedCost": 29304000
    },
    "35243": {
        "productId": 35243,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 324,
        "produceTime": 1166832000,
        "speedCost": 29171000
    },
    "35244": {
        "productId": 35244,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 325,
        "produceTime": 1166832000,
        "speedCost": 32412000
    },
    "35245": {
        "productId": 35245,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 326,
        "produceTime": 1166832000,
        "speedCost": 35653000
    },
    "35246": {
        "productId": 35246,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 327,
        "produceTime": 1198368000,
        "speedCost": 35636000
    },
    "35247": {
        "productId": 35247,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 328,
        "produceTime": 1198368000,
        "speedCost": 39596000
    },
    "35248": {
        "productId": 35248,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 329,
        "produceTime": 1198368000,
        "speedCost": 43556000
    },
    "35249": {
        "productId": 35249,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 330,
        "produceTime": 1229904000,
        "speedCost": 42120000
    },
    "35250": {
        "productId": 35250,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 331,
        "produceTime": 1229904000,
        "speedCost": 46800000
    },
    "35251": {
        "productId": 35251,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 332,
        "produceTime": 1229904000,
        "speedCost": 51480000
    },
    "35252": {
        "productId": 35252,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 333,
        "produceTime": 1261440000,
        "speedCost": 48600000
    },
    "35253": {
        "productId": 35253,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 334,
        "produceTime": 1261440000,
        "speedCost": 54000000
    },
    "35254": {
        "productId": 35254,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 335,
        "produceTime": 1261440000,
        "speedCost": 59400000
    },
    "35255": {
        "productId": 35255,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 336,
        "produceTime": 1292976000,
        "speedCost": 63284000
    },
    "35256": {
        "productId": 35256,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 337,
        "produceTime": 1292976000,
        "speedCost": 70315000
    },
    "35257": {
        "productId": 35257,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 338,
        "produceTime": 1292976000,
        "speedCost": 77347000
    },
    "35258": {
        "productId": 35258,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 339,
        "produceTime": 1324512000,
        "speedCost": 75222000
    },
    "35259": {
        "productId": 35259,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 340,
        "produceTime": 1324512000,
        "speedCost": 83580000
    },
    "35260": {
        "productId": 35260,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 341,
        "produceTime": 1324512000,
        "speedCost": 91938000
    },
    "35261": {
        "productId": 35261,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 342,
        "produceTime": 1356048000,
        "speedCost": 90635000
    },
    "35262": {
        "productId": 35262,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 343,
        "produceTime": 1356048000,
        "speedCost": 100706000
    },
    "35263": {
        "productId": 35263,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 344,
        "produceTime": 1356048000,
        "speedCost": 110777000
    },
    "35264": {
        "productId": 35264,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 345,
        "produceTime": 1387584000,
        "speedCost": 109454000
    },
    "35265": {
        "productId": 35265,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 346,
        "produceTime": 1387584000,
        "speedCost": 121616000
    },
    "35266": {
        "productId": 35266,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 347,
        "produceTime": 1387584000,
        "speedCost": 133778000
    },
    "35267": {
        "productId": 35267,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 348,
        "produceTime": 1419120000,
        "speedCost": 129965000
    },
    "35268": {
        "productId": 35268,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 349,
        "produceTime": 1419120000,
        "speedCost": 144405000
    },
    "35269": {
        "productId": 35269,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 350,
        "produceTime": 1419120000,
        "speedCost": 158846000
    },
    "35270": {
        "productId": 35270,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 351,
        "produceTime": 1450656000,
        "speedCost": 165600000
    },
    "35271": {
        "productId": 35271,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 352,
        "produceTime": 1450656000,
        "speedCost": 184000000
    },
    "35272": {
        "productId": 35272,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 353,
        "produceTime": 1450656000,
        "speedCost": 202400000
    },
    "35273": {
        "productId": 35273,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 354,
        "produceTime": 1482192000,
        "speedCost": 198006000
    },
    "35274": {
        "productId": 35274,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 355,
        "produceTime": 1482192000,
        "speedCost": 220007000
    },
    "35275": {
        "productId": 35275,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 356,
        "produceTime": 1482192000,
        "speedCost": 242008000
    },
    "35276": {
        "productId": 35276,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 357,
        "produceTime": 1513728000,
        "speedCost": 234014000
    },
    "35277": {
        "productId": 35277,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 358,
        "produceTime": 1513728000,
        "speedCost": 260016000
    },
    "35278": {
        "productId": 35278,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 359,
        "produceTime": 1513728000,
        "speedCost": 286018000
    },
    "35279": {
        "productId": 35279,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 360,
        "produceTime": 1545264000,
        "speedCost": 288017000
    },
    "35280": {
        "productId": 35280,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 361,
        "produceTime": 1545264000,
        "speedCost": 320019000
    },
    "35281": {
        "productId": 35281,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 362,
        "produceTime": 1545264000,
        "speedCost": 352021000
    },
    "35282": {
        "productId": 35282,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32009_1"
        ],
        "dropId": 363,
        "produceTime": 1576800000,
        "speedCost": 360000000
    },
    "35283": {
        "productId": 35283,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32010_1"
        ],
        "dropId": 364,
        "produceTime": 1576800000,
        "speedCost": 400000000
    },
    "35284": {
        "productId": 35284,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32011_1"
        ],
        "dropId": 365,
        "produceTime": 1576800000,
        "speedCost": 440000000
    },
    "35285": {
        "productId": 35285,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 366,
        "produceTime": 94608000,
        "speedCost": 30000
    },
    "35286": {
        "productId": 35286,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 367,
        "produceTime": 94608000,
        "speedCost": 33000
    },
    "35287": {
        "productId": 35287,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 368,
        "produceTime": 94608000,
        "speedCost": 36000
    },
    "35288": {
        "productId": 35288,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 369,
        "produceTime": 157680000,
        "speedCost": 41000
    },
    "35289": {
        "productId": 35289,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 370,
        "produceTime": 157680000,
        "speedCost": 45000
    },
    "35290": {
        "productId": 35290,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 371,
        "produceTime": 157680000,
        "speedCost": 50000
    },
    "35291": {
        "productId": 35291,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 372,
        "produceTime": 189216000,
        "speedCost": 59000
    },
    "35292": {
        "productId": 35292,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 373,
        "produceTime": 189216000,
        "speedCost": 66000
    },
    "35293": {
        "productId": 35293,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 374,
        "produceTime": 189216000,
        "speedCost": 73000
    },
    "35294": {
        "productId": 35294,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 375,
        "produceTime": 220752000,
        "speedCost": 76000
    },
    "35295": {
        "productId": 35295,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 376,
        "produceTime": 220752000,
        "speedCost": 84000
    },
    "35296": {
        "productId": 35296,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 377,
        "produceTime": 220752000,
        "speedCost": 92000
    },
    "35297": {
        "productId": 35297,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 378,
        "produceTime": 252288000,
        "speedCost": 86000
    },
    "35298": {
        "productId": 35298,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 379,
        "produceTime": 252288000,
        "speedCost": 96000
    },
    "35299": {
        "productId": 35299,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 380,
        "produceTime": 252288000,
        "speedCost": 106000
    },
    "35300": {
        "productId": 35300,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 381,
        "produceTime": 283824000,
        "speedCost": 122000
    },
    "35301": {
        "productId": 35301,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 382,
        "produceTime": 283824000,
        "speedCost": 135000
    },
    "35302": {
        "productId": 35302,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 383,
        "produceTime": 283824000,
        "speedCost": 149000
    },
    "35303": {
        "productId": 35303,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 384,
        "produceTime": 315360000,
        "speedCost": 144000
    },
    "35304": {
        "productId": 35304,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 385,
        "produceTime": 315360000,
        "speedCost": 160000
    },
    "35305": {
        "productId": 35305,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 386,
        "produceTime": 315360000,
        "speedCost": 176000
    },
    "35306": {
        "productId": 35306,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 387,
        "produceTime": 346896000,
        "speedCost": 168000
    },
    "35307": {
        "productId": 35307,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 388,
        "produceTime": 346896000,
        "speedCost": 187000
    },
    "35308": {
        "productId": 35308,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 389,
        "produceTime": 346896000,
        "speedCost": 206000
    },
    "35309": {
        "productId": 35309,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 390,
        "produceTime": 378432000,
        "speedCost": 205000
    },
    "35310": {
        "productId": 35310,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 391,
        "produceTime": 378432000,
        "speedCost": 228000
    },
    "35311": {
        "productId": 35311,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 392,
        "produceTime": 378432000,
        "speedCost": 251000
    },
    "35312": {
        "productId": 35312,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 393,
        "produceTime": 409968000,
        "speedCost": 257000
    },
    "35313": {
        "productId": 35313,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 394,
        "produceTime": 409968000,
        "speedCost": 286000
    },
    "35314": {
        "productId": 35314,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 395,
        "produceTime": 409968000,
        "speedCost": 315000
    },
    "35315": {
        "productId": 35315,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 396,
        "produceTime": 441504000,
        "speedCost": 315000
    },
    "35316": {
        "productId": 35316,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 397,
        "produceTime": 441504000,
        "speedCost": 350000
    },
    "35317": {
        "productId": 35317,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 398,
        "produceTime": 441504000,
        "speedCost": 385000
    },
    "35318": {
        "productId": 35318,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 399,
        "produceTime": 473040000,
        "speedCost": 378000
    },
    "35319": {
        "productId": 35319,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 400,
        "produceTime": 473040000,
        "speedCost": 420000
    },
    "35320": {
        "productId": 35320,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 401,
        "produceTime": 473040000,
        "speedCost": 462000
    },
    "35321": {
        "productId": 35321,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 402,
        "produceTime": 504576000,
        "speedCost": 490000
    },
    "35322": {
        "productId": 35322,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 403,
        "produceTime": 504576000,
        "speedCost": 544000
    },
    "35323": {
        "productId": 35323,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 404,
        "produceTime": 504576000,
        "speedCost": 598000
    },
    "35324": {
        "productId": 35324,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 405,
        "produceTime": 536112000,
        "speedCost": 581000
    },
    "35325": {
        "productId": 35325,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 406,
        "produceTime": 536112000,
        "speedCost": 646000
    },
    "35326": {
        "productId": 35326,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 407,
        "produceTime": 536112000,
        "speedCost": 711000
    },
    "35327": {
        "productId": 35327,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 408,
        "produceTime": 567648000,
        "speedCost": 713000
    },
    "35328": {
        "productId": 35328,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 409,
        "produceTime": 567648000,
        "speedCost": 792000
    },
    "35329": {
        "productId": 35329,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 410,
        "produceTime": 567648000,
        "speedCost": 871000
    },
    "35330": {
        "productId": 35330,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 411,
        "produceTime": 599184000,
        "speedCost": 855000
    },
    "35331": {
        "productId": 35331,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 412,
        "produceTime": 599184000,
        "speedCost": 950000
    },
    "35332": {
        "productId": 35332,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 413,
        "produceTime": 599184000,
        "speedCost": 1045000
    },
    "35333": {
        "productId": 35333,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 414,
        "produceTime": 630720000,
        "speedCost": 1008000
    },
    "35334": {
        "productId": 35334,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 415,
        "produceTime": 630720000,
        "speedCost": 1120000
    },
    "35335": {
        "productId": 35335,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 416,
        "produceTime": 630720000,
        "speedCost": 1232000
    },
    "35336": {
        "productId": 35336,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 417,
        "produceTime": 662256000,
        "speedCost": 1323000
    },
    "35337": {
        "productId": 35337,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 418,
        "produceTime": 662256000,
        "speedCost": 1470000
    },
    "35338": {
        "productId": 35338,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 419,
        "produceTime": 662256000,
        "speedCost": 1617000
    },
    "35339": {
        "productId": 35339,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 420,
        "produceTime": 693792000,
        "speedCost": 1544000
    },
    "35340": {
        "productId": 35340,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 421,
        "produceTime": 693792000,
        "speedCost": 1716000
    },
    "35341": {
        "productId": 35341,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 422,
        "produceTime": 693792000,
        "speedCost": 1888000
    },
    "35342": {
        "productId": 35342,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 423,
        "produceTime": 725328000,
        "speedCost": 1884000
    },
    "35343": {
        "productId": 35343,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 424,
        "produceTime": 725328000,
        "speedCost": 2093000
    },
    "35344": {
        "productId": 35344,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 425,
        "produceTime": 725328000,
        "speedCost": 2302000
    },
    "35345": {
        "productId": 35345,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 426,
        "produceTime": 756864000,
        "speedCost": 2160000
    },
    "35346": {
        "productId": 35346,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 427,
        "produceTime": 756864000,
        "speedCost": 2400000
    },
    "35347": {
        "productId": 35347,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 428,
        "produceTime": 756864000,
        "speedCost": 2640000
    },
    "35348": {
        "productId": 35348,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 429,
        "produceTime": 788400000,
        "speedCost": 2700000
    },
    "35349": {
        "productId": 35349,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 430,
        "produceTime": 788400000,
        "speedCost": 3000000
    },
    "35350": {
        "productId": 35350,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 431,
        "produceTime": 788400000,
        "speedCost": 3300000
    },
    "35351": {
        "productId": 35351,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 432,
        "produceTime": 819936000,
        "speedCost": 3463000
    },
    "35352": {
        "productId": 35352,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 433,
        "produceTime": 819936000,
        "speedCost": 3848000
    },
    "35353": {
        "productId": 35353,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 434,
        "produceTime": 819936000,
        "speedCost": 4233000
    },
    "35354": {
        "productId": 35354,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 435,
        "produceTime": 851472000,
        "speedCost": 4180000
    },
    "35355": {
        "productId": 35355,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 436,
        "produceTime": 851472000,
        "speedCost": 4644000
    },
    "35356": {
        "productId": 35356,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 437,
        "produceTime": 851472000,
        "speedCost": 5108000
    },
    "35357": {
        "productId": 35357,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 438,
        "produceTime": 883008000,
        "speedCost": 4889000
    },
    "35358": {
        "productId": 35358,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 439,
        "produceTime": 883008000,
        "speedCost": 5432000
    },
    "35359": {
        "productId": 35359,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 440,
        "produceTime": 883008000,
        "speedCost": 5975000
    },
    "35360": {
        "productId": 35360,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 441,
        "produceTime": 914544000,
        "speedCost": 5899000
    },
    "35361": {
        "productId": 35361,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 442,
        "produceTime": 914544000,
        "speedCost": 6554000
    },
    "35362": {
        "productId": 35362,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 443,
        "produceTime": 914544000,
        "speedCost": 7209000
    },
    "35363": {
        "productId": 35363,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 444,
        "produceTime": 946080000,
        "speedCost": 7209000
    },
    "35364": {
        "productId": 35364,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 445,
        "produceTime": 946080000,
        "speedCost": 8010000
    },
    "35365": {
        "productId": 35365,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 446,
        "produceTime": 946080000,
        "speedCost": 8811000
    },
    "35366": {
        "productId": 35366,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 447,
        "produceTime": 977616000,
        "speedCost": 9179000
    },
    "35367": {
        "productId": 35367,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 448,
        "produceTime": 977616000,
        "speedCost": 10199000
    },
    "35368": {
        "productId": 35368,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 449,
        "produceTime": 977616000,
        "speedCost": 11219000
    },
    "35369": {
        "productId": 35369,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 450,
        "produceTime": 1009152000,
        "speedCost": 10858000
    },
    "35370": {
        "productId": 35370,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 451,
        "produceTime": 1009152000,
        "speedCost": 12064000
    },
    "35371": {
        "productId": 35371,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 452,
        "produceTime": 1009152000,
        "speedCost": 13270000
    },
    "35372": {
        "productId": 35372,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 453,
        "produceTime": 1040688000,
        "speedCost": 13009000
    },
    "35373": {
        "productId": 35373,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 454,
        "produceTime": 1040688000,
        "speedCost": 14454000
    },
    "35374": {
        "productId": 35374,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 455,
        "produceTime": 1040688000,
        "speedCost": 15899000
    },
    "35375": {
        "productId": 35375,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 456,
        "produceTime": 1072224000,
        "speedCost": 16065000
    },
    "35376": {
        "productId": 35376,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 457,
        "produceTime": 1072224000,
        "speedCost": 17850000
    },
    "35377": {
        "productId": 35377,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 458,
        "produceTime": 1072224000,
        "speedCost": 19635000
    },
    "35378": {
        "productId": 35378,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 459,
        "produceTime": 1103760000,
        "speedCost": 19121000
    },
    "35379": {
        "productId": 35379,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 460,
        "produceTime": 1103760000,
        "speedCost": 21245000
    },
    "35380": {
        "productId": 35380,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 461,
        "produceTime": 1103760000,
        "speedCost": 23370000
    },
    "35381": {
        "productId": 35381,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 462,
        "produceTime": 1135296000,
        "speedCost": 23976000
    },
    "35382": {
        "productId": 35382,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 463,
        "produceTime": 1135296000,
        "speedCost": 26640000
    },
    "35383": {
        "productId": 35383,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 464,
        "produceTime": 1135296000,
        "speedCost": 29304000
    },
    "35384": {
        "productId": 35384,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 465,
        "produceTime": 1166832000,
        "speedCost": 29171000
    },
    "35385": {
        "productId": 35385,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 466,
        "produceTime": 1166832000,
        "speedCost": 32412000
    },
    "35386": {
        "productId": 35386,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 467,
        "produceTime": 1166832000,
        "speedCost": 35653000
    },
    "35387": {
        "productId": 35387,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 468,
        "produceTime": 1198368000,
        "speedCost": 35636000
    },
    "35388": {
        "productId": 35388,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 469,
        "produceTime": 1198368000,
        "speedCost": 39596000
    },
    "35389": {
        "productId": 35389,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 470,
        "produceTime": 1198368000,
        "speedCost": 43556000
    },
    "35390": {
        "productId": 35390,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 471,
        "produceTime": 1229904000,
        "speedCost": 42120000
    },
    "35391": {
        "productId": 35391,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 472,
        "produceTime": 1229904000,
        "speedCost": 46800000
    },
    "35392": {
        "productId": 35392,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 473,
        "produceTime": 1229904000,
        "speedCost": 51480000
    },
    "35393": {
        "productId": 35393,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 474,
        "produceTime": 1261440000,
        "speedCost": 48600000
    },
    "35394": {
        "productId": 35394,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 475,
        "produceTime": 1261440000,
        "speedCost": 54000000
    },
    "35395": {
        "productId": 35395,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 476,
        "produceTime": 1261440000,
        "speedCost": 59400000
    },
    "35396": {
        "productId": 35396,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 477,
        "produceTime": 1292976000,
        "speedCost": 63284000
    },
    "35397": {
        "productId": 35397,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 478,
        "produceTime": 1292976000,
        "speedCost": 70315000
    },
    "35398": {
        "productId": 35398,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 479,
        "produceTime": 1292976000,
        "speedCost": 77347000
    },
    "35399": {
        "productId": 35399,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 480,
        "produceTime": 1324512000,
        "speedCost": 75222000
    },
    "35400": {
        "productId": 35400,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 481,
        "produceTime": 1324512000,
        "speedCost": 83580000
    },
    "35401": {
        "productId": 35401,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 482,
        "produceTime": 1324512000,
        "speedCost": 91938000
    },
    "35402": {
        "productId": 35402,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 483,
        "produceTime": 1356048000,
        "speedCost": 90635000
    },
    "35403": {
        "productId": 35403,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 484,
        "produceTime": 1356048000,
        "speedCost": 100706000
    },
    "35404": {
        "productId": 35404,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 485,
        "produceTime": 1356048000,
        "speedCost": 110777000
    },
    "35405": {
        "productId": 35405,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 486,
        "produceTime": 1387584000,
        "speedCost": 109454000
    },
    "35406": {
        "productId": 35406,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 487,
        "produceTime": 1387584000,
        "speedCost": 121616000
    },
    "35407": {
        "productId": 35407,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 488,
        "produceTime": 1387584000,
        "speedCost": 133778000
    },
    "35408": {
        "productId": 35408,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 489,
        "produceTime": 1419120000,
        "speedCost": 129965000
    },
    "35409": {
        "productId": 35409,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 490,
        "produceTime": 1419120000,
        "speedCost": 144405000
    },
    "35410": {
        "productId": 35410,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 491,
        "produceTime": 1419120000,
        "speedCost": 158846000
    },
    "35411": {
        "productId": 35411,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 492,
        "produceTime": 1450656000,
        "speedCost": 165600000
    },
    "35412": {
        "productId": 35412,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 493,
        "produceTime": 1450656000,
        "speedCost": 184000000
    },
    "35413": {
        "productId": 35413,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 494,
        "produceTime": 1450656000,
        "speedCost": 202400000
    },
    "35414": {
        "productId": 35414,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 495,
        "produceTime": 1482192000,
        "speedCost": 198006000
    },
    "35415": {
        "productId": 35415,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 496,
        "produceTime": 1482192000,
        "speedCost": 220007000
    },
    "35416": {
        "productId": 35416,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 497,
        "produceTime": 1482192000,
        "speedCost": 242008000
    },
    "35417": {
        "productId": 35417,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 498,
        "produceTime": 1513728000,
        "speedCost": 234014000
    },
    "35418": {
        "productId": 35418,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 499,
        "produceTime": 1513728000,
        "speedCost": 260016000
    },
    "35419": {
        "productId": 35419,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 500,
        "produceTime": 1513728000,
        "speedCost": 286018000
    },
    "35420": {
        "productId": 35420,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 501,
        "produceTime": 1545264000,
        "speedCost": 288017000
    },
    "35421": {
        "productId": 35421,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 502,
        "produceTime": 1545264000,
        "speedCost": 320019000
    },
    "35422": {
        "productId": 35422,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 503,
        "produceTime": 1545264000,
        "speedCost": 352021000
    },
    "35423": {
        "productId": 35423,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32015_1"
        ],
        "dropId": 504,
        "produceTime": 1576800000,
        "speedCost": 360000000
    },
    "35424": {
        "productId": 35424,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32016_1"
        ],
        "dropId": 505,
        "produceTime": 1576800000,
        "speedCost": 400000000
    },
    "35425": {
        "productId": 35425,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32017_1"
        ],
        "dropId": 506,
        "produceTime": 1576800000,
        "speedCost": 440000000
    },
    "35426": {
        "productId": 35426,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 507,
        "produceTime": 94608000,
        "speedCost": 75000
    },
    "35427": {
        "productId": 35427,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 508,
        "produceTime": 94608000,
        "speedCost": 83000
    },
    "35428": {
        "productId": 35428,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 509,
        "produceTime": 94608000,
        "speedCost": 91000
    },
    "35429": {
        "productId": 35429,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 510,
        "produceTime": 157680000,
        "speedCost": 102000
    },
    "35430": {
        "productId": 35430,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 511,
        "produceTime": 157680000,
        "speedCost": 113000
    },
    "35431": {
        "productId": 35431,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 512,
        "produceTime": 157680000,
        "speedCost": 124000
    },
    "35432": {
        "productId": 35432,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 513,
        "produceTime": 189216000,
        "speedCost": 149000
    },
    "35433": {
        "productId": 35433,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 514,
        "produceTime": 189216000,
        "speedCost": 165000
    },
    "35434": {
        "productId": 35434,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 515,
        "produceTime": 189216000,
        "speedCost": 182000
    },
    "35435": {
        "productId": 35435,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 516,
        "produceTime": 220752000,
        "speedCost": 189000
    },
    "35436": {
        "productId": 35436,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 517,
        "produceTime": 220752000,
        "speedCost": 210000
    },
    "35437": {
        "productId": 35437,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 518,
        "produceTime": 220752000,
        "speedCost": 231000
    },
    "35438": {
        "productId": 35438,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 519,
        "produceTime": 252288000,
        "speedCost": 216000
    },
    "35439": {
        "productId": 35439,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 520,
        "produceTime": 252288000,
        "speedCost": 240000
    },
    "35440": {
        "productId": 35440,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 521,
        "produceTime": 252288000,
        "speedCost": 264000
    },
    "35441": {
        "productId": 35441,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 522,
        "produceTime": 283824000,
        "speedCost": 304000
    },
    "35442": {
        "productId": 35442,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 523,
        "produceTime": 283824000,
        "speedCost": 338000
    },
    "35443": {
        "productId": 35443,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 524,
        "produceTime": 283824000,
        "speedCost": 372000
    },
    "35444": {
        "productId": 35444,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 525,
        "produceTime": 315360000,
        "speedCost": 360000
    },
    "35445": {
        "productId": 35445,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 526,
        "produceTime": 315360000,
        "speedCost": 400000
    },
    "35446": {
        "productId": 35446,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 527,
        "produceTime": 315360000,
        "speedCost": 440000
    },
    "35447": {
        "productId": 35447,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 528,
        "produceTime": 346896000,
        "speedCost": 421000
    },
    "35448": {
        "productId": 35448,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 529,
        "produceTime": 346896000,
        "speedCost": 468000
    },
    "35449": {
        "productId": 35449,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 530,
        "produceTime": 346896000,
        "speedCost": 515000
    },
    "35450": {
        "productId": 35450,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 531,
        "produceTime": 378432000,
        "speedCost": 513000
    },
    "35451": {
        "productId": 35451,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 532,
        "produceTime": 378432000,
        "speedCost": 570000
    },
    "35452": {
        "productId": 35452,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 533,
        "produceTime": 378432000,
        "speedCost": 627000
    },
    "35453": {
        "productId": 35453,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 534,
        "produceTime": 409968000,
        "speedCost": 644000
    },
    "35454": {
        "productId": 35454,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 535,
        "produceTime": 409968000,
        "speedCost": 715000
    },
    "35455": {
        "productId": 35455,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 536,
        "produceTime": 409968000,
        "speedCost": 787000
    },
    "35456": {
        "productId": 35456,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 537,
        "produceTime": 441504000,
        "speedCost": 788000
    },
    "35457": {
        "productId": 35457,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 538,
        "produceTime": 441504000,
        "speedCost": 875000
    },
    "35458": {
        "productId": 35458,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 539,
        "produceTime": 441504000,
        "speedCost": 963000
    },
    "35459": {
        "productId": 35459,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 540,
        "produceTime": 473040000,
        "speedCost": 945000
    },
    "35460": {
        "productId": 35460,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 541,
        "produceTime": 473040000,
        "speedCost": 1050000
    },
    "35461": {
        "productId": 35461,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 542,
        "produceTime": 473040000,
        "speedCost": 1155000
    },
    "35462": {
        "productId": 35462,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 543,
        "produceTime": 504576000,
        "speedCost": 1224000
    },
    "35463": {
        "productId": 35463,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 544,
        "produceTime": 504576000,
        "speedCost": 1360000
    },
    "35464": {
        "productId": 35464,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 545,
        "produceTime": 504576000,
        "speedCost": 1496000
    },
    "35465": {
        "productId": 35465,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 546,
        "produceTime": 536112000,
        "speedCost": 1454000
    },
    "35466": {
        "productId": 35466,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 547,
        "produceTime": 536112000,
        "speedCost": 1615000
    },
    "35467": {
        "productId": 35467,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 548,
        "produceTime": 536112000,
        "speedCost": 1777000
    },
    "35468": {
        "productId": 35468,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 549,
        "produceTime": 567648000,
        "speedCost": 1782000
    },
    "35469": {
        "productId": 35469,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 550,
        "produceTime": 567648000,
        "speedCost": 1980000
    },
    "35470": {
        "productId": 35470,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 551,
        "produceTime": 567648000,
        "speedCost": 2178000
    },
    "35471": {
        "productId": 35471,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 552,
        "produceTime": 599184000,
        "speedCost": 2138000
    },
    "35472": {
        "productId": 35472,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 553,
        "produceTime": 599184000,
        "speedCost": 2375000
    },
    "35473": {
        "productId": 35473,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 554,
        "produceTime": 599184000,
        "speedCost": 2613000
    },
    "35474": {
        "productId": 35474,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 555,
        "produceTime": 630720000,
        "speedCost": 2520000
    },
    "35475": {
        "productId": 35475,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 556,
        "produceTime": 630720000,
        "speedCost": 2800000
    },
    "35476": {
        "productId": 35476,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 557,
        "produceTime": 630720000,
        "speedCost": 3080000
    },
    "35477": {
        "productId": 35477,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 558,
        "produceTime": 662256000,
        "speedCost": 3308000
    },
    "35478": {
        "productId": 35478,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 559,
        "produceTime": 662256000,
        "speedCost": 3675000
    },
    "35479": {
        "productId": 35479,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 560,
        "produceTime": 662256000,
        "speedCost": 4043000
    },
    "35480": {
        "productId": 35480,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 561,
        "produceTime": 693792000,
        "speedCost": 3861000
    },
    "35481": {
        "productId": 35481,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 562,
        "produceTime": 693792000,
        "speedCost": 4290000
    },
    "35482": {
        "productId": 35482,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 563,
        "produceTime": 693792000,
        "speedCost": 4719000
    },
    "35483": {
        "productId": 35483,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 564,
        "produceTime": 725328000,
        "speedCost": 4710000
    },
    "35484": {
        "productId": 35484,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 565,
        "produceTime": 725328000,
        "speedCost": 5233000
    },
    "35485": {
        "productId": 35485,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 566,
        "produceTime": 725328000,
        "speedCost": 5756000
    },
    "35486": {
        "productId": 35486,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 567,
        "produceTime": 756864000,
        "speedCost": 5400000
    },
    "35487": {
        "productId": 35487,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 568,
        "produceTime": 756864000,
        "speedCost": 6000000
    },
    "35488": {
        "productId": 35488,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 569,
        "produceTime": 756864000,
        "speedCost": 6600000
    },
    "35489": {
        "productId": 35489,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 570,
        "produceTime": 788400000,
        "speedCost": 6750000
    },
    "35490": {
        "productId": 35490,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 571,
        "produceTime": 788400000,
        "speedCost": 7500000
    },
    "35491": {
        "productId": 35491,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 572,
        "produceTime": 788400000,
        "speedCost": 8250000
    },
    "35492": {
        "productId": 35492,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 573,
        "produceTime": 819936000,
        "speedCost": 8658000
    },
    "35493": {
        "productId": 35493,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 574,
        "produceTime": 819936000,
        "speedCost": 9620000
    },
    "35494": {
        "productId": 35494,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 575,
        "produceTime": 819936000,
        "speedCost": 10582000
    },
    "35495": {
        "productId": 35495,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 576,
        "produceTime": 851472000,
        "speedCost": 10449000
    },
    "35496": {
        "productId": 35496,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 577,
        "produceTime": 851472000,
        "speedCost": 11610000
    },
    "35497": {
        "productId": 35497,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 578,
        "produceTime": 851472000,
        "speedCost": 12771000
    },
    "35498": {
        "productId": 35498,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 579,
        "produceTime": 883008000,
        "speedCost": 12222000
    },
    "35499": {
        "productId": 35499,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 580,
        "produceTime": 883008000,
        "speedCost": 13580000
    },
    "35500": {
        "productId": 35500,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 581,
        "produceTime": 883008000,
        "speedCost": 14938000
    },
    "35501": {
        "productId": 35501,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 582,
        "produceTime": 914544000,
        "speedCost": 14747000
    },
    "35502": {
        "productId": 35502,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 583,
        "produceTime": 914544000,
        "speedCost": 16385000
    },
    "35503": {
        "productId": 35503,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 584,
        "produceTime": 914544000,
        "speedCost": 18024000
    },
    "35504": {
        "productId": 35504,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 585,
        "produceTime": 946080000,
        "speedCost": 18023000
    },
    "35505": {
        "productId": 35505,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 586,
        "produceTime": 946080000,
        "speedCost": 20025000
    },
    "35506": {
        "productId": 35506,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 587,
        "produceTime": 946080000,
        "speedCost": 22028000
    },
    "35507": {
        "productId": 35507,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 588,
        "produceTime": 977616000,
        "speedCost": 22948000
    },
    "35508": {
        "productId": 35508,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 589,
        "produceTime": 977616000,
        "speedCost": 25498000
    },
    "35509": {
        "productId": 35509,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 590,
        "produceTime": 977616000,
        "speedCost": 28048000
    },
    "35510": {
        "productId": 35510,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 591,
        "produceTime": 1009152000,
        "speedCost": 27144000
    },
    "35511": {
        "productId": 35511,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 592,
        "produceTime": 1009152000,
        "speedCost": 30160000
    },
    "35512": {
        "productId": 35512,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 593,
        "produceTime": 1009152000,
        "speedCost": 33176000
    },
    "35513": {
        "productId": 35513,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 594,
        "produceTime": 1040688000,
        "speedCost": 32522000
    },
    "35514": {
        "productId": 35514,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 595,
        "produceTime": 1040688000,
        "speedCost": 36135000
    },
    "35515": {
        "productId": 35515,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 596,
        "produceTime": 1040688000,
        "speedCost": 39749000
    },
    "35516": {
        "productId": 35516,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 597,
        "produceTime": 1072224000,
        "speedCost": 40163000
    },
    "35517": {
        "productId": 35517,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 598,
        "produceTime": 1072224000,
        "speedCost": 44625000
    },
    "35518": {
        "productId": 35518,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 599,
        "produceTime": 1072224000,
        "speedCost": 49088000
    },
    "35519": {
        "productId": 35519,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 600,
        "produceTime": 1103760000,
        "speedCost": 47802000
    },
    "35520": {
        "productId": 35520,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 601,
        "produceTime": 1103760000,
        "speedCost": 53113000
    },
    "35521": {
        "productId": 35521,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 602,
        "produceTime": 1103760000,
        "speedCost": 58424000
    },
    "35522": {
        "productId": 35522,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 603,
        "produceTime": 1135296000,
        "speedCost": 59940000
    },
    "35523": {
        "productId": 35523,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 604,
        "produceTime": 1135296000,
        "speedCost": 66600000
    },
    "35524": {
        "productId": 35524,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 605,
        "produceTime": 1135296000,
        "speedCost": 73260000
    },
    "35525": {
        "productId": 35525,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 606,
        "produceTime": 1166832000,
        "speedCost": 72927000
    },
    "35526": {
        "productId": 35526,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 607,
        "produceTime": 1166832000,
        "speedCost": 81030000
    },
    "35527": {
        "productId": 35527,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 608,
        "produceTime": 1166832000,
        "speedCost": 89133000
    },
    "35528": {
        "productId": 35528,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 609,
        "produceTime": 1198368000,
        "speedCost": 89091000
    },
    "35529": {
        "productId": 35529,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 610,
        "produceTime": 1198368000,
        "speedCost": 98990000
    },
    "35530": {
        "productId": 35530,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 611,
        "produceTime": 1198368000,
        "speedCost": 108889000
    },
    "35531": {
        "productId": 35531,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 612,
        "produceTime": 1229904000,
        "speedCost": 105300000
    },
    "35532": {
        "productId": 35532,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 613,
        "produceTime": 1229904000,
        "speedCost": 117000000
    },
    "35533": {
        "productId": 35533,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 614,
        "produceTime": 1229904000,
        "speedCost": 128700000
    },
    "35534": {
        "productId": 35534,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 615,
        "produceTime": 1261440000,
        "speedCost": 121500000
    },
    "35535": {
        "productId": 35535,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 616,
        "produceTime": 1261440000,
        "speedCost": 135000000
    },
    "35536": {
        "productId": 35536,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 617,
        "produceTime": 1261440000,
        "speedCost": 148500000
    },
    "35537": {
        "productId": 35537,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 618,
        "produceTime": 1292976000,
        "speedCost": 158209000
    },
    "35538": {
        "productId": 35538,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 619,
        "produceTime": 1292976000,
        "speedCost": 175788000
    },
    "35539": {
        "productId": 35539,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 620,
        "produceTime": 1292976000,
        "speedCost": 193367000
    },
    "35540": {
        "productId": 35540,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 621,
        "produceTime": 1324512000,
        "speedCost": 188055000
    },
    "35541": {
        "productId": 35541,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 622,
        "produceTime": 1324512000,
        "speedCost": 208950000
    },
    "35542": {
        "productId": 35542,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 623,
        "produceTime": 1324512000,
        "speedCost": 229845000
    },
    "35543": {
        "productId": 35543,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 624,
        "produceTime": 1356048000,
        "speedCost": 226589000
    },
    "35544": {
        "productId": 35544,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 625,
        "produceTime": 1356048000,
        "speedCost": 251765000
    },
    "35545": {
        "productId": 35545,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 626,
        "produceTime": 1356048000,
        "speedCost": 276942000
    },
    "35546": {
        "productId": 35546,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 627,
        "produceTime": 1387584000,
        "speedCost": 273636000
    },
    "35547": {
        "productId": 35547,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 628,
        "produceTime": 1387584000,
        "speedCost": 304040000
    },
    "35548": {
        "productId": 35548,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 629,
        "produceTime": 1387584000,
        "speedCost": 334444000
    },
    "35549": {
        "productId": 35549,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 630,
        "produceTime": 1419120000,
        "speedCost": 324912000
    },
    "35550": {
        "productId": 35550,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 631,
        "produceTime": 1419120000,
        "speedCost": 361013000
    },
    "35551": {
        "productId": 35551,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 632,
        "produceTime": 1419120000,
        "speedCost": 397114000
    },
    "35552": {
        "productId": 35552,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 633,
        "produceTime": 1450656000,
        "speedCost": 414000000
    },
    "35553": {
        "productId": 35553,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 634,
        "produceTime": 1450656000,
        "speedCost": 460000000
    },
    "35554": {
        "productId": 35554,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 635,
        "produceTime": 1450656000,
        "speedCost": 506000000
    },
    "35555": {
        "productId": 35555,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 636,
        "produceTime": 1482192000,
        "speedCost": 495016000
    },
    "35556": {
        "productId": 35556,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 637,
        "produceTime": 1482192000,
        "speedCost": 550018000
    },
    "35557": {
        "productId": 35557,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 638,
        "produceTime": 1482192000,
        "speedCost": 605020000
    },
    "35558": {
        "productId": 35558,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 639,
        "produceTime": 1513728000,
        "speedCost": 585036000
    },
    "35559": {
        "productId": 35559,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 640,
        "produceTime": 1513728000,
        "speedCost": 650040000
    },
    "35560": {
        "productId": 35560,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 641,
        "produceTime": 1513728000,
        "speedCost": 715044000
    },
    "35561": {
        "productId": 35561,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 642,
        "produceTime": 1545264000,
        "speedCost": 720043000
    },
    "35562": {
        "productId": 35562,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 643,
        "produceTime": 1545264000,
        "speedCost": 800048000
    },
    "35563": {
        "productId": 35563,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 644,
        "produceTime": 1545264000,
        "speedCost": 880053000
    },
    "35564": {
        "productId": 35564,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32021_1"
        ],
        "dropId": 645,
        "produceTime": 1576800000,
        "speedCost": 900000000
    },
    "35565": {
        "productId": 35565,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32022_1"
        ],
        "dropId": 646,
        "produceTime": 1576800000,
        "speedCost": 1000000000
    },
    "35566": {
        "productId": 35566,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32023_1"
        ],
        "dropId": 647,
        "produceTime": 1576800000,
        "speedCost": 1100000000
    },
    "35567": {
        "productId": 35567,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 648,
        "produceTime": 94608000,
        "speedCost": 119000
    },
    "35568": {
        "productId": 35568,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 649,
        "produceTime": 94608000,
        "speedCost": 132000
    },
    "35569": {
        "productId": 35569,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 650,
        "produceTime": 94608000,
        "speedCost": 145000
    },
    "35570": {
        "productId": 35570,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 651,
        "produceTime": 157680000,
        "speedCost": 162000
    },
    "35571": {
        "productId": 35571,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 652,
        "produceTime": 157680000,
        "speedCost": 180000
    },
    "35572": {
        "productId": 35572,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 653,
        "produceTime": 157680000,
        "speedCost": 198000
    },
    "35573": {
        "productId": 35573,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 654,
        "produceTime": 189216000,
        "speedCost": 238000
    },
    "35574": {
        "productId": 35574,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 655,
        "produceTime": 189216000,
        "speedCost": 264000
    },
    "35575": {
        "productId": 35575,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 656,
        "produceTime": 189216000,
        "speedCost": 290000
    },
    "35576": {
        "productId": 35576,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 657,
        "produceTime": 220752000,
        "speedCost": 302000
    },
    "35577": {
        "productId": 35577,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 658,
        "produceTime": 220752000,
        "speedCost": 336000
    },
    "35578": {
        "productId": 35578,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 659,
        "produceTime": 220752000,
        "speedCost": 370000
    },
    "35579": {
        "productId": 35579,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 660,
        "produceTime": 252288000,
        "speedCost": 346000
    },
    "35580": {
        "productId": 35580,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 661,
        "produceTime": 252288000,
        "speedCost": 384000
    },
    "35581": {
        "productId": 35581,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 662,
        "produceTime": 252288000,
        "speedCost": 422000
    },
    "35582": {
        "productId": 35582,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 663,
        "produceTime": 283824000,
        "speedCost": 486000
    },
    "35583": {
        "productId": 35583,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 664,
        "produceTime": 283824000,
        "speedCost": 540000
    },
    "35584": {
        "productId": 35584,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 665,
        "produceTime": 283824000,
        "speedCost": 594000
    },
    "35585": {
        "productId": 35585,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 666,
        "produceTime": 315360000,
        "speedCost": 576000
    },
    "35586": {
        "productId": 35586,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 667,
        "produceTime": 315360000,
        "speedCost": 640000
    },
    "35587": {
        "productId": 35587,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 668,
        "produceTime": 315360000,
        "speedCost": 704000
    },
    "35588": {
        "productId": 35588,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 669,
        "produceTime": 346896000,
        "speedCost": 673000
    },
    "35589": {
        "productId": 35589,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 670,
        "produceTime": 346896000,
        "speedCost": 748000
    },
    "35590": {
        "productId": 35590,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 671,
        "produceTime": 346896000,
        "speedCost": 823000
    },
    "35591": {
        "productId": 35591,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 672,
        "produceTime": 378432000,
        "speedCost": 821000
    },
    "35592": {
        "productId": 35592,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 673,
        "produceTime": 378432000,
        "speedCost": 912000
    },
    "35593": {
        "productId": 35593,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 674,
        "produceTime": 378432000,
        "speedCost": 1003000
    },
    "35594": {
        "productId": 35594,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 675,
        "produceTime": 409968000,
        "speedCost": 1030000
    },
    "35595": {
        "productId": 35595,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 676,
        "produceTime": 409968000,
        "speedCost": 1144000
    },
    "35596": {
        "productId": 35596,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 677,
        "produceTime": 409968000,
        "speedCost": 1258000
    },
    "35597": {
        "productId": 35597,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 678,
        "produceTime": 441504000,
        "speedCost": 1260000
    },
    "35598": {
        "productId": 35598,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 679,
        "produceTime": 441504000,
        "speedCost": 1400000
    },
    "35599": {
        "productId": 35599,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 680,
        "produceTime": 441504000,
        "speedCost": 1540000
    },
    "35600": {
        "productId": 35600,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 681,
        "produceTime": 473040000,
        "speedCost": 1512000
    },
    "35601": {
        "productId": 35601,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 682,
        "produceTime": 473040000,
        "speedCost": 1680000
    },
    "35602": {
        "productId": 35602,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 683,
        "produceTime": 473040000,
        "speedCost": 1848000
    },
    "35603": {
        "productId": 35603,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 684,
        "produceTime": 504576000,
        "speedCost": 1958000
    },
    "35604": {
        "productId": 35604,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 685,
        "produceTime": 504576000,
        "speedCost": 2176000
    },
    "35605": {
        "productId": 35605,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 686,
        "produceTime": 504576000,
        "speedCost": 2394000
    },
    "35606": {
        "productId": 35606,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 687,
        "produceTime": 536112000,
        "speedCost": 2326000
    },
    "35607": {
        "productId": 35607,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 688,
        "produceTime": 536112000,
        "speedCost": 2584000
    },
    "35608": {
        "productId": 35608,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 689,
        "produceTime": 536112000,
        "speedCost": 2842000
    },
    "35609": {
        "productId": 35609,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 690,
        "produceTime": 567648000,
        "speedCost": 2851000
    },
    "35610": {
        "productId": 35610,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 691,
        "produceTime": 567648000,
        "speedCost": 3168000
    },
    "35611": {
        "productId": 35611,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 692,
        "produceTime": 567648000,
        "speedCost": 3485000
    },
    "35612": {
        "productId": 35612,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 693,
        "produceTime": 599184000,
        "speedCost": 3420000
    },
    "35613": {
        "productId": 35613,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 694,
        "produceTime": 599184000,
        "speedCost": 3800000
    },
    "35614": {
        "productId": 35614,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 695,
        "produceTime": 599184000,
        "speedCost": 4180000
    },
    "35615": {
        "productId": 35615,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 696,
        "produceTime": 630720000,
        "speedCost": 4032000
    },
    "35616": {
        "productId": 35616,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 697,
        "produceTime": 630720000,
        "speedCost": 4480000
    },
    "35617": {
        "productId": 35617,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 698,
        "produceTime": 630720000,
        "speedCost": 4928000
    },
    "35618": {
        "productId": 35618,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 699,
        "produceTime": 662256000,
        "speedCost": 5292000
    },
    "35619": {
        "productId": 35619,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 700,
        "produceTime": 662256000,
        "speedCost": 5880000
    },
    "35620": {
        "productId": 35620,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 701,
        "produceTime": 662256000,
        "speedCost": 6468000
    },
    "35621": {
        "productId": 35621,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 702,
        "produceTime": 693792000,
        "speedCost": 6178000
    },
    "35622": {
        "productId": 35622,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 703,
        "produceTime": 693792000,
        "speedCost": 6864000
    },
    "35623": {
        "productId": 35623,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 704,
        "produceTime": 693792000,
        "speedCost": 7550000
    },
    "35624": {
        "productId": 35624,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 705,
        "produceTime": 725328000,
        "speedCost": 7535000
    },
    "35625": {
        "productId": 35625,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 706,
        "produceTime": 725328000,
        "speedCost": 8372000
    },
    "35626": {
        "productId": 35626,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 707,
        "produceTime": 725328000,
        "speedCost": 9209000
    },
    "35627": {
        "productId": 35627,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 708,
        "produceTime": 756864000,
        "speedCost": 8640000
    },
    "35628": {
        "productId": 35628,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 709,
        "produceTime": 756864000,
        "speedCost": 9600000
    },
    "35629": {
        "productId": 35629,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 710,
        "produceTime": 756864000,
        "speedCost": 10560000
    },
    "35630": {
        "productId": 35630,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 711,
        "produceTime": 788400000,
        "speedCost": 10800000
    },
    "35631": {
        "productId": 35631,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 712,
        "produceTime": 788400000,
        "speedCost": 12000000
    },
    "35632": {
        "productId": 35632,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 713,
        "produceTime": 788400000,
        "speedCost": 13200000
    },
    "35633": {
        "productId": 35633,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 714,
        "produceTime": 819936000,
        "speedCost": 13853000
    },
    "35634": {
        "productId": 35634,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 715,
        "produceTime": 819936000,
        "speedCost": 15392000
    },
    "35635": {
        "productId": 35635,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 716,
        "produceTime": 819936000,
        "speedCost": 16931000
    },
    "35636": {
        "productId": 35636,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 717,
        "produceTime": 851472000,
        "speedCost": 16718000
    },
    "35637": {
        "productId": 35637,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 718,
        "produceTime": 851472000,
        "speedCost": 18576000
    },
    "35638": {
        "productId": 35638,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 719,
        "produceTime": 851472000,
        "speedCost": 20434000
    },
    "35639": {
        "productId": 35639,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 720,
        "produceTime": 883008000,
        "speedCost": 19555000
    },
    "35640": {
        "productId": 35640,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 721,
        "produceTime": 883008000,
        "speedCost": 21728000
    },
    "35641": {
        "productId": 35641,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 722,
        "produceTime": 883008000,
        "speedCost": 23901000
    },
    "35642": {
        "productId": 35642,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 723,
        "produceTime": 914544000,
        "speedCost": 23594000
    },
    "35643": {
        "productId": 35643,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 724,
        "produceTime": 914544000,
        "speedCost": 26216000
    },
    "35644": {
        "productId": 35644,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 725,
        "produceTime": 914544000,
        "speedCost": 28838000
    },
    "35645": {
        "productId": 35645,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 726,
        "produceTime": 946080000,
        "speedCost": 28836000
    },
    "35646": {
        "productId": 35646,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 727,
        "produceTime": 946080000,
        "speedCost": 32040000
    },
    "35647": {
        "productId": 35647,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 728,
        "produceTime": 946080000,
        "speedCost": 35244000
    },
    "35648": {
        "productId": 35648,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 729,
        "produceTime": 977616000,
        "speedCost": 36716000
    },
    "35649": {
        "productId": 35649,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 730,
        "produceTime": 977616000,
        "speedCost": 40796000
    },
    "35650": {
        "productId": 35650,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 731,
        "produceTime": 977616000,
        "speedCost": 44876000
    },
    "35651": {
        "productId": 35651,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 732,
        "produceTime": 1009152000,
        "speedCost": 43430000
    },
    "35652": {
        "productId": 35652,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 733,
        "produceTime": 1009152000,
        "speedCost": 48256000
    },
    "35653": {
        "productId": 35653,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 734,
        "produceTime": 1009152000,
        "speedCost": 53082000
    },
    "35654": {
        "productId": 35654,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 735,
        "produceTime": 1040688000,
        "speedCost": 52034000
    },
    "35655": {
        "productId": 35655,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 736,
        "produceTime": 1040688000,
        "speedCost": 57816000
    },
    "35656": {
        "productId": 35656,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 737,
        "produceTime": 1040688000,
        "speedCost": 63598000
    },
    "35657": {
        "productId": 35657,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 738,
        "produceTime": 1072224000,
        "speedCost": 64260000
    },
    "35658": {
        "productId": 35658,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 739,
        "produceTime": 1072224000,
        "speedCost": 71400000
    },
    "35659": {
        "productId": 35659,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 740,
        "produceTime": 1072224000,
        "speedCost": 78540000
    },
    "35660": {
        "productId": 35660,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 741,
        "produceTime": 1103760000,
        "speedCost": 76482000
    },
    "35661": {
        "productId": 35661,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 742,
        "produceTime": 1103760000,
        "speedCost": 84980000
    },
    "35662": {
        "productId": 35662,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 743,
        "produceTime": 1103760000,
        "speedCost": 93478000
    },
    "35663": {
        "productId": 35663,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 744,
        "produceTime": 1135296000,
        "speedCost": 95904000
    },
    "35664": {
        "productId": 35664,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 745,
        "produceTime": 1135296000,
        "speedCost": 106560000
    },
    "35665": {
        "productId": 35665,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 746,
        "produceTime": 1135296000,
        "speedCost": 117216000
    },
    "35666": {
        "productId": 35666,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 747,
        "produceTime": 1166832000,
        "speedCost": 116683000
    },
    "35667": {
        "productId": 35667,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 748,
        "produceTime": 1166832000,
        "speedCost": 129648000
    },
    "35668": {
        "productId": 35668,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 749,
        "produceTime": 1166832000,
        "speedCost": 142613000
    },
    "35669": {
        "productId": 35669,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 750,
        "produceTime": 1198368000,
        "speedCost": 142546000
    },
    "35670": {
        "productId": 35670,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 751,
        "produceTime": 1198368000,
        "speedCost": 158384000
    },
    "35671": {
        "productId": 35671,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 752,
        "produceTime": 1198368000,
        "speedCost": 174222000
    },
    "35672": {
        "productId": 35672,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 753,
        "produceTime": 1229904000,
        "speedCost": 168480000
    },
    "35673": {
        "productId": 35673,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 754,
        "produceTime": 1229904000,
        "speedCost": 187200000
    },
    "35674": {
        "productId": 35674,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 755,
        "produceTime": 1229904000,
        "speedCost": 205920000
    },
    "35675": {
        "productId": 35675,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 756,
        "produceTime": 1261440000,
        "speedCost": 194400000
    },
    "35676": {
        "productId": 35676,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 757,
        "produceTime": 1261440000,
        "speedCost": 216000000
    },
    "35677": {
        "productId": 35677,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 758,
        "produceTime": 1261440000,
        "speedCost": 237600000
    },
    "35678": {
        "productId": 35678,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 759,
        "produceTime": 1292976000,
        "speedCost": 253134000
    },
    "35679": {
        "productId": 35679,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 760,
        "produceTime": 1292976000,
        "speedCost": 281260000
    },
    "35680": {
        "productId": 35680,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 761,
        "produceTime": 1292976000,
        "speedCost": 309386000
    },
    "35681": {
        "productId": 35681,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 762,
        "produceTime": 1324512000,
        "speedCost": 300888000
    },
    "35682": {
        "productId": 35682,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 763,
        "produceTime": 1324512000,
        "speedCost": 334320000
    },
    "35683": {
        "productId": 35683,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 764,
        "produceTime": 1324512000,
        "speedCost": 367752000
    },
    "35684": {
        "productId": 35684,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 765,
        "produceTime": 1356048000,
        "speedCost": 362542000
    },
    "35685": {
        "productId": 35685,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 766,
        "produceTime": 1356048000,
        "speedCost": 402824000
    },
    "35686": {
        "productId": 35686,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 767,
        "produceTime": 1356048000,
        "speedCost": 443106000
    },
    "35687": {
        "productId": 35687,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 768,
        "produceTime": 1387584000,
        "speedCost": 437818000
    },
    "35688": {
        "productId": 35688,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 769,
        "produceTime": 1387584000,
        "speedCost": 486464000
    },
    "35689": {
        "productId": 35689,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 770,
        "produceTime": 1387584000,
        "speedCost": 535110000
    },
    "35690": {
        "productId": 35690,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 771,
        "produceTime": 1419120000,
        "speedCost": 519858000
    },
    "35691": {
        "productId": 35691,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 772,
        "produceTime": 1419120000,
        "speedCost": 577620000
    },
    "35692": {
        "productId": 35692,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 773,
        "produceTime": 1419120000,
        "speedCost": 635382000
    },
    "35693": {
        "productId": 35693,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 774,
        "produceTime": 1450656000,
        "speedCost": 662400000
    },
    "35694": {
        "productId": 35694,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 775,
        "produceTime": 1450656000,
        "speedCost": 736000000
    },
    "35695": {
        "productId": 35695,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 776,
        "produceTime": 1450656000,
        "speedCost": 809600000
    },
    "35696": {
        "productId": 35696,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 777,
        "produceTime": 1482192000,
        "speedCost": 792025000
    },
    "35697": {
        "productId": 35697,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 778,
        "produceTime": 1482192000,
        "speedCost": 880028000
    },
    "35698": {
        "productId": 35698,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 779,
        "produceTime": 1482192000,
        "speedCost": 968031000
    },
    "35699": {
        "productId": 35699,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 780,
        "produceTime": 1513728000,
        "speedCost": 936058000
    },
    "35700": {
        "productId": 35700,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 781,
        "produceTime": 1513728000,
        "speedCost": 1040064000
    },
    "35701": {
        "productId": 35701,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 782,
        "produceTime": 1513728000,
        "speedCost": 1144070000
    },
    "35702": {
        "productId": 35702,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 783,
        "produceTime": 1545264000,
        "speedCost": 1152068000
    },
    "35703": {
        "productId": 35703,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 784,
        "produceTime": 1545264000,
        "speedCost": 1280076000
    },
    "35704": {
        "productId": 35704,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 785,
        "produceTime": 1545264000,
        "speedCost": 1408084000
    },
    "35705": {
        "productId": 35705,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32027_1"
        ],
        "dropId": 786,
        "produceTime": 1576800000,
        "speedCost": 1440000000
    },
    "35706": {
        "productId": 35706,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32028_1"
        ],
        "dropId": 787,
        "produceTime": 1576800000,
        "speedCost": 1600000000
    },
    "35707": {
        "productId": 35707,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32029_1"
        ],
        "dropId": 788,
        "produceTime": 1576800000,
        "speedCost": 1760000000
    },
    "35708": {
        "productId": 35708,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 789,
        "produceTime": 94608000,
        "speedCost": 59000
    },
    "35709": {
        "productId": 35709,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 790,
        "produceTime": 94608000,
        "speedCost": 66000
    },
    "35710": {
        "productId": 35710,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 791,
        "produceTime": 94608000,
        "speedCost": 73000
    },
    "35711": {
        "productId": 35711,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 792,
        "produceTime": 157680000,
        "speedCost": 81000
    },
    "35712": {
        "productId": 35712,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 793,
        "produceTime": 157680000,
        "speedCost": 90000
    },
    "35713": {
        "productId": 35713,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 794,
        "produceTime": 157680000,
        "speedCost": 99000
    },
    "35714": {
        "productId": 35714,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 795,
        "produceTime": 189216000,
        "speedCost": 119000
    },
    "35715": {
        "productId": 35715,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 796,
        "produceTime": 189216000,
        "speedCost": 132000
    },
    "35716": {
        "productId": 35716,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 797,
        "produceTime": 189216000,
        "speedCost": 145000
    },
    "35717": {
        "productId": 35717,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 798,
        "produceTime": 220752000,
        "speedCost": 151000
    },
    "35718": {
        "productId": 35718,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 799,
        "produceTime": 220752000,
        "speedCost": 168000
    },
    "35719": {
        "productId": 35719,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 800,
        "produceTime": 220752000,
        "speedCost": 185000
    },
    "35720": {
        "productId": 35720,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 801,
        "produceTime": 252288000,
        "speedCost": 173000
    },
    "35721": {
        "productId": 35721,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 802,
        "produceTime": 252288000,
        "speedCost": 192000
    },
    "35722": {
        "productId": 35722,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 803,
        "produceTime": 252288000,
        "speedCost": 211000
    },
    "35723": {
        "productId": 35723,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 804,
        "produceTime": 283824000,
        "speedCost": 243000
    },
    "35724": {
        "productId": 35724,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 805,
        "produceTime": 283824000,
        "speedCost": 270000
    },
    "35725": {
        "productId": 35725,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 806,
        "produceTime": 283824000,
        "speedCost": 297000
    },
    "35726": {
        "productId": 35726,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 807,
        "produceTime": 315360000,
        "speedCost": 288000
    },
    "35727": {
        "productId": 35727,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 808,
        "produceTime": 315360000,
        "speedCost": 320000
    },
    "35728": {
        "productId": 35728,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 809,
        "produceTime": 315360000,
        "speedCost": 352000
    },
    "35729": {
        "productId": 35729,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 810,
        "produceTime": 346896000,
        "speedCost": 337000
    },
    "35730": {
        "productId": 35730,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 811,
        "produceTime": 346896000,
        "speedCost": 374000
    },
    "35731": {
        "productId": 35731,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 812,
        "produceTime": 346896000,
        "speedCost": 411000
    },
    "35732": {
        "productId": 35732,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 813,
        "produceTime": 378432000,
        "speedCost": 410000
    },
    "35733": {
        "productId": 35733,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 814,
        "produceTime": 378432000,
        "speedCost": 456000
    },
    "35734": {
        "productId": 35734,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 815,
        "produceTime": 378432000,
        "speedCost": 502000
    },
    "35735": {
        "productId": 35735,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 816,
        "produceTime": 409968000,
        "speedCost": 515000
    },
    "35736": {
        "productId": 35736,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 817,
        "produceTime": 409968000,
        "speedCost": 572000
    },
    "35737": {
        "productId": 35737,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 818,
        "produceTime": 409968000,
        "speedCost": 629000
    },
    "35738": {
        "productId": 35738,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 819,
        "produceTime": 441504000,
        "speedCost": 630000
    },
    "35739": {
        "productId": 35739,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 820,
        "produceTime": 441504000,
        "speedCost": 700000
    },
    "35740": {
        "productId": 35740,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 821,
        "produceTime": 441504000,
        "speedCost": 770000
    },
    "35741": {
        "productId": 35741,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 822,
        "produceTime": 473040000,
        "speedCost": 756000
    },
    "35742": {
        "productId": 35742,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 823,
        "produceTime": 473040000,
        "speedCost": 840000
    },
    "35743": {
        "productId": 35743,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 824,
        "produceTime": 473040000,
        "speedCost": 924000
    },
    "35744": {
        "productId": 35744,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 825,
        "produceTime": 504576000,
        "speedCost": 979000
    },
    "35745": {
        "productId": 35745,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 826,
        "produceTime": 504576000,
        "speedCost": 1088000
    },
    "35746": {
        "productId": 35746,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 827,
        "produceTime": 504576000,
        "speedCost": 1197000
    },
    "35747": {
        "productId": 35747,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 828,
        "produceTime": 536112000,
        "speedCost": 1163000
    },
    "35748": {
        "productId": 35748,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 829,
        "produceTime": 536112000,
        "speedCost": 1292000
    },
    "35749": {
        "productId": 35749,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 830,
        "produceTime": 536112000,
        "speedCost": 1421000
    },
    "35750": {
        "productId": 35750,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 831,
        "produceTime": 567648000,
        "speedCost": 1426000
    },
    "35751": {
        "productId": 35751,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 832,
        "produceTime": 567648000,
        "speedCost": 1584000
    },
    "35752": {
        "productId": 35752,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 833,
        "produceTime": 567648000,
        "speedCost": 1742000
    },
    "35753": {
        "productId": 35753,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 834,
        "produceTime": 599184000,
        "speedCost": 1710000
    },
    "35754": {
        "productId": 35754,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 835,
        "produceTime": 599184000,
        "speedCost": 1900000
    },
    "35755": {
        "productId": 35755,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 836,
        "produceTime": 599184000,
        "speedCost": 2090000
    },
    "35756": {
        "productId": 35756,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 837,
        "produceTime": 630720000,
        "speedCost": 2016000
    },
    "35757": {
        "productId": 35757,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 838,
        "produceTime": 630720000,
        "speedCost": 2240000
    },
    "35758": {
        "productId": 35758,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 839,
        "produceTime": 630720000,
        "speedCost": 2464000
    },
    "35759": {
        "productId": 35759,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 840,
        "produceTime": 662256000,
        "speedCost": 2646000
    },
    "35760": {
        "productId": 35760,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 841,
        "produceTime": 662256000,
        "speedCost": 2940000
    },
    "35761": {
        "productId": 35761,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 842,
        "produceTime": 662256000,
        "speedCost": 3234000
    },
    "35762": {
        "productId": 35762,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 843,
        "produceTime": 693792000,
        "speedCost": 3089000
    },
    "35763": {
        "productId": 35763,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 844,
        "produceTime": 693792000,
        "speedCost": 3432000
    },
    "35764": {
        "productId": 35764,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 845,
        "produceTime": 693792000,
        "speedCost": 3775000
    },
    "35765": {
        "productId": 35765,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 846,
        "produceTime": 725328000,
        "speedCost": 3767000
    },
    "35766": {
        "productId": 35766,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 847,
        "produceTime": 725328000,
        "speedCost": 4186000
    },
    "35767": {
        "productId": 35767,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 848,
        "produceTime": 725328000,
        "speedCost": 4605000
    },
    "35768": {
        "productId": 35768,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 849,
        "produceTime": 756864000,
        "speedCost": 4320000
    },
    "35769": {
        "productId": 35769,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 850,
        "produceTime": 756864000,
        "speedCost": 4800000
    },
    "35770": {
        "productId": 35770,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 851,
        "produceTime": 756864000,
        "speedCost": 5280000
    },
    "35771": {
        "productId": 35771,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 852,
        "produceTime": 788400000,
        "speedCost": 5400000
    },
    "35772": {
        "productId": 35772,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 853,
        "produceTime": 788400000,
        "speedCost": 6000000
    },
    "35773": {
        "productId": 35773,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 854,
        "produceTime": 788400000,
        "speedCost": 6600000
    },
    "35774": {
        "productId": 35774,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 855,
        "produceTime": 819936000,
        "speedCost": 6926000
    },
    "35775": {
        "productId": 35775,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 856,
        "produceTime": 819936000,
        "speedCost": 7696000
    },
    "35776": {
        "productId": 35776,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 857,
        "produceTime": 819936000,
        "speedCost": 8466000
    },
    "35777": {
        "productId": 35777,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 858,
        "produceTime": 851472000,
        "speedCost": 8359000
    },
    "35778": {
        "productId": 35778,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 859,
        "produceTime": 851472000,
        "speedCost": 9288000
    },
    "35779": {
        "productId": 35779,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 860,
        "produceTime": 851472000,
        "speedCost": 10217000
    },
    "35780": {
        "productId": 35780,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 861,
        "produceTime": 883008000,
        "speedCost": 9778000
    },
    "35781": {
        "productId": 35781,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 862,
        "produceTime": 883008000,
        "speedCost": 10864000
    },
    "35782": {
        "productId": 35782,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 863,
        "produceTime": 883008000,
        "speedCost": 11950000
    },
    "35783": {
        "productId": 35783,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 864,
        "produceTime": 914544000,
        "speedCost": 11797000
    },
    "35784": {
        "productId": 35784,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 865,
        "produceTime": 914544000,
        "speedCost": 13108000
    },
    "35785": {
        "productId": 35785,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 866,
        "produceTime": 914544000,
        "speedCost": 14419000
    },
    "35786": {
        "productId": 35786,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 867,
        "produceTime": 946080000,
        "speedCost": 14418000
    },
    "35787": {
        "productId": 35787,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 868,
        "produceTime": 946080000,
        "speedCost": 16020000
    },
    "35788": {
        "productId": 35788,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 869,
        "produceTime": 946080000,
        "speedCost": 17622000
    },
    "35789": {
        "productId": 35789,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 870,
        "produceTime": 977616000,
        "speedCost": 18358000
    },
    "35790": {
        "productId": 35790,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 871,
        "produceTime": 977616000,
        "speedCost": 20398000
    },
    "35791": {
        "productId": 35791,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 872,
        "produceTime": 977616000,
        "speedCost": 22438000
    },
    "35792": {
        "productId": 35792,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 873,
        "produceTime": 1009152000,
        "speedCost": 21715000
    },
    "35793": {
        "productId": 35793,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 874,
        "produceTime": 1009152000,
        "speedCost": 24128000
    },
    "35794": {
        "productId": 35794,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 875,
        "produceTime": 1009152000,
        "speedCost": 26541000
    },
    "35795": {
        "productId": 35795,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 876,
        "produceTime": 1040688000,
        "speedCost": 26017000
    },
    "35796": {
        "productId": 35796,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 877,
        "produceTime": 1040688000,
        "speedCost": 28908000
    },
    "35797": {
        "productId": 35797,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 878,
        "produceTime": 1040688000,
        "speedCost": 31799000
    },
    "35798": {
        "productId": 35798,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 879,
        "produceTime": 1072224000,
        "speedCost": 32130000
    },
    "35799": {
        "productId": 35799,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 880,
        "produceTime": 1072224000,
        "speedCost": 35700000
    },
    "35800": {
        "productId": 35800,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 881,
        "produceTime": 1072224000,
        "speedCost": 39270000
    },
    "35801": {
        "productId": 35801,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 882,
        "produceTime": 1103760000,
        "speedCost": 38241000
    },
    "35802": {
        "productId": 35802,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 883,
        "produceTime": 1103760000,
        "speedCost": 42490000
    },
    "35803": {
        "productId": 35803,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 884,
        "produceTime": 1103760000,
        "speedCost": 46739000
    },
    "35804": {
        "productId": 35804,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 885,
        "produceTime": 1135296000,
        "speedCost": 47952000
    },
    "35805": {
        "productId": 35805,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 886,
        "produceTime": 1135296000,
        "speedCost": 53280000
    },
    "35806": {
        "productId": 35806,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 887,
        "produceTime": 1135296000,
        "speedCost": 58608000
    },
    "35807": {
        "productId": 35807,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 888,
        "produceTime": 1166832000,
        "speedCost": 58342000
    },
    "35808": {
        "productId": 35808,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 889,
        "produceTime": 1166832000,
        "speedCost": 64824000
    },
    "35809": {
        "productId": 35809,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 890,
        "produceTime": 1166832000,
        "speedCost": 71306000
    },
    "35810": {
        "productId": 35810,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 891,
        "produceTime": 1198368000,
        "speedCost": 71273000
    },
    "35811": {
        "productId": 35811,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 892,
        "produceTime": 1198368000,
        "speedCost": 79192000
    },
    "35812": {
        "productId": 35812,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 893,
        "produceTime": 1198368000,
        "speedCost": 87111000
    },
    "35813": {
        "productId": 35813,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 894,
        "produceTime": 1229904000,
        "speedCost": 84240000
    },
    "35814": {
        "productId": 35814,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 895,
        "produceTime": 1229904000,
        "speedCost": 93600000
    },
    "35815": {
        "productId": 35815,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 896,
        "produceTime": 1229904000,
        "speedCost": 102960000
    },
    "35816": {
        "productId": 35816,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 897,
        "produceTime": 1261440000,
        "speedCost": 97200000
    },
    "35817": {
        "productId": 35817,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 898,
        "produceTime": 1261440000,
        "speedCost": 108000000
    },
    "35818": {
        "productId": 35818,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 899,
        "produceTime": 1261440000,
        "speedCost": 118800000
    },
    "35819": {
        "productId": 35819,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 900,
        "produceTime": 1292976000,
        "speedCost": 126567000
    },
    "35820": {
        "productId": 35820,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 901,
        "produceTime": 1292976000,
        "speedCost": 140630000
    },
    "35821": {
        "productId": 35821,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 902,
        "produceTime": 1292976000,
        "speedCost": 154693000
    },
    "35822": {
        "productId": 35822,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 903,
        "produceTime": 1324512000,
        "speedCost": 150444000
    },
    "35823": {
        "productId": 35823,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 904,
        "produceTime": 1324512000,
        "speedCost": 167160000
    },
    "35824": {
        "productId": 35824,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 905,
        "produceTime": 1324512000,
        "speedCost": 183876000
    },
    "35825": {
        "productId": 35825,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 906,
        "produceTime": 1356048000,
        "speedCost": 181271000
    },
    "35826": {
        "productId": 35826,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 907,
        "produceTime": 1356048000,
        "speedCost": 201412000
    },
    "35827": {
        "productId": 35827,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 908,
        "produceTime": 1356048000,
        "speedCost": 221553000
    },
    "35828": {
        "productId": 35828,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 909,
        "produceTime": 1387584000,
        "speedCost": 218909000
    },
    "35829": {
        "productId": 35829,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 910,
        "produceTime": 1387584000,
        "speedCost": 243232000
    },
    "35830": {
        "productId": 35830,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 911,
        "produceTime": 1387584000,
        "speedCost": 267555000
    },
    "35831": {
        "productId": 35831,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 912,
        "produceTime": 1419120000,
        "speedCost": 259929000
    },
    "35832": {
        "productId": 35832,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 913,
        "produceTime": 1419120000,
        "speedCost": 288810000
    },
    "35833": {
        "productId": 35833,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 914,
        "produceTime": 1419120000,
        "speedCost": 317691000
    },
    "35834": {
        "productId": 35834,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 915,
        "produceTime": 1450656000,
        "speedCost": 331200000
    },
    "35835": {
        "productId": 35835,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 916,
        "produceTime": 1450656000,
        "speedCost": 368000000
    },
    "35836": {
        "productId": 35836,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 917,
        "produceTime": 1450656000,
        "speedCost": 404800000
    },
    "35837": {
        "productId": 35837,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 918,
        "produceTime": 1482192000,
        "speedCost": 396013000
    },
    "35838": {
        "productId": 35838,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 919,
        "produceTime": 1482192000,
        "speedCost": 440014000
    },
    "35839": {
        "productId": 35839,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 920,
        "produceTime": 1482192000,
        "speedCost": 484015000
    },
    "35840": {
        "productId": 35840,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 921,
        "produceTime": 1513728000,
        "speedCost": 468029000
    },
    "35841": {
        "productId": 35841,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 922,
        "produceTime": 1513728000,
        "speedCost": 520032000
    },
    "35842": {
        "productId": 35842,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 923,
        "produceTime": 1513728000,
        "speedCost": 572035000
    },
    "35843": {
        "productId": 35843,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 924,
        "produceTime": 1545264000,
        "speedCost": 576034000
    },
    "35844": {
        "productId": 35844,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 925,
        "produceTime": 1545264000,
        "speedCost": 640038000
    },
    "35845": {
        "productId": 35845,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 926,
        "produceTime": 1545264000,
        "speedCost": 704042000
    },
    "35846": {
        "productId": 35846,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32033_1"
        ],
        "dropId": 927,
        "produceTime": 1576800000,
        "speedCost": 720000000
    },
    "35847": {
        "productId": 35847,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32034_1"
        ],
        "dropId": 928,
        "produceTime": 1576800000,
        "speedCost": 800000000
    },
    "35848": {
        "productId": 35848,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32035_1"
        ],
        "dropId": 929,
        "produceTime": 1576800000,
        "speedCost": 880000000
    },
    "35849": {
        "productId": 35849,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 930,
        "produceTime": 94608000,
        "speedCost": 89000
    },
    "35850": {
        "productId": 35850,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 931,
        "produceTime": 94608000,
        "speedCost": 99000
    },
    "35851": {
        "productId": 35851,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 932,
        "produceTime": 94608000,
        "speedCost": 109000
    },
    "35852": {
        "productId": 35852,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 933,
        "produceTime": 157680000,
        "speedCost": 122000
    },
    "35853": {
        "productId": 35853,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 934,
        "produceTime": 157680000,
        "speedCost": 135000
    },
    "35854": {
        "productId": 35854,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 935,
        "produceTime": 157680000,
        "speedCost": 149000
    },
    "35855": {
        "productId": 35855,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 936,
        "produceTime": 189216000,
        "speedCost": 178000
    },
    "35856": {
        "productId": 35856,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 937,
        "produceTime": 189216000,
        "speedCost": 198000
    },
    "35857": {
        "productId": 35857,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 938,
        "produceTime": 189216000,
        "speedCost": 218000
    },
    "35858": {
        "productId": 35858,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 939,
        "produceTime": 220752000,
        "speedCost": 227000
    },
    "35859": {
        "productId": 35859,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 940,
        "produceTime": 220752000,
        "speedCost": 252000
    },
    "35860": {
        "productId": 35860,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 941,
        "produceTime": 220752000,
        "speedCost": 277000
    },
    "35861": {
        "productId": 35861,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 942,
        "produceTime": 252288000,
        "speedCost": 259000
    },
    "35862": {
        "productId": 35862,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 943,
        "produceTime": 252288000,
        "speedCost": 288000
    },
    "35863": {
        "productId": 35863,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 944,
        "produceTime": 252288000,
        "speedCost": 317000
    },
    "35864": {
        "productId": 35864,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 945,
        "produceTime": 283824000,
        "speedCost": 365000
    },
    "35865": {
        "productId": 35865,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 946,
        "produceTime": 283824000,
        "speedCost": 405000
    },
    "35866": {
        "productId": 35866,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 947,
        "produceTime": 283824000,
        "speedCost": 446000
    },
    "35867": {
        "productId": 35867,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 948,
        "produceTime": 315360000,
        "speedCost": 432000
    },
    "35868": {
        "productId": 35868,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 949,
        "produceTime": 315360000,
        "speedCost": 480000
    },
    "35869": {
        "productId": 35869,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 950,
        "produceTime": 315360000,
        "speedCost": 528000
    },
    "35870": {
        "productId": 35870,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 951,
        "produceTime": 346896000,
        "speedCost": 505000
    },
    "35871": {
        "productId": 35871,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 952,
        "produceTime": 346896000,
        "speedCost": 561000
    },
    "35872": {
        "productId": 35872,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 953,
        "produceTime": 346896000,
        "speedCost": 617000
    },
    "35873": {
        "productId": 35873,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 954,
        "produceTime": 378432000,
        "speedCost": 616000
    },
    "35874": {
        "productId": 35874,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 955,
        "produceTime": 378432000,
        "speedCost": 684000
    },
    "35875": {
        "productId": 35875,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 956,
        "produceTime": 378432000,
        "speedCost": 752000
    },
    "35876": {
        "productId": 35876,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 957,
        "produceTime": 409968000,
        "speedCost": 772000
    },
    "35877": {
        "productId": 35877,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 958,
        "produceTime": 409968000,
        "speedCost": 858000
    },
    "35878": {
        "productId": 35878,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 959,
        "produceTime": 409968000,
        "speedCost": 944000
    },
    "35879": {
        "productId": 35879,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 960,
        "produceTime": 441504000,
        "speedCost": 945000
    },
    "35880": {
        "productId": 35880,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 961,
        "produceTime": 441504000,
        "speedCost": 1050000
    },
    "35881": {
        "productId": 35881,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 962,
        "produceTime": 441504000,
        "speedCost": 1155000
    },
    "35882": {
        "productId": 35882,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 963,
        "produceTime": 473040000,
        "speedCost": 1134000
    },
    "35883": {
        "productId": 35883,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 964,
        "produceTime": 473040000,
        "speedCost": 1260000
    },
    "35884": {
        "productId": 35884,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 965,
        "produceTime": 473040000,
        "speedCost": 1386000
    },
    "35885": {
        "productId": 35885,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 966,
        "produceTime": 504576000,
        "speedCost": 1469000
    },
    "35886": {
        "productId": 35886,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 967,
        "produceTime": 504576000,
        "speedCost": 1632000
    },
    "35887": {
        "productId": 35887,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 968,
        "produceTime": 504576000,
        "speedCost": 1795000
    },
    "35888": {
        "productId": 35888,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 969,
        "produceTime": 536112000,
        "speedCost": 1744000
    },
    "35889": {
        "productId": 35889,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 970,
        "produceTime": 536112000,
        "speedCost": 1938000
    },
    "35890": {
        "productId": 35890,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 971,
        "produceTime": 536112000,
        "speedCost": 2132000
    },
    "35891": {
        "productId": 35891,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 972,
        "produceTime": 567648000,
        "speedCost": 2138000
    },
    "35892": {
        "productId": 35892,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 973,
        "produceTime": 567648000,
        "speedCost": 2376000
    },
    "35893": {
        "productId": 35893,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 974,
        "produceTime": 567648000,
        "speedCost": 2614000
    },
    "35894": {
        "productId": 35894,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 975,
        "produceTime": 599184000,
        "speedCost": 2565000
    },
    "35895": {
        "productId": 35895,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 976,
        "produceTime": 599184000,
        "speedCost": 2850000
    },
    "35896": {
        "productId": 35896,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 977,
        "produceTime": 599184000,
        "speedCost": 3135000
    },
    "35897": {
        "productId": 35897,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 978,
        "produceTime": 630720000,
        "speedCost": 3024000
    },
    "35898": {
        "productId": 35898,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 979,
        "produceTime": 630720000,
        "speedCost": 3360000
    },
    "35899": {
        "productId": 35899,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 980,
        "produceTime": 630720000,
        "speedCost": 3696000
    },
    "35900": {
        "productId": 35900,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 981,
        "produceTime": 662256000,
        "speedCost": 3969000
    },
    "35901": {
        "productId": 35901,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 982,
        "produceTime": 662256000,
        "speedCost": 4410000
    },
    "35902": {
        "productId": 35902,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 983,
        "produceTime": 662256000,
        "speedCost": 4851000
    },
    "35903": {
        "productId": 35903,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 984,
        "produceTime": 693792000,
        "speedCost": 4633000
    },
    "35904": {
        "productId": 35904,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 985,
        "produceTime": 693792000,
        "speedCost": 5148000
    },
    "35905": {
        "productId": 35905,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 986,
        "produceTime": 693792000,
        "speedCost": 5663000
    },
    "35906": {
        "productId": 35906,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 987,
        "produceTime": 725328000,
        "speedCost": 5651000
    },
    "35907": {
        "productId": 35907,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 988,
        "produceTime": 725328000,
        "speedCost": 6279000
    },
    "35908": {
        "productId": 35908,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 989,
        "produceTime": 725328000,
        "speedCost": 6907000
    },
    "35909": {
        "productId": 35909,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 990,
        "produceTime": 756864000,
        "speedCost": 6480000
    },
    "35910": {
        "productId": 35910,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 991,
        "produceTime": 756864000,
        "speedCost": 7200000
    },
    "35911": {
        "productId": 35911,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 992,
        "produceTime": 756864000,
        "speedCost": 7920000
    },
    "35912": {
        "productId": 35912,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 993,
        "produceTime": 788400000,
        "speedCost": 8100000
    },
    "35913": {
        "productId": 35913,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 994,
        "produceTime": 788400000,
        "speedCost": 9000000
    },
    "35914": {
        "productId": 35914,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 995,
        "produceTime": 788400000,
        "speedCost": 9900000
    },
    "35915": {
        "productId": 35915,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 996,
        "produceTime": 819936000,
        "speedCost": 10390000
    },
    "35916": {
        "productId": 35916,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 997,
        "produceTime": 819936000,
        "speedCost": 11544000
    },
    "35917": {
        "productId": 35917,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 998,
        "produceTime": 819936000,
        "speedCost": 12698000
    },
    "35918": {
        "productId": 35918,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 999,
        "produceTime": 851472000,
        "speedCost": 12539000
    },
    "35919": {
        "productId": 35919,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1000,
        "produceTime": 851472000,
        "speedCost": 13932000
    },
    "35920": {
        "productId": 35920,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1001,
        "produceTime": 851472000,
        "speedCost": 15325000
    },
    "35921": {
        "productId": 35921,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1002,
        "produceTime": 883008000,
        "speedCost": 14666000
    },
    "35922": {
        "productId": 35922,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1003,
        "produceTime": 883008000,
        "speedCost": 16296000
    },
    "35923": {
        "productId": 35923,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1004,
        "produceTime": 883008000,
        "speedCost": 17926000
    },
    "35924": {
        "productId": 35924,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1005,
        "produceTime": 914544000,
        "speedCost": 17696000
    },
    "35925": {
        "productId": 35925,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1006,
        "produceTime": 914544000,
        "speedCost": 19662000
    },
    "35926": {
        "productId": 35926,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1007,
        "produceTime": 914544000,
        "speedCost": 21628000
    },
    "35927": {
        "productId": 35927,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1008,
        "produceTime": 946080000,
        "speedCost": 21627000
    },
    "35928": {
        "productId": 35928,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1009,
        "produceTime": 946080000,
        "speedCost": 24030000
    },
    "35929": {
        "productId": 35929,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1010,
        "produceTime": 946080000,
        "speedCost": 26433000
    },
    "35930": {
        "productId": 35930,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1011,
        "produceTime": 977616000,
        "speedCost": 27537000
    },
    "35931": {
        "productId": 35931,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1012,
        "produceTime": 977616000,
        "speedCost": 30597000
    },
    "35932": {
        "productId": 35932,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1013,
        "produceTime": 977616000,
        "speedCost": 33657000
    },
    "35933": {
        "productId": 35933,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1014,
        "produceTime": 1009152000,
        "speedCost": 32573000
    },
    "35934": {
        "productId": 35934,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1015,
        "produceTime": 1009152000,
        "speedCost": 36192000
    },
    "35935": {
        "productId": 35935,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1016,
        "produceTime": 1009152000,
        "speedCost": 39811000
    },
    "35936": {
        "productId": 35936,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1017,
        "produceTime": 1040688000,
        "speedCost": 39026000
    },
    "35937": {
        "productId": 35937,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1018,
        "produceTime": 1040688000,
        "speedCost": 43362000
    },
    "35938": {
        "productId": 35938,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1019,
        "produceTime": 1040688000,
        "speedCost": 47698000
    },
    "35939": {
        "productId": 35939,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1020,
        "produceTime": 1072224000,
        "speedCost": 48195000
    },
    "35940": {
        "productId": 35940,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1021,
        "produceTime": 1072224000,
        "speedCost": 53550000
    },
    "35941": {
        "productId": 35941,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1022,
        "produceTime": 1072224000,
        "speedCost": 58905000
    },
    "35942": {
        "productId": 35942,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1023,
        "produceTime": 1103760000,
        "speedCost": 57362000
    },
    "35943": {
        "productId": 35943,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1024,
        "produceTime": 1103760000,
        "speedCost": 63735000
    },
    "35944": {
        "productId": 35944,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1025,
        "produceTime": 1103760000,
        "speedCost": 70109000
    },
    "35945": {
        "productId": 35945,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1026,
        "produceTime": 1135296000,
        "speedCost": 71928000
    },
    "35946": {
        "productId": 35946,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1027,
        "produceTime": 1135296000,
        "speedCost": 79920000
    },
    "35947": {
        "productId": 35947,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1028,
        "produceTime": 1135296000,
        "speedCost": 87912000
    },
    "35948": {
        "productId": 35948,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1029,
        "produceTime": 1166832000,
        "speedCost": 87512000
    },
    "35949": {
        "productId": 35949,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1030,
        "produceTime": 1166832000,
        "speedCost": 97236000
    },
    "35950": {
        "productId": 35950,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1031,
        "produceTime": 1166832000,
        "speedCost": 106960000
    },
    "35951": {
        "productId": 35951,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1032,
        "produceTime": 1198368000,
        "speedCost": 106909000
    },
    "35952": {
        "productId": 35952,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1033,
        "produceTime": 1198368000,
        "speedCost": 118788000
    },
    "35953": {
        "productId": 35953,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1034,
        "produceTime": 1198368000,
        "speedCost": 130667000
    },
    "35954": {
        "productId": 35954,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1035,
        "produceTime": 1229904000,
        "speedCost": 126360000
    },
    "35955": {
        "productId": 35955,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1036,
        "produceTime": 1229904000,
        "speedCost": 140400000
    },
    "35956": {
        "productId": 35956,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1037,
        "produceTime": 1229904000,
        "speedCost": 154440000
    },
    "35957": {
        "productId": 35957,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1038,
        "produceTime": 1261440000,
        "speedCost": 145800000
    },
    "35958": {
        "productId": 35958,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1039,
        "produceTime": 1261440000,
        "speedCost": 162000000
    },
    "35959": {
        "productId": 35959,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1040,
        "produceTime": 1261440000,
        "speedCost": 178200000
    },
    "35960": {
        "productId": 35960,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1041,
        "produceTime": 1292976000,
        "speedCost": 189851000
    },
    "35961": {
        "productId": 35961,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1042,
        "produceTime": 1292976000,
        "speedCost": 210945000
    },
    "35962": {
        "productId": 35962,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1043,
        "produceTime": 1292976000,
        "speedCost": 232040000
    },
    "35963": {
        "productId": 35963,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1044,
        "produceTime": 1324512000,
        "speedCost": 225666000
    },
    "35964": {
        "productId": 35964,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1045,
        "produceTime": 1324512000,
        "speedCost": 250740000
    },
    "35965": {
        "productId": 35965,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1046,
        "produceTime": 1324512000,
        "speedCost": 275814000
    },
    "35966": {
        "productId": 35966,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1047,
        "produceTime": 1356048000,
        "speedCost": 271906000
    },
    "35967": {
        "productId": 35967,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1048,
        "produceTime": 1356048000,
        "speedCost": 302118000
    },
    "35968": {
        "productId": 35968,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1049,
        "produceTime": 1356048000,
        "speedCost": 332330000
    },
    "35969": {
        "productId": 35969,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1050,
        "produceTime": 1387584000,
        "speedCost": 328363000
    },
    "35970": {
        "productId": 35970,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1051,
        "produceTime": 1387584000,
        "speedCost": 364848000
    },
    "35971": {
        "productId": 35971,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1052,
        "produceTime": 1387584000,
        "speedCost": 401333000
    },
    "35972": {
        "productId": 35972,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1053,
        "produceTime": 1419120000,
        "speedCost": 389894000
    },
    "35973": {
        "productId": 35973,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1054,
        "produceTime": 1419120000,
        "speedCost": 433215000
    },
    "35974": {
        "productId": 35974,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1055,
        "produceTime": 1419120000,
        "speedCost": 476537000
    },
    "35975": {
        "productId": 35975,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1056,
        "produceTime": 1450656000,
        "speedCost": 496800000
    },
    "35976": {
        "productId": 35976,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1057,
        "produceTime": 1450656000,
        "speedCost": 552000000
    },
    "35977": {
        "productId": 35977,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1058,
        "produceTime": 1450656000,
        "speedCost": 607200000
    },
    "35978": {
        "productId": 35978,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1059,
        "produceTime": 1482192000,
        "speedCost": 594019000
    },
    "35979": {
        "productId": 35979,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1060,
        "produceTime": 1482192000,
        "speedCost": 660021000
    },
    "35980": {
        "productId": 35980,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1061,
        "produceTime": 1482192000,
        "speedCost": 726023000
    },
    "35981": {
        "productId": 35981,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1062,
        "produceTime": 1513728000,
        "speedCost": 702043000
    },
    "35982": {
        "productId": 35982,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1063,
        "produceTime": 1513728000,
        "speedCost": 780048000
    },
    "35983": {
        "productId": 35983,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1064,
        "produceTime": 1513728000,
        "speedCost": 858053000
    },
    "35984": {
        "productId": 35984,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1065,
        "produceTime": 1545264000,
        "speedCost": 864051000
    },
    "35985": {
        "productId": 35985,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1066,
        "produceTime": 1545264000,
        "speedCost": 960057000
    },
    "35986": {
        "productId": 35986,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1067,
        "produceTime": 1545264000,
        "speedCost": 1056063000
    },
    "35987": {
        "productId": 35987,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32039_1"
        ],
        "dropId": 1068,
        "produceTime": 1576800000,
        "speedCost": 1080000000
    },
    "35988": {
        "productId": 35988,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32040_1"
        ],
        "dropId": 1069,
        "produceTime": 1576800000,
        "speedCost": 1200000000
    },
    "35989": {
        "productId": 35989,
        "buildingType": 5,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "32041_1"
        ],
        "dropId": 1070,
        "produceTime": 1576800000,
        "speedCost": 1320000000
    },
    "34500": {
        "productId": 34500,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35003_0.005",
            "35144_0.0142",
            "35285_0.274",
            "35426_0.595",
            "35567_0.081",
            "35708_0.0146",
            "35849_0.0162"
        ],
        "dropId": 1100,
        "produceTime": 518400,
        "speedCost": 5000
    },
    "34501": {
        "productId": 34501,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35004_0.0038",
            "35145_0.0097",
            "35286_0.539",
            "35427_0.201",
            "35568_0.21",
            "35709_0.0178",
            "35850_0.0187"
        ],
        "dropId": 1101,
        "produceTime": 518400,
        "speedCost": 6000
    },
    "34502": {
        "productId": 34502,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35005_0.0082",
            "35146_0.0069",
            "35287_0.27",
            "35428_0.549",
            "35569_0.131",
            "35710_0.0184",
            "35851_0.0165"
        ],
        "dropId": 1102,
        "produceTime": 518400,
        "speedCost": 7000
    },
    "34503": {
        "productId": 34503,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35006_0.0039",
            "35147_0.0011",
            "35288_0.359",
            "35429_0.524",
            "35570_0.067",
            "35711_0.0448",
            "35852_0.0002"
        ],
        "dropId": 1103,
        "produceTime": 518400,
        "speedCost": 8000
    },
    "34504": {
        "productId": 34504,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35007_0.0141",
            "35148_0.0006",
            "35289_0.329",
            "35430_0.561",
            "35571_0.06",
            "35712_0.0175",
            "35853_0.0178"
        ],
        "dropId": 1104,
        "produceTime": 518400,
        "speedCost": 9000
    },
    "34505": {
        "productId": 34505,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35008_0.0082",
            "35149_0.0082",
            "35290_0.418",
            "35431_0.408",
            "35572_0.124",
            "35713_0.0178",
            "35854_0.0158"
        ],
        "dropId": 1105,
        "produceTime": 518400,
        "speedCost": 10000
    },
    "34506": {
        "productId": 34506,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35009_0.0115",
            "35150_0.0107",
            "35291_0.352",
            "35432_0.373",
            "35573_0.225",
            "35714_0.0203",
            "35855_0.0075"
        ],
        "dropId": 1106,
        "produceTime": 518400,
        "speedCost": 11000
    },
    "34507": {
        "productId": 34507,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35010_0.0154",
            "35151_0.0016",
            "35292_0.141",
            "35433_0.589",
            "35574_0.22",
            "35715_0.0242",
            "35856_0.0088"
        ],
        "dropId": 1107,
        "produceTime": 518400,
        "speedCost": 12000
    },
    "34508": {
        "productId": 34508,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35011_0.0012",
            "35152_0.0123",
            "35293_0.308",
            "35434_0.391",
            "35575_0.251",
            "35716_0.0186",
            "35857_0.0179"
        ],
        "dropId": 1108,
        "produceTime": 518400,
        "speedCost": 13000
    },
    "34509": {
        "productId": 34509,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35012_0.0111",
            "35153_0.0007",
            "35294_0.391",
            "35435_0.301",
            "35576_0.258",
            "35717_0.0282",
            "35858_0.01"
        ],
        "dropId": 1109,
        "produceTime": 518400,
        "speedCost": 14000
    },
    "34510": {
        "productId": 34510,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35013_0.0013",
            "35154_0.01",
            "35295_0.557",
            "35436_0.323",
            "35577_0.07",
            "35718_0.0355",
            "35859_0.0032"
        ],
        "dropId": 1110,
        "produceTime": 518400,
        "speedCost": 15000
    },
    "34511": {
        "productId": 34511,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35014_0.0071",
            "35155_0.0136",
            "35296_0.459",
            "35437_0.298",
            "35578_0.193",
            "35719_0.0104",
            "35860_0.0189"
        ],
        "dropId": 1111,
        "produceTime": 518400,
        "speedCost": 16000
    },
    "34512": {
        "productId": 34512,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35015_0.0104",
            "35156_0.0148",
            "35297_0.212",
            "35438_0.509",
            "35579_0.229",
            "35720_0.0137",
            "35861_0.0111"
        ],
        "dropId": 1112,
        "produceTime": 518400,
        "speedCost": 17000
    },
    "34513": {
        "productId": 34513,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35016_0.002",
            "35157_0.0131",
            "35298_0.37",
            "35439_0.468",
            "35580_0.112",
            "35721_0.0295",
            "35862_0.0054"
        ],
        "dropId": 1113,
        "produceTime": 518400,
        "speedCost": 18000
    },
    "34514": {
        "productId": 34514,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35017_0.0016",
            "35158_0.0141",
            "35299_0.434",
            "35440_0.412",
            "35581_0.104",
            "35722_0.0175",
            "35863_0.0168"
        ],
        "dropId": 1114,
        "produceTime": 518400,
        "speedCost": 19000
    },
    "34515": {
        "productId": 34515,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35018_0.0008",
            "35159_0.0178",
            "35300_0.464",
            "35441_0.43",
            "35582_0.056",
            "35723_0.0159",
            "35864_0.0155"
        ],
        "dropId": 1115,
        "produceTime": 518400,
        "speedCost": 20000
    },
    "34516": {
        "productId": 34516,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35019_0.0072",
            "35160_0.0188",
            "35301_0.518",
            "35442_0.292",
            "35583_0.14",
            "35724_0.0192",
            "35865_0.0048"
        ],
        "dropId": 1116,
        "produceTime": 518400,
        "speedCost": 21000
    },
    "34517": {
        "productId": 34517,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35020_0.0041",
            "35161_0.0099",
            "35302_0.29",
            "35443_0.368",
            "35584_0.292",
            "35725_0.0261",
            "35866_0.0099"
        ],
        "dropId": 1117,
        "produceTime": 518400,
        "speedCost": 22000
    },
    "34518": {
        "productId": 34518,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35021_0.0045",
            "35162_0.0182",
            "35303_0.411",
            "35444_0.299",
            "35585_0.24",
            "35726_0.0117",
            "35867_0.0156"
        ],
        "dropId": 1118,
        "produceTime": 518400,
        "speedCost": 23000
    },
    "34519": {
        "productId": 34519,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35022_0.0062",
            "35163_0.0092",
            "35304_0.166",
            "35445_0.575",
            "35586_0.209",
            "35727_0.0274",
            "35868_0.0072"
        ],
        "dropId": 1119,
        "produceTime": 518400,
        "speedCost": 24000
    },
    "34520": {
        "productId": 34520,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35023_0.0185",
            "35164_0.0091",
            "35305_0.445",
            "35446_0.308",
            "35587_0.187",
            "35728_0.031",
            "35869_0.0014"
        ],
        "dropId": 1120,
        "produceTime": 518400,
        "speedCost": 25000
    },
    "34521": {
        "productId": 34521,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35024_0.0032",
            "35165_0.0117",
            "35306_0.36",
            "35447_0.328",
            "35588_0.252",
            "35729_0.033",
            "35870_0.0121"
        ],
        "dropId": 1121,
        "produceTime": 518400,
        "speedCost": 26000
    },
    "34522": {
        "productId": 34522,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35025_0.003",
            "35166_0.0034",
            "35307_0.259",
            "35448_0.44",
            "35589_0.241",
            "35730_0.0316",
            "35871_0.022"
        ],
        "dropId": 1122,
        "produceTime": 518400,
        "speedCost": 27000
    },
    "34523": {
        "productId": 34523,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35026_0.0078",
            "35167_0.0182",
            "35308_0.524",
            "35449_0.397",
            "35590_0.019",
            "35731_0.0202",
            "35872_0.0138"
        ],
        "dropId": 1123,
        "produceTime": 518400,
        "speedCost": 28000
    },
    "34524": {
        "productId": 34524,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35027_0.0075",
            "35168_0.0127",
            "35309_0.504",
            "35450_0.421",
            "35591_0.015",
            "35732_0.019",
            "35873_0.0208"
        ],
        "dropId": 1124,
        "produceTime": 518400,
        "speedCost": 29000
    },
    "34525": {
        "productId": 34525,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35028_0.0013",
            "35169_0.0124",
            "35310_0.309",
            "35451_0.391",
            "35592_0.24",
            "35733_0.0279",
            "35874_0.0184"
        ],
        "dropId": 1125,
        "produceTime": 518400,
        "speedCost": 30000
    },
    "34526": {
        "productId": 34526,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35029_0.0061",
            "35170_0.0098",
            "35311_0.37",
            "35452_0.352",
            "35593_0.218",
            "35734_0.0238",
            "35875_0.0203"
        ],
        "dropId": 1126,
        "produceTime": 518400,
        "speedCost": 31000
    },
    "34527": {
        "productId": 34527,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35030_0.0178",
            "35171_0.0122",
            "35312_0.461",
            "35453_0.398",
            "35594_0.081",
            "35735_0.0105",
            "35876_0.0195"
        ],
        "dropId": 1127,
        "produceTime": 518400,
        "speedCost": 32000
    },
    "34528": {
        "productId": 34528,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35031_0.0189",
            "35172_0.0074",
            "35313_0.434",
            "35454_0.397",
            "35595_0.109",
            "35736_0.0279",
            "35877_0.0058"
        ],
        "dropId": 1128,
        "produceTime": 518400,
        "speedCost": 33000
    },
    "34529": {
        "productId": 34529,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35032_0.0156",
            "35173_0.0095",
            "35314_0.191",
            "35455_0.569",
            "35596_0.18",
            "35737_0.0245",
            "35878_0.0104"
        ],
        "dropId": 1129,
        "produceTime": 518400,
        "speedCost": 34000
    },
    "34530": {
        "productId": 34530,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35033_0.0071",
            "35174_0.0191",
            "35315_0.679",
            "35456_0.246",
            "35597_0.015",
            "35738_0.022",
            "35879_0.0118"
        ],
        "dropId": 1130,
        "produceTime": 518400,
        "speedCost": 35000
    },
    "34531": {
        "productId": 34531,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35034_0.0172",
            "35175_0.0027",
            "35316_0.659",
            "35457_0.264",
            "35598_0.017",
            "35739_0.0203",
            "35880_0.0198"
        ],
        "dropId": 1131,
        "produceTime": 518400,
        "speedCost": 36000
    },
    "34532": {
        "productId": 34532,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35035_0.009",
            "35176_0.0072",
            "35317_0.479",
            "35458_0.24",
            "35599_0.221",
            "35740_0.0402",
            "35881_0.0036"
        ],
        "dropId": 1132,
        "produceTime": 518400,
        "speedCost": 37000
    },
    "34533": {
        "productId": 34533,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35036_0.0145",
            "35177_0.021",
            "35318_0.582",
            "35459_0.353",
            "35600_0.005",
            "35741_0.0203",
            "35882_0.0042"
        ],
        "dropId": 1133,
        "produceTime": 518400,
        "speedCost": 38000
    },
    "34534": {
        "productId": 34534,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35037_0.01",
            "35178_0.0103",
            "35319_0.349",
            "35460_0.512",
            "35601_0.079",
            "35742_0.0317",
            "35883_0.008"
        ],
        "dropId": 1134,
        "produceTime": 518400,
        "speedCost": 39000
    },
    "34535": {
        "productId": 34535,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35038_0.0173",
            "35179_0.0162",
            "35320_0.36",
            "35461_0.392",
            "35602_0.188",
            "35743_0.008",
            "35884_0.0185"
        ],
        "dropId": 1135,
        "produceTime": 518400,
        "speedCost": 40000
    },
    "34536": {
        "productId": 34536,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35039_0.0106",
            "35180_0.0099",
            "35321_0.572",
            "35462_0.267",
            "35603_0.101",
            "35744_0.0259",
            "35885_0.0136"
        ],
        "dropId": 1136,
        "produceTime": 518400,
        "speedCost": 41000
    },
    "34537": {
        "productId": 34537,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35040_0.0103",
            "35181_0.0165",
            "35322_0.358",
            "35463_0.424",
            "35604_0.158",
            "35745_0.016",
            "35886_0.0172"
        ],
        "dropId": 1137,
        "produceTime": 518400,
        "speedCost": 42000
    },
    "34538": {
        "productId": 34538,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35041_0.0072",
            "35182_0.0187",
            "35323_0.424",
            "35464_0.377",
            "35605_0.139",
            "35746_0.0113",
            "35887_0.0228"
        ],
        "dropId": 1138,
        "produceTime": 518400,
        "speedCost": 43000
    },
    "34539": {
        "productId": 34539,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35042_0.0046",
            "35183_0.0027",
            "35324_0.247",
            "35465_0.526",
            "35606_0.167",
            "35747_0.0381",
            "35888_0.0146"
        ],
        "dropId": 1139,
        "produceTime": 518400,
        "speedCost": 44000
    },
    "34540": {
        "productId": 34540,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35043_0.0058",
            "35184_0.0111",
            "35325_0.507",
            "35466_0.226",
            "35607_0.197",
            "35748_0.0421",
            "35889_0.011"
        ],
        "dropId": 1140,
        "produceTime": 518400,
        "speedCost": 45000
    },
    "34541": {
        "productId": 34541,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35044_0.0166",
            "35185_0.0019",
            "35326_0.328",
            "35467_0.584",
            "35608_0.018",
            "35749_0.0422",
            "35890_0.0093"
        ],
        "dropId": 1141,
        "produceTime": 518400,
        "speedCost": 46000
    },
    "34542": {
        "productId": 34542,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35045_0.0084",
            "35186_0.0055",
            "35327_0.355",
            "35468_0.525",
            "35609_0.05",
            "35750_0.0539",
            "35891_0.0022"
        ],
        "dropId": 1142,
        "produceTime": 518400,
        "speedCost": 47000
    },
    "34543": {
        "productId": 34543,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35046_0.0005",
            "35187_0.0206",
            "35328_0.565",
            "35469_0.226",
            "35610_0.139",
            "35751_0.029",
            "35892_0.0199"
        ],
        "dropId": 1143,
        "produceTime": 518400,
        "speedCost": 48000
    },
    "34544": {
        "productId": 34544,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35047_0.0158",
            "35188_0.0173",
            "35329_0.346",
            "35470_0.297",
            "35611_0.287",
            "35752_0.0202",
            "35893_0.0167"
        ],
        "dropId": 1144,
        "produceTime": 518400,
        "speedCost": 49000
    },
    "34545": {
        "productId": 34545,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35048_0.0209",
            "35189_0.0226",
            "35330_0.46",
            "35471_0.426",
            "35612_0.044",
            "35753_0.0203",
            "35894_0.0062"
        ],
        "dropId": 1145,
        "produceTime": 518400,
        "speedCost": 50000
    },
    "34546": {
        "productId": 34546,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35049_0.0158",
            "35190_0.0174",
            "35331_0.525",
            "35472_0.309",
            "35613_0.096",
            "35754_0.0159",
            "35895_0.0209"
        ],
        "dropId": 1146,
        "produceTime": 518400,
        "speedCost": 51000
    },
    "34547": {
        "productId": 34547,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35050_0.0154",
            "35191_0.0026",
            "35332_0.362",
            "35473_0.536",
            "35614_0.032",
            "35755_0.0402",
            "35896_0.0118"
        ],
        "dropId": 1147,
        "produceTime": 518400,
        "speedCost": 52000
    },
    "34548": {
        "productId": 34548,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35051_0.0079",
            "35192_0.0129",
            "35333_0.338",
            "35474_0.443",
            "35615_0.149",
            "35756_0.0364",
            "35897_0.0128"
        ],
        "dropId": 1148,
        "produceTime": 518400,
        "speedCost": 53000
    },
    "34549": {
        "productId": 34549,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35052_0.0083",
            "35193_0.0102",
            "35334_0.702",
            "35475_0.212",
            "35616_0.016",
            "35757_0.0346",
            "35898_0.0169"
        ],
        "dropId": 1149,
        "produceTime": 518400,
        "speedCost": 54000
    },
    "34550": {
        "productId": 34550,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35053_0.0051",
            "35194_0.0075",
            "35335_0.28",
            "35476_0.514",
            "35617_0.136",
            "35758_0.0379",
            "35899_0.0195"
        ],
        "dropId": 1150,
        "produceTime": 518400,
        "speedCost": 55000
    },
    "34551": {
        "productId": 34551,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35054_0.0074",
            "35195_0.0225",
            "35336_0.64",
            "35477_0.265",
            "35618_0.025",
            "35759_0.0401",
            "35900_0"
        ],
        "dropId": 1151,
        "produceTime": 518400,
        "speedCost": 56000
    },
    "34552": {
        "productId": 34552,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35055_0.0154",
            "35196_0.0192",
            "35337_0.261",
            "35478_0.412",
            "35619_0.257",
            "35760_0.0241",
            "35901_0.0113"
        ],
        "dropId": 1152,
        "produceTime": 518400,
        "speedCost": 57000
    },
    "34553": {
        "productId": 34553,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35056_0.0118",
            "35197_0.0016",
            "35338_0.619",
            "35479_0.24",
            "35620_0.071",
            "35761_0.0549",
            "35902_0.0017"
        ],
        "dropId": 1153,
        "produceTime": 518400,
        "speedCost": 58000
    },
    "34554": {
        "productId": 34554,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35057_0.0179",
            "35198_0.0244",
            "35339_0.279",
            "35480_0.514",
            "35621_0.137",
            "35762_0.0068",
            "35903_0.0209"
        ],
        "dropId": 1154,
        "produceTime": 518400,
        "speedCost": 59000
    },
    "34555": {
        "productId": 34555,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35058_0.0087",
            "35199_0.0248",
            "35340_0.431",
            "35481_0.496",
            "35622_0.003",
            "35763_0.0189",
            "35904_0.0176"
        ],
        "dropId": 1155,
        "produceTime": 518400,
        "speedCost": 60000
    },
    "34556": {
        "productId": 34556,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35059_0.0069",
            "35200_0.0029",
            "35341_0.349",
            "35482_0.377",
            "35623_0.204",
            "35764_0.0439",
            "35905_0.0163"
        ],
        "dropId": 1156,
        "produceTime": 518400,
        "speedCost": 61000
    },
    "34557": {
        "productId": 34557,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35060_0.0208",
            "35201_0.0178",
            "35342_0.466",
            "35483_0.315",
            "35624_0.149",
            "35765_0.0132",
            "35906_0.0182"
        ],
        "dropId": 1157,
        "produceTime": 518400,
        "speedCost": 62000
    },
    "34558": {
        "productId": 34558,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35061_0.0086",
            "35202_0.0164",
            "35343_0.133",
            "35484_0.524",
            "35625_0.273",
            "35766_0.0358",
            "35907_0.0092"
        ],
        "dropId": 1158,
        "produceTime": 518400,
        "speedCost": 63000
    },
    "34559": {
        "productId": 34559,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35062_0.0068",
            "35203_0.0203",
            "35344_0.505",
            "35485_0.292",
            "35626_0.133",
            "35767_0.0324",
            "35908_0.0105"
        ],
        "dropId": 1159,
        "produceTime": 518400,
        "speedCost": 64000
    },
    "34560": {
        "productId": 34560,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35063_0.0155",
            "35204_0.0238",
            "35345_0.283",
            "35486_0.481",
            "35627_0.156",
            "35768_0.0328",
            "35909_0.0079"
        ],
        "dropId": 1160,
        "produceTime": 518400,
        "speedCost": 65000
    },
    "34561": {
        "productId": 34561,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35064_0.0135",
            "35205_0.0026",
            "35346_0.212",
            "35487_0.44",
            "35628_0.268",
            "35769_0.05",
            "35910_0.0139"
        ],
        "dropId": 1161,
        "produceTime": 518400,
        "speedCost": 66000
    },
    "34562": {
        "productId": 34562,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35065_0.0232",
            "35206_0.0069",
            "35347_0.378",
            "35488_0.529",
            "35629_0.013",
            "35770_0.0466",
            "35911_0.0033"
        ],
        "dropId": 1162,
        "produceTime": 518400,
        "speedCost": 67000
    },
    "34563": {
        "productId": 34563,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35066_0.0148",
            "35207_0.0089",
            "35348_0.444",
            "35489_0.234",
            "35630_0.242",
            "35771_0.0371",
            "35912_0.0192"
        ],
        "dropId": 1163,
        "produceTime": 518400,
        "speedCost": 68000
    },
    "34564": {
        "productId": 34564,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35067_0.0105",
            "35208_0.0176",
            "35349_0.38",
            "35490_0.472",
            "35631_0.068",
            "35772_0.039",
            "35913_0.0129"
        ],
        "dropId": 1164,
        "produceTime": 518400,
        "speedCost": 69000
    },
    "34565": {
        "productId": 34565,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35068_0.0019",
            "35209_0.0224",
            "35350_0.128",
            "35491_0.553",
            "35632_0.239",
            "35773_0.031",
            "35914_0.0247"
        ],
        "dropId": 1165,
        "produceTime": 518400,
        "speedCost": 70000
    },
    "34566": {
        "productId": 34566,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35069_0.0064",
            "35210_0.0047",
            "35351_0.252",
            "35492_0.448",
            "35633_0.22",
            "35774_0.0412",
            "35915_0.0277"
        ],
        "dropId": 1166,
        "produceTime": 518400,
        "speedCost": 71000
    },
    "34567": {
        "productId": 34567,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35070_0.0028",
            "35211_0.0168",
            "35352_0.243",
            "35493_0.427",
            "35634_0.25",
            "35775_0.0567",
            "35916_0.0037"
        ],
        "dropId": 1167,
        "produceTime": 518400,
        "speedCost": 72000
    },
    "34568": {
        "productId": 34568,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35071_0.003",
            "35212_0.0062",
            "35353_0.532",
            "35494_0.245",
            "35635_0.143",
            "35776_0.0503",
            "35917_0.0205"
        ],
        "dropId": 1168,
        "produceTime": 518400,
        "speedCost": 73000
    },
    "34569": {
        "productId": 34569,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35072_0.022",
            "35213_0.0046",
            "35354_0.252",
            "35495_0.595",
            "35636_0.073",
            "35777_0.0482",
            "35918_0.0052"
        ],
        "dropId": 1169,
        "produceTime": 518400,
        "speedCost": 74000
    },
    "34570": {
        "productId": 34570,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35073_0.0081",
            "35214_0.0043",
            "35355_0.201",
            "35496_0.485",
            "35637_0.234",
            "35778_0.0406",
            "35919_0.027"
        ],
        "dropId": 1170,
        "produceTime": 518400,
        "speedCost": 75000
    },
    "34571": {
        "productId": 34571,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35074_0.0169",
            "35215_0.0042",
            "35356_0.536",
            "35497_0.216",
            "35638_0.168",
            "35779_0.0558",
            "35920_0.0031"
        ],
        "dropId": 1171,
        "produceTime": 518400,
        "speedCost": 76000
    },
    "34572": {
        "productId": 34572,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35075_0.0092",
            "35216_0.0143",
            "35357_0.239",
            "35498_0.549",
            "35639_0.132",
            "35780_0.0298",
            "35921_0.0267"
        ],
        "dropId": 1172,
        "produceTime": 518400,
        "speedCost": 77000
    },
    "34573": {
        "productId": 34573,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35076_0.0046",
            "35217_0.0089",
            "35358_0.599",
            "35499_0.272",
            "35640_0.049",
            "35781_0.0541",
            "35922_0.0124"
        ],
        "dropId": 1173,
        "produceTime": 518400,
        "speedCost": 78000
    },
    "34574": {
        "productId": 34574,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35077_0.0227",
            "35218_0.0143",
            "35359_0.421",
            "35500_0.436",
            "35641_0.063",
            "35782_0.0415",
            "35923_0.0015"
        ],
        "dropId": 1174,
        "produceTime": 518400,
        "speedCost": 79000
    },
    "34575": {
        "productId": 34575,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35078_0.0036",
            "35219_0.0055",
            "35360_0.448",
            "35501_0.26",
            "35642_0.212",
            "35783_0.0495",
            "35924_0.0214"
        ],
        "dropId": 1175,
        "produceTime": 518400,
        "speedCost": 80000
    },
    "34576": {
        "productId": 34576,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35079_0.0174",
            "35220_0.0226",
            "35361_0.533",
            "35502_0.303",
            "35643_0.084",
            "35784_0.0306",
            "35925_0.0094"
        ],
        "dropId": 1176,
        "produceTime": 518400,
        "speedCost": 81000
    },
    "34577": {
        "productId": 34577,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35080_0.0233",
            "35221_0.011",
            "35362_0.348",
            "35503_0.325",
            "35644_0.247",
            "35785_0.0206",
            "35926_0.0251"
        ],
        "dropId": 1177,
        "produceTime": 518400,
        "speedCost": 82000
    },
    "34578": {
        "productId": 34578,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35081_0.0084",
            "35222_0.0182",
            "35363_0.275",
            "35504_0.359",
            "35645_0.286",
            "35786_0.0471",
            "35927_0.0063"
        ],
        "dropId": 1178,
        "produceTime": 518400,
        "speedCost": 83000
    },
    "34579": {
        "productId": 34579,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35082_0.0181",
            "35223_0.0109",
            "35364_0.25",
            "35505_0.496",
            "35646_0.174",
            "35787_0.031",
            "35928_0.02"
        ],
        "dropId": 1179,
        "produceTime": 518400,
        "speedCost": 84000
    },
    "34580": {
        "productId": 34580,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35083_0.0279",
            "35224_0.031",
            "35365_0.475",
            "35506_0.318",
            "35647_0.117",
            "35788_0.0231",
            "35929_0.008"
        ],
        "dropId": 1180,
        "produceTime": 518400,
        "speedCost": 85000
    },
    "34581": {
        "productId": 34581,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35084_0.003",
            "35225_0.0216",
            "35366_0.117",
            "35507_0.544",
            "35648_0.249",
            "35789_0.0356",
            "35930_0.0298"
        ],
        "dropId": 1181,
        "produceTime": 518400,
        "speedCost": 86000
    },
    "34582": {
        "productId": 34582,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35085_0.0182",
            "35226_0.0221",
            "35367_0.49",
            "35508_0.352",
            "35649_0.068",
            "35790_0.0413",
            "35931_0.0084"
        ],
        "dropId": 1182,
        "produceTime": 518400,
        "speedCost": 87000
    },
    "34583": {
        "productId": 34583,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35086_0.0144",
            "35227_0.0039",
            "35368_0.304",
            "35509_0.441",
            "35650_0.165",
            "35791_0.0458",
            "35932_0.0259"
        ],
        "dropId": 1183,
        "produceTime": 518400,
        "speedCost": 88000
    },
    "34584": {
        "productId": 34584,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35087_0.0017",
            "35228_0.0109",
            "35369_0.404",
            "35510_0.455",
            "35651_0.051",
            "35792_0.0631",
            "35933_0.0143"
        ],
        "dropId": 1184,
        "produceTime": 518400,
        "speedCost": 89000
    },
    "34585": {
        "productId": 34585,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35088_0.021",
            "35229_0.0314",
            "35370_0.374",
            "35511_0.253",
            "35652_0.283",
            "35793_0.0352",
            "35934_0.0024"
        ],
        "dropId": 1185,
        "produceTime": 518400,
        "speedCost": 90000
    },
    "34586": {
        "productId": 34586,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35089_0.0109",
            "35230_0.007",
            "35371_0.459",
            "35512_0.341",
            "35653_0.11",
            "35794_0.0703",
            "35935_0.0018"
        ],
        "dropId": 1186,
        "produceTime": 518400,
        "speedCost": 91000
    },
    "34587": {
        "productId": 34587,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35090_0.0056",
            "35231_0.0115",
            "35372_0.558",
            "35513_0.224",
            "35654_0.128",
            "35795_0.0511",
            "35936_0.0218"
        ],
        "dropId": 1187,
        "produceTime": 518400,
        "speedCost": 92000
    },
    "34588": {
        "productId": 34588,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35091_0.0018",
            "35232_0.01",
            "35373_0.438",
            "35514_0.324",
            "35655_0.148",
            "35796_0.0739",
            "35937_0.0043"
        ],
        "dropId": 1188,
        "produceTime": 518400,
        "speedCost": 93000
    },
    "34589": {
        "productId": 34589,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35092_0.0065",
            "35233_0.0313",
            "35374_0.454",
            "35515_0.403",
            "35656_0.053",
            "35797_0.0315",
            "35938_0.0207"
        ],
        "dropId": 1189,
        "produceTime": 518400,
        "speedCost": 94000
    },
    "34590": {
        "productId": 34590,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35093_0.0152",
            "35234_0.0149",
            "35375_0.322",
            "35516_0.561",
            "35657_0.027",
            "35798_0.0311",
            "35939_0.0288"
        ],
        "dropId": 1190,
        "produceTime": 518400,
        "speedCost": 95000
    },
    "34591": {
        "productId": 34591,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35094_0.0274",
            "35235_0.0302",
            "35376_0.048",
            "35517_0.579",
            "35658_0.283",
            "35799_0.0163",
            "35940_0.0161"
        ],
        "dropId": 1191,
        "produceTime": 518400,
        "speedCost": 96000
    },
    "34592": {
        "productId": 34592,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35095_0.0148",
            "35236_0.0288",
            "35377_0.234",
            "35518_0.53",
            "35659_0.146",
            "35800_0.0457",
            "35941_0.0007"
        ],
        "dropId": 1192,
        "produceTime": 518400,
        "speedCost": 97000
    },
    "34593": {
        "productId": 34593,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35096_0.0076",
            "35237_0.0184",
            "35378_0.23",
            "35519_0.449",
            "35660_0.231",
            "35801_0.061",
            "35942_0.003"
        ],
        "dropId": 1193,
        "produceTime": 518400,
        "speedCost": 98000
    },
    "34594": {
        "productId": 34594,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35097_0.0108",
            "35238_0.0187",
            "35379_0.294",
            "35520_0.54",
            "35661_0.076",
            "35802_0.059",
            "35943_0.0015"
        ],
        "dropId": 1194,
        "produceTime": 518400,
        "speedCost": 99000
    },
    "34595": {
        "productId": 34595,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35098_0.0049",
            "35239_0.0145",
            "35380_0.287",
            "35521_0.34",
            "35662_0.283",
            "35803_0.0433",
            "35944_0.0273"
        ],
        "dropId": 1195,
        "produceTime": 518400,
        "speedCost": 100000
    },
    "34596": {
        "productId": 34596,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35099_0.0092",
            "35240_0.0322",
            "35381_0.449",
            "35522_0.456",
            "35663_0.005",
            "35804_0.0253",
            "35945_0.0233"
        ],
        "dropId": 1196,
        "produceTime": 518400,
        "speedCost": 101000
    },
    "34597": {
        "productId": 34597,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35100_0.0078",
            "35241_0.0333",
            "35382_0.297",
            "35523_0.495",
            "35664_0.118",
            "35805_0.0348",
            "35946_0.0141"
        ],
        "dropId": 1197,
        "produceTime": 518400,
        "speedCost": 102000
    },
    "34598": {
        "productId": 34598,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35101_0.0238",
            "35242_0.0266",
            "35383_0.301",
            "35524_0.509",
            "35665_0.1",
            "35806_0.0332",
            "35947_0.0064"
        ],
        "dropId": 1198,
        "produceTime": 518400,
        "speedCost": 103000
    },
    "34599": {
        "productId": 34599,
        "buildingType": 6,
        "minBuildingLevel": 1,
        "minPlayerLevel": 1,
        "materials": [
            "35102_0.0004",
            "35243_0.0028",
            "35384_0.419",
            "35525_0.393",
            "35666_0.098",
            "35807_0.0662",
            "35948_0.0206"
        ],
        "dropId": 1199,
        "produceTime": 518400,
        "speedCost": 104000
    }
}
export default ProductConfig;