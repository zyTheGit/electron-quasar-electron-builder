var path = require('path');
module.exports = {
  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true
    },
    electronBuilder: {
      // removeElectronJunk: false,
      builderOptions: {
        "appId": "com.example.app",
        "productName": "monitorsystem",//项目名，也是生成的安装文件名，即aDemo.exe
        "copyright": "Copyright © 2019",//版权信息
        "directories": {
          "output": "./dist_electron"//输出文件路径
        },
        "win": {//win相关配置
          "extraResources": [
            {
              "from": "./cameraService/",//外用的dll或者exe文件夹
              "to": "./",//打包到哪里 './'默认是打包到程序的安装目录的resources文件夹下
            }
          ],
          "icon": "./dist_electron/icon/app.ico",//图标，当前图标在根目录下，注意这里有两个坑
          "target": [
            {
              "target": "nsis",//利用nsis制作安装程序
              "arch": [
                "x64",//64位
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "installerIcon": "./dist_electron/icon/app.ico",// 安装图标
          "uninstallerIcon": "./dist_electron/icon/app.ico",//卸载图标
          "installerHeaderIcon": "./dist_electron/icon/app.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true,// 创建开始菜单图标
          "shortcutName": "monitorsystem", // 图标名称
        },
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
};


function resolve(dir) {
  return path.join(__dirname, dir);
}
