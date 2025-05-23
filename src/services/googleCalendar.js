import { google } from 'googleapis';
import { config } from '../config/index.js';

const oAuth2Client = new google.auth.OAuth2(config.OAUTH2_CLIENT_ID, config.OAUTH2_CLIENT_SECRET);
const oauthCredentials = {
    access_token: config.GOOGLE_ACCESS_TOKEN,
    refresh_token: config.GOOGLE_REFRESH_TOKEN,
};

export async function createMeetEvent({ summary, description, startDateTime, endDateTime, attendeesEmails }) {
    oAuth2Client.setCredentials(oauthCredentials);
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const calendarId = config.GOOGLE_CALENDAR_ID;

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
