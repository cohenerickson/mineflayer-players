import mineflayer from "mineflayer";
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

  bot.on("chat", (username, message) => {
    if (!channel) return;
    // replace pings with invisible characters
    channel.send(`<${username}> ${message.replace(/@everyone/, "@​everyone").replace(/@here/, "@​here")}`);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
}
