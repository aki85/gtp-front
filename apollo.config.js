module.exports = {
  client: {
    excludes: [
      "src/api.ts",
      "src/graphql/schema.graphql",
    ],
    service: {
      localSchemaFile: './src/graphql/schema.graphql',
      name: "my-graphql-app",
    },
  }
};
