import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;

    constructor(client: CustomClient){
        this.data = new SlashCommandBuilder()
		    .setName('help')
		    .setDescription('Sends information of every known command.');

        this.client = client;
    }

    execute(interaction: CommandInteraction): void {
        let exampleEmbed = new MessageEmbed()
        .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL() })
        .setTimestamp()
        .setColor("#ADD8E6");

        this.client.commands.forEach(command => {
            let description = `${command.data.description}`;

            if(command.isAdminOnly){
                description += `\n[ADMIN ONLY]`
            }

            exampleEmbed.addField(command.data.name, description, true);
        });

        interaction.reply({ embeds: [exampleEmbed] });
    }
}