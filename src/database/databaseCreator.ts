import { CustomClient } from "../client/customClient";
import { FileReader } from "../helpers/fileReader";

export class DatabaseCreator{
    static CreateDatabase(client : CustomClient){
        var files = new FileReader().getAllFilesFromDirectory('src/database/models', '.ts');

        files.forEach(entityFile => {
            let entity = require(`./models/${entityFile}`);
            var query = client.databaseConnection.prepare(new entity.default().getCreateTableQuery());
            query.run();
        });
    }
}