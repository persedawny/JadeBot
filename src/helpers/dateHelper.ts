export class DateHelper {
    dateObj: Date;

    constructor() {
        this.dateObj = new Date();
    }

    getCurrentDateDayNumber(): number {
        return this.dateObj.getUTCDate();
    }

    getCurrentDateMonthNumber(): number {
        return this.dateObj.getUTCMonth() + 1;
    }
}