import SettingManager from "../../data/SettingManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import BaseView from "../../framework/viewbase/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingView extends BaseView {

    @property(cc.Sprite)
    musicOpen: cc.Sprite = null;
    
    @property(cc.Sprite)
    musicClose: cc.Sprite = null;

    @property(cc.Sprite)
    soundOpen: cc.Sprite = null;

    @property(cc.Sprite)
    soundClose: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    private musicSwitch = true
    private audioSwitch = true


    onLoad () {
        this.addListener()
        this.updateView()
    }

    addListener()
    {
    }

    updateView()
    {

        this.musicSwitch = SettingManager.instance.getMusicEnable()
        this.audioSwitch = SettingManager.instance.getAudioEnable()

        this.musicOpen.node.active = this.musicSwitch
        this.musicClose.node.active = !this.musicSwitch

        this.soundOpen.node.active = this.audioSwitch
        this.soundClose.node.active = !this.audioSwitch
    
    }

    onClickMusic()
    {
        EventManager.instance.dispatchEvent(EventEnum.MUSIC_SETTING_ENABLE, !this.musicSwitch)
        this.updateView()
    }

    onClickSound()
    {
        EventManager.instance.dispatchEvent(EventEnum.AUDIO_SETTING_ENABLE, !this.audioSwitch)
        this.updateView()
    }

    onClickClose()
    {
        this.removeListener()
        this.onCloseView()
    }

    removeListener()
    {
    }

    onDestroy(){
    }
}
