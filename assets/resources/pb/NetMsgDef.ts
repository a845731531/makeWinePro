
//网络协议对应ID，同时也是事件ID
//模块名_协议名，协议名客户端请求以REQ_开头，服务器响应以RSP_开头
//请求协议ID范围10000+，响应协议ID范围20000+

export enum NetMsgDef {
    UserLoginReturnOkLoginUserPmd_S = 250 * 10000 + 6,
    UserLoginTokenLoginUserPmd_C = 250 * 10000 + 7,
    ZoneInfoListLoginUserPmd_S = 250 * 10000 + 3,
    AccountTokenVerifyLoginUserPmd_CS = 250 * 10000 + 1,

    Common_Test = 9999,
    Common_PING = 10001,
    Common_PONG = 20001,
    Common_NTF_MONEY_CHANGED = 30001,
    Common_NTF_PROP_CHANGED = 30002,
    Common_NTF_ITEM_CHANGED = 30003,

    Login_REQ_LOGIN = 10011,
    Login_RSP_LOGIN = 20011,

    Level_REQ_ADD_EXP = 10009,
    Level_RSP_ADD_EXP = 20009,

    Laboratory_REQ_RESEARCH = 10101,
    Laboratory_RSP_RESEARCH = 20101,

    Building_REQ_START_PRODUCE = 10201,
    Building_RSP_START_PRODUCE = 20201,
    Building_REQ_GATHER = 10202,
    Building_RSP_GATHER = 20202,
    Building_REQ_DESTROY = 10203,
    Building_RSP_DESTROY = 20203,
    Building_REQ_UPGRADE = 10204,
    Building_RSP_UPGRADE = 20204,
    Building_REQ_STORE = 10205,
    Building_RSP_STORE = 20205,
    Building_REQ_TAKEOUT = 10206,
    Building_RSP_TAKEOUT = 20206,
    BUILDING_REQ_CONSTRUCT_ADD_SPEED = 10207,
    BUILDING_RSP_CONSTRUCT_ADD_SPEED = 20207,
    Building_REQ_STORE_SPEEDUP = 10208,
    Building_RSP_STORE_SPEEDUP = 20208,
    /**
     * 请求 签到
     */
    Sign_REQ_SIGN = 10401,
    /**
     * 返回 签到
     */
    Sign_RSP_SIGN = 20401,

    /**
     * 请求 任务数据
     */
    Task_REQ_TASK_LIST = 10501,
     /**
      * 返回 任务数据
      */
    Task_RSP_TASK_LIST = 20501,
    
    Task_NTF_TASK_REFRESH = 30501,
    /**
    * 请求 任务奖励领取
    */
    Task_REQ_GET_REWARD = 10502,
    /**
     * 返回 任务奖励领取
     */
    Task_RSP_GET_REWARD = 20502,

    /**
     * 请求当前订单数据
     */
    Order_REQ_DATA = 10701,
    /**
     * 返回当前订单数据
     */
    Order_RSP_DATA = 20701,
    /**
     * 请求 取消订单
     */
    Order_REQ_CANCEL_ORDER = 10703,
    /**
     * 返回 取消订单
     */
    Order_RSP_CANCEL_ORDER = 20703,
    /**
     * 请求 完成订单
    */
    Order_REQ_SALE = 10704,
    /**
     * 返回  完成订单
     */
    Order_RSP_SALE = 20704,

    Shop_REQ_DRAW_CARD = 10801, //抽卡
    Shop_RSP_DRAW_CARD = 20801,
    Shop_REQ_BUY_GOODS = 10802, //购买
    Shop_RSP_BUY_GOODS = 20802,
    Shop_REQ_REFRESH = 10803, //刷新
    Shop_RSP_REFRESH = 20803,

    Staff_NTF_ADD_STAFF = 30901, //添加员工

    /**
     * 个性化提酒 提交买家信息 请求
     */
    Personal_REQ_PICK_UP_USERINFO = 11002, 
    /**
      * 个性化提酒 提交买家信息 返回
      */
    Personal_RSP_PICK_UP_USERINFO = 21002, 

    /**
     * 配方研究  调酒  请求
     */
    Formula_REQ_MIX_WINE = 11101, 
    /**
     * 配方研究  调酒  请求
     */
    Formula_RSP_MIX_WINE = 21101, 
    
}