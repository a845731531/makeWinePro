import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import JudgeConfig from "../../config/JudgeConfig";
import PropConfig from "../../config/PropConfig";
import StringConfig from "../../config/StringConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import BaseDataManager from "../BaseDataManager";
import PackConfig from "../../config/PackConfig";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import BagDataManager from "../BagDataManager";
import GuideManager from "../../framework/guide/GuideManager";
import { ItemType } from "../../Constant/GameEnum";
import { NetManager } from "../../framework/network/NetManager";
import UserDataManager from "../UserDataManager";
import { EXCodeData } from "../DataInterface";

export default class PersonalManager extends BaseDataManager {

    private static _instance: PersonalManager = null;

    public static get instance(): PersonalManager {
        if (this._instance == null) {
            this._instance = new PersonalManager();
        }
        return this._instance;
    }

    private _wineDescMap = {}

    private editBoxCache = {}

    addNetListener() {

        EventManager.instance.addEventListener("PackingWineBrewUserCmd_SC", this.onRspPickUpWine, this,-1)

        EventManager.instance.addEventListener(CustomEventEnum.PERSONAL_PICK_UP_WINE,this.onReqPickUpWine,this,-1)

        //暂时没用到了
        // EventManager.instance.addEventListener(NetMsgDef.Personal_RSP_PICK_UP_USERINFO, this.onRspPickUpUserInfo, this,-1)

    }

    getPackDataList(wineId, type) {
        let result = []
        let winePackList = []
        if(type == 1)
        {
            winePackList = WineQualilyConfig[wineId].packList
        }else{
            winePackList = WineQualilyConfig[wineId].bottleList
        }
        for (let i = 0; i < winePackList.length; i++) {
            if (PackConfig[winePackList[i]]) {
                result.push(PackConfig[winePackList[i]])
            }
        }
        return result
    }

    /**
     * 获取出厂日期
     * @returns 
     */
    getProductDateStr() {
        //xiejinhui TODO 后面再用服务器时间
        let dateList = ((new Date()).toLocaleDateString()).split("/")
        return cc.js.formatStr("出厂日期：%s年%s月%s日", dateList[0], dateList[1], dateList[2])
    }

    getWineDesc(wineId) {
        let result = ""
        try {
            if (!this._wineDescMap[wineId]) {
                let quality = PropConfig[wineId].quality
                let descList = JudgeConfig[quality + 1].descRandom
                let descId = Math.floor(Math.random() * descList.length)
                this._wineDescMap[wineId] = StringConfig[descId].string
            }
            result = this._wineDescMap[wineId]
        } catch (error) {
            result = "酒色微黄，酱香浓郁，酒花饱满、密集细腻，口感醇厚，酒味经久不散!!!"
        }
        return result
    }

    private _excodeData: EXCodeData = null
    onReqPickUpWine(param)
    {

        //包装成功 服务器不返回数据  坑爹！
        //so 暂时储存本次包装的数据  用于恭喜获得展示
        this._excodeData = {
            id: 0,                 //兑换码id
            type: ItemType.EXCode,          //类型
            count: param.num,             //瓶数
            code: "",                       //兑换码  （没用了）
            name: param.name,             //酒自定义的名称
            autor: UserDataManager.instance.getUserName(),    //制作人
            createtime: UserDataManager.instance.getGameTime(),    //制作日期
            propId: param.wine_id,            //酒id
            packId: param.box_id,             //包装id
            bottleId: param.bottle_id,        //瓶子id
            state: 0,   //状态 '0:初始化状态， 1：拍卖中  2：已兑换',
        }

        // required int32   box_id   	= 1;  //盒子
        // required int32   bottle_id   = 2;  //瓶子		
        // required int32   wine_id	   	= 3;  //消耗id
        // required int32   num	   		= 4;  //数量
        // required string 	name	   	= 5;  //名字
        // required string 	desc	   	= 6;  //描述
        NetManager.instance.sendMsg("PackingWineBrewUserCmd_CS",{
            box_id: param.box_id,
            bottle_id: param.bottle_id,
            wine_id: param.wine_id,
            num: param.num,
            name: param.name,
            desc: "",
        })

    }

    /**
     * 提酒申请 返回
     */
    onRspPickUpWine(eventData) {

        if(eventData.error_code)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "服务器繁忙，请稍后再试!"
            })
            return
        }


        if(GuideManager.instance.isInGuide())
        {
            //恭喜获得新手酒
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                viewName: PrefabPathEnum.CongratulationsView,
                exData:{
                    propList: [{
                        propId: 34000,
                        customNum: 1
                    }],
                }
            })
        }else{
            //没有新手引导了
            if(this._excodeData)
            {

                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                    viewName: PrefabPathEnum.CongratulationsView,
                    exData:{
                        propList:[this._excodeData]
                    }
                })
                this._excodeData = null
            }
        }
        
        BagDataManager.instance.reqEXCodeDataList()
        EventManager.instance.dispatchEvent(EventEnum.CHECK_GUIDE, {
            type: "CustomWineSuccess"
        })
    }

    /**
     * 提酒人 信息提交  返回
     */
    onRspPickUpUserInfo(data) {
        for (let i in data) {
            this.setEditBoxCache(i, data[i])
        }

        EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "提酒信息上报完毕，请耐心等待客服联系！"
        })
    }

    /**
     * 设置输入框缓存
     * @param key 
     * @param value 
     */
    setEditBoxCache(key, value) {
        let curKey = "personal_" + key
        this.editBoxCache[curKey] = value
    }

    /**
     * 获取输入框缓存
     * @param key 
     * @returns 
     */
    getEditBoxCache(key) {
        let curKey = "personal_" + key
        if (this.editBoxCache[curKey]) {
            return this.editBoxCache[curKey]
        }
        return ""
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }

 
}