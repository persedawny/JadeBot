import { BaseEntity } from "../../abstractions/baseEntity";

export default class EventEntity extends BaseEntity { 
    text: string;
    month: string;
    day: string;
    year: string;
    accepted: string;
    category: string;

    constructor(){
        super("Event");
    }
}