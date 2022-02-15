//framework事件列表

export enum Direction {
    LEFT = 0,
    LEFT_UP,
    UP,
    RIGHT_UP,
    RIGHT,
    RIGHT_DOWN,
    DOWN,
    LEFT_DOWN,
}


export enum EventEnum {
    /**
     * 播放背景音乐
     */
    PLAY_MUSIC = 3000,
    /**
     * 停止背景音乐
     */
    STOP_MUSIC,
    /**
     * 播放音效
     */
    PLAY_AUDIO,
    /**
     * 设置是否开启音乐
     */
    MUSIC_SETTING_ENABLE,
    /**
     * 切换是否可以播放音效
     */
    AUDIO_SETTING_ENABLE,
    /**
     * 显示提示
     */
    SHOW_TOAST,
    /**
     * 显示模拟对话框
     */
    SHOW_MODAL,
    HIDE_MODAL,
    
    /**
     * 显示弹窗
     */
    SHOW_POPUP,
    /**
     * 关闭全部弹窗
     */
    CLOSE_ALL_POPUP,
    /**
     * 根据名字关闭弹窗
     */
    CLOSE_POPUP_BYNAME,
    /**
     * 根据节点关闭弹窗
     */
    CLOSE_POPUP_BYVIEW,
    /**
     * 显示loading页效果
     */
    SHOW_LOADING_EFFECT,
    /**
     * 隐藏loading页效果
     */
    HIDE_LOADING_EFFECT,
    /**
     * 摇杆朝某方向移动
     */
    JOYSTICK_MOVE_TOWARD,
    /**
     * 摇杆停止移动
     */
    JOYSTICK_STOP_MOVE,
    /**
     * 设置摇杆状态
     */
    JOYSTICK_CHANGE_STATE,

    /**
     * 检查引导
     */
    CHECK_GUIDE,
    GUIDE_FINISHED,
    STOP_GUIDE,
}
export enum GuideClickType {
    Tip,  //只提示不屏蔽点击
    Hight, //高亮可点穿
    Mask,  //全屏不能点击
}
export type GuideData = {
    guideId: number,
    step: number,
    clickType: number,
    startConditionType: string,  //开始条件类型
    startConditionParam: string, //开始条件参数
    guideText: string,        //引导文字
    speakerName: string,
    fingerOffset: string,
    guideNodeName: string,    //高亮节点
    customEventName: string,  //派发事件ID
    eventParam: string,       //事件参数
    nextConditionType: string, //下一步条件类型
    nextConditionParam: string, //下一步条件参数
    dialogOffset: string, //对话框位置偏移
}