import { CustomClient } from "../client/customClient";
import { TestEntity } from "./testEntity";

export class DatabaseCreator{
    static CreateDatabase(client : CustomClient) {
        var test = client.databaseConnection.prepare(new TestEntity().getCreateTableQuery());
        test.run();
    }
}