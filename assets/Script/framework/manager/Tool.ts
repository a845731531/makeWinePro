//通用的工具类，js相关类的封装、cocos相关数值类补充、算法封装
//尽量不涉及具体业务，不涉及敏感操作，直接放到window全局变量

import EventManager from "./EventManager";
import { Direction, EventEnum } from "../FrameWorkEnum";
import ParamConfig from "../../config/ParamConfig";

export class Tool {

    static isInteger(num)
    {
        return parseInt(num + "") == parseFloat(num +"")
    }

    static isFolat(num)
    {
        return parseInt(num + "") != parseFloat(num +"")
    }

    static setSpriteFrame(sprite: cc.Sprite, assetName: string, bundleName?: string) {
        new Promise((resolve, reject) => {
            if (bundleName) {
                cc.assetManager.loadBundle(bundleName, (error, bundle: cc.AssetManager.Bundle) => {
                    if (!error) {
                        resolve(bundle)
                    }
                })
            } else {
                resolve(cc.resources);
            }
        }).then((bundle: cc.AssetManager.Bundle) => {
            let frame: cc.SpriteFrame = bundle.get(assetName, cc.SpriteFrame);
            if (frame) {
                cc.isValid(sprite) && (sprite.spriteFrame = frame);
            } else {
                bundle.load(assetName, cc.SpriteFrame, (error, asset: cc.SpriteFrame) => {
                    if (!error) {
                        if (cc.isValid(sprite)) {
                            sprite.spriteFrame = asset;
                        }
                    }
                })
            }
        })
    }
    /**
     * 加载图片
     * @param url 
     * @param sprite 
     */
    static loadSpriteFrame(url: string, sprite: cc.Sprite, callback?: Function) {

        if (url.indexOf("http") != -1) {
            let ext = url.indexOf(".png") != -1 ? ".png" : ".jpg"
            cc.assetManager.loadRemote(url, { ext: ext }, function (err, imageAsset: cc.Texture2D) {
                sprite.spriteFrame = new cc.SpriteFrame(imageAsset);
            });
        } else {
            cc.resources.load(url, cc.SpriteFrame, (err, asset: cc.SpriteFrame) => {
                if (err) {
                    console.error("not resources in url: ", url)
                } {
                    sprite.spriteFrame = asset
                    callback && callback(url)
                }
            })
        }
    }

    /**
    * 大数字转换，将大额数字转换为万、千万、亿等
    * @param value 数字值
    */
    static bigNumberTransform(value) {
        const newValue = ['', '', '']
        let fr = 1000
        let num = 3
        let text1 = ''
        let fm = 1
        while (value / fr >= 1) {
            fr *= 10
            num += 1
        }
        if (num <= 4) { // 千
            // newValue[0] = parseInt((value / 1000) + "") + ''
            // newValue[1] = '千'
            return value + ""
        } else if (num <= 8) { // 万
            text1 = parseInt((num - 4) + "") / 3 > 1 ? '千万' : '万'
            fm = text1 === '万' ? 10000 : 10000000
            if (value % fm === 0) {
                newValue[0] = parseInt((value / fm) + "") + ''
            } else {
                newValue[0] = parseFloat((value / fm) + "").toFixed(2) + ''
            }
            newValue[1] = text1
        } else if (num <= 16) { // 亿
            text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
            text1 = (num - 8) / 4 > 1 ? '万亿' : text1
            text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
            fm = 1
            if (text1 === '亿') {
                fm = 100000000
            } else if (text1 === '千亿') {
                fm = 100000000000
            } else if (text1 === '万亿') {
                fm = 1000000000000
            } else if (text1 === '千万亿') {
                fm = 1000000000000000
            }
            if (value % fm === 0) {
                newValue[0] = parseInt((value / fm) + "") + ''
            } else {
                newValue[0] = parseFloat((value / fm) + "").toFixed(2) + ''
            }
            newValue[1] = text1
        }
        if (value < 1000) {
            newValue[0] = value + ''
            newValue[1] = ''
        }
        return newValue.join('')
    }

