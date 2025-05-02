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
        let _auth: string[] = [];
        if (auth) {
            auth.forEach((val) => {
                if (val.length >= 20) {
                    _auth.push(val.slice(0, 9) + "***" + val.slice(-9))
                }
                else if (val.length >= 3) {
                    _auth.push(val[0] + '***' + val[val.length - 1])
                }
                else {
                    _auth.push(val)
                }
            })
        }
        this.auth = _auth;
        this.apiVersion = apiVersion;
        super.message = "An error occured while fetching from Discord API"
    }
}

export interface TokenResponse {
    readonly accessToken: string;
    readonly tokenType: "Bearer";
    readonly expiresIn: number;
    readonly refreshToken: string;
    readonly scope: string;
}

export interface User {
    readonly id: string;
    readonly username: string;
    readonly discriminator: string;
    readonly globalName: string | null;
    readonly avatar: string | null;
    readonly bot?: boolean;
    readonly system?: boolean;
    readonly mfaEnabled?: boolean;
    readonly banner?: string | null;
    readonly accentColor?: number | null;
    readonly locale?: string;
    readonly verified?: boolean;
    readonly email?: string | null;
    readonly flags?: number;
    readonly premiumType?: number;
    readonly publicFlags?: number;
    readonly avatarDecorationData?: AvatarDecorationData;
}

export interface AvatarDecorationData {
    readonly asset: string;
    readonly skuId: string;
}

export interface Guild {
    readonly id: string;
    readonly name: string;
    readonly icon: string | null;
    readonly iconHash?: string | null;
    readonly splash: string | null;
    readonly discoverySplash: string | null;
    readonly owner?: boolean;
    readonly ownerId: string;
    readonly permissions?: string;
    /**
     * @deprecated This field is deprecated and is replaced by `channel.rtc_region`
     */
    readonly region?: string | null;
    readonly afkChannelId: string | null;
    readonly afkTimeout: number;
    readonly widgetEnabled?: boolean;
    readonly widgetChannelId?: string | null;
    readonly verificationLevel: number;
    readonly defaultMessageNotifications: number;
    readonly explicitContentFilter: number;
    readonly roles: Role[];
    readonly emojis: Emoji[];
    readonly features: string[];
    readonly mfaLevel: number;
    readonly applicationId: string | null;
    readonly systemChannelId: string | null;
    readonly systemChannelFlags: number;
    readonly rulesChannelId: string | null;
    readonly maxPresences?: number | null;
    readonly maxMembers?: number;
    readonly vanityUrlCode: string | null;
    readonly description: string | null;
    readonly banner: string | null;
    readonly premiumTier: number;
    readonly premiumSubscriptionCount?: number;
    readonly preferredLocale: string;
    readonly publicUpdatesChannelId: string | null;
    readonly maxVideoChannelUsers?: number;
    readonly maxStageVideoChannelUsers?: number;
    readonly approximateMemberCount?: number;
    readonly approximatePresenceCount?: number;
    readonly welcomeScreen?: WelcomeScreen[];
    readonly nsfwLevel: number;
    readonly stickers: Sticker[];
    readonly premiumProgressBarEnabled: boolean;
    readonly safetyAlertsChannelId: string | null;
    readonly incidentsData: IncidentsData | null;
}

export interface PartialGuild {
    readonly id: string;
    readonly name: string;
    readonly icon: string | null;
    readonly banner: string | null;
    readonly owner: boolean;
    readonly permissions: string;
    readonly features: string[];
    readonly approximateMemberCount: number;
    readonly approximatePresenceCount: number;
}

export interface Role {
    readonly id: string;
    readonly name: string;
    readonly color: number;
    readonly hoist: boolean;
    readonly icon?: string | null;
    readonly unicodeEmoji?: string | null;
    readonly position: number;
    readonly permissions: string;
    readonly managed: boolean;
    readonly mentionable: boolean;
    readonly tags?: RoleTags;
    readonly flags: number;
}

/**
 * Read more in Discord docs https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure
 */
export interface RoleTags {
    readonly botId?: string;
    readonly integrationId?: string;
    readonly premiumSubscriber?: null;
    readonly subscriptionListingId?: string;
    readonly availableForPurchase?: null;
    readonly guildConnections?: null;
}

export interface Emoji {
    readonly id: string | null;
    readonly name: string | null;
    readonly roles?: string[];
    readonly user?: User;
    readonly requireColons: boolean;
    readonly managed?: boolean;
    readonly animated?: boolean;
    readonly available?: boolean;
}

export interface Sticker {
    readonly id: string;
    readonly packId?: string;
    readonly name: string;
    readonly description: string | null;
    readonly tags: string;
    readonly type: number;
    readonly formatType: number;
    readonly available?: boolean;
    readonly guildId?: string;
    readonly user?: User;
    readonly sortValue?: number;
}

export interface WelcomeScreen {
    readonly description: string | null;
    readonly welcomeChannels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
    readonly channelId: string;
    readonly description: string;
    readonly emojiId: string | null;
    readonly emojiName: string | null;
}

/**
 * Read more in Discord docs https://discord.com/developers/docs/resources/guild#incidents-data-object
 */
export interface IncidentsData {
    readonly invitesDisabledUntil: string | null;
    readonly dmsDisabledUntil: string | null;
    readonly dmSpamDetected_at?: string | null;
    readonly raidDetectedAt?: string | null
}

export interface GuildMember {
    readonly user?: User;
    readonly nick?: string | null;
    readonly avatar?: string | null;
    readonly banner?: string | null;
    readonly roles: string[];
    readonly joinedAt: string;
    readonly premiumSince?: string | null;
    readonly deaf: boolean;
    readonly mute: boolean;
    readonly flags: number;
    readonly pending?: boolean;
    readonly permissions?: string;
    readonly communicationDisabledUntil?: string | null;
    readonly avatarDecorationData?: AvatarDecorationData;
}
