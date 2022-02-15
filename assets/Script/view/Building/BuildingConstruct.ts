import BuildingConfig from "../../config/BuildingConfig";
import List from "../../framework/component/List";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import EventManager from "../../framework/manager/EventManager";
import BuildingConstructItem from "./BuildingConstructItem";
import { BuildingType, ListStateEnum } from "../../Constant/GameEnum";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { SoundEnum } from "../../Constant/SoundEnum";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingConstruct extends cc.Component {

    @property(List)
    list: List = null;

    @property(cc.Node)
    scrollMoveNode: cc.Node = null;

    @property(cc.Node)
    closeBtn: cc.Node = null;

    @property(cc.Node)
    openArrow: cc.Node = null;

    @property(cc.Node)
    closeArrow: cc.Node = null;

    private _buildingDataList = []

    private _viewIsRuning = false

    private _viewState = ListStateEnum.open

    private _tagType = 1 //1:建筑  2:装饰

    initByExData(isOpen) {
        if(!isOpen) {
            this._viewState = ListStateEnum.close
            this.scrollMoveNode.y = -450
            this.list.node.active = false
        }
    }
    start() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onChangeOpenState, this)
        if(this.closeBtn["_touchListener"]) {
            this.closeBtn["_touchListener"].setSwallowTouches(false)
        }
        this.updateView()
    }
    onEnable() {
        EventManager.instance.addEventListener(CustomEventEnum.MAP_ADD_BUILDING, this.onMapAddBuilding, this)
        EventManager.instance.addEventListener(CustomEventEnum.MAP_DESTROY_BUILDING_GRID, this.onMapStopAddBuilding, this)

        EventManager.instance.addEventListener(CustomEventEnum.MAP_CREATE_BUILDING_PREFAB,this.updateView,this,)
    }
    onDisable() {
        EventManager.instance.removeTargetListener(this)
    }
    updateView() {
        this.openArrow.active = this._viewState == ListStateEnum.close
        this.closeArrow.active = this._viewState == ListStateEnum.open

        this._buildingDataList = []
        for (let buildingType in BuildingConfig) {
            if(BuildingConfig[buildingType].worldLandTab == this._tagType)
            {
                this._buildingDataList.push(BuildingConfig[buildingType])
            }
        }

        this.list.numItems = this._buildingDataList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        item.getComponent(BuildingConstructItem).updateView(this._buildingDataList[index])
    }

    onChangeOpenState(event) {
        if(this._viewState == ListStateEnum.close) {
            this.onMoveList(false)
        } else {
            this.onMoveList(true)
        }
    }

    onClickToggle(event,index)
    {
        EventManager.instance.dispatchEvent(EventEnum.PLAY_AUDIO, SoundEnum.COMMON_TOGGLE)
        this._tagType = index
        this.updateView()
    }

    onMapAddBuilding() {
        this.onMoveList(true)
    }

    onMapStopAddBuilding() {
        this.onMoveList(false)
    }

    onMoveList(runClose) {
        let self = this

        if (this._viewIsRuning) {
            return
        }

        if (runClose && this._viewState != ListStateEnum.open) {
            return
        }

        if (!runClose && this._viewState != ListStateEnum.close) {
            return
        }
        let targetY = 45
        if(runClose) {
            targetY = -450
        } else {
            self.list.node.active = true
        }
        this._viewIsRuning = true
        let action = cc.sequence(
            cc.moveTo(0.2, cc.v2(this.scrollMoveNode.x, targetY)).easing(cc.easeOut(1.5)),
            cc.callFunc(() => {
                self._viewIsRuning = false
                runClose && (self._viewState = ListStateEnum.close)
                !runClose && (self._viewState = ListStateEnum.open)
                if(self._viewState == ListStateEnum.open) {                    
                    // self.closeBtn.enabled = true                    
                } else {
                    self.list.node.active = false
                }
                self.openArrow.active = self._viewState == ListStateEnum.close
                self.closeArrow.active = self._viewState == ListStateEnum.open
            })
        )

        this.scrollMoveNode.runAction(action)
    }
    onDestroy() {

    }
}