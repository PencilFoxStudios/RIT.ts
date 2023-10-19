import dayjs from "dayjs";

export class DateObject {
    /** Month */
    private Month: number;
    /** Day */
    private Day: number;
    /** Year */
    private Year: number;
    constructor(Month:number, Day:number, Year:number){
        this.Month = Month;
        this.Day = Day;
        this.Year = Year;
    }
    toDateString() {
        return `${this.Year}-${this.Month}-${this.Day}`
    }
}