import { createBot } from '@builderbot/bot';
import { MemoryDB as Database } from '@builderbot/bot';
import templates from './templates/index.js';
import { providerBaileys } from './provider/index.js';
import { config } from './config/index.js';

const PORT = config.PORT;

const main = async () => {
    const adapterFlow = templates;
    const adapterProvider = providerBaileys;

    const adapterDB = new Database();

    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    httpServer(+PORT);
};

main();
