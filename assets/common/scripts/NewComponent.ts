import { _decorator, Component, Label, Sprite, SpriteFrame, log, assetManager } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property({ type: Label })
    label: Label = null;

    @property({ type: Sprite })
    sprite: Sprite = null;

    @property({ type: [SpriteFrame] })
    spriteFrames: SpriteFrame[] = [];

    start() {
        log('NewComponent ' + this.node.name + ' start');
    }

    bundleName: string;
    zzClose() {
        this.node.destroy();
        assetManager.getBundle(this.bundleName).releaseUnusedAssets();
    }
}