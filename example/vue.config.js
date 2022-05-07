const path = require('path');
function resolve (dir) {
    const resolveDir = path.join(__dirname, dir);
    console.log(resolveDir);
    return resolveDir;
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@src', resolve('../src'))
            .set('@/svg',resolve('src/svg'))
    }
}
console.log('hello');
