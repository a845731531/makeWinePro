/**
 * 摄像机类型
 */
export enum CameraType {
    Map = 1,
    LandMap = 2,
}


/**
 * 关系枚举
 */
export enum RelationType
{
	Relation_Friend = 0,	// 好友
    Relation_Spouse = 2,    // 夫妻
    Relation_SpouseReq	= 16,// 结婚申请列表
    Relation_FriendReq = 14, //同意好友 	
	
}



// // 回答加入某个社会关系
// message stAnswerAddRelationUserCmd
// {
// 	optional RelationType type = 1;		// 社会关系类型RelationType
// 	optional uint32 relationid = 2;		// 社会关系id
// 	optional uint32 answer = 3;			// 回答结果,1表示同意,0表示不同意
// 	optional uint32 isall = 4;			// 是否是一键
// }



/**
 * 列表收缩状态
 */
 export enum ListStateEnum {
    /**
     * 关闭
     */
    close = 0,
    /**
     * 展开
     */
    open = 1
}

/**
 * 游戏场景类型
 */
export enum SceneType {
    /**
     * 大厅
     */
    Hall = 1,
    /**
     * 温泉
     */
    HotSpring = 2,
    /**
     * 酒庄
     */
    Winery = 3
}

export enum SexType {
    Man = 0,
    Woman = 1,
}

/**
 * 任务类型
 */
export enum TaskType {
    Main = 0,
    Branch,
    Daily,
    Guide,
}

/**
 * 任务状态
 */
 export enum TaskState {
    /**
     * 待领取
     */
    UnReceive = 0,
    /**
     * 进行中
     */
    Doing = 1,
    /**
     * 已完成
     */
    Complete = 2,
    Closed = 3,
}

export enum MoneyPropId {
    EXP = 30000,    //经验
    COIN = 30001,  //金币
    DIAMOND = 30002, //钻石
    WHEAT = 31012, //小麦
    SORGHUM = 31018, //高粱
    WHEAT_Z = 31036, //小麦种子
    SORGHUM_Z = 31042, //高粱种子
    Water = 31006, //水
    GUIDEFORMULA = 33000,//新手配方
    GUIDEWINE = 34000,//新手酒
}

export enum WineTabType {
    ALL = 0,    //全部
    JS = 1,     //金沙古酒
    BNSC = 2,   //百年慎初
    SCDJ = 3,   //慎初斗酒
    CUSTOM = 100, //自定义酒
}

export enum StaffType {
    QUNV = 0,
    COOKER,
    MIXOLOGIST,
    WAITER,
    FARMER,
    WORKER,
    Security
}

export enum ItemType {
    EXP      = -1,  //经验
    MONEY    = 0,  //货币
    MATERIAL = 1,   //原材料
    BASEWINE = 2,   //基酒
    FORMULA  = 3, //配方
    WINE     = 4,  //成品酒
    OLD_WINE = 5,   //老酒
    STAFF    = 6,   //员工
    GIFT     = 8,   //好友赠送礼物的道具
    PROP     = 9,   //普通道具
    TOOL     = 10,  //工具
    SKIN     = 11,  //时装
    FURNITURE     = 12,  //家具

    EXCode = 100,   //兑换码
}

export enum BagType {
    All = 0,        //全部
    WIEN = 1,       //酒
    EXCODE = 2,     //兑换码
    PROPERTY = 3,    //资产
    OTHER = 4,       //其他
}

export enum MaterialType {
    Water = 1,
    Wheat = 2,
    Sorghum = 3,
    Qu = 4,
    OldWine = 5,
}

export enum MailType {
    Normal = 1,//普通邮件
    Reward = 2,//奖励邮件
    QRCode = 3,//兑换码邮件
}

export enum MailStateType {
    NoRead = 0,//未读
    HasRead = 1,//已读
    HasGet = 2,//已领取
}

/**
 * 建筑物类型
 */
export enum MapItemType {
    /**
     * 空地
     */
    SPACE = 1,
    /**
     * 建筑物
     */
    BUILDING = 2,
    /**
     * 不固定障碍物
     */
    UOTFIXED_OBSTACLE = 3,
    /**
     * 固定障碍物
     */
    FIXED_OBSTACLE = 4,
}
 
export enum BuildingType {
    Farm = 1,       //农田
    Water = 2,   //水
    ZhiQu = 3,  //制曲车间
    KaoJiu = 4,  //烤酒车间
    JiuCang = 5,      //酒库
    Wine = 6,       //酿造厂
    Laborary = 7,       //实验室 调酒 调配阁
    JiaoChi = 8,     //窖池
}

export enum JumpType {
    //----------跳转建筑类------------//
    Farm = 1,       //农田
    Water = 2,   //水
    ZhiQu = 3,  //制曲车间
    KaoJiu = 4,  //烤酒车间
    JiuCang = 5,      //酒库
    Wine = 6,       //酿造厂
    Laborary = 7,    //调配阁
    JiaoChi = 8,     //窖池

