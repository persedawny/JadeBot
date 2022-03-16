import { CustomClient } from "../client/customClient";

export class BaseEntity {
    rowid: number;
    private client: CustomClient;
    tableName: string;

    constructor(client, tableName?) {
        this.rowid = 0;
        this.client = client;
        this.tableName = tableName;
    }

    private RunQuery(query){
        try {
            let preparedQuery = this.client.databaseConnection.prepare(query);
            preparedQuery.run()
        } catch (ex) {
            throw ex;
        }
    }

    public CreateTable() {
        let properties = this.GetDerivedClassProperties();
        let query = "CREATE TABLE IF NOT EXISTS " + this.tableName + " (rowid INTEGER PRIMARY KEY NOT NULL, " + properties.join(', ') + ")";

        this.RunQuery(query);
    }

    private GetDerivedClassProperties(){
        let newBase = new BaseEntity(this.client);
        let baseProperties = Object.getOwnPropertyNames(newBase);
        let properties = Object.getOwnPropertyNames(this);

        for (let i = 0; i < baseProperties.length; i++)
            properties.shift();

        if(!properties.length)
            throw 'No properties were found in the derived class!'
        
        return properties;
    }
}