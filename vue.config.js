module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      test: /node_modules[/\\](iconv-lite)[/\\].+/,
      resolve: {
        aliasFields: ["main"]
      }
    });
  }
};
