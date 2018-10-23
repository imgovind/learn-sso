import { info } from './commons/logger';

export async function ssoSignup(parentObj, params, context) {
  info('Into Signup');
  return 'signup success';
}

export async function ssoLogin(parentObj, params, context) {
  info(`Into Login - \n Username:${params.username}, Password:${params.password}`);
  return 'login success';
}

export async function ssoLogout(parentObj, params, context) {
  info('Into Logout');
  return 'logout success';
}

export async function ssoIsAuthenticated(parentObj, params, context) {
  info('Into isAuthenticated');
  return {
    iss: 'issuer',
    exp: 'expiry',
    aud: 'audience',
    username: 'username',
    iat: 'iat',
  };
}
