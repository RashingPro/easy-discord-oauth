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
import DiscordOAuth from "easy-discord-oauth";
```

### ⚠ Beta test
To join beta testing go to my [discord server](https://discord.gg/AbDzDG5EE5) -> `#testing`  

## 📔 Using
> [!TIP]
> Don't be afraid to ask for help! You can do it in [GitHub issues](https://github.com/RashingPro/easy-discord-oauth/issues) or my [discord server](https://discord.gg/AbDzDG5EE5)

### Exchanging code
First of all, you need to receive Discord OAuth code. Navigate to [Discord docs](https://discord.com/developers/docs/topics/oauth2) for more info  
To get token use:
```typescript
const tokenRes = await DiscordOAuth.exchangeCode(
    "code",
    "redirect uri",
    "client id",
    "client secret"
)
const token = tokenRes.accessToken
```
### Getting user
For example let's get info about current user and log username. It's requires `identify` scope.
```typescript
const user = await DiscordOAuth.User.getCurrentUser("token")
console.log(user.username)
```
> [!TIP]
> Organization of namespaces in `DiscordOAuth` is according to Discord docs navigation. For example `Get current user guilds` method is in User tab ([here](https://discord.com/developers/docs/resources/user#get-current-user-guilds)), so package's method will be `DiscordOAuth.User.getCurrentUserGuilds()`
