import { productionLabel } from './constants';

export default (env) => {
  const baseConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  if (env.NODE_ENV === productionLabel) {
    // for other config options: https://github.com/expressjs/cors#configuration-options
    baseConfig.origin = /\.?govind\.io\/?$/;
  }
  return baseConfig;
};
