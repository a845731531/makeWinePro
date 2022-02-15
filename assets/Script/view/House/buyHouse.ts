// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CustomEventEnum } from "../../Constant/CustomEventEnum";
import { BuildingType } from "../../Constant/GameEnum";
import HouseDataManager from "../../data/HouseDataManager";
import { EventEnum } from "../../framework/FrameWorkEnum";
import EventManager from "../../framework/manager/EventManager";
import { Tool } from "../../framework/manager/Tool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class buyHouse extends cc.Component {

    @property(cc.Node)
    curJobNode: cc.Node = null
    @property(cc.Label)
    curJobLabel: cc.Label = null
    @property(cc.Node)
    toggleParent: cc.Node = null


    @property(cc.Node)
    curAreaNode: cc.Node = null
    @property(cc.Label)
    curAreaLabel: cc.Label = null
    @property(cc.Node)
    areaParent: cc.Node = null

 
    @property(cc.Node)
    curFloorNode: cc.Node = null
    @property(cc.Label)
    curFloorLabel: cc.Label = null
    @property(cc.Node)
    floorParent: cc.Node = null


    @property(cc.Node)
    curOrientNode: cc.Node = null
    @property(cc.Label)
    curOrientLabel: cc.Label = null
    @property(cc.Node)
    orientParent: cc.Node = null


    @property(cc.Label)
    des: cc.Label = null 
    @property(cc.Label)
    countLabel: cc.Label = null

   

    start () {

    }
