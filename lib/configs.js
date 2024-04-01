const frameworkConfigs = {
  vue2: {
    desktopComponentLibraryName: 'element-ui',
    desktopComponentLibraryPrefix: 'el-',
    desktopComponentLibraryResolver: 'ElementUiResolver',
    mobileComponentLibraryName: 'vant',
    mobileComponentLibraryPrefix: 'van-',
    mobileComponentLibraryResolver: 'VantResolver',
    mobileComponentLibraryVersion: '2.13.2'
  },
  vue3: {
    desktopComponentLibraryName: 'ant-design-vue',
    desktopComponentLibraryPrefix: 'a-',
    desktopComponentLibraryResolver: 'AntDesignVueResolver',
    mobileComponentLibraryName: 'vant',
    mobileComponentLibraryPrefix: 'van-',
    mobileComponentLibraryResolver: 'VantResolver',
    mobileComponentLibraryVersion: '4.8.7'
  }
};
const bundlerConfigs = {
  webpack: {
    configPath: 'build/webpack.base.config.js'
  },
  vite: {
    configPath: 'vite.config.ts'
  }
};

module.exports = {
  frameworkConfigs,
  bundlerConfigs
};