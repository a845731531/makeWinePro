// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChildrenItems extends cc.Component {

     

    
    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Label)
    childName: cc.Label = null;

    @property(cc.Label)
    nickname: cc.Label = null;
    

    private data:any

    updateView(itemData) {
        this.data = itemData

    }


    onRename(){

    }


    onSpeedBtn(){
        
    }

}
