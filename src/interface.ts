import { DiscordApiCore } from "./core";
import { GuildMember, PartialGuild, TokenResponse, User } from "./types";
import { camelize } from "object-key-converter";

export namespace DiscordOAuth {
    /**
     *
     * @param {string} code code got from discord auth url
     * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
     * @param {string} clientId app's client id
     * @param {string} clientSecret app's client secret
     * @returns {Promise<TokenResponse>} read discord docs for more info about API response
     */
    export async function exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string) {
        const res = await DiscordApiCore.fetch("/oauth2/token", {
            method: "POST",
            data: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri
            },
            authType: "Basic",
            auth: [clientId, clientSecret]
        });
        return camelize(res) as TokenResponse;
    }

    /**
     * Refresh the access token using refresh one. https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
     * @param refresh_token don't miss with access token!
     * @param clientId
     * @param clientSecret
     */
    export async function refreshToken(refresh_token: string, clientId: string, clientSecret: string) {
        const res = await DiscordApiCore.fetch("/oauth2/token", {
            method: "POST",
            data: {
                grant_type: "refresh_token",
                refresh_token: refresh_token
            },
            authType: "Basic",
            auth: [clientId, clientSecret]
        });
        return camelize(res) as TokenResponse;
    }

    /**
     * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-token-revocation-example
     * @param token
     * @param clientId
     * @param clientSecret
     * @param tokenType token_type_hint
     */
    export async function revokeToken(
        token: string,
        clientId: string,
        clientSecret: string,
        tokenType?: "access_token" | "refresh_token"
    ) {
        await DiscordApiCore.fetch("/oauth/token/revoke", {
            method: "POST",
            data: {
                token: token,
                token_type_hint: tokenType
            },
            authType: "Basic",
            auth: [clientId, clientSecret]
        });
    }

    export namespace User {
        /**
         * Get info about the current user. Require `identify` scope. Optionally, if app was authorised with `email` scope - email will be also provided
         * @param {string} token
         * @return {Promise<User>} info about current user
         */
        export async function getCurrentUser(token: string) {
            return getUser(token, "@me");
        }

        /**
         * Get info about user with specified `userId`
         * @param token
         * @param userId
         * @return {Promise<User>} info about user
         */
        export async function getUser(token: string, userId: string): Promise<User> {
            const res = await DiscordApiCore.fetch(`/users/${userId}`, { auth: token });
            return camelize(res) as User;
        }

        /**
         * Get the current user's guild list. The maximum is 200 guilds. Read more info here https://discord.com/developers/docs/resources/user#get-current-user-guilds
         * @param token
         */
        export async function getCurrentUserGuilds(token: string) {
            const res = await DiscordApiCore.fetch("/users/@me/guilds", { auth: token });
            let result: PartialGuild[] = [];
            res.forEach((val: Record<string, any>) => {
                result.push(camelize(val) as PartialGuild);
            });
            return result;
        }

        /**
         * Get a current user guild member. Requires `guilds.members.read` auth scope
         * Check discord docs for more info. https://discord.com/developers/docs/resources/user#get-current-user-guild-member
         * @param token
         * @param guildId
         * @returns {Promise<GuildMember>}
         */
        export async function getCurrentUserGuildMember(token: string, guildId: string) {
            const res = await DiscordApiCore.fetch(`/users/@me/guilds/${guildId}/member`, { auth: token });
            return res as GuildMember;
        }
    }
}
