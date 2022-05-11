#!/usr/bin/env node

const { program } = require('commander');
const build = require('./build');
const package = require('../../package.json');

program
    .version(package.version);

program
    .command('build <name>')
    .requiredOption('-s, --source <path>', 'svg 文件夹路径')
    .option('-o, --output <path>', 'icon图标输出文件夹路径', 'icons')
    .action((name, options) => {
        if(name !== 'svg'){
            console.log('只支持svg图片打包');
            return;
        }
        build(options.source, options.output);
    });

program.parse();



