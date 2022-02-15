import BagDataManager from "./BagDataManager"
import BuildingDataManager from "./BuildingDataManager"
import ChatDataManager from "./ChatDataManager";
import FriendDataManager from "./FriendDataManager";
import MailDataManager from "./MailDataManager";
import RandomEventManager from "./npc/RandomEventManager";
import PersonalManager from "./personal/PersonalManager";
import TargetWineDataManager from "./TargetWineDataManager";
import UserDataManager from "./UserDataManager";
import WareHouseDataManager from "./WareHouseDataManager";
import WorldMapDataManager from "./WorldMapDataManager";
import HouseDataManager from "./HouseDataManager";
import MarriageDataManager from "./MarriageDataManager";
import NpcManager from "./npc/NpcManager";
import PlayerInfoDataManager from "./PlayerInfoDataManager";
import ChildrenDataManager from "./ChildrenDataManager";
import AuctionManager from "./auction/AuctionManager";
import MarketManager from "./auction/MarketManager";
import ShopManager from "./auction/ShopManager";

export default {
    init() {
        BuildingDataManager.instance.init();
        BagDataManager.instance.init();
        UserDataManager.instance.init()
        PersonalManager.instance.init()
        TargetWineDataManager.instance.init()
        MailDataManager.instance.init()
        WareHouseDataManager.instance.init()
        ChatDataManager.instance.init()
        WorldMapDataManager.instance.init()
        FriendDataManager.instance.init()      
        RandomEventManager.instance.init()
        HouseDataManager.instance.init()
        MarriageDataManager.instance.init()
        AuctionManager.instance.init()
        MarketManager.instance.init()
        ShopManager.instance.init()
        NpcManager.instance.init()
        PlayerInfoDataManager.instance.init()
        ChildrenDataManager.instance.init()
    },
    reset() {
        BuildingDataManager.instance.reset();
        BagDataManager.instance.reset();
        UserDataManager.instance.reset()
        PersonalManager.instance.reset()
        TargetWineDataManager.instance.reset()
        MailDataManager.instance.reset()
        ChatDataManager.instance.reset()
        WareHouseDataManager.instance.reset()
        WorldMapDataManager.instance.reset()
        RandomEventManager.instance.reset()
        FriendDataManager.instance.reset()   
        HouseDataManager.instance.reset()   
        MarriageDataManager.instance.reset() 
        AuctionManager.instance.reset()  
        MarketManager.instance.reset()
        ShopManager.instance.reset()
        NpcManager.instance.reset()
        PlayerInfoDataManager.instance.reset()
        ChildrenDataManager.instance.reset()
    }
}