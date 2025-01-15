# chatbot-whatsapp-web

A small application of the OpenAI chat bot that receives messages from your Whatsapp web contacts and respond them with a generative content.

## Available commands

- `!help`: Show the available commands.
- `!ai <message>`: Send a message to the chat bot.

## Setup Guide

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Bun](https://bun.sh)
3. Install Chrome or [Chromium browser](https://www.chromium.org/getting-involved/download-chromium/) (required for the Whatsapp web automation)
4. Install the dependencies:

```bash
bun install
```

5. Duplicate the `.env.example` file and rename it to `.env`
6. Grab your [OpenAI API key](https://platform.openai.com/api-keys) and set it as an environment variable in the `.env` file:

_Note: make sure you have enough credits to use the API, otherwise the chatbot won't work!_

```bash
export OPENAI_API_KEY=<your-api-key>
```

7. Run the project with:

```bash
bun run src/index.ts
```

8. A Whatsapp web window will open, scan the QR code on your device.
9. Any messages received with the command `!ai <message>` will prompt the chat bot to respond with a generative content.