    //---------跳转游戏页面-------------//
    Shop = 101,     //商店
    Friend = 102,   //好友
    Mail = 103,   //邮件
    Staff = 104,   //员工
    Market = 105,   //集市
    Personal = 106,   //个性化

    //---------跳转小游戏-------------//
    CaiQuGame = 201,  //采曲小游戏
    DaGaoLiang = 202,   //打高粱小游戏

    //---------跳转新场景页面-------------//
    HotSpring = 301,   //温泉
    Winery = 302,   //酒庄

    //---------跳转社交页面-------------//
    Party = 401,    //宴会
    News = 402,     //消息

    //---------跳转某个NPC-------------//
    NPC = 501,
}

export enum itemDiscardType {
    /**
     * 不可消耗
     */
    NONE = 0,
    /**
     * 可出售
     */
    SALE = 1,
    /**
     * 可拆解
     */
    DECOMPOSE = 2,
    /**
     * 可丢弃
     */
    DISCARD = 3,
    /**
     * 可订单
     */
    ORDER = 4,
    /**
     * 可提酒
     */
    PICKUP = 5
}

export enum itemUseType {
    /**
     * 不可使用
     */
    NONE = 0,
    /**
     * 使用
     */
    USE = 1,
    /**
     * 拿出
     */
    TAKEOUT = 2,
    /**
     * 穿戴
     */
    WEAR = 3,
}
export class RoleStateEnum {
    /**
     * 背面走路
     */
    public static upRun = "d-run"
    /**
     * 背面待机
     */
    public static upIdle = "d-idle"

    /**
     * 正面走路
     */
    public static dowmRun = "a-run"
    /**
     * 正面待机
     */
    public static dowmIdle = "a-idle"

    /**
     * 右上行走
     */
    public static rightUpRun = "c-run"
    /**
     * 右上待机
     */
    public static rightUpIdle = "c-idle"

    /**
     * 右下行走
     */
    public static rightDownRun = "b-run"
    /**
     * 右下待机
     */
    public static rightDownIdle = "b-idle"
}

export class CarStateEnum {
    /**
     * 背面走路
     */
    // public static left = "C1"
    /**
     * 背面待机
     */
    public static right = "E2"
}

export enum DirectionEnum {

    /**
     * 上
     */
    Up = 1,
    /**
     * 上
     */
    Down = 2,
    /**
     * 上
     */
    Left = 3,
    /**
     * 上
     */
    Right = 4,
    /**
     * 左上
     */
    LeftUp = 5,
    /**
     * 左下
     */
    LeftDown = 6,
    /**
     * 右上
     */
    RightUp = 7,
    /**
     * 右下
     */
    RightDown = 8,

}

export enum NpcPathType {
    /**
     * 往返路径后人物停留最后坐标原地3s后消失随机出现下名NPC
     */
    RETURN_STAY = 1,
    /**
     * 往返循环1次后人物消失随机出现下名NPC
     */
    RETURN = 2,
    /**
     * 单次路径后人物消失随机出现下名NPC
     */
    ONCE = 3,
    /**
     * 单次路径到达坐标1停顿xs，坐标2停顿2xs后消失随机出现下名NPC
     */
    SECTION = 4,
    /**
     * 原地停留，不消失
     */
    STATIC = 5,
    /**
     * 到达目的地不消失
     */
    END_NO_MOVE = 6,
}

export enum NpcType {
    /**
     * 任务npc 
     */
    TASK = 1,
    /**
     * 随机事件npc 
     */
    EVENT = 2,
    /**
     * 温泉npc 
     */
    HOT_SPRING = 3,
    /**
     * 普通npc 
     */
    NORMAL = 4,
    /**
     * 玩家 
     */
    PLAYER = 5,
    /**
     * 酒庄npc 
     */
    WINERY = 6,
    /**
     * 动物npc 
     */
    ANIMAL = 7,
    /**
     * 雕像 
     */
    STATUE = 8,
}

export enum NpcTabType {
    TALK = 0,
    GIFT = 1,
    TASK = 2,
    HOT_SPRING = 3,
    EVENT = 4,
    MARRY = 5,
    WINE = 6,
}

export enum ChatMessageType {
    System = 0,  //系统
    World = 1,   //世界
    Clan = 2,    //公会
    Private = 3, //私聊
}
export enum ProduceState {
    Idle = 0,
    Working = 1,
    Pause = 2,
    Finished = 3,
}

export enum SmallGameState {
    Idle = 0,
    InGame = 1,
    Complete = 2,
}
export enum ServerType {
    Gateway = 0,
    Login = 1,
}
export enum LoginState {
    Success = 0,
    Create = 1,
    Failed = 2,
}