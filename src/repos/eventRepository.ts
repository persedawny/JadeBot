import { CustomClient } from "../client/customClient";
import EventEntity from "../database/models/eventEntity";
import { DateHelper } from "../helpers/dateHelper";

export class EventRepository {
    private client: CustomClient;
    private dateHelper: DateHelper;
    
    constructor(client: CustomClient) {
        this.client = client;
        this.dateHelper = new DateHelper();
    }

    getEventsByDate(day, month): Array<EventEntity> {
        return this.client.databaseConnection.prepare(`SELECT * FROM Event WHERE Event.day = '${day}' AND Event.month = '${this.dateHelper.getDateStringFromNumber(month)}' AND Event.accepted = '1'`).all() as Array<EventEntity>;
    }

    getUnacceptedCommands(): Array<EventEntity> {
        return this.client.databaseConnection.prepare(`SELECT * FROM Event WHERE Event.accepted = '0'`).all() as Array<EventEntity>;
    }

    add(event: EventEntity) {
        let query = this.client.databaseConnection.prepare(`INSERT INTO ${event.tableName} (text, day, month, year, accepted, category) VALUES (?, ?, ?, ?, ?, ?)`);
        query.run([event.text, event.day, event.month, event.year, event.accepted, event.category]);
    }
}