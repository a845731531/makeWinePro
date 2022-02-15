// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetManager } from "../../framework/network/NetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MarriageInvitation extends cc.Component {


    sendInviteBtnClick(){
        NetManager.instance.sendMsg("stSendInvitationWeddingCmd_CS", {
         
        })
    }

    start () {

    }

   
}
