import { CustomClient } from "./client/customClient";

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

var client = new CustomClient();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`).default;
	commands.push(new command(client).data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

// require('dotenv').config();

// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
    
// const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
// rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, '673917864532639774'))
//     .then(data => {
//         const promises = [];
//         for (const command of data) {
//             const deleteUrl = `${Routes.applicationGuildCommands(process.env.CLIENT_ID, '673917864532639774')}/${command.id}`;
//             promises.push(rest.delete(deleteUrl));
//         }
//         return Promise.all(promises);
//     });