    /**
     * 深拷贝返回
     * @param obj 
     * @returns 
     */
    static deepCopy(obj) {
        let result = null
        if (typeof obj == "object") { //判断传入的如果是对象，继续遍历
            if (Array.isArray(obj)) {
                result = [];
            } else {
                result = {};
            }
        } else {     //如果是基本数据类型就直接返回
            return obj;
        }
        for (let key in obj) {
            let copy = obj[key];
            if (copy && typeof copy == "object") {
                result[key] = this.deepCopy(copy)
            } else {
                result[key] = copy
            }
        }

        return result;
    }


    /**
     * 深拷贝赋值
     * @param from 
     * @param to 
     * @returns 
     */
    static deepCopyTo(from, to) {
        if (typeof from != typeof to) {
            return
        }

        if (typeof from != "object") {
            return
        }

        for (let key in from) {
            let copy = from[key];

            if (copy && typeof copy == "object") {
                if (to[key] == undefined) {
                    if (Array.isArray(copy)) {
                        to[key] = [];
                    } else {
                        to[key] = {};
                    }
                }
                this.deepCopyTo(copy, to[key])
            } else {
                to[key] = copy
            }
        }
    }

    /**
     * ["1001_100","2001_300"]转成[{propId, num}]
     * @param strList 
     * @returns 
     */
    static convertStrToList(strList) {
        strList = strList || []
        let targetList = []
        for (let i = 0; i < strList.length; i++) {
            let itemConfig = strList[i].split("_")
            let propId = parseFloat(itemConfig[0])
            let num = parseFloat(itemConfig[1])
            targetList.push({
                propId: propId,
                customNum: num,
                num: num
            })
        }
        return targetList
    }
    /**
     * ["1001_100","2001_300"]转成{propId=num}
     * @param strList 
     * @returns 
     */
    static convertStrToObj(strList) {
        strList = strList || []
        let targetObj = {}
        for (let i = 0; i < strList.length; i++) {
            let itemConfig = strList[i].split("_")
            let propId = parseFloat(itemConfig[0])
            let num = parseFloat(itemConfig[1])
            targetObj[propId] = num
        }
        return targetObj
    }

    /**
     * 是否为同一天 second
     * @param left_time 
     * @param right_tiem 
     * @returns 
     */
    static checkIsSameDay(left_time, right_tiem) {
        let left_date = new Date(left_time * 1000)
        let right_date = new Date(right_tiem * 1000)
        if (left_date.getDay() != right_date.getDay() || left_date.getMonth() != right_date.getMonth() || left_date.getFullYear() != right_date.getFullYear()) {
            return false
        }
        return true
    }
    //打乱数组
    static shuffle(arr) {
        let len = arr.length;
        let temp = 0;
        for (let i = 0; i < len; i++) {
            let randomIndex = this.getRandomLimit(0, len - 1)
            temp = arr[i]
            arr[i] = arr[randomIndex]
            arr[i] = temp
        }
    }
    /**
     * 从数据或者对象中获取随机值
     * @param arr 
     * @returns 
     */
    static getRandomValue(arr) {
        if (!arr) {
            console.error("utils_manager get_random_value error -> ", arr)
            return null
        }
        let keys = Object.keys(arr)
        if (keys.length > 0) {
            let index = 0
            index = Math.floor(Math.random() * (this.getLength(keys)))
            return arr[keys[index]]
        }
        return null
    }
    static getRandomWithWeight(arr, weightArr) {
        let totalWeight = 0
        for (let i = 0, len = weightArr.length; i < len; i++) {
            totalWeight += weightArr[i]
        }
        let randomVal = Math.floor(Math.random() * totalWeight)
        totalWeight = 0
        for (let i = 0, len = weightArr.length; i < len; i++) {
            totalWeight += weightArr[i]
            if (randomVal < totalWeight) {
                return arr[i]
            }
        }
        return arr[0]
    }
    /**
     * 获取数组或者对象的长度
     * @param datas 
     * @returns 
     */
    static getLength(datas) {
        let keys = Object.keys(datas)
        return keys.length
    }

    /**
     * 获取n~m区间内整数
     * @param n 最小值
     * @param m 最大值
     */
    static getRandomLimit(n, m) {
        return Math.round(Math.random() * (m - n) + n)
    }


    static unitConversion(number,needWord = true) {
        let str = ""
        if(number >= 500)
        {
            str = needWord ? "斤":""
            return "" + parseFloat((number / 500).toFixed(2)) + str
        }else{
            str = needWord? "两":""
            return "" + parseFloat((number / 50).toFixed(2)) + str
        }
    }

