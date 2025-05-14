import OpenAI from "openai";
import { config } from '../config/index.js';

const openaiApiKey = config.OPENAI_API_KEY;
const assistant = config.ASSISTANT;

export const chat = async (question, thread = null) => {
    try {
        const openai = new OpenAI({ apiKey: openaiApiKey });
        let content = question;
        if (!thread) {
            thread = await openai.beta.threads.create();
            content += " La fecha actual es " + new Date().toLocaleString('es-ES', { timeZone: 'America/Santiago' });
        }

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: content,
        });

        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant
        });

        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            for (const message of messages.data.reverse()) {
                console.log(`Mensaje GS: ${message.role} > ${message.content[0].text.value}`);
            }
            const assistantResponse = messages.data
                .filter(message => message.role === 'assistant')
                .pop();

            const answer = assistantResponse ? assistantResponse.content[0].text.value : null
            const cleanAnswer = answer.replace(/【\d+:\d+†source】/g, '');
            return {
                thread,
                response: cleanAnswer
            };
        }

        return { thread, response: null };

    } catch (err) {
        console.error("Error al conectar con OpenAI:", err);
        return { thread, response: "ERROR" };
    }
};
