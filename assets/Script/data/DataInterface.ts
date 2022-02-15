export type UserData = {
    userId: number;
    name: string;
    sex: number;
    exp: number;
    level: number;
    talent: number;
    coin: number;
    diamond: number;
    avatarUrl: string;
}
//老酒数据
export type OldWineData = {
    id: number, //唯一ID
    oldWineId: number, //老酒ID
    propId: number;//基酒id
    customNum: number;//数量
    storeYear: number; //存酒年份
    storeEndTime: number; //结束时间
    status: number;  //状态0：未生产 1：生产中 2：暂停 3:完成
}

//兑换码数据
export type EXCodeData = {
    id: number,
    type: number,
    count: number,
    code: string,
    name: string,
    autor: string,
    createtime: number,
    propId: number,
    packId: number,
    bottleId: number,
    state?: number,
}

//背包数据
export type BagItemData = {
    propId: number, 
    customNum?: any, 
    showName?: boolean, 
    hideClick?: boolean, 
    showNew?: boolean,
    nameColor?: cc.Color,
}

//员工数据
export type StaffData = {
    staffId: number;
    contractEndTime: number;  //合同到期时间
}
//建筑数据
export type BuildingData = {
    buildingId: number,  //唯一ID
    buildingType?: number,  //建筑类型
    buildingIndex?: number,         //该种建筑的第几个
    worldId?: number, //世界农田id
    staffId?: number, //员工id
    produceType?: number,    //产物类型
    produceNum?: number,    //产物数量
    produceStartTime?: number, //生产开始时间
    produceEndTime?: number,   //生产结束时间
    produceTime?: number,   //生产总时间
    produceState?: number,    //生产状态, 0：未生产 1：生产中 2：暂停 3:完成
    pauseReason?: number,    //暂停原因,1除草，2除虫，3施肥
    rentEndTime?: number,  //租赁结束时间
    smallGameScore?: number,  //小游戏最高积分
}

//订单数据
export type OrderData = {
    id: number;//订单id
    name: string;  //订单名称
    wineId: number; //成品酒id
    count: number; //成品酒数量
    state: number;//订单状态
    remainTime: number;//剩余时间 自动取消订单
}

export type TaskData = {
    taskId: number; //任务ID
    state: number; //任务状态0可接取，1进行中，2已完成
    progress: number;  //任务进度
}
export type ChatMessageData = {
    messageType: number;   //0系统，1世界，2公会
    content: string;
    userName?: string;
    fromId?: number;
    receiveId?: number;
    avatarUrl?: string;
    title?: number; //职位
    params?: string;
    clanName?: string;
}


export type friendData = {
   name:string;
   face:number;
   iconurl:string;
   degree:number;
   online:number;
   spouse:boolean;//是否是自己的伴侣
   id:number;
   posInfo:string;
   clanname:string;
}

//求婚的列表 暂用
export type proposalList = {
     name:string
     degree:number
 }



//赠送礼物数据
export type GiftItemData = {
    propId: number, 
    giftName?: string,
    likability?:number,
    icon?:string,
    desc?:string,
    price:number
}
// 房产管理数据
export type houseItemData = {
    house:string;
    area:number;
    orientation:string;
    floor:number;
    serial:number;
    possess:Array<number>;
    showState:Array<number>;
 }

 //用户数据
export type UserInfo = {
     area :number;				
	 charInfo :SelectUserInfo;
   
 }

 // 用户信息
export type SelectUserInfo = {
  id:number;					// 角色编号
  name:string;				// 角色名称
  type:enumProfession;		// 角色职业
  level:number;				// 角色等级
  homeland:number;			// 国家ID
  mapid:number;				// 角色所在地图编号
  countryName:string;		// 国家名称
  face:number;				// 性别
  hair:number;				// 发型
  weapon:number;			// 武器
  suite:number;				// 套装
  equipsfx:number;			// 特效
  haircolor:number;			// 发色
  area:number;				// 省市
  lastloginip:number;		// 最近登录IP
  viplevel:number;			// vip等级
  safecity:number;			// 安全交易城市
  safearea1:number;			// 安全交易城市
  safearea2:number;			// 安全交易城市
  lastcity:number;			// 上次登陆城市
  lastcitytime:number;		// 最早登陆相同城市时间
  lastloginmac:number;		// 上次登陆得MAC地址
  lastofftime:number;		// 最后一次登陆时间
  bitmask:number;			// 角色掩码
  gmlevel:number;			// gm权限
  weaponlevel:number;		// 武器等级
  suitelevel:number;		// 衣服等级
  wing:number;				// 翅膀
  winglevel:number;			// 翅膀等级
  precreatetimeall:number;	// 预创建角色积分
  oldzoneid:number;			// 原区zoneid
  createtime:number;        // 角色创建时间
   
 }

 // 职业枚举
 export type  enumProfession=
{
	Profession_None :number,
	Profession_Soldier :number,	// 战士
	//Profession_Spy :number,	// 刺客
	Profession_Gunman :number,	//		// 法师
	//Profession_Blast : 4,		// 魔炮
	Profession_Freeman :5,		// 道士
	Profession_Doctor : 6,		// 牧师
	Profession_Max :7,
}


//婚礼数据
export type tWeddingData=
{
    husbandId: number, //丈夫id
    husbandName:string,//丈夫名字
    wifeId:number, //妻子id
    wifeName:string,//妻子名字
    applyId:number, //申请人id(丈夫或者妻子中的一个)
    curState:number, //(当前状态:1申请中、2等待举办、3举办中)
    startTime:number, //开始时间
    endTime:number, //结束时间
    weddingType:number, //婚礼类型
    peopleCount:number, //观礼人数
}


 





