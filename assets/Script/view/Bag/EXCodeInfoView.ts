import PackConfig from "../../config/PackConfig";
import PropConfig from "../../config/PropConfig";
import BagDataManager from "../../data/BagDataManager";
import { BagItemData, EXCodeData } from "../../data/DataInterface";
import { Tool } from "../../framework/manager/Tool";
import BaseView from "../../framework/viewbase/BaseView";
import BagItemView from "./BagItemView";
import EXCodeItemView from "./EXCodeItemView";

/**
 * 兑换码 item信息弹窗脚本
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class EXCodeInfoView extends BaseView {

    @property(EXCodeItemView)
    EXCodeNode: EXCodeItemView = null;

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Label)
    txtAutor: cc.Label = null;

    @property(cc.Label)
    txtTime: cc.Label = null;

    @property(cc.Label)
    txtContainer: cc.Label = null;

    @property(cc.Label)
    txtNum: cc.Label = null;

    initByExData(data:EXCodeData) {

        this.EXCodeNode.updateView(data)
        
        // let propId = data.propId

        this.txtName.string = data.name

        this.txtAutor.string = data.autor

        let dateList = ((new Date(data.createtime * 1000)).toLocaleDateString()).split("/")
        this.txtTime.string =  cc.js.formatStr("%s年%s月%s日", dateList[0], dateList[1], dateList[2])

        let container = PackConfig[data.bottleId].container
        this.txtContainer.string = container + "ml"

        //数量
        this.txtNum.string = cc.js.formatStr("数量：%s",data.count)
    }

    onClickUse()
    {

    }
}
