import {DiscordApiCore} from "./core.js";
import {GuildMember, PartialGuild, TokenResponse, User} from "./types.js";

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

    /**
     * Refresh access token using refresh one. https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
     * @param refresh_token don't miss with access token!
     * @param clientId
     * @param clientSecret
     */
    export async function refreshToken(refresh_token: string, clientId: string, clientSecret: string) {
        const res = await DiscordApiCore.fetch(
            "/oauth2/token",
            "POST",
            {
                "grant_type": "refresh_token",
                "refresh_token": refresh_token
            },
            [clientId, clientSecret],
            "Basic"
        )
        const result: TokenResponse = {
            accessToken: res["access_token"],
            refreshToken: res["refresh_token"],
            expiresIn: res["expires_in"],
            tokenType: "Bearer",
            scope: res["scope"]
        }
        return result;
    }

    /**
     * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-token-revocation-example
     * @param token
     * @param clientId
     * @param clientSecret
     * @param tokenType token_type_hint
     */
    export async function revokeToken(token: string, clientId: string, clientSecret: string, tokenType?: "access_token" | "refresh_token", ) {
        const res = await DiscordApiCore.fetch(
            "/oauth/token/revoke",
            "POST",
            {
                "token": token,
                "token_type_hint": tokenType
            },
            [clientId, clientSecret],
            "Basic"
        )
    }

    export namespace User {

        /**
         * Get info about current user. Require `identify` scope. Optionally, if app was authorised with `email` scope - email will be also provided
         * @param {string} token
         * @return {Promise<User>} info about current user
         */
        export async function getCurrentUser(token: string) {
            return getUser(token, "@me")
        }

        /**
         * Get info about user with specified `userId`
         * @param token
         * @param userId
         * @return {Promise<User>} info about user
         */
        export async function getUser(token: string, userId: string) {
            const res = await DiscordApiCore.fetch(
                `/users/${userId}`,
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
         * Get current user's guilds list. Maximum is 200 guilds. Read more info here https://discord.com/developers/docs/resources/user#get-current-user-guilds
         * @param token
         */
        export async function getCurrentUserGuilds(token: string) {
            const res = await DiscordApiCore.fetch(
                "/users/@me/guilds",
                "GET",
                {},
                [token]
            )
            const result: PartialGuild = {
                id: res["id"],
                name: res["name"],
                icon: res["icon"],
                banner: res["banner"],
                owner: res["owner"],
                permissions: res["permissions"],
                features: res["features"],
                approximateMemberCount: res["approximate_member_count"],
                approximatePresenceCount: res["approximate_presence_count"]
            }
            return result;
        }

        // fuck discord, update ur fucking docs to actual info
        /**
         * Get current user guild member. Requires `guilds.members.read` auth scope
         * Check discord docs for more info. https://discord.com/developers/docs/resources/user#get-current-user-guild-member
         * @param token
         * @param guildId
         * @returns {Promise<GuildMember>}
         */
        export async function getCurrentUserGuildMember(token: string, guildId: string) {
            const res = await DiscordApiCore.fetch(
                `/users/@me/guilds/${guildId}/member`,
                "GET",
                {},
                [token]
            )
            const result: GuildMember = {
                user: res["user"],
                nick: res["nick"],
                avatar: res["avatar"],
                banner: res["banner"],
                roles: res["roles"],
                joinedAt: res["joined_at"],
                premiumSince: res["premium_since"],
                deaf: res["deaf"],
                mute: res["mute"],
                flags: res["flags"],
                pending: res["pending"],
                permissions: res["permissions"],
                communicationDisabledUntil: res["communication_disabled_until"],
                avatarDecorationData: res["avatar_decoration_data"]
            }
            return result;
        }
    }
}