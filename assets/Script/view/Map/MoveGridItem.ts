import { Tool } from "../../framework/manager/Tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveGridItem extends cc.Component {

    @property(cc.Sprite)
    gridIcon: cc.Sprite = null;

    onLoad () {
        this.addListener()
    }

    addListener()
    {

    }

    updateView(isRed)
    {
        let url = isRed? "texture/map/grid_red" : "texture/map/grid_green"
        Tool.loadSpriteFrame(url,this.gridIcon)
    }

    removeListener()
    {

    }

    onDestroy()
    {
        this.removeListener
    }



    // update (dt) {}
}
