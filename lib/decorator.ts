import { createClassDecorator, createPropertyDecorator, createMethodDecorator, Type, TypeProperty } from '@nger/decorator';

export const CommandMetadataKey = `CommandMetadataKey`;
export interface CommandOptions {
    name: string;
    alias?: string;
    desc?: string;
    opts?: {
        noHelp?: boolean;
        isDefault?: boolean;
    };
}
export const Command = createClassDecorator<CommandOptions>(CommandMetadataKey, it => {
    const options = it.options;
    if (options) {
        it.options = {
            ...options
        }
    } else {
        it.options = {
            name: it.type.name
        }
    }
});

export const OptionMetadataKey = `OptionsMetadataKey`;
export interface OptionOptions {
    alias: string;
    description?: string;
}
export const Option = createPropertyDecorator<OptionOptions>(OptionMetadataKey, it => {
    const options = it.options;
    if (options) {
        it.options = {
            ...options
        }
    }
    else {
        it.options = {
            alias: it.property as string
        }
    }
});

export const ActionMetadataKey = `ActionMetadataKey`;
export interface ActionOptions { }
export const Action = createMethodDecorator<ActionOptions>(ActionMetadataKey);

