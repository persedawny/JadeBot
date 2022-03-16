import { BaseEntity } from "./baseEntity";

export class TestEntity extends BaseEntity { 
    text: string;

    constructor(client){
        super(client, "Event");
    }
}