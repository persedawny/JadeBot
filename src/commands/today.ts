import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import EventEntity from "../database/models/eventEntity";
import { DateHelper } from "../helpers/dateHelper";
import { CategoryRepository } from "../repos/categoryRepository";
import { EventRepository } from "../repos/eventRepository";

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;
    dateHelper: DateHelper;
    
    constructor(client: CustomClient){
        this.data = new SlashCommandBuilder()
		    .setName('today')
		    .setDescription('Show the events of today');
        
        this.client = client;
        this.dateHelper = new DateHelper();
    }

    execute(interaction: CommandInteraction): void {
        var month = this.dateHelper.getCurrentDateDayNumber();
        var day = this.dateHelper.getCurrentDateMonthNumber();

        var result = new EventRepository(this.client).getEventsByDate(day, month);
        
        if(result.length > 0) {
            let exampleEmbed = new MessageEmbed()
                .setAuthor({ name: this.client.user.username, iconURL: this.client.user.avatarURL() })
                .setTimestamp()
                .setColor("#ADD8E6");

            var categories = new CategoryRepository(this.client).GetCategories();

            categories.forEach(category => {
                this.addFilteredFieldsToEmbed(result.filter(x => x.category == category.name), category.headerText, exampleEmbed);
            });
            
            interaction.reply({ embeds: [exampleEmbed] });
        }
        else {
            interaction.reply(`Wow, as far as I know nothing really happened today!\n If you can think of something, please consider adding it with /add-event :) .`);
        }
    }
    
    private addFilteredFieldsToEmbed(events : EventEntity[], categoryTitle: string, embed: MessageEmbed) {
        if(events.length > 0){
            let eventText = '';
            events.forEach(x => {
                if(x.year) {
                    eventText = `${x.year} - `
                }
                
                eventText += `${x.text} \n`
            });
    
            embed.addField(categoryTitle, eventText, true);
        }
    }
}