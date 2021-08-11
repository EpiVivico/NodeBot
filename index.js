// Setting up discord bot
const Discord = require("discord.js");
const Client = new Discord.Client;
Client.commands = new Discord.Collection();
const prefix = ">";

// Includes a file reader/opener + every command files dependencies
const fs = require("fs");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}

Client.on("ready", () => {
    console.log("Bot ready to go")
});

Client.on("message", (message) => {

    if (message.author.bot || !message.content.startsWith(prefix))
        return;

    msg = message.content.toLowerCase();
    // Split on regexp (slash are the same as quotes)
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();
    
    if (message.content == "ping") {
        message.reply("CenterPong");
    }

    if (command === 'del') {
        Client.commands.get('clear').execute(message, args);
    }
});

Client.login("ODY4OTk4NjY0ODQzMDYzMzE2.YP30Eg.Mct7oNvqMGcQ2S09f3mnIaE_ETs");