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
            .setRequired(false)
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
            .addChoice("Birthday", "Birthday")
            .addChoice("Games", "Games")
        );
        
        this.client = client;
    }

    execute(interaction: CommandInteraction): void {
        var text = interaction.options.getString("text");
        var month = interaction.options.getString("month");
        var day = interaction.options.getNumber("day");
        var year = interaction.options.getString("year");
        var category = interaction.options.getString("category");

        var event = new EventEntity(this.client);
        event.day = day.toString();
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