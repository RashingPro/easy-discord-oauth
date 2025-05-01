import {DiscordApiCore} from "./core.js";
import {TokenResponse, User} from "./types";

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
        const result: TokenResponse = {
            accessToken: res["access_token"],
            refreshToken: res["refresh_token"],
            expiresIn: res["expires_in"],
            scope: res["scope"],
            tokenType: "Bearer"
        }
        return result;
    }

    export namespace User {

        /**
         * Get info about current user. Require `identify` scope. Optionally, if app was authorised with `email` scope - email will be also provided
         * @param {string} token
         * @return {Promise<User>} info about current user
         */
        export async function getCurrentUser(token: string) {
            const res = await DiscordApiCore.fetch(
                "/users/@me",
                "GET",
                {},
                [token]
            );
            const result: User = {
                id: res["id"],
                username: res["username"],
                discriminator: res["discriminator"],
                globalName: res["global_name"],
                avatar: res["avatar"],
                bot: res["bot"],
                system: res["system"],
                mfaEnabled: res["mfa_enabled"],
                banner: res["banner"],
                accentColor: res["accent_color"],
                locale: res["locale"],
                verified: res["verified"],
                email: res["email"],
                flags: res["flags"],
                premiumType: res["premium_type"],
                publicFlags: res["public_flags"],
                avatarDecorationData: res["avatar_decoration_data"]
            }
            return result;
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
