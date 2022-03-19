import { CommandInteraction } from "discord.js";

const dotenv = require('dotenv');
dotenv.config();

export default {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		
		const command = interaction.client.commands.get(interaction.commandName);
		
		if (!command) return;
		
		try {
			let message = interaction as CommandInteraction;
			
			if(command.isAdminOnly && message.user.id != process.env.ADMIN_ID) {
				message.reply("Not authorised - Administrator permission required");
				return;
			}

			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};