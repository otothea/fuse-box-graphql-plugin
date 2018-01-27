# fuse-box-graphql-plugin

[`graphql-tag` loader for Webpack](http://dev.apollodata.com/react/webpack.html) lets you keep GraphQL queries in separate files.

This lib makes those work in Fusebox.

## Install

```
npm install fuse-box-graphql-plugin
```

## Usage

```
const fsbx = require('fuse-box');
const GraphQLPlugin = require('fuse-box-graphql-plugin');

fsbx.FuseBox.init({
  homeDir: 'src/',
  plugins: [
    ['.graphql|.gql', GraphQLPlugin()]
  ],
}).bundle('> index.js');
```
