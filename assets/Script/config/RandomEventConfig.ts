type RandomEventConfigData = {
	id: number,
	type: number,
	jumpType: number,
	npcId: number,
	buildingType: number,
	successPro: number,
	failPro: number,
	rewardType: number,
	punishType: number,
	reward: string[],
	punish: string[],
	option1: string,
	option2: string,
	desc: string,
	bubbleDesc: string,
	success_desc_1: string,
	fail_desc_1: string,
	success_desc_2: string,
	fail_desc_2: string,
}
let RandomEventConfig: { [id: string]: RandomEventConfigData } = {
    "1": {
        "id": 1,
        "type": 1,
        "jumpType": 401,
        "npcId": 15,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37002_1"
        ],
        "punish": [],
        "option1": "走，去看看",
        "option2": "有空再去",
        "desc": "听说新来的主播小姐姐唱歌好好听",
        "bubbleDesc": "走，我带你去听演唱会",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "2": {
        "id": 2,
        "type": 1,
        "jumpType": 301,
        "npcId": 31,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "美女邀约，岂能不去",
        "option2": "酿酒大事，不可耽误",
        "desc": "美女游客邀请你一同游玩，要去温泉瞧瞧吗？",
        "bubbleDesc": "听说牛奶泉对皮肤好，玩家昵称一起来泡泡吗？",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "3": {
        "id": 3,
        "type": 1,
        "jumpType": 301,
        "npcId": 33,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "独乐乐不如众乐乐",
        "option2": "改日赴约",
        "desc": "一个人泡温泉好无聊呀，好想有个人陪我玩~",
        "bubbleDesc": "一个人泡温泉好无聊呀，好想有个人陪我玩~",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "4": {
        "id": 4,
        "type": 1,
        "jumpType": 401,
        "npcId": 29,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37002_1"
        ],
        "punish": [],
        "option1": "天籁不可错过",
        "option2": "隔空点赞",
        "desc": "丹巴美女煮酒唱歌，邀请你过来听歌",
        "bubbleDesc": "捧起哈达 呀拉嗦 唱起歌儿 呀拉嗦 祝愿朋友吉祥 欢乐祝福长相伴 欢乐的锅庄跳起来",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "5": {
        "id": 5,
        "type": 1,
        "jumpType": 401,
        "npcId": 14,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31006_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "有人在背后叫你，回头发现是丹巴美女在宴会厅朝你挥手",
        "bubbleDesc": "朋友！快过来一块玩",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "6": {
        "id": 6,
        "type": 1,
        "jumpType": 501,
        "npcId": 29,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "好友邀请一同观看了康巴美女的表演，关系更亲密了。",
        "bubbleDesc": "“弯弯的大小金川 就像洁白的哈达~”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "7": {
        "id": 7,
        "type": 1,
        "jumpType": 201,
        "npcId": 4,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31006_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "“猫呦！猫呦！翻起来呦”远处传来踩曲歌，踩曲小姐姐邀你一同踩曲",
        "bubbleDesc": "“猫腰！猫腰！翻起来呦！”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "8": {
        "id": 8,
        "type": 2,
        "jumpType": 3,
        "npcId": 3,
        "buildingType": 3,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "10.0"
        ],
        "punish": [
            "-10.0"
        ],
        "option1": "心平气和的与员工沟通",
        "option2": "呵斥一顿，回去上班",
        "desc": "制曲车间两个员工发生了争吵，生产暂停了。",
        "bubbleDesc": "老板快来看看他俩，打起来了都",
        "success_desc_1": "员工虚心接受了教育，握手言和。产值增加10",
        "fail_desc_1": "员工听不进教导，越吵越凶。产值减少10",
        "success_desc_2": "员工停止了争吵，快速回去上班。产值增加10",
        "fail_desc_2": "员工觉得很委屈，直接请假。产值减少10"
    },
    "9": {
        "id": 9,
        "type": 1,
        "jumpType": 202,
        "npcId": 27,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31042_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "玩家昵称，今天工厂又开始了一年一度打高粱大赛，一起来参加吧",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "10": {
        "id": 10,
        "type": 1,
        "jumpType": 403,
        "npcId": 17,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "哇！商栈有活动，厂家大促销啦~",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "11": {
        "id": 11,
        "type": 2,
        "jumpType": 0,
        "npcId": 23,
        "buildingType": 4,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "快点给我看看",
        "option2": "询问黑衣人来历",
        "desc": "烤酒路上一神秘黑衣人拿出神秘包裹，决定送你。",
        "bubbleDesc": "小心为妙",
        "success_desc_1": "获得产值礼包，烤酒产值增加5",
        "fail_desc_1": "神秘人是骗子，烤酒产值减少5",
        "success_desc_2": "成功躲避了诈骗分子，产值增加X",
        "fail_desc_2": "神秘人离开，错失产值礼包。产值减少X"
    },
    "12": {
        "id": 12,
        "type": 2,
        "jumpType": 1,
        "npcId": 27,
        "buildingType": 1,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 2,
        "punishType": 2,
        "reward": [
            "-300.0"
        ],
        "punish": [
            "150.0"
        ],
        "option1": "听天由命",
        "option2": "组织员工查看庄稼",
        "desc": "这几天天天下雨，还不去看下你的庄稼。",
        "bubbleDesc": "",
        "success_desc_1": "受到雨水滋润庄稼长的更旺盛了，生产时间减少5分钟",
        "fail_desc_1": "处理不及时，庄稼被淹。生产时间增加5分钟",
        "success_desc_2": "员工及时处理，避免了庄稼被淹。生产时间减少5分钟",
        "fail_desc_2": "员工操作不当，导致庄稼被毁。生产时间增加5分钟"
    },
    "13": {
        "id": 13,
        "type": 2,
        "jumpType": 1,
        "npcId": 27,
        "buildingType": 1,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "10.0"
        ],
        "punish": [
            "-10.0"
        ],
        "option1": "让庄稼自然生长",
        "option2": "派遣员工前去浇水",
        "desc": "持续高温天气，快去看看你的庄稼吧。",
        "bubbleDesc": "",
        "success_desc_1": "自然的口感需要天然的生长环境，产值增加10",
        "fail_desc_1": "灌溉不及时，庄稼都枯萎了。产值减少10",
        "success_desc_2": "员工及时浇水，保证了生长。产值增加10",
        "fail_desc_2": "浇太多次了，生长受损。产值减少10"
    },
    "14": {
        "id": 14,
        "type": 2,
        "jumpType": 1,
        "npcId": 27,
        "buildingType": 1,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 2,
        "punishType": 2,
        "reward": [
            "-300.0"
        ],
        "punish": [
            "120.0"
        ],
        "option1": "建造临时温室",
        "option2": "赶紧把雪都铲走",
        "desc": "今年安底县遭遇了特大暴雪灾害，庄稼都要冻坏了。",
        "bubbleDesc": "",
        "success_desc_1": "暴雪持续，温室发挥了巨大作用，生产加速5分钟",
        "fail_desc_1": "建造温室花费了大量的资源。生产减速5分钟",
        "success_desc_2": "及时铲雪，避免庄稼被压垮。生产加速5分钟",
        "fail_desc_2": "操作失误，庄稼都被铲坏了。生产减速5分钟"
    },
    "15": {
        "id": 15,
        "type": 1,
        "jumpType": 301,
        "npcId": 32,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "冬天还有什么比吃火锅更爽的事？那肯定是泡温泉！",
        "bubbleDesc": "下雪啦，我们去泡温泉、饮酒吧！",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "16": {
        "id": 16,
        "type": 1,
        "jumpType": 102,
        "npcId": 15,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "玩家昵称，有没有找到与你志同道合的酿酒人呀，赶快添加好友获得奖励",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "17": {
        "id": 17,
        "type": 1,
        "jumpType": 102,
        "npcId": 21,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "一人酿酒难免孤独，快去寻找你的良师益友~",
        "bubbleDesc": "今天学了句中国谚语“在家靠兄弟 出门靠朋友”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "18": {
        "id": 18,
        "type": 1,
        "jumpType": 4,
        "npcId": 8,
        "buildingType": 4,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "好友昵称家的工人来帮你一块烤酒啦，快去看看吧",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "19": {
        "id": 19,
        "type": 1,
        "jumpType": 401,
        "npcId": 15,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37002_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "哇——今天又新来了好多主播小姐姐，邀你到语聊宴会厅一起畅聊人生~",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "20": {
        "id": 20,
        "type": 1,
        "jumpType": 501,
        "npcId": 18,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 4,
        "punishType": 0,
        "reward": [
            "37001_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "恭喜！好友A与你煮酒论英雄，关系更亲密啦~",
        "bubbleDesc": "快去通知好朋友一块酿酒吧",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "21": {
        "id": 21,
        "type": 1,
        "jumpType": 501,
        "npcId": 16,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "你和明月已经亲密无间啦，酒厂给你准备了一份大利。快去求婚吧",
        "bubbleDesc": "只为意中人",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "22": {
        "id": 22,
        "type": 2,
        "jumpType": 501,
        "npcId": 16,
        "buildingType": 0,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 3,
        "punishType": 4,
        "reward": [
            "37003_1"
        ],
        "punish": [
            "37001_-10"
        ],
        "option1": "聊聊看看",
        "option2": "用心酿酒，不谈私情",
        "desc": "上官明月觉得你的酿酒技术很棒，想与你畅谈人生理想",
        "bubbleDesc": "",
        "success_desc_1": "彻夜畅谈，明月十分欣赏你的才华，对你念念不忘。获得精美礼品",
        "fail_desc_1": "酿酒理念不合，明月生气的叫你离开。亲密度减少10",
        "success_desc_2": "专注酿酒，酿酒技艺越发的精湛了。获得精美礼品",
        "fail_desc_2": "哼，好心邀请竟然不止好歹！亲密度减少10"
    },
    "23": {
        "id": 23,
        "type": 1,
        "jumpType": 501,
        "npcId": 26,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 4,
        "punishType": 0,
        "reward": [
            "37001_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "酒厂的厂宠糯米别人踩到了尾巴！快去安抚一下他吧",
        "bubbleDesc": "喵！",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "24": {
        "id": 24,
        "type": 1,
        "jumpType": 501,
        "npcId": 24,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "旺财在农田里刨出一块金光闪闪的东西！",
        "bubbleDesc": "汪！汪！汪汪汪！",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "25": {
        "id": 25,
        "type": 2,
        "jumpType": 1,
        "npcId": 27,
        "buildingType": 1,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "10.0"
        ],
        "punish": [
            "-10.0"
        ],
        "option1": "喷洒农药",
        "option2": "组织员工驱赶",
        "desc": "玩家昵称！蝗灾泛滥，你的农田快被蝗虫吃光了，小麦/高粱已经生产停止了！",
        "bubbleDesc": "",
        "success_desc_1": "农药喷洒及时，保证了庄稼生长。产值增加10",
        "fail_desc_1": "农药喷洒过量，导致庄稼生长受损。产值减少10",
        "success_desc_2": "大家齐心协力，成功等到虫害专家治理了虫灾。产值增加10",
        "fail_desc_2": "员工除害经验不足，没能制止虫灾，不少庄稼都被吃了。产值减少10"
    },
    "26": {
        "id": 26,
        "type": 2,
        "jumpType": 1,
        "npcId": 3,
        "buildingType": 1,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 2,
        "punishType": 2,
        "reward": [
            "-300.0"
        ],
        "punish": [
            "150.0"
        ],
        "option1": "通知消防队救火",
        "option2": "组织员工扑灭",
        "desc": "谁这么没素质！乱扔烟头，堆积的小麦/高粱着火了，快点去救火吧！",
        "bubbleDesc": "",
        "success_desc_1": "消防队赶到，快速扑灭了火势。生产加速5分钟",
        "fail_desc_1": "农田道路太窄，无法通行。收获的庄稼受到了不小的损失。生产减速5分钟",
        "success_desc_2": "员工组织迅速，成功制止了火势蔓延。生产加速5分钟",
        "fail_desc_2": "大家专业不足用水过量，许多庄稼被淹毁。生产减速5分钟"
    },
    "27": {
        "id": 27,
        "type": 2,
        "jumpType": 2,
        "npcId": 3,
        "buildingType": 2,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 3,
        "punishType": 1,
        "reward": [
            "31006_10"
        ],
        "punish": [
            "-10.0"
        ],
        "option1": "继续使用",
        "option2": "修理马车",
        "desc": "今天去大龙井运水，马车发出了奇怪的噪音。",
        "bubbleDesc": "",
        "success_desc_1": "没事发生，按照完成了酿酒订单。奖励赤水上游河水10",
        "fail_desc_1": "运水途中车轮断裂，水撒了一地。产值减少X",
        "success_desc_2": "及时发现轮子问题，更换了轮子，运输速度更快了。奖励赤水河上游河水",
        "fail_desc_2": "修理耽误了订单完成时间，产量减少X"
    },
    "28": {
        "id": 28,
        "type": 1,
        "jumpType": 18,
        "npcId": 6,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 1,
        "punishType": 0,
        "reward": [
            "5.0"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "朋友，今日闲来无事，让我也加入你的酿酒大家庭吧。",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "29": {
        "id": 29,
        "type": 1,
        "jumpType": 5,
        "npcId": 19,
        "buildingType": 5,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 3,
        "punishType": 1,
        "reward": [
            "30003_1"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "立即加温",
        "option2": "寻找维修师",
        "desc": "大事不好了！酒仓的密封好像出了问题，酒都冻住了.储酒时间停止。",
        "bubbleDesc": "朋友，要帮忙不？",
        "success_desc_1": "英明决策，冷冻问题得到解决。获得黑曲轮次酒1",
        "fail_desc_1": "温差太快，储酒容器发生故障。产值减少5",
        "success_desc_2": "30年专业老师傅快速帮你解决了密封问题。获得黑曲轮次酒1",
        "fail_desc_2": "师傅路上堵车，酒水都冻成冰了。产值减少5"
    },
    "30": {
        "id": 30,
        "type": 1,
        "jumpType": 7,
        "npcId": 5,
        "buildingType": 6,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "耐心教育",
        "option2": "训斥一顿",
        "desc": "调配阁的小王上班的时候打瞌睡，把酒液弄混了。生产被迫停止。",
        "bubbleDesc": "晚上不睡觉 晚上呼呼睡",
        "success_desc_1": "认真学习了安全教育，小王勾兑的流程更规范了。产值提升5",
        "fail_desc_1": "左耳进右耳出，小王再次弄混了酒液。产值减少5",
        "success_desc_2": "小王意识到问题的严重性，重新调配弥补了损失。产值增加5",
        "fail_desc_2": "小王与你大吵了一顿，丢下工作走了。产值减少5"
    },
    "31": {
        "id": 31,
        "type": 1,
        "jumpType": 6,
        "npcId": 6,
        "buildingType": 6,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "酿酒车间设备出现了故障。生产停止了，快点去维修吧！",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "32": {
        "id": 32,
        "type": 1,
        "jumpType": 401,
        "npcId": 13,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "听说宴会厅的小姐姐精心准备了一首歌曲，超好听~",
        "bubbleDesc": "",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "33": {
        "id": 33,
        "type": 1,
        "jumpType": 501,
        "npcId": 5,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31042_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "运气爆棚！遇到一位隐士高人。送了你一本酿酒秘籍！",
        "bubbleDesc": "老板，我能看看不",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "34": {
        "id": 34,
        "type": 1,
        "jumpType": 501,
        "npcId": 29,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 4,
        "punishType": 0,
        "reward": [
            "37002_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "谁的手帕被你捡到了，快去找到失主吧！",
        "bubbleDesc": "呜呜，妈妈的手帕去哪了",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "35": {
        "id": 35,
        "type": 1,
        "jumpType": 404,
        "npcId": 18,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37002_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "公会会长举办了大型联谊活动，快去公会里瞧瞧吧",
        "bubbleDesc": "买个酒还相亲起来了",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "36": {
        "id": 36,
        "type": 1,
        "jumpType": 104,
        "npcId": 6,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31018_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "听说今天镇上来了位非常有名的调酒师，快去试试能不能运气好找到他",
        "bubbleDesc": "“千里马常有，而伯乐不常有”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "37": {
        "id": 37,
        "type": 1,
        "jumpType": 501,
        "npcId": 23,
        "buildingType": 6,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "求贤若渴",
        "option2": "不予理睬",
        "desc": "隔壁老王说他可以推荐一位传说级调酒大师，但是需要一些资金，你要相信他吗？",
        "bubbleDesc": "",
        "success_desc_1": "恭喜你！成功为酒厂招募了一名不可多得的酿酒大师。产值增加5",
        "fail_desc_1": "老王拿钱跑路，酿酒大师也不见踪影。产值损失5",
        "success_desc_2": "听说那酿酒大师乃是一位江湖骗子，幸好没给钱。产值增加5",
        "fail_desc_2": "措施良机，隔壁酒厂获得大师后生意更好了。产值减少5"
    },
    "38": {
        "id": 38,
        "type": 1,
        "jumpType": 7,
        "npcId": 5,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31022_2"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "重金聘请的调酒专家正在帮你指导员工生产，快去看看吧！",
        "bubbleDesc": "“品酒四步骤：观色、闻香、尝味、写评语。先会品再学调”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "39": {
        "id": 39,
        "type": 2,
        "jumpType": 8,
        "npcId": 2,
        "buildingType": 8,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 2,
        "punishType": 2,
        "reward": [
            "-300.0"
        ],
        "punish": [
            "150.0"
        ],
        "option1": "联系消防队救火",
        "option2": "组织员工扑灭",
        "desc": "危险！警报！由于员工操作不规范，窖池发生大火。",
        "bubbleDesc": "”快来人！'",
        "success_desc_1": "消防队赶到，快速扑灭了火势。生产加速5分钟",
        "fail_desc_1": "园区太大，没能一时间扑灭火势。生产减速5分钟",
        "success_desc_2": "快速响应，成功遏制了火苗。生产加速5分钟",
        "fail_desc_2": "扑救不规范，设备遭到了损坏。生产减速5分钟"
    },
    "40": {
        "id": 40,
        "type": 1,
        "jumpType": 202,
        "npcId": 27,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31012_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "今年高粱产量大丰收，快来跟农名伯伯一起打高粱吧~",
        "bubbleDesc": "今年的高粱收成好啊！",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "41": {
        "id": 41,
        "type": 1,
        "jumpType": 3,
        "npcId": 2,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "当然，多劳多得嘛",
        "option2": "不行呀，老板也没钱",
        "desc": "今天制曲车间的员工干活格外卖力，你是否要奖励他们一下？",
        "bubbleDesc": "",
        "success_desc_1": "员工积极性得到提升，干活更有劲了。产值增加5",
        "fail_desc_1": "花钱大手大脚，超出预算。产值减少5",
        "success_desc_2": "开源节流，今年利润提升。产值增加5",
        "fail_desc_2": "员工纷纷离职，提桶跑路。产值减少5"
    },
    "42": {
        "id": 42,
        "type": 1,
        "jumpType": 501,
        "npcId": 4,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 4,
        "punishType": 0,
        "reward": [
            "37001_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "制曲车间的秋雅想跟你说说悄悄话",
        "bubbleDesc": "有件事我想了很久想不知道该不该跟你说",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "43": {
        "id": 43,
        "type": 1,
        "jumpType": 5,
        "npcId": 3,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31018_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "组长跑来和你说酒仓深处发现了一批陈年老酒！",
        "bubbleDesc": "老板快来看，这次发财了",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "44": {
        "id": 44,
        "type": 1,
        "jumpType": 105,
        "npcId": 22,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "37003_1"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "靓靓小姐姐正在集市举行拍卖会，快去捧场吧！",
        "bubbleDesc": "东奔西走，必喝金沙好酒",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "45": {
        "id": 45,
        "type": 1,
        "jumpType": 501,
        "npcId": 3,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "送回酒店休息",
        "option2": "送回家里休息",
        "desc": "年底酒厂团建聚餐，小王不胜酒力，醉倒在酒桌上。",
        "bubbleDesc": "",
        "success_desc_1": "小王在酒店捡到一份酒厂配方交给了你。产值增加5",
        "fail_desc_1": "小王一觉睡到了隔天，没来上班。产值减少5",
        "success_desc_2": "感受到公司的温暖，小王工作更积极了。产值增加5",
        "fail_desc_2": "小王一觉睡到了隔天，没来上班。产值减少5"
    },
    "46": {
        "id": 46,
        "type": 2,
        "jumpType": 5,
        "npcId": 7,
        "buildingType": 5,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 0,
        "reward": [
            "31018_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "暴雨频发，酒仓被山体滑坡埋了（存储已经停止！），快去拯救你的存酒！",
        "bubbleDesc": "这可怎么办呐！",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "47": {
        "id": 47,
        "type": 1,
        "jumpType": 501,
        "npcId": 18,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 3,
        "punishType": 1,
        "reward": [
            "31018_5"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "立刻出售",
        "option2": "拒之门外",
        "desc": "偶遇神秘黑衣人带着大额订单想与你订购酱酒。",
        "bubbleDesc": "",
        "success_desc_1": "天降订单，售出了大量酒水。营业额翻番！获得精美礼品",
        "fail_desc_1": "订单合同是伪造的！钱货两空！产值损失5",
        "success_desc_2": "不久在电视看到了神秘人的通缉令，小心驶得万年船。获得精美礼品",
        "fail_desc_2": "神秘人跑去隔壁酒厂订购了大量酒水，营业额大大受损。产值损失5"
    },
    "48": {
        "id": 48,
        "type": 1,
        "jumpType": 501,
        "npcId": 16,
        "buildingType": 0,
        "successPro": 0,
        "failPro": 0,
        "rewardType": 4,
        "punishType": 0,
        "reward": [
            "37001_5"
        ],
        "punish": [],
        "option1": "立即前往",
        "option2": "0.0",
        "desc": "明月小姐姐带着美酒来找你啦！",
        "bubbleDesc": "“与君共举一杯酒，化作人家点点春”",
        "success_desc_1": "0.0",
        "fail_desc_1": "0.0",
        "success_desc_2": "0.0",
        "fail_desc_2": "0.0"
    },
    "49": {
        "id": 49,
        "type": 1,
        "jumpType": 5,
        "npcId": 3,
        "buildingType": 0,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "-5.0"
        ],
        "option1": "展开除四害活动",
        "option2": "派人晚上在酒仓盯着",
        "desc": "最近酒仓的酒液似乎少了一些，怀疑有老鼠偷喝",
        "bubbleDesc": "",
        "success_desc_1": "除四害的计划非常成功，消灭了酒仓里的老鼠。产量增加5",
        "fail_desc_1": "没有老鼠，存酒设置破损，产量减少5",
        "success_desc_2": "酒香四溢，发现流浪汉偷偷喝酒，收为学徒。产值增加5",
        "fail_desc_2": "发现了是老鼠在作祟，第二天停工开展除鼠。产值减少5"
    },
    "50": {
        "id": 50,
        "type": 1,
        "jumpType": 4,
        "npcId": 8,
        "buildingType": 0,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 1,
        "punishType": 1,
        "reward": [
            "5.0"
        ],
        "punish": [
            "5.0"
        ],
        "option1": "换个灯泡就好了",
        "option2": "可能是这两天电压不稳，不用管他",
        "desc": "烤酒车间的灯一闪一闪，看上去有些坏了",
        "bubbleDesc": "",
        "success_desc_1": "换好了灯泡，照明恢复了，工作起来不用担心看不见的问题了。产量增加5",
        "fail_desc_1": "换了灯泡也没有什么效果，连续试了几个灯泡都不行，原来是电压不稳，浪费了不少时间。产量减少5",
        "success_desc_2": "过了一会，电压稳定了，照明恢复了，工作起来不用担心看不见了。产量增加5",
        "fail_desc_2": "灯时暗时亮，非常影响生产。产量减少5"
    },
    "51": {
        "id": 51,
        "type": 1,
        "jumpType": 501,
        "npcId": 6,
        "buildingType": 0,
        "successPro": 0.7,
        "failPro": 0.3,
        "rewardType": 2,
        "punishType": 2,
        "reward": [
            "-300.0"
        ],
        "punish": [
            "300.0"
        ],
        "option1": "赶紧劝劝他们，不要伤和气",
        "option2": "不理睬，待会就好了",
        "desc": "有两位调酒师因为配方选用问题吵得不可开交",
        "bubbleDesc": "我说的就是对的！",
        "success_desc_1": "劝说很有效，两位调酒师很快达成了一致。生产加速5分钟",
        "fail_desc_1": "劝说没起到什么作用，他们吵得更凶了。生产减速5分钟",
        "success_desc_2": "不一会，两位调酒师达成了一致，专心干活了。生产加速5分钟",
        "fail_desc_2": "两位调酒师吵了半天还没有停下来，耽误了生产。生产减速5分钟"
    }
}
export default RandomEventConfig;