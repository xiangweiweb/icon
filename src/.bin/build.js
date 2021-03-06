const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const rimraf = require('rimraf');
const parseXml = require('@rgrove/parse-xml');
const { optimize } = require('svgo');
const colors = require('colors');

const iconTemplatePath = path.resolve(__dirname, '../template.ejs');
const iconTemplate = fs.readFileSync(iconTemplatePath, 'utf8');
const compiler = ejs.compile(iconTemplate);

/**
 * 获取图标对应的变量名
 * 图片会被打包成js文件，此时需要使用到
 * @param {String} sourceName
 * @returns {String}
 */
function getIconVarName(sourceName){
    sourceName = sourceName.replace('-', '_');
    const reg = /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/;
    if(reg.test(sourceName)){
        return sourceName + 'Icon';
    }else{
        // 如果名称不满足变量名规则，则随机生成4位字符
        const getRandom = () => {
            // 0-25
            return Math.floor(Math.random() * 26);
        }
        const chars = 'abcdefghijklmnopqrsjuvwxyz';
        const newName = `${chars[getRandom()]}${chars[getRandom()]}${chars[getRandom()]}${chars[getRandom()]}`;
        console.log(colors.blue(`文件名[${sourceName}]不满足变量命名规则，使用随机名称[${newName}]`));
        return newName + 'Icon';
    }
}

function getResolvePath(dir){
    let resolvePath = null;
    if(path.isAbsolute(dir)){
        resolvePath = dir;
    }else{
        resolvePath = path.resolve(process.cwd(), dir);
    }
    return resolvePath;
}

/**
 * 将svg格式打包成js(组件渲染使用)，并做svg图标优化
 * @param {*} sourceDir svg图标的文件路径（绝对路径）
 * @param {*} targetDir 打包后svg图标输出的文件路径（绝对路径）
 */
async function handler(sourceDir, targetDir){
    const fileList = fs.readdirSync(sourceDir, 'utf8');
    for(const filename of fileList){
        console.log(colors.blue('filename is ' + filename));
        if(!(/\.svg$/.test(filename))){
            console.log(colors.blue('not svg'));
            continue;
        }
        // 1. 优化svg
        const filePath = path.resolve(sourceDir, filename);
        const data = fs.readFileSync(filePath, 'utf8');
        const result = await optimize(data);
        // 2. 组装组件需要的数据
        const iconJSONObj = parseXml(result.data).children[0];
        const iconName = path.basename(filename, '.svg');
        const icon = {
            // 用文件名来做组件调用时的名称
            name: iconName,
            icon: iconJSONObj
        };
        const componentStr = compiler({
            name: getIconVarName(iconName),
            data: JSON.stringify(icon, null, 4)
        });
        // 3. 将数据输出到文件中
        const targetFilePath = path.resolve(targetDir, iconName +'.js');
        fs.writeFileSync(targetFilePath, componentStr);
    }
};

module.exports = function build(source, output){

    const sourceDir = getResolvePath(source);
    console.log(colors.yellow('source dir is ' + sourceDir));
    if(!fs.existsSync(sourceDir)){
        console.log(colors.red('source dir is not exist'));
        return;
    }

    const targetDir = getResolvePath(output);
    console.log(colors.yellow('output dir is ' + targetDir));

    rimraf(
        targetDir,
        async function success(){
            fs.mkdirSync(targetDir, {recursive: true});
            await handler(sourceDir, targetDir);
            console.log(colors.green('build successful!!!'));
        }
    );
}
