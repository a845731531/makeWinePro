import MessageConfig from "../../config/MessageConfig";
import RandomEventConfig from "../../config/RandomEventConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseDataManager from "../BaseDataManager";

export default class RandomEventManager extends BaseDataManager{

    private static _instance: RandomEventManager = null;

    public static get instance(): RandomEventManager {
        if (this._instance == null) {
            this._instance = new RandomEventManager();
        }
        return this._instance;
    }

    private _eventDataList = []

    private _testCacheEventList = []

    onTestData()
    {
        //xiejinhui TODU
        NetManager.instance.sendMsg("reqRandomEventData")
        for(let i in RandomEventConfig)
        {
            let doing = false
            for(let k = 0 ; k < this._testCacheEventList.length; k++)
            {
                if(RandomEventConfig[i].id == this._testCacheEventList[k].id)
                {
                    doing = true
                    break
                }
            }
            if(!doing && !this.checkNpcIsInEvent(RandomEventConfig[i].npcId))
            {
                let data = {
                        id: RandomEventConfig[i].id,
                        type: RandomEventConfig[i].type,
                        npcId: RandomEventConfig[i].npcId,
                        buildingType: RandomEventConfig[i].buildingType,
                        state: 0,
                        result: 0
                    }
                
                EventManager.instance.dispatchEvent("reqRandomEventData",{
                    data: data
                })
            }
        }
    }

    //假数据用
    checkNpcIsInEvent(npc)
    {
        for(let i = 0 ; i < this._eventDataList.length; i++)
        {
            if(this._eventDataList[i].npcId == npc)
            {
                return true
            }
        }
        return false
    }

    addNetListener()
    {
       // EventManager.instance.addEventListener("reqRandomEventData",this.rspRandomEventdata,this)
  
        EventManager.instance.addEventListener("stNpcChangeBrewNpcCmd_NT",this.rspRandomEventdata,this,-1)

        EventManager.instance.addEventListener("stDoNpcRandBrewNpcCmd_SC",this.stDoNpcRandBrewNpcCmd_SC,this,-1)

        //完成跳转事件
        EventManager.instance.addEventListener("reqRandomEventCompelete",this.rspRandomEventCompelete,this)

        //完成奖惩事件
        EventManager.instance.addEventListener("reqRandomEventSelectOption",this.rspRandomEventOption,this)

        setInterval(this.onTestData.bind(this),3000)
    }


    rspRandomEventdata(serverData)
    {

        cc.log("看下了",serverData)
        return
        if(this._eventDataList.length < 3)
        {
            this._testCacheEventList.push(serverData.data)
            
            this._eventDataList.push(serverData.data)
            EventManager.instance.dispatchEvent(CustomEventEnum.RANDOM_EVENT_UPDTAE)
        }
    }

    rspRandomEventCompelete(serverData)
    {
        for(let i = 0; i < this._eventDataList.length; i++)
        {
            if(this._eventDataList[i].id == serverData.data.id)
            {
                this._eventDataList.splice(i,1)
                EventManager.instance.dispatchEvent(CustomEventEnum.RANDOM_EVENT_UPDTAE)
                return
            }
        }
    }

    rspRandomEventOption(serverData)
    {
        let id = serverData.data.id
        for(let i = 0; i < this._eventDataList.length; i++)
        {
            if(this._eventDataList[i].id == id)
            {

                //事件已完成
                this._eventDataList[i].state = 1

                if(serverData.data.option == 1)
                {
                    this._eventDataList[i].result = Math.random() > 0.5? 1: 2
                }else{
                    this._eventDataList[i].result = Math.random() > 0.5? 3: 4
                }
                
                //发奖励
                let propList = []
                switch(this._eventDataList[i].result)
                {   
                    case 1:
                    case 3:
                        if(RandomEventConfig[id].rewardType == 3)
                        {
                            propList = Tool.convertStrToList(RandomEventConfig[id].reward)
                        }
                        break
                    case 2:
                    case 4:
                        //失败惩罚
                        break
                }

                EventManager.instance.dispatchEvent(CustomEventEnum.RANDOM_EVENT_OPTION_RESULT,{
                    eventData: this._eventDataList[i],
                    propList: propList
                })

                //删数据
                this._eventDataList.splice(i,1)
                EventManager.instance.dispatchEvent(CustomEventEnum.RANDOM_EVENT_UPDTAE)
                return
            }
        }
    }

    /**
     * 获取指定npc的随机事件
     * @param npcId 
     */
    getNpcEventData(npcId)
    {
        for(let i = 0; i < this._eventDataList.length; i++)
        {
            if(this._eventDataList[i].npcId == npcId)
            {
                return this._eventDataList[i]
            }
        }

        return null
    }

    getNpcEventList()
    {
        return this._eventDataList
    }

    reset() {
        EventManager.instance.removeTargetListener(this);
    }

    stDoNpcRandBrewNpcCmd_SC(data){
        if(data.errMsg){
            for (let i in MessageConfig) {
                if(MessageConfig[i].Alias==data.errMsg){
                 EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                     msg: MessageConfig[i].Comment
                 })
                }
             }
        }  
    }
}