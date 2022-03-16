import { SlashCommandBuilder } from "@discordjs/builders";
import { Message } from "discord.js";
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
    
    // TODO: Maak dit eens even beter
    execute(interaction: Message): void {
        var reaction = "";

        this.client.commands.forEach(command => {
            let commandText = `${command.data.name}: ${command.data.description} \n`;
            reaction += commandText;
        });

        interaction.reply(reaction);
    }
}