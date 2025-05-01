import {DiscordApiCore, DiscordApiResponses} from "./core.js";

export namespace DiscordOAuth {
    /**
     *
     * @param {string} code code got from discord auth url
     * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
     * @param {string} clientId app's client id
     * @param {string} clientSecret app's client secret
     * @returns {Promise<DiscordApiResult>} read discord docs for more info about API response
     */
    export async function exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string) {
        const res = await DiscordApiCore.fetch(
            "/oauth2/token",
            "POST",
            {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirectUri
            },
            [clientId, clientSecret],
            'Basic'
        );
        const accessToken = res.data?.["access_token"]
        const expiresIn = res.data?.["expires_in"]
        const refreshToken = res.data?.["refresh_token"]
        const scope = res.data?.["scope"]
        if (res.status == "success" && accessToken && expiresIn && refreshToken && scope) {
            return new DiscordApiResponses.TokenResponse(accessToken, expiresIn, refreshToken, scope)
        }

    }

    export namespace User {
        /**
         * Get info about current user. Require `identify` scope. Optionally, if app was authorised with `email` scope - email will be also provided
         * @param {string} token
         * @return {Promise<DiscordApiResult>} info about current user
         */
        export async function getCurrentUser(token: string) {
            return await DiscordApiCore.fetch(
                "/users/@me",
                "GET",
                {},
                [token]
            );
        }

        /**
         * Get info about user with specified `userId`
         * @param token
         * @param userId
         */
        export async function getUser(token: string, userId: string) {
            return await DiscordApiCore.fetch(
                `/users/${userId}`,
                "GET",
                {},
                [token]
            );
        }

        /**
         * Get current user's guilds list. Maximum is 200 guilds. Read more info here https://discord.com/developers/docs/resources/user#get-current-user-guilds
         * @param token
         */
        export async function getCurrentUserGuilds(token: string) {
            return await DiscordApiCore.fetch(
                "/users/@me/guilds",
                "GET",
                {},
                [token]
            )
        }

        // fuck discord, update ur fucking docs to actual info
        /**
         * Get current user guild member. Requires `guilds.members.read` auth scope
         * Check discord docs for more info. https://discord.com/developers/docs/resources/user#get-current-user-guild-member
         * @param token
         * @param guildId
         */
        export async function getCurrentUserGuildMember(token: string, guildId: string) {
            return await DiscordApiCore.fetch(
                `/users/@me/guilds/${guildId}/member`,
                "GET",
                {},
                [token]
            )
        }
    }
}
