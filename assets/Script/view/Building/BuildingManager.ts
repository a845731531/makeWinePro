
import EventManager from "../../framework/manager/EventManager";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import { BuildingData } from "../../data/DataInterface";
import BuildingDataManager from "../../data/BuildingDataManager";
import BuildingItem from "./item/BuildingItem";
import { EventEnum } from "../../framework/FrameWorkEnum";
import BuildingPosConfig from "../../config/BuildingPosConfig";
import CameraManager from "../../data/CameraManager";
import { Tool } from "../../framework/manager/Tool";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import { BuildingType, CameraType } from "../../Constant/GameEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
import { MarriageBuildingState } from "../Marriage/MarriageBuilding";
import MarriageDataManager from "../../data/MarriageDataManager";
import SoundManager from "../../../../tools/MapEditorProgram/BrewManagerEditor/assets/Script/framework/manager/SoundManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingManager extends cc.Component {

    @property(cc.Prefab)
    framBuyPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    worldFramPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    buildingPrefab: cc.Prefab[] = [];

    @property(cc.Node)
    buildParent: cc.Node = null;

    @property(cc.Node)
    marriageHint: cc.Node = null;

    private _buildingItemList: BuildingItem[] = []

    onLoad() {
        this._buildingItemList = []
        this.addListener()
    }

    addListener()
    {
        EventManager.instance.addEventListener(CustomEventEnum.JumpBuildingView,this.jumpMaterial,this)
        EventManager.instance.addEventListener("BuildingListBrewBuildingCmd_SC",this.initBuildingPrefab,this)
        EventManager.instance.addEventListener(CustomEventEnum.MARRIAGED_SHOW_TITLE, this.onShowTitle, this)
        // EventManager.instance.addEventListener("BuyWorldBuildingBrewBuildingCmd_SC",this.onRspFarmItem,this)
    }
    
    start() {
        this.initBuildingPrefab()
    }

    initBuildingPrefab() {
        let buildDataList = BuildingDataManager.instance.getBuildingList()
        for (let i = 0; i < buildDataList.length; i++) {
            this.createBuildingItem(buildDataList[i])
        }
        this.initFramAddBtn()
    }

    createBuildingItem(buildingData: BuildingData) {

        //防止重复创建
        for(let i = 0; i < this._buildingItemList.length; i++)
        {
            if(this._buildingItemList[i].isBuilding(buildingData.buildingType,buildingData.buildingIndex))
            {
                //重复创建预制体 执行跳出
                return
            }
        }

        try {
            if (buildingData) {
                let prefab = null
                if(buildingData.buildingType == BuildingType.Farm && buildingData.buildingIndex > 2)
                {
                    prefab = this.worldFramPrefab
                }else{
                    prefab = this.buildingPrefab[buildingData.buildingType - 1]
                }
                if (prefab) {
                    let itemNode = cc.instantiate(prefab)
                    itemNode.parent = this.buildParent
                    let itemScript: BuildingItem = itemNode.getComponent("BuildingItem")
                    itemScript.init(buildingData)
                    this._buildingItemList.push(itemScript)
                    itemNode.zIndex = Tool.getBuildingZIndex(itemNode.y)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    getBuildingItemListByType(buildingType)
    {
        let list = []
        for(let i  = 0; i < this._buildingItemList.length; i++)
        {
            if(this._buildingItemList[i].getBuildingType() == buildingType)
            {
                list.push(this._buildingItemList[i])
            }
        }
        return list
    }

    // onRspFarmItem(eventData) {
    //     let buildingList = BuildingDataManager.instance.getBuildingListByType(BuildingType.Farm)
    //     let buildingItemList = this.getBuildingItemListByType(BuildingType.Farm)
    //     let len = buildingItemList.length
    //     for(let i = 0; i < buildingList.length; i++)
    //     {
    //         if( i >= len)
    //         {
    //             this.createBuildingItem(buildingList[i])
    //             this.initFramAddBtn()
    //         }
    //     }
    // }
    initFramAddBtn()
    {
        let itemNode = this.buildParent.getChildByName("FarmBuyNode")
        if(!itemNode)
        {
            itemNode = cc.instantiate(this.framBuyPrefab)
            itemNode.name = "FarmBuyNode"
            itemNode.parent = this.buildParent
            itemNode.zIndex = Tool.getBuildingZIndex(itemNode.y)
        }
      
        let buildingDataList = BuildingDataManager.instance.getBuildingListByType(BuildingType.Farm)
        if(buildingDataList.length > 2)
        {
            let newBuilding = buildingDataList[buildingDataList.length -1]
            let itemPosConfig = BuildingPosConfig[newBuilding.buildingType * 100 + newBuilding.buildingIndex + 1]
            if(itemPosConfig) {
                itemNode.x = itemPosConfig.posX
                itemNode.y = itemPosConfig.posY
                itemNode.zIndex = Tool.getBuildingZIndex(itemNode.y)
            }else{
                itemNode.active = false
            }
        }
    }

    jumpMaterial(param)
    {
        if(this._buildingItemList.length > 0)
        {
            for(let i = 0; i < this._buildingItemList.length; i++)
            {
                if(this._buildingItemList[i].isBuilding(param.buildingType,1))
                {
                    //移动摄像头到对应建筑物
                    CameraManager.instance.getCameraInstance(CameraType.Map).moveCanmeraTo(this._buildingItemList[i].getMiddlePosition())

                    //显示引导手指
                    this._buildingItemList[i].showJumpMaterialFinger()

                    //打开建筑信息
                    this._buildingItemList[i].onClickItem()
                    return
                }
            }
        }
    }

    removeListener()
    {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy()
    {
        this.removeListener()
    }
    onClickPersonal(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.PersonalView
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
        }
    }
    onClickStaff(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.StaffListView
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
        }
    }
    onClickMarket(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.StoreView
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
        }
    }
    //温泉
    onClickHotSpring(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.HotSpringView
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
        }
    }
    //酒庄
    onClickWinery(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "敬请期待"
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
            // EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            //     viewName: PrefabPathEnum.HotSpringView
            // })
        }
    }
    //婚姻登记处
    onClickMarry(event) {
     
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            if (MarriageDataManager.instance.curState == 1) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                    viewName: PrefabPathEnum.MarriageBuilding,
                    exData: MarriageBuildingState.wishTime
                })
            } else if (MarriageDataManager.instance.haveMarriage) {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                    viewName: PrefabPathEnum.MarriageBuilding,
                    exData: MarriageBuildingState.invitation
                })
            } else {
                EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
                    viewName: PrefabPathEnum.MarriageBuilding
                })
            }
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        }
    }
    //售楼中心
    onClickSaleCenter(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
                viewName: PrefabPathEnum.BuildingTargetHouse
            })
            EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
        
        }
    }
    onClickWorldMap(event) {
        let endPos = event.getLocation()
        let startPos = event.getStartLocation()
        if (cc.Vec2.distance(endPos, startPos) < 20) {
            cc.director.loadScene("WorldMapScene")
        }
    }
   //结婚的提示
    onShowTitle(state){
        if (state == MarriageBuildingState.wishTime) {
            this.marriageHint.active = !this.marriageHint.active
        }
    }
    //结婚的提示
    onClickMarriageHint(){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageBuilding,
            exData:MarriageBuildingState.proposal
        })
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    
    }
    //礼堂
    onClickMarriageAuditorium(){
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.MarriageAuditorium,
        })
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_CLICK)
    }
    
}