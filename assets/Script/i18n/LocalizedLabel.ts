
import * as i18n from './LanguageData';

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export class LocalizedLabel extends cc.Component {
    label: cc.Label | null = null;

    @property
    key: string = '';

    onLoad() {
        if (!i18n.ready) {
            i18n.init('zh');
        }
        this.fetchRender();
    }

    fetchRender () {
        let label = this.getComponent('cc.Label') as cc.Label;
        if (label) {
            this.label = label;
            this.updateLabel();
            return;
        } 
    }

    updateLabel () {
        this.label && (this.label.string = i18n.t(this.key));
    }
}
