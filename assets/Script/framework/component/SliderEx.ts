/**
 * @author 渡鸦
 * @description 扩展滑块拖拽事件及当前进度展示
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class SliderEx extends cc.Slider {

    @property(cc.Node)
    nodeProgress: cc.Node = null;

    private _handleDragStart: (progress: number) => void = null;
    private _handleDragMove: (progress: number) => void = null;
    private _handleDragEnd: (progress: number) => void = null;

    private __preload() {
        super.__preload();

        let widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.updateAlignment();
        }
    }

    private _onHandleDragStart(event: cc.Event.EventTouch) {
        super._onHandleDragStart(event);

        if (this._handleDragStart) {
            this._handleDragStart(this.progress);
        }
    }

    private _onTouchBegan(event) {
        if (!this.handle) { return; }

        super._onTouchBegan(event);

        this.handleTouchEvent(this._handleDragStart);
    }

    private _onTouchMoved(event) {
        if (!this.handle) { return; }

        super._onTouchMoved(event);

        this.handleTouchEvent(this._handleDragMove);
    }

    private _onTouchEnded(event) {
        super._onTouchEnded(event);

        this.handleTouchEvent(this._handleDragEnd);
    }

    private _onTouchCancelled(event) {
        super._onTouchCancelled(event);

        this.handleTouchEvent(this._handleDragEnd);
    }

    private _updateHandlePosition() {
        if (!this.handle) { return; }

        super._updateHandlePosition();

        this.nodeProgress.width = this.node.width * this.progress;
    }

    private handleTouchEvent(callback: (progress: number) => void) {
        this.nodeProgress.width = this.node.width * this.progress;
        if (callback) {
            callback(this.progress);
        }
    }

    /**
     * 拖拽开始事件回调
     * @param callback 
     */
    handleDragStart(callback: (progress: number) => void) {
        this._handleDragStart = callback;
    }

    /**
    * 拖拽中事件回调
    * @param callback 
    */
    handleDragMove(callback: (progress: number) => void) {
        this._handleDragMove = callback;
    }

    /**
    * 拖拽结束事件回调
    * @param callback 
    */
    handleDragEnd(callback: (progress: number) => void) {
        this._handleDragEnd = callback;
    }

    /**
     * 设置进度
     * @param value 
     */
    setProgress(value: number) {
        if (!this._dragging) {
            this.progress = value;
            this.nodeProgress.width = this.node.width * value;
        }
    }
}
