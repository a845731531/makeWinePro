import { NetMsgDef } from "../../../resources/pb/NetMsgDef";
import PropConfig from "../../config/PropConfig";
import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { PrefabPathEnum } from "../../Constant/PrefabPathEnum";
import BagDataManager from "../../data/BagDataManager";
import EventManager from "../../framework/manager/EventManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import { Tool } from "../../framework/manager/Tool";
import { NetManager } from "../../framework/network/NetManager";
import BaseView from "../../framework/viewbase/BaseView";
import SliderEx from "../../framework/component/SliderEx";
import PackConfig from "../../config/PackConfig";
import WineQualilyConfig from "../../config/WineQualilyConfig";
import GuideManager from "../../framework/guide/GuideManager";
import UserDataManager from "../../data/UserDataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalView extends BaseView {

    @property(cc.EditBox)
    edName: cc.EditBox = null;

    @property(cc.Sprite)
    packIcon: cc.Sprite = null;

    @property(cc.Node)
    unSelectDesc: cc.Node = null;

    @property(cc.Sprite)
    bottleIcon: cc.Sprite = null;

    @property(cc.Sprite)
    packIcon2: cc.Sprite = null;

    @property(cc.Sprite)
    bottleIcon2: cc.Sprite = null;

    @property(cc.Label)
    packPrice: cc.Label = null;

    @property(cc.Label)
    bottlePrice: cc.Label = null;

    @property(cc.Node)
    packSelectBg: cc.Node = null;

    @property(cc.Node)
    bottleSelectBg: cc.Node = null;

    @property(cc.Label)
    txtBottleContainer: cc.Label = null;

    @property(cc.Sprite)
    addNode: cc.Sprite = null;

    @property(cc.Sprite)
    wineNode: cc.Sprite = null;

    @property(cc.Sprite)
    wineIcon: cc.Sprite = null;

    @property(cc.Sprite)
    qualityIcon: cc.Sprite = null;

    @property(cc.Node)
    sliderNode: cc.Node = null;

    @property(SliderEx)
    wineSlider: SliderEx = null;

    @property(cc.Label)
    txtCurContainer: cc.Label = null;

    @property(cc.Label)
    txtWineType: cc.Label = null;

    @property(cc.Label)
    txtTotalCount: cc.Label = null;

    @property(cc.Label)
    txtCurCount: cc.Label = null;

    @property(cc.Label)
    compositionDesc: cc.Label = null;

    @property(cc.Label)
    totalPrice: cc.Label = null;

    @property(cc.Node)
    btnClose: cc.Node = null;

    private _bottleId = 0
    private _packId = 0
    private _bottleContainer = 100
    private _curCount = 0
    private _totalContainer = 0
    private _totalPrice = 0
    private _cost = 0

    private _wineId = -1

    private _desc = ""

    onLoad() {
        this.addListener()
        this.updateView()

        this._desc = cc.js.formatStr("酒精 > %s%\n小麦 > %s%\n高粱 > %s%",Tool.getRandomLimit(10,20),Tool.getRandomLimit(5,10),Tool.getRandomLimit(5,10))
    }

    updateView() {
        this._packId = 0
        this._bottleId = 0
        this._wineId = -1
        this.wineSlider.progress = 1

        // this.edName.string = PersonalManager.instance.getEditBoxCache("wineName")

        this.bottleIcon.node.active = false
        this.packIcon.node.active = false
        this.bottleSelectBg.active = false
        this.packSelectBg.active = false

        this.updateWineInfo()
        this.btnClose.active = !GuideManager.instance.isInGuide()
    }

    updatePackView() {
        this.bottleIcon.node.active = true
        this.bottleSelectBg.active = true

        if (this._bottleId == 0) {
            this._bottleId = WineQualilyConfig[this._wineId].bottleList[0]
        }
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[this._bottleId].icon), this.bottleIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[this._bottleId].icon), this.bottleIcon2)

        this.packIcon.node.active = true
        this.packSelectBg.active = true
        if (this._packId == 0) {
            this._packId = WineQualilyConfig[this._wineId].packList[0]
        }
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[this._packId].icon), this.packIcon)
        Tool.loadSpriteFrame(cc.js.formatStr("texture/personal/%s", PackConfig[this._packId].icon), this.packIcon2)

        this.packPrice.string = PackConfig[this._packId].price / 1000 + ""
        this.bottlePrice.string = PackConfig[this._bottleId].price / 1000 + ""

        this._bottleContainer = PackConfig[this._bottleId].container
        this.txtBottleContainer.string = Tool.unitConversion(this._bottleContainer) + cc.js.formatStr("(%sml)",this._bottleContainer)
    }

    updateWineInfo() {
        let count = BagDataManager.instance.getItemNum(this._wineId)
        if (count > 0 && this._wineId != -1) {

            this.updatePackView()
            this.addNode.node.active = false
            this.wineNode.node.active = true
            this.sliderNode.active = true
            this.unSelectDesc.active = false

            this.txtWineType.string = "类型：酱香型"

            //xiejinhui TODO 先随机
            this.compositionDesc.string = this._desc

            this._totalContainer = Math.floor(count / this._bottleContainer)

            this._curCount = Math.floor(this.wineSlider.progress * this._totalContainer)
            this.txtCurContainer.string = this._curCount + "瓶"
            this._cost = this._bottleContainer * this._curCount
            this.txtTotalCount.string = cc.js.formatStr("/%dml", this._totalContainer * this._bottleContainer)
            this.txtCurCount.string = this._cost + ""

            let quality = PropConfig[this._wineId].quality
            Tool.loadSpriteFrame(cc.js.formatStr("texture/bag/icon_border_%d", quality), this.qualityIcon)

            let frameName = BagDataManager.instance.getItemIconById(this._wineId)
            Tool.loadSpriteFrame(frameName, this.wineIcon)

            this._totalPrice = this._curCount * (PackConfig[this._packId].price + PackConfig[this._bottleId].price)
            this.totalPrice.string = this._totalPrice / 1000 + ""
        } else {
            this.txtWineType.string = ""
            this.wineNode.node.active = false
            this.addNode.node.active = true
            this.sliderNode.active = false
            this.unSelectDesc.active = true

            this.txtTotalCount.string = ""
            this.txtCurCount.string = ""
        }
    }

    onClickMore(event, index) {
        if (this._wineId == -1) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请先添加酒液!"
            })
            return
        }
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.AddPackView,
            exData: {
                wineId: this._wineId,
                type: index,
                callback: (packId) => {
                    if (PackConfig[packId].type == 1) {
                        this.onSelectPack(packId)
                    } else {
                        this.onSelectBottle(packId)
                    }

                }
            }
        })
    }

    onSelectBottle(index) {
        this._bottleId = parseInt(index)
        this._bottleContainer = PackConfig[index].container

        if( BagDataManager.instance.getItemNum(this._wineId) >= this._bottleContainer)
        {
            this.wineSlider.enabled = true
            this.wineSlider.progress = 1
        }else{
            this.wineSlider.enabled = false
            this.wineSlider.progress = 0
        }

        this.updateWineInfo()

    }

    onSelectPack(index) {
        this._packId = parseInt(index)
        this.updateWineInfo()
    }

    onClickAddWine() {
        EventManager.instance.dispatchEvent(EventEnum.SHOW_POPUP, {
            viewName: PrefabPathEnum.AddWineView,
            exData: {
                callback: (wineId) => {
                    //选完酒液的回调
                    this._packId = 0
                    this._bottleId = 0
                    this._wineId = wineId
                    this.updateWineInfo()
                    this.onSelectBottle(WineQualilyConfig[this._wineId].bottleList[0])
                    this.onSelectPack(WineQualilyConfig[this._wineId].packList[0])
                },
                wineId: this._wineId
            }
        })
    }

    onClickAddCount() {
        if (this._curCount + 1 > this._totalContainer) {
            return
        }
        this._curCount += 1
        this.wineSlider.progress = this._curCount / this._totalContainer
        this.updateWineInfo()
    }

    onClickReduceCount() {
        if (this._curCount - 1 < 0) {
            return
        }
        this._curCount -= 1
        this.wineSlider.progress = this._curCount / this._totalContainer
        this.updateWineInfo()
    }

    onClickConfirm() {
        if (this._wineId == -1) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请先添加酒液!"
            })
            return
        }

        if (this.edName.string == "" || this.edName.string == null || this.edName.string == undefined) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "请输入您想要名称!"
            })
            return
        }

        if (this._totalContainer <= 0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "酒液不足，请获取足够的酒液再来!"
            })
            return
        }

        if (this._curCount <= 0) {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
                msg: "提取酒的瓶数不能为0!"
            })
            return
        }

        let needDiamond = this._totalPrice / 1000

        let curDiamond = UserDataManager.instance.getDiamondNum()
        if(curDiamond < needDiamond)
        {
            EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST,{
                msg: "zqg不足，无法定制包装"
            })
            return
        }

        let desc = cc.js.formatStr("是否花费%szqb进行定制？", needDiamond)
        EventManager.instance.dispatchEvent(EventEnum.SHOW_MODAL, {
            content: desc,
            showCancel: true,
            confirmCallback: () => {
                EventManager.instance.dispatchEvent(CustomEventEnum.PERSONAL_PICK_UP_WINE,{
                    box_id: this._packId,
                    bottle_id: this._bottleId,
                    wine_id: this._wineId,
                    num: this._curCount,
                    name: cc.js.formatStr("慎初·%s", this.edName.string),
                    desc: "",
                })
            }
        })

    }

    addListener() {
        EventManager.instance.addEventListener("PackingWineBrewUserCmd_SC", this.updateView, this)
    }

    removeListener() {
        EventManager.instance.removeTargetListener(this)
    }

    onDestroy() {
        this.removeListener()
    }

}
