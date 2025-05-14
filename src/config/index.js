import "dotenv/config";

export const config = {
    PORT: process.env.PORT || 3008,
    provider: process.env.provider,
    openai_apikey: process.env.openai_apikey,
    assistant: process.env.assistant,
    google_calendar_id: process.env.google_calendar_id,
    oauth2_client_id: process.env.oauth2_client_id,
    oauth2_client_secret: process.env.oauth2_client_secret,
    google_access_token: process.env.google_access_token,
    google_refresh_token: process.env.google_refresh_token,
    google_token_type: process.env.google_token_type,
    google_scope: process.env.google_scope,
    google_expiry_date: process.env.google_expiry_date,
};
