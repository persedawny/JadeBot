import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { CustomClient } from "../client/customClient";
import { EventRepository } from "../repos/eventRepository";

export default class implements ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean = true;
    eventRepo: EventRepository;
    
    constructor(client: CustomClient){
        this.data = new SlashCommandBuilder()
		    .setName('new-events')
		    .setDescription('Gives a list of events that await approval.');
        
        this.client = client;
        this.eventRepo = new EventRepository(client);
    }

    execute(interaction: CommandInteraction): void {
        let events = this.eventRepo.getUnacceptedCommands();

        let message = "";

        events.forEach(event => {
            message += `${event.rowid}. ${event.day}-${event.month}-${event.year}: ${event.text}\n`;
        });

        interaction.reply(message);
    }
}