import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv';

dotenv.config({
  path: ['.env.local', '.env'],
});

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_INDEXER_GRAPHQL_URL,
  documents: ["*.{ts,tsx}"],
  generates: {
    "./__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;