import { Client } from "whatsapp-web.js";
import OpenAI from "openai";
import z from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const client = new Client({
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  console.log("Message received!", msg.body);

  if (msg.body.trim() === "!ai") {
    console.log("AI command received!", msg.body);
    msg.reply("Please enter a message after !ai to get a response");
  }

  if (msg.body.startsWith("!ai")) {
    console.log("AI command with message received!", msg.body);
    const schema = z.object({
      message: z.string(),
    });
    let message = msg.body.split("!ai ")[1];
    try {
      console.log("Validating message:", message);
      await schema.parseAsync({ message });
    } catch (error) {
      msg.reply("Please enter a message after !ai to get a response");
      return;
    }

    try {
      console.log("Sending message to AI:", message);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });
      if (!response.choices[0]?.message.content) {
        console.log("No response from AI");
        throw new Error("No response from AI");
      }
      console.log("Response from AI:", response.choices[0].message.content);
      await msg.reply(response.choices[0].message.content);
      return;
    } catch (error) {
      console.error(error);
      msg.reply("An error occurred while trying to get a response from the AI");
    }
  }

  console.log("Help command received or command not identified!", msg.body);
  msg.reply("Commands: !help, !ai <message>");
});

client.initialize();
