import { defaults } from '../commons/constants';

export default {
  file: {
    level: 'info',
    filename: defaults.APP_LOG,
    handleExceptions: true,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
