import * as tags from './literals';
import * as strings from './strings';
export { tags, strings };

export * from './array';
export * from './object';
export * from './template';
export * from './partially-ordered-set';
export * from './priority-queue';
export * from './lang';
export * from './template'

export type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

// This should be ReadonlyArray but it has implications.
export interface DeepReadonlyArray<T> extends Array<DeepReadonly<T>> { }

export type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Readwrite<T> = {
    -readonly [P in keyof T]: T[P];
};
