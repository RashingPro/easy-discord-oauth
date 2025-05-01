interface DiscordApiResponse {

}

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

export interface TokenResponse extends DiscordApiResponse{
    readonly accessToken: string;
    readonly tokenType: "Bearer";
    readonly expiresIn: number;
    readonly refreshToken: string;
    readonly scope: string;
    // constructor(accessToken: string, expiresIn: number, refreshToken: string, scope: string) {
    //     this.accessToken = accessToken;
    //     this.tokenType = "Bearer";
    //     this.expiresIn = expiresIn;
    //     this.refreshToken = refreshToken;
    //     this.scope = scope;
    // }
}

export interface User extends DiscordApiResponse {
    readonly id: string;
    readonly username: string;
    readonly discriminator: string;
    readonly globalName: string | null;
    readonly avatar: string | null;
    readonly bot?: boolean;
    readonly system?: boolean;
    readonly mfaEnabled?: boolean;
    readonly banner?: string | null;
    readonly accentColor?: string | null;
    readonly locale?: string;
    readonly verified?: boolean;
    readonly email?: string | null;
    readonly flags?: number;
    readonly premiumType?: number;
    readonly publicFlags?: number;
    readonly avatarDecorationData?: object;
}