    private static _formatTime(format, timeObj) {
        var dict = {
            "yyyy": timeObj.year,
            "M": timeObj.month,
            "d": timeObj.day,
            "H": timeObj.hour,
            "m": timeObj.minute,
            "s": timeObj.second,
            "MM": ("00" + timeObj.month).substr(-2),
            "dd": ("00" + timeObj.day).substr(-2),
            "HH": ("00" + timeObj.hour).substr(-2),
            "mm": ("00" + timeObj.minute).substr(-2),
            "ss": ("00" + timeObj.second).substr(-2),
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    }
    //timeStamp ms
    static formatDate(format, timeStamp) {
        let date = new Date(timeStamp)

        var timeObj = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        };
        return this._formatTime(format, timeObj);
    }
    static formatTime(seconds: number, customFormat?: string) {
        seconds = Math.floor(seconds)

        let daySeconds = 3600 * 24
        let timeObj: any = {}
        let timeObjSecond = 0

        timeObj.year = Math.floor(seconds / daySeconds / 365)
        timeObjSecond += (timeObj.year * daySeconds * 365)

        timeObj.day = Math.floor((seconds - timeObjSecond) / daySeconds)
        timeObjSecond += (timeObj.day * daySeconds)

        timeObj.hour = Math.floor((seconds - timeObjSecond) / 3600)
        timeObjSecond += (timeObj.hour * 3600)
        timeObj.minute = Math.floor((seconds - timeObjSecond) / 60)
        timeObjSecond += (timeObj.minute * 60)
        timeObj.second = Math.floor(seconds - timeObjSecond)

        let format = "HH:mm:ss"
        if (timeObj.year > 0) {
            format = "yyyy年"
        } 
        else if (timeObj.day > 0) {
            format = "d天"
        }
        return this._formatTime(format, timeObj);
    }

    /**
     * 获取传入时间戳 当天24点时间戳
     * @param curTimeStamp
     */
    static getDayEndTimeStamp(curTimeStamp: number) {
        return new Date(new Date(curTimeStamp).setHours(0, 0, 0, 0) + 24 * 3600 * 1000).getTime()
    }

