import { BuildingData } from "../../data/DataInterface";
import StaffDataManager from "../../data/StaffDataManager";
import List from "../../framework/component/List";
import BaseView from "../../framework/viewbase/BaseView";
import BuildingStaffSelectItem from "./BuildingStaffSelectItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingStaffSelectView extends BaseView {

    @property(List)
    list: List = null;

    private _staffId = null
    private _staffList = []
    private _callback = null
    private _buildingData:BuildingData = null

    initByExData(param)
    {
        this.updateView(param)
    }

    updateView(param)
    {
        this._staffId = param.staffId
        this._callback = param.callback
        this._buildingData = param.buildingData
        this._staffList = StaffDataManager.instance.getStaffListByBuildingType(this._buildingData.buildingType)
        this.list.numItems = this._staffList.length
    }

    onRenderEvent(item: cc.Node, index: number) {
        if(this._staffList[index])
        {
            item.getComponent(BuildingStaffSelectItem).updateView({
                staffId: this._staffId,
                staffData: this._staffList[index],
                callback: this.onClickItem.bind(this)
            })
        }
    }

    onClickItem(param)
    {
        this.onCloseView()
        this._callback && this._callback(param)
    }

}
