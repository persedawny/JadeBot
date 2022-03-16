import { EventEntity } from "./eventEntity";

export class DatabaseCreator{
    static CreateDatabase(client){
        new EventEntity(client).CreateTable();
    }
}