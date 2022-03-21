import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import { EventRepository } from "../repos/eventRepository";

const eventEntity = require('../database/models/eventEntity').default;

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;
    eventRepo: EventRepository;
    
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
        
        this.client = client;
        this.eventRepo = new EventRepository(client);
    }

    execute(interaction: CommandInteraction): void {
        var text = interaction.options.getString("text");
        var month = interaction.options.getString("month");
        var day = interaction.options.getNumber("day");
        var year = interaction.options.getString("year");
        var category = interaction.options.getString("category");

        var event = new eventEntity();
        event.day = day.toString();
        event.month = month;
        event.year = year;
        event.text = text;
        event.category = category
        event.accepted = '0';

        this.eventRepo.add(event);
        interaction.reply("Did it!");
    }
}