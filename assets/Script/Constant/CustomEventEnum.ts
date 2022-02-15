//自定义事件列表

export enum CustomEventEnum {
    ARCHIVE_SAVE_DATA,  //保存数据

    NETWORK_CONNECTED,  //网络连接成功
    NETWORK_CLOSE,  //网络断开

    //-----------------------------------------------------------------------------//

    UPDATE_TOP_VIEW_VISIBLE,  //设置顶部人物层是否显示
    UPDATE_VIEW_VISIBLE,  //设置界面是否显示
    
    /**
     * 刷新背包界面
     */
    BAG_UPDATE_VIEW,

    //-----------------------------------------------------------------------------//

    
    //-----------------------------------------------------------------------------//
    /**
     * 好友
     */
    FRIEND_UPDATE_VIEW,//刷新好友界面

    REFRESH_UPDATE_VIEW,//刷新申请界面

    REFRESH_UPDATE_SEARCH,//搜索好友

    REFRESH_UPDATE_APPLY,//申请列表

    REFRESH_UPDATE_ADD,//添加好友返回

    REFRESH_UPDATE_DELETE,//删除好友关闭界面

    REFRESH_UPDATE_GIFT,//关闭礼物的返回 暂时没用到

    REFRESH_UPDATE_REDDOT,//刷新好友界面的小红点显示

    REFRESH_UPDATE_SEND,//刷新好友界面的小红点请求是否有小红点

    REFRESH_SHUPTUP_FRIEND,//关闭好友界面

    //-----------------------------------------------------------------------------//

       //-----------------------------------------------------------------------------//
    /**
     * 售楼中心
     */
     
     SELLHOUSE_CLOSE_PANEL,//关闭售楼中心界面
     SELLHOUSE_UPDATE_ITEM,//刷新室内装潢家具显示
     SELLHOUSE_UPDATE_BTN,//刷新Item的按钮状态
     SELLHOUSE_UPDATE_FURNITURE,//点击家具卸下家具 
     SELLHOUSE_CHANGETAB, //切换标签页
     //-----------------------------------------------------------------------------//


      /**
     * 结婚
     */
       MARRIAGED_UPDATE_VIEW,//结婚成功刷新 界面
       MARRIAGED_UPDATE_WISHTIME,//跳转婚礼时间
       MARRIAGED_SHOW_TITLE,//显示提示有人向自己求婚
       MARRIAGED_SHOW_INFO,//显示提示信息
       MARRIAGED_UPDATE_APPLY,//申请列表刷新
       MARRIAGED_UPDATE_TIME,//
       MARRIAGED_UPDATE_TIMEOPEN,
       MARRIAGED_SHOW_FIREWORKS,//送烟花
       MARRIAGED_UPDATE_WINE,//送酒
       MARRIAGED_CHILD_RENAME,//修改孩子的名字
       MARRIAGED_CHILD_RENAMESUCEFF,//修改孩子的名字成功的返回
       MARRIAGED_UPDATE_WEDDING,//点击了拒绝重新选择日期
       MARRIAGED_UPDATE_DATEITEM,//更新可选择的日期
       MARRIAGED_UPDATE_AUDITORIUM,//更新礼堂列表
       MARRIAGED_AUDITORIUM_SHUTUP,//关闭礼堂
       MARRIAGED_CHILD_UPDATELIST,//更新孩子的列表
       MARRIAGED_CHILD_CLOSE,//关闭孩子界面
       MARRIAGED_CHILD_SPEDD,//加速了
       MARRIAGED_CHILD_SELECTBTN,//选择孩子服饰按钮
       //-----------------------------------------------------------------------------//

    /**
     * 派遣员工去流水线
     */
    BUILDING_DISPATCH_STAFF,
    /**
     * 升级建筑等级
     */
    BUILDING_UPGRADE_LEVEL,

    BUILDING_CLOSE_CONSTRUCT,

    Building_UPDATE_BUILDING_ITEM,
    /**
     * 交通工具
     */
    BUILDING_SHOW_TRANSPORT,
    //-----------------------------------------------------------------------------//

    
    /**
     * 金币数量更新
     */
    COIN_NUM_CHANGED,
    /**
     * 钻石数量更新
     */
    DIAMOND_NUM_CHANGED,

