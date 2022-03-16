import { CustomClient } from "./client/customClient";
import { DatabaseCreator } from "./database/databaseCreator";
const dotenv = require('dotenv');

dotenv.config();

var client = new CustomClient();
client.initializeEvents();
client.initializeCommands();
client.login(process.env.DISCORD_TOKEN);
client.initializeAndStartCronJobs();

DatabaseCreator.CreateDatabase(client);