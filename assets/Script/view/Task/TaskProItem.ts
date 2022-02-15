import List from "../../framework/component/List";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskView extends BaseView {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    normalTask: cc.Node = null;

    @property(List)
    list: List = null;

    onLoad () {
        this.addListener()
        this.updateView()
    }

    addListener()
    {
        
    }

    updateView()
    {

    }

    onClickStaff()
    {

    }

    removeListener()
    {

    }

    onDestroy(){
        this.removeListener()
    }
}
