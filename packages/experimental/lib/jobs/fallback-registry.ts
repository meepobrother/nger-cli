import { Observable, from } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';
import { JsonValue } from '@nger/cli.json';
import { JobHandler, JobName, Registry } from './api';

/**
 * A simple job registry that keep a map of JobName => JobHandler internally.
 */
export class FallbackRegistry<
    MinimumArgumentValueT extends JsonValue = JsonValue,
    MinimumInputValueT extends JsonValue = JsonValue,
    MinimumOutputValueT extends JsonValue = JsonValue,
    > implements Registry<MinimumArgumentValueT, MinimumInputValueT, MinimumOutputValueT> {
    constructor(protected _fallbacks: Registry<
        MinimumArgumentValueT,
        MinimumInputValueT,
        MinimumOutputValueT
    >[] = []) { }

    addFallback(registry: Registry) {
        this._fallbacks.push(registry);
    }

    get<
        A extends MinimumArgumentValueT = MinimumArgumentValueT,
        I extends MinimumInputValueT = MinimumInputValueT,
        O extends MinimumOutputValueT = MinimumOutputValueT,
        >(name: JobName): Observable<JobHandler<A, I, O> | null> {
        return from(this._fallbacks).pipe(
            concatMap(fb => fb.get<A, I, O>(name)),
            first(x => x !== null, null),
        );
    }
}
