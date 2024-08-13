import type { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'Issues',
  devServer: {
    port: 8080,
    reloadStrategy: 'pageReload',
  },
  srcDir: 'src/components',
  buildEs5: 'prod',
  outputTargets: [
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'dist',
    },
    {
      type: 'www',
      baseUrl: 'http://localhost:8080',
      serviceWorker: null, // disable service workers
    },
  ],
  extras: {
    enableImportInjection: true,
  }
};
