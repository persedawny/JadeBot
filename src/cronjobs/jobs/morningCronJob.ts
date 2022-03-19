import { MessageEmbed, TextChannel } from "discord.js";
import { CustomClient } from "../../client/customClient";
import { EventEntity } from "../../database/eventEntity";
import { EventRepository } from "../../repos/eventRepository";
import { CustomCronJob } from "../customCronJob";

export default class extends CustomCronJob{
    constructor(client : CustomClient){
        super('00', '00', '9',
            () => {
                var eventRepo = new EventRepository(client);

                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                
                var result = eventRepo.getEventsByDate(day, month);
                
                if(result.length > 0) {
                    let exampleEmbed = new MessageEmbed()
                        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
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
}