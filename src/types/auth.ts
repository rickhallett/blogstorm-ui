export interface BaseCredentials {
  email: string;
  password: string;
}

export interface ExtendedCredentials extends BaseCredentials {
  rememberMe?: boolean;
  deviceId?: string;
}

// OAuth extensions
export interface OAuthCredentials {
  provider: "google" | "github" | "twitter";
  accessToken: string;
  refreshToken?: string;
}

// Union type for all authentication methods
export type Credentials =
  | BaseCredentials
  | ExtendedCredentials
  | OAuthCredentials;

// Type guard for OAuth credentials
export function isOAuthCredentials(
  credentials: Credentials
): credentials is OAuthCredentials {
  return "provider" in credentials && "accessToken" in credentials;
}

// Response types for type safety
export interface AuthResponse {
  user: User | null;
  tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}
