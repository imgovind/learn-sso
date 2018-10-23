import appRoot from 'app-root-path';

export const defaults = {
  APP_LOG: `${appRoot.path}/logs/sso.log`,
  ACCESS_LOG: `${appRoot.path}/logs/sso-access.log`,
};
export const productionLabel = 'production';
export const stageLabel = 'stage';
export const devLabel = 'dev';
export const ssoClientConfigKey = 'ssoClient';
export const cfsClientConfigKey = 'cfsClient';
export const gkClientConfigKey = 'gkClient';
export const safeConfigKey = 'safeConfig';
export const routeConfigKey = 'routeConfig';
export const jwtConfigKey = 'jwtConfig';

export default {
  defaults,
  productionLabel,
  stageLabel,
  devLabel,
  ssoClientConfigKey,
  cfsClientConfigKey,
  gkClientConfigKey,
  safeConfigKey,
  routeConfigKey,
};
