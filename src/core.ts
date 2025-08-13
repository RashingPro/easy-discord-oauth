import { DiscordApiError } from "./types";

const DISCORD_API_URL = "https://discord.com/api/";

export class DiscordApiCore {
    public static async fetch(
        apiEndpoint: string,
        {
            method = "GET",
            data,
            auth,
            authType = "Bearer",
            apiVersion = 10,
            contentType = "application/x-www-form-urlencoded"
        }: {
            method?: "GET" | "POST" | "PUT" | "PATCH";
            data?: {};
            auth?: string | string[];
            authType?: "Basic" | "Bearer";
            apiVersion?: number;
            contentType?: string;
        }
    ) {
        const url = DISCORD_API_URL + `v${apiVersion}` + apiEndpoint;

        let body: string | undefined;

        if (contentType === "application/x-www-form-urlencoded") body = new URLSearchParams(data).toString();
        else if (contentType === "application/json") body = JSON.stringify(data);

        const headers = new Headers();
        headers.append("Content-Type", contentType);
        if (auth) {
            if (authType === "Basic" && typeof auth === "object") {
                headers.append("Authorization", `Basic ${btoa(auth.join(":"))}`);
            } else if (authType === "Bearer" && typeof auth === "string") {
                headers.append("Authorization", `Bearer ${auth}`);
            } else {
                throw new Error("Incorrect authorization data provided");
            }
        }

        let response;
        try {
            response = await fetch(url, {
                method: method,
                headers: headers,
                body: data ? body : undefined
            });
            const resBody = await response.json();
            if (!response.ok) {
                throw new Error();
            }
            return resBody;
        } catch (error) {
            throw new DiscordApiError(apiEndpoint, method, data, apiVersion, response?.status, error as Error);
        }
    }
}
