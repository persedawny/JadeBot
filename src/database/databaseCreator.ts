import { TestEntity } from "./testEntity";

export class DatabaseCreator{
    static CreateDatabase(client){
        new TestEntity(client).CreateTable();
    }
}