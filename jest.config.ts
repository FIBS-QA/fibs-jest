import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  reporters: ['default', 'github-actions'], 
  setupFilesAfterEnv: ['./jest.setup.js']
};

export default config;