import { Observable } from 'rxjs';
import { LogEntry, Logger } from './logger';
export class TransformLogger extends Logger {
    constructor(name: string,
        transform: (stream: Observable<LogEntry>) => Observable<LogEntry>,
        parent: Logger | null = null) {
        super(name, parent);
        this._observable = transform(this._observable);
    }
}
