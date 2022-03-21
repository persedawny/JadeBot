export class BaseEntity {
    rowid: number;
    tableName: string;

    constructor(tableName?: string) {
        this.rowid = 0;
        this.tableName = tableName;
    }

    public getCreateTableQuery() {
        let properties = this.getDerivedClassProperties();
        return "CREATE TABLE IF NOT EXISTS " + this.tableName + " (rowid INTEGER PRIMARY KEY NOT NULL, " + properties.join(', ') + ")";
    }

    private getDerivedClassProperties(){
        let newBase = new BaseEntity();
        let baseProperties = Object.getOwnPropertyNames(newBase);
        let properties = Object.getOwnPropertyNames(this);

        for (let i = 0; i < baseProperties.length; i++)
            properties.shift();

        if(!properties.length)
            throw 'No properties were found in the derived class!'
        
        return properties;
    }
}