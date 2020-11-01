import express from 'express'

import speakeasy from 'speakeasy'

export const Router = express.Router()

Router.get('/', (_, res) => {
    var secret = speakeasy.generateSecret()
    res.statusCode = 200
    res.json({
        secret: secret.base32,
        encoding: "base32",
        otpauth_url: secret.otpauth_url
    })
})

Router.post('/verify', (req, res) => {
    var verified = speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        token: req.body.token
    })
    res.json({ verified })
})