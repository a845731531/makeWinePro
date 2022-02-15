type NpcConfigData = {
	id: number,
	name: string,
	modelId: number,
	icon: number,
	head: number,
	gender: number,
	type: number,
	pathId: number,
	pathType: number,
	introduce: string,
	descRandom: number[],
	sound: string,
	desc: string,
}
let NpcConfig: { [id: string]: NpcConfigData } = {
    "1": {
        "id": 1,
        "name": "赵明",
        "modelId": 2,
        "icon": 2,
        "head": 1,
        "gender": 1,
        "type": 1,
        "pathId": 1,
        "pathType": 1,
        "introduce": "总经理",
        "descRandom": [
            1,
            2,
            3,
            5,
            7,
            8
        ],
        "sound": "zhaoming",
        "desc": "百年只做一件事,用心酿好每瓶酒"
    },
    "2": {
        "id": 2,
        "name": "苏宏山",
        "modelId": 5,
        "icon": 1,
        "head": 2,
        "gender": 1,
        "type": 1,
        "pathId": 2,
        "pathType": 1,
        "introduce": "市场总监",
        "descRandom": [
            6,
            10
        ],
        "sound": "suhongshan",
        "desc": "金沙古酒一路畅销，打造中国驰名品牌"
    },
    "3": {
        "id": 3,
        "name": "周龙波",
        "modelId": 2,
        "icon": 11,
        "head": 3,
        "gender": 1,
        "type": 2,
        "pathId": 3,
        "pathType": 2,
        "introduce": "常务副厂长",
        "descRandom": [
            9,
            11,
            12
        ],
        "sound": "zhoulongbo",
        "desc": "初心不曾改,奋斗正当时!"
    },
    "4": {
        "id": 4,
        "name": "刘祖琴",
        "modelId": 6,
        "icon": 10,
        "head": 4,
        "gender": 2,
        "type": 2,
        "pathId": 4,
        "pathType": 2,
        "introduce": "制曲车间主管",
        "descRandom": [
            13,
            14
        ],
        "sound": "liuzuqin",
        "desc": "好曲是一瓶佳酿的灵魂"
    },
    "5": {
        "id": 5,
        "name": "王成新",
        "modelId": 3,
        "icon": 11,
        "head": 5,
        "gender": 1,
        "type": 2,
        "pathId": 5,
        "pathType": 2,
        "introduce": "基酒部经理",
        "descRandom": [
            15
        ],
        "sound": "wangchengxin",
        "desc": "岁月沉淀，成就酒的香醇"
    },
    "6": {
        "id": 6,
        "name": "曾建明",
        "modelId": 2,
        "icon": 3,
        "head": 6,
        "gender": 1,
        "type": 2,
        "pathId": 6,
        "pathType": 6,
        "introduce": "酒体勾调总监",
        "descRandom": [
            16,
            17
        ],
        "sound": "zengjianming",
        "desc": "晶莹的酒液蕴含无限可能"
    },
    "7": {
        "id": 7,
        "name": "魏小婷",
        "modelId": 6,
        "icon": 10,
        "head": 7,
        "gender": 2,
        "type": 1,
        "pathId": 7,
        "pathType": 2,
        "introduce": "制酒生产部总监",
        "descRandom": [
            18,
            19
        ],
        "sound": "weixiaoting",
        "desc": "忠诚勇敢、排除万难、备勤备战"
    },
    "8": {
        "id": 8,
        "name": "邰银双",
        "modelId": 3,
        "icon": 11,
        "head": 8,
        "gender": 1,
        "type": 2,
        "pathId": 8,
        "pathType": 6,
        "introduce": "品质部经理",
        "descRandom": [
            20,
            21
        ],
        "sound": "taiyinshuang",
        "desc": "严而又严、细而又细、实而又实"
    },
    "9": {
        "id": 9,
        "name": "李瑞杰",
        "modelId": 5,
        "icon": 1,
        "head": 9,
        "gender": 1,
        "type": 1,
        "pathId": 9,
        "pathType": 5,
        "introduce": "董事长",
        "descRandom": [
            22,
            23
        ],
        "sound": "liruijie",
        "desc": "匠心传承，炼就慎初百年传奇"
    },
    "10": {
        "id": 10,
        "name": "黄慎初",
        "modelId": 5,
        "icon": 4,
        "head": 10,
        "gender": 1,
        "type": 1,
        "pathId": 10,
        "pathType": 5,
        "introduce": "慎初烧坊创始人",
        "descRandom": [
            24
        ],
        "sound": "huangshenchu",
        "desc": "慎思敏行，不忘初心"
    },
    "11": {
        "id": 11,
        "name": "刘开庭",
        "modelId": 5,
        "icon": 5,
        "head": 11,
        "gender": 1,
        "type": 1,
        "pathId": 11,
        "pathType": 5,
        "introduce": "传奇酿酒师",
        "descRandom": [
            25,
            26,
            27
        ],
        "sound": "liukaiting",
        "desc": "君子慎始,差若毫厘,谬以千里"
    },
    "12": {
        "id": 12,
        "name": "菩萨",
        "modelId": 5,
        "icon": 12,
        "head": 12,
        "gender": 2,
        "type": 1,
        "pathId": 12,
        "pathType": 5,
        "introduce": "菩萨",
        "descRandom": [
            28
        ],
        "sound": "pusa",
        "desc": "送你一颗善心，愿你好运相随"
    },
    "13": {
        "id": 13,
        "name": "andy",
        "modelId": 8,
        "icon": 10,
        "head": 13,
        "gender": 2,
        "type": 2,
        "pathId": 13,
        "pathType": 1,
        "introduce": "外国友人",
        "descRandom": [
            108,
            109
        ],
        "sound": "andy",
        "desc": "你好 请问这酒为什么这么香啊"
    },
    "14": {
        "id": 14,
        "name": "顿珠卓玛",
        "modelId": 7,
        "icon": 6,
        "head": 14,
        "gender": 2,
        "type": 2,
        "pathId": 14,
        "pathType": 4,
        "introduce": "康巴美女",
        "descRandom": [
            29,
            30,
            31,
            32
        ],
        "sound": "dunzhuzhuoma",
        "desc": "水榭听香，从此醉"
    },
    "15": {
        "id": 15,
        "name": "司徒东风",
        "modelId": 9,
        "icon": 7,
        "head": 15,
        "gender": 1,
        "type": 2,
        "pathId": 15,
        "pathType": 3,
        "introduce": "带货主播",
        "descRandom": [
            33,
            34,
            35
        ],
        "sound": "situdongfeng",
        "desc": "OH MY GOD！买他！"
    },
    "16": {
        "id": 16,
        "name": "上官明月",
        "modelId": 9,
        "icon": 8,
        "head": 16,
        "gender": 2,
        "type": 6,
        "pathId": 16,
        "pathType": 6,
        "introduce": "酒庄老板娘",
        "descRandom": [
            36,
            37,
            38,
            39
        ],
        "sound": "shangguanmingyue",
        "desc": "酒与文化碰撞,一缕酱香,世代缠绵"
    },
    "17": {
        "id": 17,
        "name": "萧清扬",
        "modelId": 5,
        "icon": 11,
        "head": 17,
        "gender": 1,
        "type": 2,
        "pathId": 17,
        "pathType": 4,
        "introduce": "经销商",
        "descRandom": [
            40,
            41,
            42
        ],
        "sound": "xiaoqingyang",
        "desc": "君子慎初得佳酿，金钱百万赏新声"
    },
    "18": {
        "id": 18,
        "name": "白松",
        "modelId": 1,
        "icon": 11,
        "head": 18,
        "gender": 1,
        "type": 4,
        "pathId": 18,
        "pathType": 4,
        "introduce": "买酒人",
        "descRandom": [
            43,
            44,
            45,
            46
        ],
        "sound": "baisong",
        "desc": "应是天仙狂醉，乱把白云揉碎！"
    },
    "19": {
        "id": 19,
        "name": "赵左左",
        "modelId": 3,
        "icon": 11,
        "head": 19,
        "gender": 1,
        "type": 2,
        "pathId": 19,
        "pathType": 4,
        "introduce": "货车司机",
        "descRandom": [
            47,
            48,
            49,
            50
        ],
        "sound": "zhaozuozuo",
        "desc": "最近我的车越开越稳了"
    },
    "20": {
        "id": 20,
        "name": "张详先",
        "modelId": 2,
        "icon": 3,
        "head": 20,
        "gender": 1,
        "type": 4,
        "pathId": 20,
        "pathType": 2,
        "introduce": "包装生产部总监",
        "descRandom": [
            51,
            52,
            53,
            54
        ],
        "sound": "zhangxiangxian",
        "desc": "佛靠金装，人靠衣装，美酒也要选件好衣裳！"
    },
    "21": {
        "id": 21,
        "name": "Martin",
        "modelId": 5,
        "icon": 11,
        "head": 21,
        "gender": 1,
        "type": 4,
        "pathId": 21,
        "pathType": 5,
        "introduce": "外国游客",
        "descRandom": [
            55,
            56
        ],
        "sound": "martin",
        "desc": "你好！能带我看看你的酒厂吗？（外国人普通话男）"
    },
    "22": {
        "id": 22,
        "name": "黄靓靓",
        "modelId": 7,
        "icon": 8,
        "head": 22,
        "gender": 2,
        "type": 1,
        "pathId": 22,
        "pathType": 6,
        "introduce": "集市老板娘",
        "descRandom": [
            57,
            58,
            59
        ],
        "sound": "huangliangliang",
        "desc": "重重叠叠是钱声 馥郁芬芳是酒香"
    },
    "23": {
        "id": 23,
        "name": "张全蛋",
        "modelId": 3,
        "icon": 11,
        "head": 23,
        "gender": 1,
        "type": 2,
        "pathId": 23,
        "pathType": 4,
        "introduce": "背包客",
        "descRandom": [
            60,
            61,
            62
        ],
        "sound": "zhangquandan",
        "desc": "曾经梦想仗剑走天涯！"
    },
    "24": {
        "id": 24,
        "name": "旺财",
        "modelId": 3,
        "icon": 11,
        "head": 24,
        "gender": 3,
        "type": 7,
        "pathId": 24,
        "pathType": 2,
        "introduce": "柯基犬",
        "descRandom": [
            63,
            64,
            65
        ],
        "sound": "gou",
        "desc": "汪！汪汪汪！"
    },
    "25": {
        "id": 25,
        "name": "伊琳娜",
        "modelId": 9,
        "icon": 7,
        "head": 25,
        "gender": 2,
        "type": 3,
        "pathId": 25,
        "pathType": 3,
        "introduce": "温泉游客",
        "descRandom": [
            110,
            111
        ],
        "sound": "yilinna",
        "desc": "别总盯着人家看！害羞死了！"
    },
    "26": {
        "id": 26,
        "name": "糯米",
        "modelId": 3,
        "icon": 11,
        "head": 26,
        "gender": 3,
        "type": 7,
        "pathId": 26,
        "pathType": 6,
        "introduce": "蓝猫",
        "descRandom": [
            66,
            67,
            68,
            69
        ],
        "sound": "mao",
        "desc": "喵~"
    },
    "27": {
        "id": 27,
        "name": "王铁柱",
        "modelId": 4,
        "icon": 11,
        "head": 27,
        "gender": 1,
        "type": 2,
        "pathId": 27,
        "pathType": 2,
        "introduce": "种植农户",
        "descRandom": [
            70,
            71,
            72,
            73,
            74
        ],
        "sound": "wangtiezhu",
        "desc": "看啥子看？还不去看看庄稼（贵州方言）"
    },
    "28": {
        "id": 28,
        "name": "赵秋雅",
        "modelId": 6,
        "icon": 10,
        "head": 28,
        "gender": 2,
        "type": 4,
        "pathId": 28,
        "pathType": 3,
        "introduce": "温泉服务员",
        "descRandom": [
            75,
            76,
            77
        ],
        "sound": "zhaoqiuya",
        "desc": "快速反应、高度负责、用心服务"
    },
    "29": {
        "id": 29,
        "name": "梅朵拉姆",
        "modelId": 7,
        "icon": 9,
        "head": 29,
        "gender": 2,
        "type": 2,
        "pathId": 29,
        "pathType": 6,
        "introduce": "康巴美女",
        "descRandom": [
            78,
            79,
            80
        ],
        "sound": "meiduolamu",
        "desc": "不要总问女生年纪，问就是18"
    },
    "30": {
        "id": 30,
        "name": "扎西多吉",
        "modelId": 1,
        "icon": 11,
        "head": 30,
        "gender": 1,
        "type": 2,
        "pathId": 30,
        "pathType": 3,
        "introduce": "康巴汉子",
        "descRandom": [
            81,
            82
        ],
        "sound": "zhaxiduoji",
        "desc": "想跟我比比摔跤吗？"
    },
    "31": {
        "id": 31,
        "name": "宋芸曦",
        "modelId": 7,
        "icon": 8,
        "head": 31,
        "gender": 2,
        "type": 3,
        "pathId": 31,
        "pathType": 6,
        "introduce": "温泉游客",
        "descRandom": [
            83,
            84,
            85
        ],
        "sound": "xongyunxi",
        "desc": "春风并酒，醉万千风月"
    },
    "32": {
        "id": 32,
        "name": "任雨桐",
        "modelId": 1,
        "icon": 11,
        "head": 32,
        "gender": 1,
        "type": 3,
        "pathId": 32,
        "pathType": 4,
        "introduce": "温泉游客",
        "descRandom": [
            86,
            87,
            88
        ],
        "sound": "renyutong",
        "desc": "你不是过来看美女的吧？"
    },
    "33": {
        "id": 33,
        "name": "江辛瑶",
        "modelId": 8,
        "icon": 7,
        "head": 33,
        "gender": 2,
        "type": 3,
        "pathId": 33,
        "pathType": 5,
        "introduce": "温泉游客",
        "descRandom": [
            89,
            90,
            91
        ],
        "sound": "jiangxinyao",
        "desc": "春宵一刻值千金。是不？"
    },
    "34": {
        "id": 34,
        "name": "司卿云",
        "modelId": 9,
        "icon": 8,
        "head": 34,
        "gender": 2,
        "type": 6,
        "pathId": 34,
        "pathType": 2,
        "introduce": "酒庄优伶",
        "descRandom": [
            92,
            93,
            94
        ],
        "sound": "siqingyun",
        "desc": "青灯照壁人初睡，冷雨敲窗被未温"
    },
    "35": {
        "id": 35,
        "name": "邵小雨",
        "modelId": 8,
        "icon": 7,
        "head": 35,
        "gender": 2,
        "type": 6,
        "pathId": 35,
        "pathType": 5,
        "introduce": "酒庄优伶",
        "descRandom": [
            95,
            96
        ],
        "sound": "shaoxiaoyu",
        "desc": "你不要乱来啊！小女子只卖艺，不卖身！"
    },
    "36": {
        "id": 36,
        "name": "余晓曼",
        "modelId": 9,
        "icon": 7,
        "head": 36,
        "gender": 2,
        "type": 6,
        "pathId": 36,
        "pathType": 3,
        "introduce": "酒庄乐师",
        "descRandom": [
            97,
            98,
            99,
            100
        ],
        "sound": "yuxiaoman",
        "desc": "青青子衿，悠悠我心"
    },
    "37": {
        "id": 37,
        "name": "司佑佳",
        "modelId": 1,
        "icon": 11,
        "head": 37,
        "gender": 1,
        "type": 6,
        "pathId": 37,
        "pathType": 5,
        "introduce": "酒庄游客",
        "descRandom": [
            101,
            102
        ],
        "sound": "siyoujia",
        "desc": "周末不喝酒，人生路白走"
    },
    "38": {
        "id": 38,
        "name": "孔天元",
        "modelId": 5,
        "icon": 11,
        "head": 38,
        "gender": 1,
        "type": 6,
        "pathId": 38,
        "pathType": 4,
        "introduce": "酒庄游客",
        "descRandom": [
            103,
            104
        ],
        "sound": "kongtianyuan",
        "desc": "想找我喝酒？白酒八斤半，啤酒任你灌"
    },
    "39": {
        "id": 39,
        "name": "卢慧音",
        "modelId": 8,
        "icon": 8,
        "head": 39,
        "gender": 2,
        "type": 4,
        "pathId": 39,
        "pathType": 5,
        "introduce": "导游",
        "descRandom": [
            105,
            106,
            107
        ],
        "sound": "luhuiyin",
        "desc": "后面的游客跟上队伍啦！认准导游的小旗子！"
    },
    "40": {
        "id": 40,
        "name": "车淑玲",
        "modelId": 6,
        "icon": 7,
        "head": 40,
        "gender": 2,
        "type": 1,
        "pathId": 40,
        "pathType": 1,
        "introduce": "订单统筹部主管",
        "descRandom": [
            112,
            112,
            114,
            115
        ],
        "sound": "cheshuling",
        "desc": "想万全之策、尽万分努力、创百万佳绩"
    },
    "41": {
        "id": 41,
        "name": "陈海威",
        "modelId": 3,
        "icon": 11,
        "head": 41,
        "gender": 1,
        "type": 1,
        "pathId": 41,
        "pathType": 2,
        "introduce": "采购部经理",
        "descRandom": [
            116,
            117,
            118,
            119
        ],
        "sound": "chenhaiwei",
        "desc": "放心交给我！星星都能给你摘下来！"
    },
    "42": {
        "id": 42,
        "name": "陈胜杰",
        "modelId": 3,
        "icon": 11,
        "head": 42,
        "gender": 1,
        "type": 1,
        "pathId": 42,
        "pathType": 3,
        "introduce": "战略发展部主管",
        "descRandom": [
            120,
            121,
            122,
            123
        ],
        "sound": "chenshengjie",
        "desc": "立足最复杂，准备最充分，决策最成功"
    },
    "43": {
        "id": 43,
        "name": "陈妍",
        "modelId": 6,
        "icon": 10,
        "head": 43,
        "gender": 2,
        "type": 2,
        "pathId": 43,
        "pathType": 4,
        "introduce": "财务部经理",
        "descRandom": [
            124,
            125,
            126,
            127
        ],
        "sound": "chenyan",
        "desc": "商女不知亡国恨，天天都在做凭证"
    },
    "44": {
        "id": 44,
        "name": "陈再甫",
        "modelId": 3,
        "icon": 11,
        "head": 44,
        "gender": 1,
        "type": 2,
        "pathId": 44,
        "pathType": 1,
        "introduce": "运营副厂长",
        "descRandom": [
            128,
            129,
            130,
            131
        ],
        "sound": "chenzaifu",
        "desc": "练兵不怕苦 制敌见真功"
    },
    "45": {
        "id": 45,
        "name": "成文功",
        "modelId": 3,
        "icon": 11,
        "head": 45,
        "gender": 1,
        "type": 1,
        "pathId": 45,
        "pathType": 2,
        "introduce": "基础建设部主管",
        "descRandom": [
            132,
            133,
            134,
            135
        ],
        "sound": "chengwengong",
        "desc": "稳中求胜，尽展凌云之志"
    },
    "46": {
        "id": 46,
        "name": "付德江",
        "modelId": 3,
        "icon": 11,
        "head": 46,
        "gender": 1,
        "type": 2,
        "pathId": 46,
        "pathType": 3,
        "introduce": "制酒二厂车间主任",
        "descRandom": [
            136,
            137,
            138,
            139
        ],
        "sound": "fudejiang",
        "desc": "敢于打硬仗，保证打胜仗"
    },
    "47": {
        "id": 47,
        "name": "罗康云",
        "modelId": 3,
        "icon": 11,
        "head": 47,
        "gender": 1,
        "type": 1,
        "pathId": 47,
        "pathType": 4,
        "introduce": "品质部主管",
        "descRandom": [
            140,
            141,
            142,
            143
        ],
        "sound": "luokangyun",
        "desc": "风貌一流、标准一流、品质一流"
    },
    "48": {
        "id": 48,
        "name": "王承",
        "modelId": 3,
        "icon": 11,
        "head": 48,
        "gender": 1,
        "type": 2,
        "pathId": 48,
        "pathType": 3,
        "introduce": "财务部副总监",
        "descRandom": [
            160,
            161,
            162
        ],
        "sound": "wangcheng",
        "desc": "争分夺秒产佳酿，金钱百万赏新声"
    },
    "49": {
        "id": 49,
        "name": "徐成艳",
        "modelId": 6,
        "icon": 10,
        "head": 49,
        "gender": 2,
        "type": 1,
        "pathId": 49,
        "pathType": 2,
        "introduce": "接待部部长",
        "descRandom": [
            144,
            145,
            146,
            147
        ],
        "sound": "xuchengyan",
        "desc": "欢迎每一次来访，用心每一次服务"
    },
    "50": {
        "id": 50,
        "name": "薛占厅",
        "modelId": 3,
        "icon": 11,
        "head": 50,
        "gender": 1,
        "type": 2,
        "pathId": 50,
        "pathType": 1,
        "introduce": "保安主管",
        "descRandom": [
            148,
            149,
            150,
            151
        ],
        "sound": "xuezhanting",
        "desc": "“退伍不褪色”永葆军人本色！"
    },
    "51": {
        "id": 51,
        "name": "杨健",
        "modelId": 3,
        "icon": 11,
        "head": 51,
        "gender": 1,
        "type": 2,
        "pathId": 51,
        "pathType": 3,
        "introduce": "后勤管理部经理",
        "descRandom": [
            152,
            153,
            154,
            155
        ],
        "sound": "yangjian",
        "desc": "今天饭堂阿姨的手不抖吧"
    },
    "52": {
        "id": 52,
        "name": "张鼎",
        "modelId": 3,
        "icon": 11,
        "head": 52,
        "gender": 1,
        "type": 2,
        "pathId": 52,
        "pathType": 4,
        "introduce": "战略发展部部长",
        "descRandom": [
            156,
            157,
            158,
            159
        ],
        "sound": "zhangding",
        "desc": "敢打敢拼 一切为了赢"
    },
    "53": {
        "id": 53,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 53,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "54": {
        "id": 54,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 54,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "55": {
        "id": 55,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 55,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "56": {
        "id": 56,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 56,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "57": {
        "id": 57,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 57,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "58": {
        "id": 58,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 58,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "59": {
        "id": 59,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 59,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "60": {
        "id": 60,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 60,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "61": {
        "id": 61,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 61,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "62": {
        "id": 62,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 62,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "63": {
        "id": 63,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 63,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "64": {
        "id": 64,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 64,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "65": {
        "id": 65,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 65,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "66": {
        "id": 66,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 66,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "67": {
        "id": 67,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 67,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "68": {
        "id": 68,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 68,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "69": {
        "id": 69,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 69,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "70": {
        "id": 70,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 70,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "71": {
        "id": 71,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 71,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "72": {
        "id": 72,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 72,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "73": {
        "id": 73,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 73,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "74": {
        "id": 74,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 74,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "75": {
        "id": 75,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 75,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "76": {
        "id": 76,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 76,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "77": {
        "id": 77,
        "name": "机器人",
        "modelId": 0,
        "icon": 10,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 77,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "78": {
        "id": 78,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 78,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "79": {
        "id": 79,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 79,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "80": {
        "id": 80,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 80,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "81": {
        "id": 81,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 81,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "82": {
        "id": 82,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 82,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "83": {
        "id": 83,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 83,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "84": {
        "id": 84,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 84,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "85": {
        "id": 85,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 85,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "86": {
        "id": 86,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 86,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "87": {
        "id": 87,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 87,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "88": {
        "id": 88,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 88,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "89": {
        "id": 89,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 89,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "90": {
        "id": 90,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 90,
        "pathType": 6,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "91": {
        "id": 91,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 91,
        "pathType": 1,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "92": {
        "id": 92,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 92,
        "pathType": 2,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "93": {
        "id": 93,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 93,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "94": {
        "id": 94,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 94,
        "pathType": 4,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "95": {
        "id": 95,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 95,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    },
    "96": {
        "id": 96,
        "name": "机器人",
        "modelId": 0,
        "icon": 11,
        "head": 0,
        "gender": 0,
        "type": 5,
        "pathId": 96,
        "pathType": 3,
        "introduce": "机器人",
        "descRandom": [
            1
        ],
        "sound": "0.0",
        "desc": "0.0"
    }
}
export default NpcConfig;