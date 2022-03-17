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
        // TODO: Embed maker in boilerplate?
        let exampleEmbed = new MessageEmbed()
        .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL() })
        .setTimestamp()
        .setColor("#ADD8E6");

        this.client.commands.forEach(command => {
            exampleEmbed.addField(command.data.name, command.data.description, true);
        });

        interaction.reply({ embeds: [exampleEmbed] });
    }
}