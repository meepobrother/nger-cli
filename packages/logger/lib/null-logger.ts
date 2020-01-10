import { EMPTY } from 'rxjs';
import { Logger, LoggerApi } from './logger';


export class NullLogger extends Logger {
    constructor(parent: Logger | null = null) {
        super('', parent);
        this._observable = EMPTY;
    }

    asApi(): LoggerApi {
        return {
            createChild: () => new NullLogger(this),
            log() { },
            debug() { },
            info() { },
            warn() { },
            error() { },
            fatal() { },
        } as LoggerApi;
    }
}
