import {DiscordApiError} from "./types";

const DISCORD_API_URL = "https://discord.com/api/"

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
            throw new DiscordApiError(
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
