import * as dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT || 8080

export const refresh_token_secret = process.env.REFRESH_TOKEN || "refresh token secret"
export const access_token_secret = process.env.ACCESS_TOKEN || "access token secret"
export const csrf_token_secret = process.env.CSRF_TOKEN || "csrf token secret"
export const email_token_secret = process.env.EMAIL_TOKEN || "email token secret"

export const email_address = process.env.EMAIL_ADDRESS || "not available"
export const email_password = process.env.EMAIL_PASSWORD || "not available"

export const build_type = process.env.BUILD_TYPE || 'development'