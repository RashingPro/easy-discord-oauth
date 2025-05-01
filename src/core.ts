const DISCORD_API_URL = "https://discord.com/api/"

interface DiscordApiResponse {

}

export namespace DiscordApiResponses {
    export class DiscordApiError extends Error {
        public readonly httpStatus: number;
        public readonly endpoint: string;
        public readonly method;
        public readonly data?: {};
        public readonly auth?: string[];
        public readonly apiVersion: number;

        constructor(httpStatus: number, endpoint: string, method: "GET" | "POST" | "PUT" | "PATCH", data: {} | undefined, auth: string[] | undefined, apiVersion: number) {
            super();
            this.httpStatus = httpStatus;
            this.endpoint = endpoint;
            this.method = method;
            this.data = data;
            this.auth = auth;
            this.apiVersion = apiVersion;
            super.message = "An error occured while fetching from Discord API"
        }
    }

    export class TokenResponse implements DiscordApiResponse{
        public readonly accessToken: string;
        public readonly tokenType: "Bearer";
        public readonly expiresIn: number;
        public readonly refreshToken: string;
        public readonly scope: string;
        constructor(accessToken: string, expiresIn: number, refreshToken: string, scope: string) {
            this.accessToken = accessToken;
            this.tokenType = "Bearer";
            this.expiresIn = expiresIn;
            this.refreshToken = refreshToken;
            this.scope = scope;
        }
    }

    export class User implements DiscordApiResponse {
        public readonly id: string;
        public readonly username: string;
        public readonly discriminator: string;
        public readonly globalName: string | null;
        public readonly avatar: string | null;
        public readonly bot?: boolean;
        public readonly system?: boolean;
        public readonly mfaEnabled?: boolean;
        public readonly banner?: string | null;
        public readonly accentColor?: string | null;
        public readonly locale?: string;
        public readonly verified?: boolean;
        public readonly email?: string | null;
        public readonly flags?: number;
        public readonly premiumType?: number;
        public readonly publicFlags?: number;
        public readonly avatarDecorationData?: object;

        constructor(
            id: string,
            username: string,
            discriminator: string,
            globalName: string | null,
            avatar: string | null,
            bot?: boolean,
            system?: boolean,
            mfaEnabled?: boolean,
            banner?: string | null,
            accentColor?: string | null,
            locale?: string,
            verified?: boolean,
            email?: string | null,
            flags?: number,
            premiumType?: number,
            publicFlags?: number,
            avatarDecorationData?: object
        ) {
            this.id = id;
            this.username = username;
            this.discriminator = discriminator;
            this.globalName = globalName;
            this.avatar = avatar;
            this.bot = bot;
            this.system = system;
            this.mfaEnabled = mfaEnabled;
            this.banner = banner;
            this.accentColor = accentColor;
            this.locale = locale;
            this.verified = verified;
            this.email = email;
            this.flags = flags;
            this.premiumType = premiumType;
            this.publicFlags = publicFlags;
            this.avatarDecorationData = avatarDecorationData;
        }
    }
}

export class DiscordApiCore {
    public static async fetch(
        apiEndpoint: string,
        method: "GET" | "POST" | "PUT" | "PATCH" = "GET",
        data?: {},
        auth?: string[],
        authType: "Basic" | "Bearer" = "Bearer",
        apiVersion: number = 10,
        contentType: string = "application/x-www-form-urlencoded",
    ) {
        let status = 200;
        try {
            const url = DISCORD_API_URL + `v${apiVersion.toString()}` + apiEndpoint;

            let body: string | undefined;
            if (!data) {
                body = undefined
            } else {
                if (contentType === "application/x-www-form-urlencoded") {
                    body = new URLSearchParams(data).toString();
                } else {
                    body = JSON.stringify(data);
                }
            }

            const headers = new Headers();
            headers.append("Content-Type", contentType);
            if (auth) {
                if (authType === "Basic") {
                    headers.append('Authorization', `Basic ` + btoa(auth.join(':')));
                } else {
                    headers.append('Authorization', `Bearer ` + auth[0]);
                }

            }
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? body : undefined
            });
            status = response.status;
            const res_data = await response.json();
            if (!response.ok) {
                throw new Error();
            }
            return res_data
        } catch (error) {
            throw new DiscordApiResponses.DiscordApiError(
                status,
                apiEndpoint,
                method,
                data,
                auth,
                apiVersion
            );
        }
    }
}
