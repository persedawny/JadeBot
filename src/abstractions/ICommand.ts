import { SlashCommandBuilder } from "@discordjs/builders";
import { Message } from "discord.js";
import { CustomClient } from "../client/customClient";

export interface ICommand {
    data: SlashCommandBuilder;
    client: CustomClient;
    isAdminOnly: boolean;
    
    execute: (interaction: Message) => void;
}