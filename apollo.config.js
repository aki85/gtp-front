module.exports = {
  client: {
    excludes: [
      "src/api.ts",
      "src/schema.graphql",
    ],
    service: {
      localSchemaFile: './src/schema.graphql',
      name: "my-graphql-app",
    },
  }
};
