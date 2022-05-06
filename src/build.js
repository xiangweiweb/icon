const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const parseXml = require('@rgrove/parse-xml');
const { optimize } = require('svgo');
const colors = require('colors');


const iconTemplate = fs.readFileSync(__dirname + '/template/icon.ejs');
console.log(__dirname + '/template/icon.ejs');
const compiler = ejs.compile(iconTemplate);

/**
 * 获取图标对应的变量名
 * 图片会被打包成js文件，此时需要使用到
 * @param {String} sourceName
 * @returns {String}
 */
function getIconVarName(sourceName){
    const reg = /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/;
    if(reg.test(reg)){
        return sourceName;
    }else{
        // 如果名称不满足变量名规则，则随机生成4位字符
        const getRandom = () => {
            // 0-25
            return Math.floor(Math.random() * 26);
        }
        const chars = 'abcdefghijklmnopqrsjuvwxyz';
        const newName = `${chars[getRandom()]}${chars[getRandom()]}${chars[getRandom()]}${chars[getRandom()]}`;
        console.log(colors.red(`文件名[${sourceName}]不满足变量命名规则，使用随机名称[${newName}]`));
        return newName;
    }
}

/**
 * 将svg格式打包成js(组件渲染使用)，并做svg图标优化
 * @param {*} sourceDir svg图标的文件路径（绝对路径）
 * @param {*} targetDir 打包后svg图标输出的文件路径（绝对路径）
 */
export async function build(sourceDir, targetDir){
    const fileList = fs.readFileSync(fromDir, 'utf8');
    for(const filename in fileList){
        if(!(/\.svg$/.test(filename))){
            continue;
        }
        // 1. 优化svg
        const filePath = path.resolve(sourceDir, filename);
        console.log('filePath is ' + filePath);
        const data = path.readFileSync(filePath, 'utf8');
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
}
