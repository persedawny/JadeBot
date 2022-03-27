import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import { CategoryRepository } from "../repos/categoryRepository";
import { EventRepository } from "../repos/eventRepository";
import { MonthRepository } from "../repos/monthRepository";

const eventEntity = require('../database/models/eventEntity').default;

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = false;
    
    constructor(client: CustomClient){
        this.client = client;

        this.data = new SlashCommandBuilder()
		    .setName('add-event')
		    .setDescription('Add an event to the database.');

        this.data.addStringOption(option =>
            option.setName('text')
                .setDescription(`What happened?`)
                .setRequired(true));

        let categories = new CategoryRepository(client).GetCategoryOptionList();
    
        this.data.addStringOption(option =>
            option
                .setName('category')
                .setDescription("What category do you wanna add this event to?")
                .setRequired(true)
                .addChoices(categories)
            );

        let months = new MonthRepository(client).GetMonthOptionList();

        this.data.addStringOption(option =>
            option.setName('month')
                .setDescription("What month did this happen in?")
                .setRequired(true)
                .addChoices(months)
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

        new EventRepository(this.client).add(event);
        interaction.reply("Did it!");
    }
}