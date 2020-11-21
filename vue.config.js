// vue.config.js
module.exports = {
  lintOnSave: false, // 干掉eslint语法检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 服务器地址
        changeOrigin: true // 是否跨域
      }
    }
  }
};
