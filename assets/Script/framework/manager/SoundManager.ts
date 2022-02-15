/**
 * 音频管理系统
 */
const { ccclass, property, executeInEditMode} = cc._decorator;

import { EventEnum } from "../FrameWorkEnum";
import EventManager from "./EventManager"

@ccclass
@executeInEditMode
export default class SoundManager extends cc.Component {

    @property([cc.AudioClip])
    musicClipList: cc.AudioClip[] = [];

    @property([cc.AudioClip])
    audioClipList: cc.AudioClip[] = [];

    private _canPlayMusic = true
    private _canPlayAudio = true

    __preload() {  //自动遍历并赋值
        if(!CC_EDITOR) return;
        Editor.log("start search sound asset, please save")
        Editor.assetdb.queryAssets("db://assets/Sound/Music/*", "audio-clip", (err, arrays)=> {
            Editor.log("music:", arrays.length)
            this.musicClipList = []
            for(let i = 0; i < arrays.length;i++) {
                let item = arrays[i]
                //xiejinhui test  加载音频需要测试一下
                cc.assetManager.loadAny({uuid: item.uuid}, (err, frame)=> {
                    this.musicClipList.push(frame)
                    this.musicClipList.sort((first, second) => {
                        return (first.name > second.name) ? 1 : -1
                    })
                })
            }
        })
        Editor.assetdb.queryAssets("db://assets/Sound/Audio/**", "audio-clip", (err, arrays)=> {
            Editor.log("audio:", arrays.length)
            this.audioClipList = []
            for(let i = 0; i < arrays.length;i++) {
                let item = arrays[i]
                //xiejinhui test  加载音频需要测试一下
                cc.assetManager.loadAny({uuid: item.uuid}, (err, frame)=> {
                    this.audioClipList.push(frame)
                    this.audioClipList.sort((first, second) => {
                        return (first.name > second.name) ? 1 : -1
                    })
                })
            }
        })
    }

    onLoad() {
        if(CC_EDITOR) return;
        cc.game.addPersistRootNode(this.node);
        let musicEnabled = cc.sys.localStorage.getItem("BrewMasterMusicEnable");
        this._canPlayMusic = (musicEnabled == null || musicEnabled == "") ? true : JSON.parse(musicEnabled)
        let effectEnabled = cc.sys.localStorage.getItem("BrewMasterAudioEnabled");
        this._canPlayAudio = (effectEnabled == null || effectEnabled == "") ? true : JSON.parse(effectEnabled)
        
        if(!this._canPlayMusic) {
            cc.audioEngine.setMusicVolume(0)
        } else {
            cc.audioEngine.setMusicVolume(0.3)
        }
    }

    start() {
        if(CC_EDITOR) return;

        EventManager.instance.addEventListener(EventEnum.MUSIC_SETTING_ENABLE, this.onMusicEnable, this)
        EventManager.instance.addEventListener(EventEnum.PLAY_MUSIC, this.onPlayMusic, this)
        EventManager.instance.addEventListener(EventEnum.STOP_MUSIC, this.onStopMusic, this)
        EventManager.instance.addEventListener(EventEnum.AUDIO_SETTING_ENABLE, this.onAudioEnable, this)
        EventManager.instance.addEventListener(EventEnum.PLAY_AUDIO, this.onPlayAudio, this)
    }

    onDestroy() {
        if(CC_EDITOR) return;

        EventManager.instance.removeTargetListener(this)
    }

    getMusicEnabled() {
        return this._canPlayMusic
    }

    //切换是否可以播放音乐
    onMusicEnable(enable){
        this._canPlayMusic = enable
        cc.sys.localStorage.setItem("BrewMasterMusicEnable", "" + this._canPlayMusic);
        if(!this._canPlayMusic) {
            this.onStopMusic()
            cc.audioEngine.setMusicVolume(0)
        } else {
            cc.audioEngine.resumeMusic();
            cc.audioEngine.setMusicVolume(0.3)
        }
    }

    //根据设置改变背景音乐播放逻辑
    onPlayMusic(musicName){
        cc.log("playMusic:" + musicName);
        // this._curMusicType = musicName
        let musicClip = null
        for(let i = 0; i < this.musicClipList.length;i++) {
            let itemClip = this.musicClipList[i]
            if(itemClip.name == musicName) {
                musicClip = itemClip
                break
            }
        }
        if(musicClip) {
            if(!this._canPlayMusic){
                this.onStopMusic()
            }else{
                cc.audioEngine.playMusic(musicClip, true);
            }
        }
    }

    onStopMusic() {
        cc.audioEngine.pauseMusic();
    }

    getAudioEnabled() {
        return this._canPlayAudio
    }

    //切换是否可以播放音乐
    onAudioEnable(enable){
        this._canPlayAudio = enable
        cc.sys.localStorage.setItem("BrewMasterAudioEnabled", "" + this._canPlayAudio);

        if(!this._canPlayAudio) {
            cc.audioEngine.setEffectsVolume(0)
        } else {
            cc.audioEngine.setEffectsVolume(1)
        }
    }

    onPlayAudio(soundName){
        if(this._canPlayAudio) {
            let audioClip = null
            for(let i = 0; i < this.audioClipList.length;i++) {
                let itemClip = this.audioClipList[i]
                if(itemClip.name == soundName) {
                    audioClip = itemClip
                    break
                }
            }
            if(audioClip) {
                cc.audioEngine.play(audioClip, false, 1);
            }
        }
    }
}
