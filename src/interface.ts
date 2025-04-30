import {DiscordApiCore, DiscordApiResult} from "./core.js";

export namespace DiscordOAuth {
    /**
     *
     * @param {string} code code got from discord auth url
     * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
     * @param {string} clientId app's client id
     * @param {string} clientSecret app's client secret
     * @returns {Promise<DiscordApiResult>} read discord docs for more info about API response
     */
    export async function exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<DiscordApiResult> {
        return await DiscordApiCore.fetch(
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
    }

    export namespace User {
        /**
         * Get info about current user. Require `identify` scope. Optionally, if app was authorised with `email` scope - email will be also provided
         * @param {string} token
         * @return {Promise<DiscordApiResult>} info about current user
         */
        export async function getCurrentUser(token: string): Promise<DiscordApiResult> {
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
        export async function getUser(token: string, userId: string): Promise<DiscordApiResult> {
            return await DiscordApiCore.fetch(
                `/users/${userId}`,
                "GET",
                {},
                [token]
            );
        }
    }

    export namespace Guild {
        /**
         * Get info about guild with specified `guildId`
         * @param token
         * @param guildId
         * @param with_counts If true, will also return `approximate_member_count` and `approximate_presence_count` for the guild.
         */
        export async function getGuild(token: string, guildId: string, with_counts: boolean = false): Promise<DiscordApiResult> {
            return await DiscordApiCore.fetch(
                `/guilds/${guildId}?with_counts=${with_counts}`,
                "GET",
                {},
                [token]
                )
        }
    }
}

// export class DiscordOAuth {
//     /**
//      *
//      * @param {string} code code got from discord auth url
//      * @param {string} redirectUri must be equal to redirect uri that was selected when generate OAuth link
//      * @param {string} clientId app's client id
//      * @param {string} clientSecret app's client secret
//      * @returns {Promise<DiscordApiResult>} read discord docs for more info about API response
//      */
//     public static async exchangeCode(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<DiscordApiResult> {
//         return await DiscordApiCore.fetch(
//             "/oauth2/token",
//             "POST",
//             {
//                 'grant_type': 'authorization_code',
//                 'code': code,
//                 'redirect_uri': redirectUri
//             },
//             [clientId, clientSecret],
//             'Basic'
//         );
//     }
//
//
// }
