//配置相关
export var Config = {
    IsTestModel : true,    //是否测试环境，上线前一定要改成false
    versionCode: 1,      //版本号，读取更新后版本

    // ServerUrl: "ws://njds-login.zqgame.com:7000",  //外网
    // ZoneId: 1,  //外网
    // ServerUrl: "ws://192.168.130.88:7000",  //内网测试
    // ZoneId: 5,  //内网测试
    ServerUrl: CC_DEBUG ? "ws://192.168.130.88:7000" : "ws://njds-login.zqgame.com:7000",
    //ZoneId: CC_DEBUG ? 5 : 1,
   // ZoneId: CC_DEBUG ? 5 : 1,

    ZoneId:3,
    ForwardServerUrl: "ws://192.168.130.97:8002",
    WssServerUrl: "ws://192.168.130.97:8011",
    WssForwardServerUrl: "ws://192.168.130.97:8012",
    
    UseNetWork: 1,  //0不使用网络，1正常
    
    GameId: 3098,
    Account: Math.random().toString(36).slice(2),

    TimeScale: 144,  //现实1秒对应TimeScale秒
    WareHouseItemNum: 100, //仓库单个格子数量
    DrawCardCost: 5,  //单次抽卡消耗钻石
    RefreshMaxNum: 10, //可刷新最大次数
    RefreshCost: 10, //刷新消耗钻石


    
}

