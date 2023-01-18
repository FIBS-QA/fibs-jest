import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  reporters: ['default', 'github-actions']
};

export default config;