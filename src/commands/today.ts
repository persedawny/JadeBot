import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import { EventEntity } from "../database/eventEntity";

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;
    
    constructor(client: CustomClient){
        this.data = new SlashCommandBuilder()
		    .setName('today')
		    .setDescription('Show the events of today');
        
        this.client = client;
    }

    execute(interaction: CommandInteraction): void {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();

        var monthDayString = `${this.getDateStringFromNumber(month)} ${day}`;

        interaction.reply(monthDayString);
    }

    // TODO: fix dit in de boilerplate, luie zak
    getDateStringFromNumber(monthId: number): string{
        switch (monthId) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
        
            default:
                throw new Error("That is not a valid month!");
        }
    }
}