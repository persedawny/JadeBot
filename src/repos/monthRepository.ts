import { CustomClient } from "../client/customClient";
import MonthEntity from "../database/models/monthEntity";

export class MonthRepository {
    client: CustomClient;
    
    constructor(client: CustomClient) {
        this.client = client;
    }

    GetMonthOptionList() {
        let x = this.client.databaseConnection.prepare(`SELECT * FROM Month`).all() as Array<MonthEntity>;
        let result = new Array();
    
        x.forEach(element => {
            result.push([element.monthName, element.monthName]);
        });
    
        return result;
    }
}