    /**
     * 获取传入时间戳 本周最后一天24点时间戳
     * @param curTimeStamp 
     */
    static getWeekEndTimeStamp(curTimeStamp: number) {
        let curDate = new Date(new Date(curTimeStamp).setHours(0, 0, 0, 0) + 24 * 3600 * 1000)
        return new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + (7 - curDate.getDay())).getTime()
    }

    static keyOf(target: Object, value: any): string {
        for (let key in target) {
            if (target[key] == value) {
                return key
            }
        }
    }
    //秒
    static getTime(): number {
        return Math.floor(new Date().getTime() / 1000)
    }

    static getDirection(from: cc.Vec2, toward: cc.Vec2, allowDiag: boolean = true): Direction {
        let deltaPos = toward.sub(from)
        let angle = deltaPos.signAngle(cc.Vec2.RIGHT)
        angle = Math.floor(cc.misc.radiansToDegrees(angle));
        angle += 180;  //转为0到360，从左顺时针
        let angleStep = 45
        if (allowDiag) {
            angleStep = 22.5
        }
        if (angle >= 360 - angleStep) {
            return Direction.LEFT
        } else if (allowDiag) {
            return Math.floor(angle / 22.5);
        } else {
            return Math.floor(angle / 45) * 2;
        }
    }

    /**
     * 在浏览器下拷贝文本到剪切板
     * @param str 
     * @returns 
     */
    static webCopyString(str: string) {
        console.log('复制ing');
        var success = false;
        try {
            var input = str + '';
            const el = document.createElement('textarea');
            el.value = input;
            el.setAttribute('readonly', '');
            // el.style.contain = 'strict';
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            el.style.fontSize = '12pt'; // Prevent zooming on iOS

            const selection = getSelection();
            var originalRange = null;
            if (selection.rangeCount > 0) {
                originalRange = selection.getRangeAt(0);
            }
            document.body.appendChild(el);
            el.select();
            el.selectionStart = 0;
            el.selectionEnd = input.length;

            try {
                success = document.execCommand('copy');
            } catch (err) { }

            document.body.removeChild(el);

            if (originalRange) {
                selection.removeAllRanges();
                selection.addRange(originalRange);
            }
            if (success) {
                console.log("复制成功");
            } else {
                console.log("复制失败1");
            }
        } catch (error) {
            console.log("复制失败2");
        }
        return success;
    }

    /**
     * 获取地图层级
     * y越小 层级越大
     * 
     */
    static getBuildingZIndex(y) {
        return 10000 - y
    }

    /**
     * 获取地图层级
     * y越小 层级越大
     * 
     */
    static getObstacleZIndex(y) {
        return 10000 - y
    }

    /**
     * 获取最大层级
     * @returns 
     */
    static getMaxZIndex() {
        return 100000
    }

    /**
     * 升级随机的字符串码
     * @returns 
     */
    static getRandomQRCode(len) {
        var code = ""
        var pos = 0
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (var i = 0; i < len; i++) {
            pos = Math.round(Math.random() * (arr.length - 1))
            code += arr[pos]
        }
        return code
    }


    /**
     * 判断是否是手机号
     * @param tel 
     * @returns 
     */
    static isPhoneNumber(tel: string) {
        var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
    }

    /**
     * 判断是否为小数
     * @param tel 
     * @returns 
     */
    static isSmallNumber(num: number) {
        var y = String(num).indexOf(".") + 1;//获取小数点的位置
        if (y > 0) {
            return true
        } else {
            return false
        }
    }

    /**
     * 加载预制体
     * @param prefabPath 
     * @param callback 
     */
    static loadPrefab(prefabPath: string, callback: any) {
        new Promise((resolve, reject) => {  //先动态加载或者获取已加载资源
            let resourcePath = prefabPath
            let prefabNode = cc.resources.get(resourcePath, cc.Prefab)
            if (prefabNode) {
                resolve(prefabNode)
            } else {
                //加载预制体
                EventManager.instance.dispatchEvent(EventEnum.SHOW_LOADING_EFFECT)
                cc.resources.load(resourcePath, cc.Prefab, (err, prefab) => {
                    if (!err) {
                        resolve(prefab)
                    } else {
                        reject(err)
                    }
                })
            }
        }).then((prefabNode) => {
            EventManager.instance.dispatchEvent(EventEnum.HIDE_LOADING_EFFECT, null)
            let targetNode = cc.instantiate(prefabNode)
            callback && callback(targetNode)
        })
    }
    static getCameraBoundingBox(targetNode: cc.Node) {
        let nodeBox = targetNode.getBoundingBoxToWorld()
        let leftBottom = cc.v2(nodeBox.x, nodeBox.y)
        let rightTop = cc.v2(nodeBox.xMax, nodeBox.yMax)

        let nodeCamera = cc.Camera.findCamera(targetNode)
        let leftBottomScreen = nodeCamera.getWorldToScreenPoint(leftBottom)
        let rightTopScreen = nodeCamera.getWorldToScreenPoint(rightTop)
        return cc.rect(leftBottomScreen.x, leftBottomScreen.y, rightTopScreen.x - leftBottomScreen.x, rightTopScreen.y - leftBottomScreen.y)
    }
    static formatMoney(moneyNum) {  //传进来的是厘，返回元
        moneyNum = Math.max(0, Math.ceil(moneyNum / 1000))
        return "" + moneyNum
        // if (moneyNum < 1000) {
        //     return "" + moneyNum
        // } else if (moneyNum < 10 * 1000) {
        //     return cc.js.formatStr("%sk", (moneyNum / 1000).toFixed(2))
        // } else if (moneyNum < 1000 * 1000) {
        //     return cc.js.formatStr("%sk", Math.floor(moneyNum / 1000))
        // } else if (moneyNum < 10 * 1000 * 1000) {
        //     return cc.js.formatStr("%sm", (moneyNum / 1000000).toFixed(2))
        // } else {
        //     return cc.js.formatStr("%sm", Math.floor(moneyNum / 1000000))
        // }
    }
    static getChinaNumber(num) {
        let result = ""

        if (num >= 100) {
            return num
        }

        let list = ["拾", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"]
        if (num <= 10) {
            return list[num]
        }
        let left = Math.floor(num * 0.1) == 1 ? 10 : Math.floor(num * 0.1)
        let right = num % 10
        result += list[left]
        result += list[right]
        return result
    }
    static getChinaEasyNumber(num) {
        let result = ""

        if (num >= 100) {
            return num
        }

        let list = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
        if (num <= 10) {
            return list[num]
        }
        let left = Math.floor(num * 0.1) == 1 ? 10 : Math.floor(num * 0.1)
        let right = num % 10
        result += list[left]
        result += list[right]
        return result
    }
    static cuttingString(str, length, replace = "...") {
        // 字数限制30字,超出不显示
        const len = str.length
        if (len > length) {
            let result = ''
            result = str.substring(0, length) + replace
            return result
        } else {
            return str
        }
    }

    static getArrayParamConfig(key) {
        let result = []
        try {
            result = ParamConfig[key].value
        } catch (error) {
            console.error("Tool.getArrayParamConfig ParamConfig not has key", key)
        }
        return result
    }

    static getNumberParamConfig(key, index = 0) {
        let result = 0
        try {
            result = Number(ParamConfig[key].value[index])
        } catch (error) {
            console.error("Tool.getNumberParamConfig ParamConfig not has key", key, index)
        }
        return result
    }

    static getStringParamConfig(key, index = 0) {
        let result = ""
        try {
            result = ParamConfig[key].value[index]
        } catch (error) {
            console.error("Tool.getStringParamConfig ParamConfig not has key", key, index)
        }
        return result
    }

    static getDropList(dropConfig) {
        let dropList = []
        let dropNum = this.getRandomLimit(dropConfig.minNum, dropConfig.maxNum)
        let dropOriginList = dropConfig.dropList
        let weightList = []
        let indexList = []
        let propConfigList = []
        for (let i = 0, len = dropOriginList.length; i < len; i++) {
            let itemConfig = dropOriginList[i].split("_")
            indexList.push(i)
            propConfigList.push({
                propId: parseInt(itemConfig[0]),
                num: parseFloat(itemConfig[1])
            })
            weightList.push(itemConfig[2])
        }
        for (let i = 0; i < dropNum; i++) {
            let randomIndex = this.getRandomWithWeight(indexList, weightList)
            let randomProp = propConfigList[randomIndex]
            dropList.push(randomProp)
            if (dropConfig.dropType == 1) {
                let index = indexList.indexOf(randomIndex)
                indexList.splice(index, 1)
                weightList.splice(index, 1)
            }
        }
        return dropList
    }

    static name1 = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤",
        "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏",
        "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费",
        "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康",
        "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明",
        "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "屈", "项", "祝", "董", "粱", "杜", "阮", "蓝", "闵", "席", "季",
        "麻", "强", "贾", "路", "娄", "危", "江", "童", "颜", "郭", "梅", "盛", "林", "刁", "钟", "徐", "邱", "骆", "高", "夏", "蔡", "田", "樊",
        "胡", "凌", "霍", "虞", "万", "支", "柯", "昝", "管", "卢", "莫", "经", "房", "裘", "缪", "干", "解", "应", "宗", "丁", "宣", "贲", "邓",
        "郁", "单", "杭", "洪", "包", "诸"]
    static name2 = ["歆芹", "珍荣", "馥岚", "倪嫱", "霭妆", "晓钟", "妩楚", "西瑞", "娅心", "桃茹", "昕莹", "清韶", "琰蓝", "诗渺",
        "茜蕴", "澜瑾", "珂红", "怀籁", "璐炅", "萱煜", "寻芙", "桠昭", "然雁", "丽茵", "可星", "翎幻", "瑗艳", "梓寐", "芊慧", "丝依", "敬珸",
        "才邦", "隆聪", "阳彬", "恩璨", "珂栋", "时鹏", "炅纶", "瑞永", "清昭", "睿洛", "灿合", "有泰", "翰烨", "佑朋", "民理", "家岚", "杰瑜", "航耀",
        "宏东", "君赫", "达萱", "逸亿", "易章", "坤沛", "诚语", "征志", "璟映", "天淳", "奇舒"]

    static getRandonName() {
        return this.name1[Math.floor(Math.random() * this.name1.length)] + this.name2[Math.floor(Math.random() * this.name2.length)]
    }

    static replaceUserName(str,userName)
    {
        let resultStr = str
        if(resultStr.indexOf("玩家昵称") != -1)
        {
            resultStr = resultStr.replace("玩家昵称",userName)
        }
        return resultStr
    }
}