
const { ccclass, property } = cc._decorator;

@ccclass
export default class PropItem extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Sprite)
    iconSpr: cc.Sprite = null;

    @property(cc.Sprite)
    borderSpr: cc.Sprite = null;

    @property(cc.Sprite)
    qualityWordSpr: cc.Sprite = null;

    updateItem(itemConfig) {

    }
}