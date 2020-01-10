import { NormalizedRoot, Path, join } from '../path';
import { Host } from './interface';
import { ResolverHost } from './resolver';

export class ScopedHost<T extends object> extends ResolverHost<T> {
    constructor(delegate: Host<T>, protected _root: Path = NormalizedRoot) {
        super(delegate);
    }

    protected _resolve(path: Path): Path {
        return join(this._root, path);
    }
}
