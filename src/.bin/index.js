#!/usr/bin/env node

const { program } = require('commander');
const build = require('./build');

// const term = require('terminal-kit').terminal;
// term.red( 'red' ) ;
program
    .requiredOption('-s, --source <path>', 'svg 文件夹路径')
    .option('-o, --output <path>', 'icon图标输出文件夹路径', 'icons')
    .action((param) => {
        // console.log('action ', param);
    })

program.parse();
const options = program.opts();
build(options.source, options.output);



