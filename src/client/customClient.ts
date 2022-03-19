import { Client, Collection, Intents } from "discord.js";
import { ICommand } from "../abstractions/ICommand";
import { FileReader } from "../helpers/fileReader";

import Database from 'better-sqlite3';

export class CustomClient extends Client {
    commands: Collection<string, ICommand>;
    databaseConnection: Database;
    fileReader: FileReader;

    constructor() {
        super({ intents: [Intents.FLAGS.GUILDS] });
        this.commands = new Collection();
        this.databaseConnection = new Database('database.db', { verbose: console.log });
        this.fileReader = new FileReader();
    }

    initializeEvents() {
        var eventFiles = this.fileReader.getAllFilesFromDirectory('./src/client/events', '.ts');

        for (let file of eventFiles) {
            let event = require(`./events/${file}`);

            if (event.once) {
                super.once(event.default.name, (...args) => event.default.execute(...args));
            } else {
                super.on(event.default.name, (...args) => event.default.execute(...args));
            }
        }
    }

    initializeCommands() {
        const commandFiles = this.fileReader.getAllFilesFromDirectory('./src/commands', '.ts');

        for (let file of commandFiles) {
            let commandFile = require(`../commands/${file}`);
            let command = new commandFile.default(this);

            this.commands.set(command.data.name, command);
        }
    }

    initializeAndStartCronJobs() {
        let jobFiles = this.fileReader.getAllFilesFromDirectory('./src/cronjobs/jobs', '.ts');

        for (const file of jobFiles) {
            let job = require(`../cronjobs/jobs/${file}`);
            new job.default(this).start();
        }
    }
}