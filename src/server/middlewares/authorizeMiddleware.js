import get from 'lodash.get';
import { info } from '../commons/logger';
import { ssoRoutes } from '../commons/routes';

const checkIfRouteIsSSO = (req) => {
  const query = get(req, 'body.query', {});
  return ssoRoutes.reduce((acc, current) => acc || query.includes(current), false);
};

export default async function authorizeMiddleware(req, res, next) {
  if (req.requiresAuthorization === false || req.isAuthorized === true) {
    info('Unsecured route - authorization skipped');
    next();
    return;
  }

  if (checkIfRouteIsSSO(req)) {
    info('SSO route authorized');
    req.isAuthorized = true;
    next();
    return;
  }

  info('Unauthorized to hit the SSO endpoints');
  res.status(403).send('Not authorized');
}
