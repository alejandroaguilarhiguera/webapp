export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GITLAB_CLIENT_ID = process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID;
export const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
export const BITBUCKET_CLIENT_ID = process.env.NEXT_PUBLIC_BITBUCKET_CLIENT_ID;
export const URL_GITLAB = process.env.NEXT_PUBLIC_URL_GITLAB;
export const URL_GITHUB = process.env.NEXT_PUBLIC_URL_GITHUB;
export const URL_BITBUCKET = process.env.NEXT_PUBLIC_URL_BITBUCKET;
export const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL;
export const INTENTS_CODE_PHONE = process.env.NEXT_PUBLIC_INTENTS_CODE_PHONE;
export const { NODE_ENV } = process.env;
export const SESSION_LOCAL_STORAGE = '@session';

export const API_AUTH_LOGIN = '/auth/login';
export const API_AUTH_LOGIN_PROVIDER_CODE = '/auth/login/:provider?code=:code';
export const API_AUTH_SIGN_UP = '/auth/sign-up';
export const API_AUTH_RECOVERY_PASSWORD = '/auth/recovery-password/:email';
export const API_AUTH_RENEW_PASSWORD = '/auth/renew-password';
export const API_AUTH_CONFIRM_EMAIL = '/auth/confirm-email';
export const API_AUTH_SEND_CODE_PHONE = '/auth/send-code-phone/:phoneNumber';
export const API_AUTH_CONFIRM_PHONE = '/auth/confirm-phone';
export const API_GET_ALL_USERS = '/users';
export const API_SHOW_USER = '/users/:id';

export default {
  API_URL,
  WEBAPP_URL,
  GITLAB_CLIENT_ID,
  GITHUB_CLIENT_ID,
  BITBUCKET_CLIENT_ID,
  URL_GITLAB,
  URL_GITHUB,
  URL_BITBUCKET,
  INTENTS_CODE_PHONE,
  SESSION_LOCAL_STORAGE,
  NODE_ENV,
};
