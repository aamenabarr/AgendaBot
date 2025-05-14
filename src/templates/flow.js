import { addKeyword, EVENTS } from '@builderbot/bot';
import { createMeetEvent } from '../services/googleCalendar.js';
import { chat } from '../services/openAI.js';

const ALLOWED_NUMBER = '56942016813';

const flow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        if (!ctx.from || !ctx.from.includes(ALLOWED_NUMBER)) {
            return null;
        }

        const state = await ctxFn.state.getMyState();
        const thread = state?.thread ?? null;
        const response = await chat(ctx.body, thread);
        await ctxFn.state.update({ thread: response.thread });

        let datos = {};
        try {
            const match = response.response.match(/```json([\s\S]*?)```/);
            if (match) {
                const clean = match[1].trim();
                datos = JSON.parse(clean);
            } else {
                datos = JSON.parse(response.response);
            }
        } catch (e) {
            return ctxFn.endFlow(response.response)
        }

        if (datos.summary && datos.description && datos.startDateTime && datos.endDateTime && datos.attendeesEmails) {
            try {
                const event = await createMeetEvent({
                    summary: datos.summary,
                    description: datos.description,
                    startDateTime: datos.startDateTime,
                    endDateTime: datos.endDateTime,
                    attendeesEmails: datos.attendeesEmails
                });
                await ctxFn.state.clear();
                return ctxFn.endFlow(`¡Reunión agendada! Enlace Meet: ${event.hangoutLink}`);
            } catch (e) {
                await ctxFn.state.clear();
                return ctxFn.endFlow('Ocurrió un error al agendar la reunión.');
            }
        }
    });

export { flow };
