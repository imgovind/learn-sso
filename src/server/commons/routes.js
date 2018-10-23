import resolvers from '../resolvers';
import config from '../configs';
import {
  routeConfigKey,
  productionLabel,
} from './constants';

const appConfig = config(process.env);
const routeConfig = appConfig[routeConfigKey];

/* eslint-disable max-len */
const queryRoutes = Object.getOwnPropertyNames(resolvers.Query).filter(x => typeof resolvers.Query[x] === 'function');
const mutateRoutes = Object.getOwnPropertyNames(resolvers.Mutation).filter(x => typeof resolvers.Mutation[x] === 'function');
export const routes = queryRoutes.concat(mutateRoutes);

export const allSSORoutes = routes.filter(q => q.match(new RegExp(routeConfig.ssoRegex)));

export const ssoRoutes = allSSORoutes.filter(r => !r.match(new RegExp(routeConfig.loginRegex)));

const allUnsecuredRoutes = allSSORoutes.filter(r => r.match(new RegExp(routeConfig.loginRegex)));
/* eslint-enable max-len */

// for playground - uncomment to turn off playground in production
if (process.env.NODE_ENV !== productionLabel) {
  allUnsecuredRoutes.push('IntrospectionQuery');
}
export const unsecuredRoutes = allUnsecuredRoutes;
