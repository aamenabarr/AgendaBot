import { createProvider } from '@builderbot/bot';
import { BaileysProvider } from '@builderbot/provider-baileys';

const providerBaileys = createProvider(BaileysProvider);

export { providerBaileys };