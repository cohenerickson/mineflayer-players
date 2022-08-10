import mineflayer from "mineflayer";
import minecraftData from "minecraft-data";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let channel: any;

client.on("ready", () => {
  channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID as string);
});

export default function Discord (bot: mineflayer.Bot) {
  client.on("messageCreate", (message) => {
    if (message.author.id === client.user?.id) return;
    bot.chat(`[${message.author.tag}] ${message.content}`);
  });

  let language: any;
  
  bot.on("message", (jsonMsg: any, position: any): void => {
    if (position === "chat") {
      if (jsonMsg.with[0].text === bot.username) return;
    }
    if (!channel) return;
    if (!language) language = minecraftData(bot.version).language;
    const template = language[jsonMsg.translate];

    let index = 0;
    const message = template.replace(/%[^\s>]+/g, (match: string): string => {
      const pram = jsonMsg.with[index];
      index++;
      if (pram) return pram.text;
      else return match;
    });

    channel.send(message);
  });
  
  client.login(process.env.DISCORD_BOT_TOKEN);
}
