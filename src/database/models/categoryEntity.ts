import { BaseEntity } from "../../abstractions/baseEntity";

export default class CategoryEntity extends BaseEntity { 
    name: string;
    headerText: string;
    
    constructor(){
        super("Category");
    }
}