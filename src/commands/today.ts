import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
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
        // TODO: fix dit in de boilerplate, luie zak
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();

        var result = this.client.databaseConnection.prepare(`SELECT * FROM Event WHERE Event.day = '${day}' AND Event.month = '${this.getDateStringFromNumber(month)}' AND Event.accepted = '1'`).all() as Array<EventEntity>;
        
        if(result.length > 0) {
            let exampleEmbed = new MessageEmbed()
                .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL() })
                .setTimestamp()
                .setColor("#ADD8E6");

            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'General'), '🏛️ General', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Architecture'), '🏗 Architecture', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'War'), '⚔️ War', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Politics'), '🌐 Politics', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Art and Culture'), '🎭 Art and Culture', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Sports'), '🏈 Sports', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Birthday'), '👶 Birthday', exampleEmbed);
            this.addFilteredFieldsToEmbed(result.filter(x => x.category == 'Games'), '🎮 Games', exampleEmbed);
            
            interaction.reply({ embeds: [exampleEmbed] });
        }
        else {
            interaction.reply(`Wow, as far as I know nothing really happened today!\n If you can think of something, please consider adding it with /add-event :) .`);
        }
    }
    
    addFilteredFieldsToEmbed(events : EventEntity[], categoryTitle: string, embed: MessageEmbed) {
        if(events.length > 0){
            let eventText = '';
            events.forEach(x => {
                if(x.year){
                    eventText = `${x.year} - `
                }
                
                eventText += `${x.text} \n`
            });
    
            embed.addField(categoryTitle, eventText, true);
        }
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