    //-----------------------------------------------------------------------------//

    /**
     * 点击签到
     */
    SIGN_CLICK_SIGN,
    /**
     * 刷新签到界面
     */
    SIGN_UPDATE_VIEW,

    //-----------------------------------------------------------------------------//

    /**
     * 刷新任务界面
     */
    TASK_UPDATE_VIEW,
    /**
     * 增加任务完成进度
     */
    TASK_ADD_POR,
    /**
     * 领取任务奖励
     */
    TASK_GET_REWARD,
    //-----------------------------------------------------------------------------//
    /**
     * 移动摄像机  不跟随玩家
     */
    CAMERA_MOVE,
    /**
     * 移动摄像机  不跟随玩家
     */
    CAMERA_ZOOM_RATIO,
    //-----------------------------------------------------------------------------//
    /**
     * 控制角色到达指定建筑物周围
     */
    PLAYER_GOTO_BUILDING,
    //-----------------------------------------------------------------------------//
    /**
     * 刷新订单界面
     */
    ORDER_UPDTATE_VIEW,

    //刷新商品列表
    SHOP_REFRESH_GOODS,
    
    //-----------------------------------------------------------------------------//
    //测试
    TEST_DRAW_CARD,

    //-----------------------------------------------------------------------------//
    /**
     * 刷新配方研究界面
     */
    FORMULA_UPDATE_VIEW,

    FORMULA_RUN_MIX_ANIMATION,
    /**
     * 添加老酒数量
     */
    FORMULA_ADD_OLD_WINE_COUNT,
    /**
     * 选择了指定配方
     */
    FORMULA_SELECT_FORMULA,
    /**
     * 清除配方研究数据
     */
    FORMULA_CLEAR_DATA,
    //-----------------------------------------------------------------------------//
    
    JumpBuildingView,
    TARGET_SET_WINE,

    MAIL_UPDTAE_VIEW,

    //-----------------------------------------------------------------------------//

   PERSONAL_PICK_UP_WINE,

    //-----------------------------------------------------------------------------//
    /**
     * 随机事件刷新
     */
    RANDOM_EVENT_UPDTAE,
    RANDOM_EVENT_OPTION_RESULT,

    //-----------------------------------------------------------------------------//

    /**
    * 添加建筑
    */
    MAP_ADD_BUILDING,
    /**
     * 退出编辑界面
     */
    MAP_EXIT_EDITING_VIEW,
    /**
     * 进入编辑界面
     */
    MAP_ENTER_EDITING_VIEW,
    /**
     * 建筑物在障碍物上
     */
    MAP_BUILDING_IN_OBSTACLE,
    /**
     * 创建移动建筑物地下的绿色网格
     */
    MAP_CREATE_BUILDING_GRID,
    /**
     * 刷新移动建筑物地下的绿色网格位置和状态
     */
    MAP_UPDATE_BUILDING_GRID,
    /**
     * 销毁绿色网格
     */
    MAP_DESTROY_BUILDING_GRID,
    /**
     * 创建建筑预制体
     */
    MAP_CREATE_BUILDING_PREFAB,
    /**
     * 移动建筑预制体
     */
    MAP_MOVE_BUILDING_PREFAB,
    /**
     * 显示指定建筑预制体
     */
    MAP_SHOW_BUILDING_PREFAB,
    /**
     * 隐藏指定建筑预制体
     */
    MAP_HIDE_BUILDING_PREFAB,
    /**
     * 创建建筑数据
     */
    MAP_CREATE_BUILDING_DATA,
    /**
     * 移动建筑数据
     */
    MAP_MOVE_BUILDING_DATA,
    /**
     * 销毁建筑数据
     */
    MAP_DESTROY_BUILDING_DATA,
    //-----------------------------------------------------------------------------//

    //聊天
    CLOSE_CHAT_DETAIL,
    ADD_CHAT_MESSAGE,
    CHAT_WITH_PLAYER,

    //-----------------------------------------------------------------------------//

    WORLD_MAP_SELECT_ITEM,

    //-----------------------------------------------------------------------------//


    /**
     * 隐藏地图
     */
     HIDE_MAP_NODE,

     /**
      * 显示地图
      */
     SHOW_MAP_NODE,

}