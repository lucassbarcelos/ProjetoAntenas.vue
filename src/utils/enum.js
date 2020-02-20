export const DEFAULT_API_URLS = {
  LOCAL: 'http://127.0.0.1:8081/',
  PRODUCTION: `${window.location.origin}/Vue/${process.env.VUE_APP_FUNCTION_NAME}/WebApi/`,
  DEVELOPMENT: 'http://127.0.0.1:8081/'
}
