type MessageConfigData = {
	Id: number,
	Alias: string,
	Comment: string,
}
let MessageConfig: { [id: string]: MessageConfigData } = {
    "0": {
        "Id": 0,
        "Alias": "ok",
        "Comment": "操作成功"
    },
    "1": {
        "Id": 1,
        "Alias": "err_nonexistent",
        "Comment": "用户不存在或者对方已下线"
    },
    "2": {
        "Id": 2,
        "Alias": "err_targetUnLine",
        "Comment": "目标玩家不存在"
    },
    "3": {
        "Id": 3,
        "Alias": "err_unLine",
        "Comment": "对方不在线"
    },
    "4": {
        "Id": 4,
        "Alias": "err_blacklist",
        "Comment": "你在对方黑名单中"
    },
    "5": {
        "Id": 5,
        "Alias": "err_exist",
        "Comment": "对方已在你的好友列表中"
    },
    "6": {
        "Id": 6,
        "Alias": "err_unallowed",
        "Comment": "不允许加自己为好友"
    },
    "7": {
        "Id": 7,
        "Alias": "err_fullApply",
        "Comment": "该玩家好友数量已满,无法发送好友申请"
    },
    "8": {
        "Id": 8,
        "Alias": "err_full",
        "Comment": "好友数量满员,无法添加好友"
    },
    "9": {
        "Id": 9,
        "Alias": "err_missing",
        "Comment": "找不到要添加的好友"
    },
    "10": {
        "Id": 10,
        "Alias": "err_data",
        "Comment": "不能从数据库连接池获取连接句柄"
    },
    "11": {
        "Id": 11,
        "Alias": "err_fail",
        "Comment": "插入好友记录时失败"
    },
    "12": {
        "Id": 12,
        "Alias": "err_notAdd",
        "Comment": "不允许将自己添加在黑名单列表中"
    },
    "13": {
        "Id": 13,
        "Alias": "err_notBlacklist",
        "Comment": "找不到要添加的黑名单成员"
    },
    "14": {
        "Id": 14,
        "Alias": "err_InsertFailure",
        "Comment": "插入黑名单记录时失败"
    },
    "15": {
        "Id": 15,
        "Alias": "err_targerNotFrirnd",
        "Comment": "目标不是你的好友"
    },
    "16": {
        "Id": 16,
        "Alias": "err_selfNotFrirnd",
        "Comment": "你不是目标的好友"
    },
    "17": {
        "Id": 17,
        "Alias": "err_notFind",
        "Comment": "没有找到物品"
    },
    "18": {
        "Id": 18,
        "Alias": "err_count",
        "Comment": "物品数量错误"
    },
    "19": {
        "Id": 19,
        "Alias": "err_presenter",
        "Comment": "物品不能被赠送"
    },
    "20": {
        "Id": 20,
        "Alias": "err_notYourFriend",
        "Comment": "对方不在你的好友列表中"
    },
    "21": {
        "Id": 21,
        "Alias": "err_notProposalYou",
        "Comment": "对方没向你求婚"
    },
    "22": {
        "Id": 22,
        "Alias": "err_userNotExit",
        "Comment": "用户不存在"
    },
    "23": {
        "Id": 23,
        "Alias": "err_dontMarry",
        "Comment": "还没结婚"
    },
    "24": {
        "Id": 24,
        "Alias": "err_weddingDone",
        "Comment": "婚礼举办过了"
    },
    "25": {
        "Id": 25,
        "Alias": "err_weddingTime",
        "Comment": "婚礼时间错误"
    },
    "26": {
        "Id": 26,
        "Alias": "err_serverInternal",
        "Comment": "服务器内部错误"
    },
    "27": {
        "Id": 27,
        "Alias": "err_lookOldWedding",
        "Comment": "以前的婚礼无法查看"
    },
    "28": {
        "Id": 28,
        "Alias": "err_noWeddingData",
        "Comment": "没有婚礼数据"
    },
    "29": {
        "Id": 29,
        "Alias": "err_weddingAgreed",
        "Comment": "婚礼已经被同意"
    },
    "30": {
        "Id": 30,
        "Alias": "err_noCurWedding",
        "Comment": "当前没有举办的婚礼"
    },
    "31": {
        "Id": 31,
        "Alias": "err_notWeddingFriend",
        "Comment": "不是新娘或者新郎的朋友"
    },
    "32": {
        "Id": 32,
        "Alias": "err_notInWedding",
        "Comment": "不在观礼队列"
    },
    "33": {
        "Id": 33,
        "Alias": "err_weddingAcceptId",
        "Comment": "接收礼物的玩家ID错误"
    },
    "34": {
        "Id": 34,
        "Alias": "err_insertWedding",
        "Comment": "插入婚礼记录时失败"
    },
    "35": {
        "Id": 35,
        "Alias": "err_weddingApplied",
        "Comment": "婚礼申请中"
    },
    "36": {
        "Id": 36,
        "Alias": "err_childId",
        "Comment": "孩子id不存在"
    },
    "37": {
        "Id": 37,
        "Alias": "err_childNotBorn",
        "Comment": "孩子没出生"
    },
    "38": {
        "Id": 38,
        "Alias": "err_clildPetLen",
        "Comment": "呢称太长了"
    },
    "39": {
        "Id": 39,
        "Alias": "err_noPregnantChild",
        "Comment": "没有怀着的孩子"
    }
}
export default MessageConfig;