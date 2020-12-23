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

# Auth endpoints
```
create an account with /auth/register         (returns User object)
login or confirm email with /auth/login				(returns access_token and refresh_token in cookies and User object in res)
get _csrf token with /auth/_csrf 			(returns _crsf token and expiration time in seconds)
revoke tokens with /auth/oauth/revoke
```

---

> todo's :- work on 2FA later

---

## app security steps
- provide an access token in the cookies			(the user id will be retrieved from the access token)
- provide a csrf token in the body 			(the access token will be verified against the csrf token)

---

# App end points
## activity
```
/inbox :- get the users inbox
/feed :- create a new feed
/setState:- set the users current state
```

## connect
```
/integrations :- get all the integrations
/connect :- connect to a new platform
/disconnect :-	disconnect from a platform
```

## subscription
```
/ :- get all the users subscriptions
/viewers :- get all the viewers subscribed
/subscribe :- subscribe to a creator
/unsubscribe :- unsubscribe from a creator
```

## user
```
/info :- get non confidential information
/update :- updata the user info
```

## vod
```
/vods :- get all vods from a given user id
/watch :- watch a vod
/create :- create a new vod
/delete :- delete a vod
```

---

> To hit the /app endpoints u need access token and csrf token

---

## Contribute

[![Join Discord](https://discordapp.com/api/guilds/658189217746255881/embed.png)](https://discord.gg/n9rVDZh)