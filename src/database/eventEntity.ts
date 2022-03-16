import { BaseEntity } from "./baseEntity";

export class EventEntity extends BaseEntity { 
    text: string;
    month: string;
    day: string;
    year: string;
    accepted: string;
    category: string;

    constructor(client){
        super(client, "Event");
    }
}