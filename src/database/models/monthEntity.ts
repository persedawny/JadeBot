import { BaseEntity } from "../../abstractions/baseEntity";

export default class MonthEntity extends BaseEntity { 
    monthName: string;

    constructor(){
        super("Month");
    }
}