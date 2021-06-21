export const SFB2C_CHECKOUT_ID_COOKIE = 'SFB2C_checkoutId'
export const SFB2C_CHECKOUT_URL_COOKIE = 'sfb2c_checkoutUrl'
export const SFB2C_CUSTOMER_TOKEN_COOKIE = 'sfb2c_customerToken'
export const SFB2C_COOKIE_EXPIRE = 30

// export const COMMERCE_API_PATH = '/api';

// Commerce SDK
export const COMMERCE_CLIENT_API_SITE_ID =
  process.env.COMMERCE_CLIENT_API_SITE_ID
export const COMMERCE_CLIENT_CLIENT_ID = process.env.COMMERCE_CLIENT_CLIENT_ID
export const COMMERCE_CLIENT_REALM_ID = process.env.COMMERCE_CLIENT_REALM_ID
export const COMMERCE_CLIENT_INSTANCE_ID =
  process.env.COMMERCE_CLIENT_INSTANCE_ID
export const COMMERCE_CLIENT_ORGANIZATION_ID = `f_ecom_${COMMERCE_CLIENT_REALM_ID}_${COMMERCE_CLIENT_INSTANCE_ID}`
export const COMMERCE_CLIENT_SHORT_CODE = process.env.COMMERCE_CLIENT_SHORT_CODE
// export const COMMERCE_CORS = '*'

// Available Log Levels for the Application
const LOG_LEVEL_MAP = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5,
}
// Default Log Level is set to ERROR within the Application. It can be overwritten here
export const COMMERCE_LOG_LEVEL = LOG_LEVEL_MAP.DEBUG
export const COMMERCE_SESSION_SECRET = 'SomeSecretValue'
