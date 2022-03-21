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