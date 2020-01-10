import { corePlatform, getNger, createPlatformFactory, APP_INITIALIZER, Injector, NgerRef, INJECTOR_SCOPE, ControllerMethodHandler, MAIN_PATH, PLATFORM_INITIALIZER, setDevMode } from '@nger/core';
import { CommandMetadataKey, OptionMetadataKey, ActionMetadataKey, OptionOptions, CommandOptions } from './decorator';
import { IClassDecorator, IMethodDecorator, IPropertyDecorator } from '@nger/decorator';
import yargsParser from 'yargs-parser'
import { ARGS_TOKEN } from './token'
const root = process.cwd();
import { join } from 'path'
export const platformCli = createPlatformFactory(corePlatform, 'cli', [{
    provide: CommandMetadataKey,
    useValue: (instance: any, ctrl: IClassDecorator, injector: Injector) => {
        const controllerInjector = injector.create([{
            provide: INJECTOR_SCOPE,
            useValue: ctrl.type.name
        }], ctrl.type.name);
        const nger = getNger(controllerInjector, ctrl.type);
        const ref = new NgerRef(nger, controllerInjector)
        nger.methods.map(it => {
            if (it.metadataKey) {
                const handler = injector.get<ControllerMethodHandler>(it.metadataKey);
                if (handler) handler(injector, it, ctrl, ref)
            }
        })
    }
}, {
    provide: OptionMetadataKey,
    useValue: (val: any, instance: any, injector: Injector, ctrl: IPropertyDecorator<any, OptionOptions>) => {
        const args = injector.get(ARGS_TOKEN)
        const options = ctrl.options;
        if (options) {
            Reflect.set(instance, ctrl.property, Reflect.get(args, options.alias || ctrl.property || val))
        }
    }
}, {
    provide: ActionMetadataKey,
    useValue: (injector: Injector, ctrl: IMethodDecorator, parent: IClassDecorator<any, CommandOptions>, ref: NgerRef<any>) => {
        const args = injector.get(ARGS_TOKEN)
        const commands = args._;
        const parentOptions = parent.options;
        let isThisCommand!: boolean;
        if (parentOptions) {
            if (commands.includes(parentOptions.name)) {
                isThisCommand = true;
            }
            if (parentOptions.alias) {
                if (commands.includes(parentOptions.alias)) {
                    isThisCommand = true;
                }
            }
        }
        if (isThisCommand) {
            const instance = ref.create()
            const mth = Reflect.get(instance, ctrl.property)
            if (mth && typeof mth === 'function') {
                mth();
            }
        }
    }
}, {
    provide: ARGS_TOKEN,
    useValue: yargsParser(process.argv.slice(2))
}, {
    provide: MAIN_PATH,
    useFactory: (injector: Injector) => {
        const args = injector.get(ARGS_TOKEN)
        const main = Reflect.get(args, 'main')
        const input = Reflect.get(args, 'input')
        const i = Reflect.get(args, 'i')
        return join(root, main || input || i || 'main.ts')
    },
    deps: [Injector]
}, {
    provide: PLATFORM_INITIALIZER,
    useFactory: (injector: Injector) => {
        const args = injector.get(ARGS_TOKEN)
        const dev = !!Reflect.get(args, 'dev')
        const d = !!Reflect.get(args, 'd')
        if (dev || d) {
            setDevMode(true)
        }
        const prod = !!Reflect.get(args, 'prod')
        const p = !!Reflect.get(args, 'p')
        if (prod || p) {
            setDevMode(false)
        }
    },
    deps: [
        Injector
    ]
}])
