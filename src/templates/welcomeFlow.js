import { addKeyword, EVENTS } from '@builderbot/bot';
import { chat } from '../services/chatgpt.js';

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        const state = await ctxFn.state.getMyState()
        const thread = state?.thread ?? null;
        const response = await chat(ctx.body, ctx.name, thread)
        await ctxFn.state.update({ thread: response.thread })
        return ctxFn.endFlow(response.response)
    })

export { welcomeFlow };