import "dotenv/config";

export const config = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ASSISTANT: process.env.ASSISTANT,
    OAUTH2_CLIENT_ID: process.env.OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
    GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    PORT: process.env.PORT,
    ALLOWED_NUMBERS: process.env.ALLOWED_NUMBERS,
};
