# Api Buisness Logic

This is the api logic for a small subscription platform that I'm building. This was my first time using typescript, so I thought this might help as a boilerplate for any other projects. I've included a lot of security features and more are yet to come.

---

## Dependencies

- prisma
- nodemailer
- helmet
- cors
- joi
- jsonwebtoken
- speakeasy
- uuid
- bcryptjs
- cookie-parser
- express-rate-limit

---

## Security

- helmet (consists of extra middlewares)
- disable x-powered-by
- request rate limiter
- enabled cors
- custom csrf protection (jwt tokens)
- access and refresh tokens
- totp verification
- email verification

---

## How to setup

```
git clone https://github.com/sai-web/api-buisness-logic.git
npm run dev
```

### extra steps

- write a .env file with the environment variables from config/environment_variables.ts
- tweak the core to meet your needs

---

## Contribute

[![Join Discord](https://discordapp.com/api/guilds/658189217746255881/embed.png)](https://discord.gg/n9rVDZh)