const loader = require('graphql-tag/loader');

class GraphQLPlugin {
  constructor() {
    this.test = /\.(graphql|gql)$/;
  }

  init(context) {
    context.allowExtension('.graphql');
    context.allowExtension('.gql');
  }

  transform(file) {
    const context = file.context;
    if (context.useCache) {
      const cached = context.cache.getStaticCache(file);
      if (cached) {
        file.isLoaded = true;
        file.contents = cached.contents;
        return;
      }
    }

    file.loadContents();

    // call directly the webpack loader with a mocked context
    // as graphql-tag/loader leverages `this.cacheable()`
    file.contents = loader.call({ cacheable() {} }, file.contents);

    if (context.useCache) {
      context.emitJavascriptHotReload(file);
      context.cache.writeStaticCache(file, file.sourceMap);
    }
  }
}

module.exports = options => new GraphQLPlugin(options);
