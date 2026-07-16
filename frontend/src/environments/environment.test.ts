const packageJson = require('../../package.json');

export const environment = {
  appName: 'Bharathikannan Ilanchezhiyan | Software Engineer',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  apiUrl: 'http://localhost:9000/',
  chatApiUrl: 'http://localhost:8000',
  collectionDate: new Date("2021-10-01"),
  collectionDayCount: 40,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  shareLink: ''
};
