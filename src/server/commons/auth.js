// @flow
import jwt from 'jsonwebtoken';
import { Safe } from './safe';
import configFile from '../configs';
import { safeConfigKey, jwtConfigKey } from './constants';

import {
  info,
  error,
} from './logger';

const appConfig = configFile(process.env);
const safeConfig = appConfig[safeConfigKey];
const jwtConfig = appConfig[jwtConfigKey];

export default class OauthHelper {
  constructor(config) {
    this.config = config;
    this.safe = new Safe(safeConfig);
    this.clientToken = null;
  }

  // ///////////////////////////////////////////
  // JWT Token Helpers
  // ///////////////////////////////////////////

  async encodeJWTToken(hostname) {
    try {
      const jwtTokenPayload = {
        iss: `${hostname}/${jwtConfig.issuer}`,
        aud: `${hostname}/${jwtConfig.audience}`,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      };
      const payloadToEncrypt = JSON.parse(JSON.stringify(jwtTokenPayload));
      const encryptedJWTTokenPayload = await this.safe.encryptAsync(payloadToEncrypt);
      jwtTokenPayload.enc = encryptedJWTTokenPayload;
      const jwtToken = jwt.sign(jwtTokenPayload, jwtConfig.secret);
      info('Encoded JWT');
      return jwtToken;
    } catch (err) {
      error('Error while encoding JWT');
      throw err;
    }
  }

  async decodeJWTToken(token, hostname) {
    try {
      const payload = jwt.verify(token, jwtConfig.secret, {
        issuer: `${hostname}/${jwtConfig.issuer}`,
        audience: `${hostname}/${jwtConfig.audience}`,
      });
      const decryptedPayload = await this.decryptJWTPayload(payload);
      info('Decoded JWT');
      return decryptedPayload;
    } catch (err) {
      error('Error while decoding JWT');
      throw err;
    }
  }

  async decryptJWTPayload(payload) {
    try {
      const payloadMutate = { ...payload };
      const decryptedPayload = await this.safe.decryptAsync(payloadMutate.enc);
      info('Decrypted JWT');
      return JSON.parse(decryptedPayload);
    } catch (err) {
      error('Error while decrypting JWT');
      throw err;
    }
  }
}
