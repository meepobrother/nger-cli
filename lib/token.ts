import { InjectionToken } from "@nger/core";

export interface Args {
    _: string[];
    [key: string]: any;
}
export const ARGS_TOKEN = new InjectionToken<Args>(`ARGS_TOKEN`)