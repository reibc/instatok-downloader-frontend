export interface DownloadRequest {
  url: string;
}

export interface Platform {
  name: string;
  icon: string;
  color: string;
  example: string;
}

export interface ApiError {
  error: string | { [key: string]: string[] };
}

export interface PlatformsResponse {
  supported_platforms: string[];
  examples: {
    [key: string]: string;
  };
}

export interface HealthResponse {
  status: string;
  supported_platforms: string[];
  rate_limit_enabled: boolean;
}
