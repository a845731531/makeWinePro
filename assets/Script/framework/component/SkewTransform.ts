var LocalDirtyFlag = cc.Enum({
    /**
     * !#en Flag for rotation, scale, position, skew dirty
     * !#zh 旋转，缩放，位置，或斜角 dirty 的标记位
     * @property {Number} TRSS
     * @static
     */
    TRSS: 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3,
});

var ONE_DEGREE = Math.PI / 180;

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {

    @property()
    public _skewX: number = 0;
    @property({
        tooltip: CC_DEV && 'skewX'
    })
    set skewX(val: number) {
        this._skewX = val;
        this.setSkew(); 
    }
    get skewX() {
        return this._skewX;
    }

    @property()
    public _skewY: number = 0;
    @property({
        tooltip: CC_DEV && 'skewY'
    })
    set skewY(val: number) {
        this._skewY = val;
        this.setSkew(); 
    }
    get skewY() {
        return this._skewY;
    }

    private SP

    onLoad()
    {
        //取得Sprite組件
        this.SP = this.node.getComponent(cc.Sprite);
    }

    start()
    {
        this.setSkew(); 
    }

    setSkew(){
        //if (this.node._localMatDirty & LocalDirtyFlag.TRSS) 
        {
          
            let _skewX = this.skewX ;
            let _skewY = this.skewY ;
            
            let t = this.node["_matrix"];
            let tm = t.m;
            cc["Trs"].toMat4(t, this.node["_trs"]);

 
            if (_skewX || _skewY) {
                let a = tm[0], b = tm[1], c = tm[4], d = tm[5];
                let skx = Math.tan(_skewX * ONE_DEGREE);
                let sky = Math.tan(_skewY * ONE_DEGREE);
                if (skx === Infinity)
                    skx = 99999999;
                if (sky === Infinity)
                    sky = 99999999;
                tm[0] = a + c * sky;
                tm[1] = b + d * sky;
                tm[4] = c + a * skx; 
                tm[5] = d + b * skx;
            }
            this.node["_localMatDirty"] &= ~LocalDirtyFlag.TRSS;
            // Register dirty status of world matrix so that it can be recalculated
            this.node["_worldMatDirty"] = true;
            this.node["matrix"] = tm;

            if(this.SP){
               //有Sprite的話 更新Sprite
               this.SP._applySpriteFrame(this.SP._spriteFrame);
               if (!CC_EDITOR) {
                //    this.SP._applyAtlas(this.SP._spriteFrame);
               }
            } 
        }
    }
}
