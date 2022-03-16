import { SlashCommandBuilder } from "@discordjs/builders";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import { EventEntity } from "../database/eventEntity";

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;
    
    constructor(client: CustomClient){
        this.data = new SlashCommandBuilder()
		    .setName('add-event')
		    .setDescription('Add an event to the database.');

        this.data.addStringOption(option =>
            option.setName('text')
                .setDescription(`What happened?`)
                .setRequired(true));

        this.data.addStringOption(option =>
            option
            .setName('month')
            .setDescription("What month did this happen in?")
            .setRequired(true)
            .addChoice("January", "January")
            .addChoice("February", "February")
            .addChoice("March", "March")
            .addChoice("April", "April")
            .addChoice("May", "May")
            .addChoice("June", "June")
            .addChoice("July", "July")
            .addChoice("August", "August")
            .addChoice("September", "September")
            .addChoice("October", "October")
            .addChoice("November", "November")
            .addChoice("December", "December")
        );

        this.data.addNumberOption(option =>
            option
            .setName('day')
            .setDescription("What day did this happen on?")
            .setRequired(true)
        );

        this.data.addStringOption(option =>
            option
            .setName('year')
            .setDescription("What year did this happen in?")
            .setRequired(true)
        );

        this.data.addStringOption(option =>
            option
            .setName('category')
            .setDescription("What category do you wanna add this event to?")
            .setRequired(true)
            .addChoice("General","General")
            .addChoice("Architecture", "Architecture")
            .addChoice("War", "War")
            .addChoice("Politics", "Politics")
            .addChoice("Art and Culture", "Art and Culture")
            .addChoice("Religion", "Religion")
            .addChoice("Sports", "Sports")
            .addChoice("Science and Technology", "Science and Technology")
        );
        
        this.client = client;
    }

    execute(interaction: any): void {
        var text = interaction.options._hoistedOptions[0].value;
        var month = interaction.options._hoistedOptions[1].value;
        var day = interaction.options._hoistedOptions[2].value;
        var year = interaction.options._hoistedOptions[3].value;
        var category = interaction.options._hoistedOptions[4].value;

        var event = new EventEntity(this.client);
        event.day = day;
        event.month = month;
        event.year = year;
        event.text = text;
        event.category = category
        event.accepted = '0';

        let query = this.client.databaseConnection.prepare(`INSERT INTO ${event.tableName} (text, day, month, year, accepted, category) VALUES (?, ?, ?, ?, ?, ?)`);
        query.run([event.text, event.day, event.month, event.year, event.accepted, event.category]);
        interaction.reply("Did it!");
    }
}