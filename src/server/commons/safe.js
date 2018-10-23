const Crypto = require('crypto');

class Safe {
  constructor(config) {
    this.config = config;
  }

  async encryptAsync(data) {
    try {
      const cipher = Crypto.createCipheriv(
        this.config.algorithm,
        this.config.key,
        this.config.iv,
      );
      let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted.toString('utf8');
    } catch (err) {
      throw err;
    }
  }

  async decryptAsync(encrypted) {
    try {
      const decipher = Crypto.createDecipheriv(
        this.config.algorithm,
        this.config.key,
        this.config.iv,
      );
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return JSON.parse(JSON.stringify(decrypted.toString()));
    } catch (err) {
      throw err;
    }
  }
}

exports.Safe = Safe;
