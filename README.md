# AgendaBot

AgendaBot es un bot de WhatsApp que permite agendar reuniones en Google Calendar usando inteligencia artificial de OpenAI y la API de Google Calendar.

## Instalación

1. Clona este repositorio y entra a la carpeta del proyecto.
2. Instala las dependencias usando [pnpm](https://pnpm.io/):

```bash
pnpm install
```

3. Copia el archivo `.env.template` a `.env` y completa los valores requeridos.

4. En el archivo `.env`, en la variable `ALLOWED_NUMBERS`, agrega el número de teléfono (en formato internacional, sin +) desde el cual se enviarán mensajes al bot. Ejemplo:

```
ALLOWED_NUMBERS={56912345678}
```

5. Inicia el bot en modo desarrollo:

```bash
pnpm run dev
```

6. Escanea el código QR generado en el archivo `bot.qr.png` con la app de WhatsApp en el teléfono donde quieras usar AgendaBot.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (puedes usar `.env.template` como base):

```
OPENAI_API_KEY=
ASSISTANT=
OAUTH2_CLIENT_ID=
OAUTH2_CLIENT_SECRET=
GOOGLE_CALENDAR_ID=
GOOGLE_ACCESS_TOKEN=
GOOGLE_REFRESH_TOKEN=
PORT=
ALLOWED_NUMBERS={}
```

## Notas
- Solo los números listados en `ALLOWED_NUMBERS` podrán interactuar con el bot.
- El bot requiere Node.js >= 18 y pnpm instalado globalmente.
