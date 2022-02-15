import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import UserDataManager from "../../data/UserDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import WorldNodeItem from "./WorldNodeItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseMapInfo extends cc.Component {

    @property(cc.Label)
    txtId: cc.Label = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtPos: cc.Label = null;

    @property(cc.Node)
    btnEnter: cc.Node = null;

    private _param = null
    private _gridData = null

    updateView(param)
    {

        this._param = param
        this._gridData = param.gridData

        this.node.active = true

        this.txtId.string = cc.js.formatStr("编号：No.%s",this._gridData.landId)
        
        this.txtName.string = this._gridData.owner == ""? "无" :this._gridData.owner

        this.txtPos.string = cc.js.formatStr("坐标：（%s,%s）",this._gridData.row,this._gridData.column)

        this.btnEnter.active = this._gridData.userId == 0
        if(this._gridData.userId == UserDataManager.instance.getUserId())
        {
            this.btnEnter.active = true
        }
    }

    onClickEnter()
    {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP,{
            viewName: PrefabPathEnum.LandView,
            exData: {
                gridData: this._gridData
            }
        })
    }

    onClickClose()
    {
        this.node.active = false

        if(this._param && this._param.item)
        {
            let com = this._param.item.getComponent(WorldNodeItem) 
            com && com.hideSelectIcon && com.hideSelectIcon()
        }
    }

}