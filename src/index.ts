import {DiscordOAuth} from "./interface.js";
export default DiscordOAuth;

export const exchangeCode = DiscordOAuth.exchangeCode;
export const refreshToken = DiscordOAuth.refreshToken;
export const revokeToken = DiscordOAuth.revokeToken;

export const getCurrentUser = DiscordOAuth.User.getCurrentUser;
export const getUser = DiscordOAuth.User.getUser;
export const getCurrentUserGuilds = DiscordOAuth.User.getCurrentUserGuilds;
export const getCurrentUserGuildMember = DiscordOAuth.User.getCurrentUserGuildMember;
