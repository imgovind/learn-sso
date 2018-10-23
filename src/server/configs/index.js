import {
  defaults,
  productionLabel,
  gkClientConfigKey,
  cfsClientConfigKey,
  safeConfigKey,
  routeConfigKey,
  jwtConfigKey,
} from '../commons/constants';
import corsConfig from '../commons/cors';

export default env => ({
  [gkClientConfigKey]: {
    apiTimeout: parseInt(env.GK_API_TIMEOUT_DURATION || env.API_TIMEOUT_DURATION, 10),
    apiBaseUrl: env.GK_API_BASE_URL || env.API_BASE_URL,
    userTokenGrantType: 'password',
  },
  [cfsClientConfigKey]: {
    apiTimeout: parseInt(env.CFS_API_TIMEOUT_DURATION || env.API_TIMEOUT_DURATION, 10),
    apiBaseUrl: env.CFS_API_BASE_URL || env.API_BASE_URL,
    userTokenGrantType: 'password',
  },
  [safeConfigKey]: {
    iv: env.SAFE_IV,
    key: env.SAFE_KEY,
    algorithm: 'aes-256-ctr',
  },
  [routeConfigKey]: {
    ssoRegex: '.{0,3}sso',
    gkRegex: 'gatekeeper',
    cfsRegex: 'cfs',
    loginRegex: 'Login',
  },
  [jwtConfigKey]: {
    issuer: 'sso',
    secret: 'jwtSecret',
    audience: 'govind',
  },
  LOGGER_CONFIG: {
    APP_LOG: (env.NODE_ENV === productionLabel)
      ? env.APP_LOG : defaults.APP_LOG,
    ACCESS_LOG: (env.NODE_ENV === productionLabel)
      ? env.ACCESS_LOG : defaults.ACCESS_LOG,
    overrideDefaultConsole: true,
    console: true,
    file: true,
  },
  port: env.PORT || 8000,
  cors: corsConfig(env),
});
