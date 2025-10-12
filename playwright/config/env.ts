import path from 'path';
import { config as loadEnv } from 'dotenv';

export type TargetEnv = 'local' | 'staging' | 'production';

export type IdentityCredentials = {
  email: string;
  password: string;
};

export type EnvironmentConfig = {
  name: TargetEnv;
  baseURL: string;
  apiBaseURL: string;
  credentials: {
    primary: IdentityCredentials;
  };
};

const defaultDotEnv = process.env.UI_E2E_DOTENV ?? '.env';
loadEnv({ path: path.resolve(process.cwd(), defaultDotEnv) });

const fallbackBaseUrl =
  process.env.UI_E2E_BASE_URL ?? 'http://localhost:3000';
const fallbackApiUrl =
  process.env.REACT_APP_URL ??
  process.env.REACT_APP_API_URL ??
  'http://localhost:3001';

const targetEnv = (process.env.UI_E2E_ENV as TargetEnv) ?? 'local';

const resolveCredentials = (env: TargetEnv): IdentityCredentials => ({
  email:
    process.env[`UI_E2E_${env.toUpperCase()}_USER_EMAIL`] ??
    process.env.UI_E2E_USER_EMAIL ??
    'qa.user@example.com',
  password:
    process.env[`UI_E2E_${env.toUpperCase()}_USER_PASSWORD`] ??
    process.env.UI_E2E_USER_PASSWORD ??
    'super-secret-password',
});

const resolveBaseUrl = (env: TargetEnv): string =>
  process.env[`UI_E2E_${env.toUpperCase()}_BASE_URL`] ?? fallbackBaseUrl;

const resolveApiUrl = (env: TargetEnv): string =>
  process.env[`UI_E2E_${env.toUpperCase()}_API_BASE_URL`] ?? fallbackApiUrl;

const createEnvConfig = (env: TargetEnv): EnvironmentConfig => ({
  name: env,
  baseURL: resolveBaseUrl(env),
  apiBaseURL: resolveApiUrl(env),
  credentials: {
    primary: resolveCredentials(env),
  },
});

export const environment: EnvironmentConfig = createEnvConfig(targetEnv);

export const isCI = process.env.CI === 'true';

export const testRunId =
  process.env.UI_E2E_RUN_ID ?? `${environment.name}-${new Date().toISOString()}`;

