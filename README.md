## ❓ Info about package

🔥 100% asyncronous  
🔥 Intuitive structure of methods  
🔥 Fresh updates  
🔥 Typescript support

## 📲 Installation

### ✅ Stable release

```bash
npm i easy-discord-oauth
```

```typescript

```

## 📔 Using

### Exchanging code

First of all, you need to receive Discord OAuth code. Navigate to [Discord docs](https://discord.com/developers/docs/topics/oauth2) for more info  
To get token use:

```typescript
const tokenRes = await DiscordOAuth.exchangeCode("code", "redirect uri", "client id", "client secret");
const token = tokenRes.accessToken;
```

### Getting user

For example, let's get info about the current user and log the username. It's requires `identify` scope.

```typescript
const user = await DiscordOAuth.User.getCurrentUser("token");
console.log(user.username);
```
