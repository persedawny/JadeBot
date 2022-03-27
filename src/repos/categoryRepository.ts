import { CustomClient } from "../client/customClient";
import CategoryEntity from "../database/models/categoryEntity";

export class CategoryRepository {
    client: CustomClient;
    
    constructor(client: CustomClient) {
        this.client = client;
    }

    GetCategoryOptionList() {
        let x = this.client.databaseConnection.prepare(`SELECT * FROM Category`).all() as Array<CategoryEntity>;
        let result = new Array();

        x.forEach(element => {
            result.push([element.name, element.name]);
        });

        return result;
    }

    GetCategories() {
        return this.client.databaseConnection.prepare(`SELECT * FROM Category`).all() as Array<CategoryEntity>; 
    }
}