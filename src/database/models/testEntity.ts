import { BaseEntity } from "../../abstractions/baseEntity";

export default class extends BaseEntity { 
    text: string;

    constructor(){
        super("Test");
    }
}