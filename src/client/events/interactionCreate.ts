import { Message } from "discord.js";

export default {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		
		const command = interaction.client.commands.get(interaction.commandName);
		
		if (!command) return;
		
		try {
			let message = interaction as Message;
			
			if(command.isAdminOnly || message.author.id != '115175198537285635'){
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