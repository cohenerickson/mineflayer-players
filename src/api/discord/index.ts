import mineflayer from "mineflayer";
import minecraftData from "minecraft-data";
import { Client, GatewayIntentBits } from "discord.js";

export default function Discord (bot: mineflayer.Bot) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildWebhooks
    ]
  });

  client.on("ready", () => {
    let guild = client.guilds.cache.find(g => g.id === process.env.DISCORD_GUILD_ID);
    if (guild) {
      guild.fetchWebhooks().then((webhooks: any) => {
        if (webhooks.some((w: any) => w.name === "Minecraft Without Limits")) {
          initChat(webhooks.find((w: any) => w.name === "Minecraft Without Limits"));
        } else {
          const channel = (guild as any).channels.cache.get(process.env.DISCORD_CHANNEL_ID as string);
          channel.createWebhook({
            name: "Minecraft Without Limits"
          }).then((wh: any) => {
            initChat(wh);
          });
        }
      });
    }
  });

  function initChat (webhook: any) {
    const language = minecraftData(bot.version).language;

    client.on("messageCreate", (message) => {
      if (message.author.id === webhook.id) return;
      bot.chat(`[${message.author.tag}] ${message.content}`);
    });

    bot.on("chat", (username: string, message: string) => {
      webhook.send({
        content: message,
        username: username,
        avatarURL: `https://mc-heads.net/head/${username}`
      });
    });

    bot.on("message", (jsonMsg: any, position: any): void => {
      if (jsonMsg.translate === "chat.type.text") return;
      const template = language[jsonMsg.translate];
  
      let index = 0;
      const message = template.replace(/%[^\s>]+/g, (match: string): string => {
        const pram = jsonMsg.with[index];
        index++;
        if (pram) return pram.text;
        else return match;
      });
  
      webhook.send({
        content: message
      });
    });
  }

  client.login(process.env.DISCORD_BOT_TOKEN);
}
