import get from 'lodash.get';
import {
  info,
  error,
} from '../commons/logger';
import { ssoClientConfigKey } from '../commons/constants';
import { unsecuredRoutes } from '../commons/routes';

const checkIfRouteIsUnsecured = (req) => {
  const query = get(req, 'body.query', {});
  return unsecuredRoutes.reduce((acc, current) => acc || query.includes(current), false);
};

export default async function jwtMiddleware(req, res, next) {
  const { [ssoClientConfigKey]: oauthHelper } = req.app.locals;

  if (req.method !== 'POST') {
    req.requiresAuthorization = false;
    next();
    return;
  }

  if (checkIfRouteIsUnsecured(req)) {
    info('Unsecured route');
    req.requiresAuthorization = false;
    next();
    return;
  }

  if (!req.headers.authorization) {
    info('Missing authorization header');
    res.status(400).send('Missing authorization header');
    return;
  }

  const jwtTokenPayload = req.headers.authorization.split(' ')[1];
  try {
    const payload = await oauthHelper.decodeJWTToken(jwtTokenPayload, req.hostname);
    req.jwtTokenPayload = payload;
    req.requiresAuthorization = true;
    info('Passed jwtMiddleware');
    next();
    return;
  } catch (err) {
    error(`Error on jwtMiddleware -> ${JSON.stringify(err)}`);
    res.status(401).send('Invalid token');
  }
}
