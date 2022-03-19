import { CustomClient } from "../client/customClient";
import { EventEntity } from "../database/eventEntity";

export class EventRepository {
    client: CustomClient;
    
    constructor(client: CustomClient) {
        this.client = client;
    }

    getEventsByDate(day, month): Array<EventEntity> {
        return this.client.databaseConnection.prepare(`SELECT * FROM Event WHERE Event.day = '${day}' AND Event.month = '${this.getDateStringFromNumber(month)}' AND Event.accepted = '1'`).all() as Array<EventEntity>;
    }

    add(event: EventEntity) {
        let query = this.client.databaseConnection.prepare(`INSERT INTO ${event.tableName} (text, day, month, year, accepted, category) VALUES (?, ?, ?, ?, ?, ?)`);
        query.run([event.text, event.day, event.month, event.year, event.accepted, event.category]);
    }

    getDateStringFromNumber(monthId: number): string{
        switch (monthId) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
        
            default:
                throw new Error("That is not a valid month!");
        }
    }
}