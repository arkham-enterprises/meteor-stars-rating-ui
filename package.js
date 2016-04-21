Package.describe({
  name: 'arkham:stars-rating-ui',
  version: '0.2.0',
  summary: 'User based stars rating',
  git: 'https://github.com/ARKHAM-Enterprises/meteor-stars-rating-ui',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use([
    'ecmascript',
    'underscore',
    'templating',
    'mongo',
    'check',
    'accounts-base',
    'barbatus:stars-rating@1.0.7'
  ]);

  api.addFiles('src/client/template.html', 'client');
  api.mainModule('src/server/main.js', 'server');
  api.mainModule('src/client/main.js', 'client');
});
