import express from 'express'

import speakeasy from 'speakeasy'

//initializing the TwoFactorRouter
export const Router = express.Router()

//generates the totp secret and returns base32 encoded secret along with otpauth url
Router.get('/', (_, res) => {
    var secret = speakeasy.generateSecret()
    res.statusCode = 200
    res.json({
        secret: secret.base32,
        encoding: "base32",
        otpauth_url: secret.otpauth_url
    })
})

//verifies the totp
//the secret and token are passed in the body (while implementing sessions store the secret)
Router.post('/verify', (req, res) => {
    var verified = speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        token: req.body.token
    })
    res.statusCode = 200
    res.json({ verified })
})