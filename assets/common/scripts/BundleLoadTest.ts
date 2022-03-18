
import { _decorator, Component, assetManager, instantiate, Prefab, Node, error, log, EditBox } from 'cc';
import { NewComponent } from './NewComponent';
const { ccclass, property } = _decorator;

@ccclass('BundleLoadTest')
export class BundleLoadTest extends Component {

    @property({ type: EditBox })
    ebBundleName: EditBox;

    bundlePath(bundleName: string): string {
        return 'http://127.0.0.1:8000/' + bundleName;
    }

    start() {
        assetManager.loadBundle('common', (err, bundle) => {
            if (err) {
                error(err);
            }
            else {
                log(bundle);
            }
        });
    }

    public zzLoadBundle() {
        assetManager.loadBundle(this.bundlePath(this.ebBundleName.string), (err, bundle) => {
            if (err) {
                return console.error(err);
            }
            else {
                bundle.load('bundle-0', Prefab, (err, prefab) => {
                    if (prefab) {
                        const p: Node = instantiate(prefab.data);
                        p.parent = this.node.parent;

                        const c = p.getComponent(NewComponent);
                        c.bundleName = this.ebBundleName.string;
                    }
                });
            }
            console.log(bundle);
        });
    }
}