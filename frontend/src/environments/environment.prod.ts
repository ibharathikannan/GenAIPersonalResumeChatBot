const packageJson = require('../../package.json');

export const environment = {
  appName: 'Bharathikannan Ilanchezhiyan | Software Engineer',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  apiUrl: 'https://sg-sesp-ses-appointment-api-11580-prod.azurewebsites.net/',
  chatApiUrl: 'https://your-chat-api-prod.azurewebsites.net',
  collectionDate: new Date("2021-10-01"),
  collectionDayCount: 41,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  shareLink: ''
};
