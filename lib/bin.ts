#!/usr/bin/env node
import { Command, Option, Action } from './index';
import { platformCli } from './platform_new';
import { Module } from '@nger/core'
@Command({
    name: 'test',
    desc: `测试1`,
    alias: 't1'
})
export class TestCommand {
    @Option({
        alias: `t`
    })
    test: string;

    @Action()
    do() {
        console.log(`hello test: ${this.test}`)
    }
}

@Command({
    name: 'test2',
    desc: `测试2`,
    alias: `t2`
})
export class Test2Command {
    @Option({
        alias: 't'
    })
    test: string;

    @Action()
    do() {
        console.log(`hello test2: ${this.test}`)
    }
}

@Module({
    controllers: [
        TestCommand,
        Test2Command
    ]
})
export class AppModule { }
platformCli().bootstrapModule(AppModule)