//----------房源---------------//
    updateJob(buildingType) {
        let jobName = "空闲"
        let jobIndex = 0
        switch(buildingType) {
            case 1:
                jobName = "宝安区-宝安中心-5号"
                this.des.string="小区有中澳实验，小区环境好，购物方便，商业街小区里面，交通便利，出门有多个公交站台，靠近高速路口。"
                jobIndex = 1
                break
            case 2:
                jobName = "宝安区-宝安中心-6号"
                jobIndex = 2
                this.des.string="周边商业生活配套完善，商超有：壹方天地、华润万佳、百佳华、华富市场等生活非常便利，小区绿化好，安静，适合居住。"
                break
            case 3:
                jobName = "宝安区-宝安中心-7号"
                jobIndex = 3
                this.des.string="小区交通非常方便，住家舒适，安保24小时在岗，你的财物和人身安全有保证，楼下200米就是坪洲地铁口，也有线路经过。"
                break
            case 4:
                jobName = "宝安区-宝安中心-8号"
                jobIndex = 4
                this.des.string="小区自带泳池花园，绿化率高，位于繁华地段，小区内部安静，适合居住。"
                break
            case 5:
                jobName = "宝安区-宝安中心-1号"
                jobIndex = 5 
                this.des.string="围商圈配套齐全，交通便利出行方便；交通：7号线农林地铁站、1.7.9.11号车公庙地铁站和1号线竹子林地铁站；商超：深国投广场、山姆会员店和华润万家。"
                break
             case 6:
                jobName = "宝安区-宝安中心-2号"
                jobIndex = 6 
                this.des.string="小区人文气息浓厚，配套完善；旁边就是白灰围菜市场、有又一町购物中心生活方便快捷，500米平安里学校就近入学教育有保障。"
                break
             case 7:
                jobName = "宝安区-宝安中心-3号"
                jobIndex = 7 
                this.des.string="环境比较安静优美，而且家电比较齐，楼下有篮球场，附近还有超市和水果店等还是比较方便的。房子户型也很好，使用很高。"
                break
        }
        this.curJobLabel.string = jobName
        let toggleList = this.toggleParent.getComponentsInChildren(cc.Toggle)
        toggleList[jobIndex-1] && (toggleList[jobIndex-1].isChecked = true)
    }

    onSelectJob(event, buildingType) {
        buildingType = parseInt(buildingType)
        this.updateJob(buildingType)
        this.onHideJobSelect()
    }

    onShowJobSelect() {
        this.toggleParent.active = true
        this.curJobNode.active = false
    }
    onHideJobSelect() {
        this.toggleParent.active = false
        this.curJobNode.active = true
    }

   //----------房源---------------//

    //----------面积---------------//

    updateArea(buildingType) {
        let jobName = "空闲"
        let jobIndex = 0
        switch(buildingType) {
            case 1:
                jobName = "120"
                jobIndex = 1
                break
            case 2:
                jobName = "110"
                jobIndex = 2
             
                break
            case 3:
                jobName = "100"
                jobIndex = 3
            
                break
            case 4:
                jobName = "90"
                jobIndex = 4
             
                break
            case 5:
                jobName = "135"
                jobIndex = 5 
               
                break
             case 6:
                jobName = "140"
                jobIndex = 6 
      
                break
             case 7:
                jobName = "150"
                jobIndex = 7 
               
                break
        }
        this.curAreaLabel.string = jobName
        this.countLabel.string = jobName
        let toggleList = this.areaParent.getComponentsInChildren(cc.Toggle)
        toggleList[jobIndex-1] && (toggleList[jobIndex-1].isChecked = true)
    }


    onSelectArea(event, buildingType) {
        buildingType = parseInt(buildingType)
        this.updateArea(buildingType)
        this.onHideAreaSelect()
    }
    onHideAreaSelect() {
        this.areaParent.active = false
        this.curAreaNode.active = true
    }

    onShowAreaSelect() {
        this.areaParent.active = true
        this.curAreaNode.active = false
    }

     //----------面积---------------//

    //----------楼层---------------//
    updateFloor(buildingType) {
        let jobName = "空闲"
        let jobIndex = 0
        switch(buildingType) {
            case 1:
                jobName = "30"
                jobIndex = 1
                break
            case 2:
                jobName = "35"
                jobIndex = 2
             
                break
            case 3:
                jobName = "7"
                jobIndex = 3
            
                break
            case 4:
                jobName = "10"
                jobIndex = 4
             
                break
            case 5:
                jobName = "23"
                jobIndex = 5 
               
                break
             case 6:
                jobName = "17"
                jobIndex = 6 
      
                break
             case 7:
                jobName = "20"
                jobIndex = 7 
               
                break
        }
        this.curFloorLabel.string = jobName
        let toggleList = this.floorParent.getComponentsInChildren(cc.Toggle)
        toggleList[jobIndex] && (toggleList[jobIndex].isChecked = true)
    }


    onSelectFloor(event, buildingType) {
        buildingType = parseInt(buildingType)
        this.updateFloor(buildingType)
        this.onHideFloorSelect()
    }
    onHideFloorSelect() {
        this.floorParent.active = false
        this.curFloorNode.active = true
    }

    onShowFloorSelect() {
        this.floorParent.active = true
        this.curFloorNode.active = false
    }

      //----------楼层---------------//

      //----------朝向---------------//

    updateOrientation(buildingType) {
        let jobName = "空闲"
        let jobIndex = 0
        switch(buildingType) {
            case 1:
                jobName = "东"
                jobIndex = 1
                break
            case 2:
                jobName = "东南"
                jobIndex = 2
             
                break
            case 3:
                jobName = "南"
                jobIndex = 3
            
                break
            case 4:
                jobName = "西南"
                jobIndex = 4
             
                break
            case 5:
                jobName = "西"
                jobIndex = 5 
               
                break
             case 6:
                jobName = "西北"
                jobIndex = 6 
      
                break
             case 7:
                jobName = "北"
                jobIndex = 7 
               
                break
        }
        this.curOrientLabel.string = jobName
        let toggleList = this.orientParent.getComponentsInChildren(cc.Toggle)
        toggleList[jobIndex-1] && (toggleList[jobIndex-1].isChecked = true)
    }


    onSelectOrient(event, buildingType) {
        buildingType = parseInt(buildingType)
        this.updateOrientation(buildingType)
        this.onHideOrientSelect()
    }
    onHideOrientSelect() {
        this.orientParent.active = false
        this.curOrientNode.active = true
    }

    onShowOrientSelect() {
        this.orientParent.active = true
        this.curOrientNode.active = false
    }

     //----------朝向---------------//
     onConfirmBtn(){
        let serial=Math.floor(Math.random()*(999999-100000+1)+100000) //随机一个编号
         var data={
            house:this.curJobLabel.string,
            area: parseInt(this.curAreaLabel.string),
            floor:parseInt(this.curFloorLabel.string),
            orientation:this.curOrientLabel.string,
            serial:serial,
            possess:[],
            showState:[]
         }
         HouseDataManager.instance.addHouseList(data)
         EventManager.instance.dispatchEvent(EventEnum.SHOW_TOAST, {
            msg: "购买成功"
        })
        EventManager.instance.dispatchEvent(CustomEventEnum.SELLHOUSE_CHANGETAB,1)
        
     }

}
