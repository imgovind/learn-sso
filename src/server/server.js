import { GraphQLServer } from 'graphql-yoga';
import express from 'express';
import config from './configs';
import { info } from './commons/logger';
import resolvers from './resolvers';
import {
  ssoClientConfigKey,
  gkClientConfigKey,
  cfsClientConfigKey,
} from './commons/constants';
import OauthHelper from './commons/auth';
import corsMiddleware from './middlewares/corsMiddleware';
import jwtMiddleware from './middlewares/jwtMiddleware';
import authorizeMiddleware from './middlewares/authorizeMiddleware';

const appConfig = config(process.env);

const server = new GraphQLServer({
  cors: appConfig.cors,
  typeDefs: 'src/schema.graphql',
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  resolvers,
  context: req => ({
    req: req.request,
  }),
  middlewares: [],
});

const options = {
  port: appConfig.port,
  endpoint: '/',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

// ///////////////////////////////////////
// Oauth Client Instances, one per set of client_credentials (client_id & client_secret)
// ///////////////////////////////////////
/* eslint-disable max-len */
server.express.locals[ssoClientConfigKey] = new OauthHelper(appConfig[ssoClientConfigKey]);
server.express.locals[gkClientConfigKey] = new OauthHelper(appConfig[gkClientConfigKey]);
server.express.locals[cfsClientConfigKey] = new OauthHelper(appConfig[cfsClientConfigKey]);

server.express.use(express.json());
server.express.use('/healthcheck', (req, res) => {
  res.status(200).send({ message: 'success' });
});
server.express.use('/', corsMiddleware);
server.express.use('/', jwtMiddleware);
server.express.use('/', authorizeMiddleware);

// note - server.start returns a promise
export default server.start(options, ({ port }) => info(`Server started, listening on port ${port} for incoming requests.`));
