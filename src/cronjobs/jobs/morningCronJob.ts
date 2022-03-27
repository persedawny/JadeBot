import { MessageEmbed, TextChannel } from "discord.js";
import { CustomClient } from "../../client/customClient";
import EventEntity from "../../database/models/eventEntity";
import { DateHelper } from "../../helpers/dateHelper";
import { CategoryRepository } from "../../repos/categoryRepository";
import { EventRepository } from "../../repos/eventRepository";
import { CustomCronJob } from "../customCronJob";

export default class extends CustomCronJob{
    constructor(client : CustomClient){
        super('00', '00', '9',
            () => {
                var dateHelper = new DateHelper();
                var month = dateHelper.getCurrentDateDayNumber();
                var day = dateHelper.getCurrentDateMonthNumber();
                
                var result = new EventRepository(client).getEventsByDate(day, month);
                
                if(result.length > 0) {
                    let exampleEmbed = new MessageEmbed()
                        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
                        .setTimestamp()
                        .setColor("#ADD8E6");
                
                    var categories = new CategoryRepository(this.client).GetCategories();

                    categories.forEach(category => {
                        this.addFilteredFieldsToEmbed(result.filter(x => x.category == category.name), category.headerText, exampleEmbed);
                    });

                    client.channels.fetch(`673917865375825932`).then(
                        result => {
                            var channel = result as TextChannel;
                            channel.send({ embeds: [exampleEmbed] });
                        }
                    );
                }
                else {
                    client.channels.fetch(`673917865375825932`).then(
                        result => {
                            var channel = result as TextChannel;
                            channel.send(`Wow, as far as I know nothing really happened today!\n If you can think of something, please consider adding it with /add-event :) .`);
                        }
                    );
                }
            });
    }

    private addFilteredFieldsToEmbed(events : EventEntity[], categoryTitle: string, embed: MessageEmbed) {
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
}