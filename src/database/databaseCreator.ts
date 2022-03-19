import { CustomClient } from "../client/customClient";
import { EventEntity } from "./eventEntity";

export class DatabaseCreator{
    static CreateDatabase(client : CustomClient) {
        var test = client.databaseConnection.prepare(new EventEntity().getCreateTableQuery());
        test.run();
    }
}