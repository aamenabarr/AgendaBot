import { google } from 'googleapis';
import { config } from '../config/index.js';

const oAuth2Client = new google.auth.OAuth2(config.oauth2_client_id, config.oauth2_client_secret, config.redirect_uri);
const oauthCredentials = {
    access_token: config.google_access_token,
    refresh_token: config.google_refresh_token,
    scope: config.google_scope,
    token_type: config.google_token_type,
    expiry_date: config.google_expiry_date
};

export async function createMeetEvent({ summary, description, startDateTime, endDateTime, attendeesEmails }) {
    oAuth2Client.setCredentials(oauthCredentials);
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const calendarId = config.google_calendar_id || 'primary';

    const event = {
        summary,
        description,
        start: { dateTime: startDateTime, timeZone: 'America/Santiago' },
        end: { dateTime: endDateTime, timeZone: 'America/Santiago' },
        attendees: attendeesEmails.map(email => ({ email })),
        conferenceData: {
            createRequest: { 
                requestId: Math.random().toString(36).substring(2), 
                conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
        },
    };

    const response = await calendar.events.insert({
        calendarId,
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
    });
    return response.data;
}
