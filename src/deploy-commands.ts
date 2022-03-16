const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`).default;
	commands.push(new command().data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);