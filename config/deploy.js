var VALID_DEPLOY_TARGETS = [
  'production',
  'staging',
  'production-appcache',
  'staging-appcache',
];

module.exports = function(deployTarget) {

  if(deployTarget === 'production' || deployTarget === 'production-appcache') {
    var deployUser = process.env.RUNVERTER_DEPLOY_USER_PRODUCTION
    var deployHost = 'runverter.production'
  }else if(deployTarget === 'staging' || deployTarget === 'staging-appcache') {
    var deployUser = process.env.RUNVERTER_DEPLOY_USER_STAGING
    var deployHost = 'runverter.staging'
  }

  var ENV = {
    build: {},
    plugins: (deployTarget === 'production' || deployTarget === 'staging') ? ['build', 'display-revisions', 'gzip', 'manifest', 's3', 'redis', 'revision-data', 'ssh-tunnel'] : ['build', 'gzip', 'manifest', 'scp'],
    redis : {
      allowOverwrite: true,
      keyPrefix: 'runverter:index'
    },
    s3 : {
      accessKeyId: process.env.RUNVERTER_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.RUNVERTER_AWS_SECRET_ACCESS_KEY,
      bucket: 's.runverter.io',
      region: 'eu-central-1',
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,appcache,json}'
    },
    scp : {
      username: deployUser,
      host: deployHost,
      path: '~/runverter/',
      exclude: '{*.html,*.png,*.svg,*.txt,*.xml,*.ico,assets,images}',
    },
    'ssh-tunnel' : {
      username: deployUser,
      host: deployHost,
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }
  return ENV;
};
