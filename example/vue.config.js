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
            .set('@/icon',resolve('src/icon'))
    }
}
console.log('hello');
