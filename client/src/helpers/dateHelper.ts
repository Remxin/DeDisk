export class DateHelper {
    static months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    static days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    static getTime (numDate: number) {
        const date = new Date(numDate)
        const returnString = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
        return returnString
    }

    static getDate (numDate: number) {
        const date = new Date(numDate)
        const returnString = `${this.days[date.getDay()]} ${date.getDate()}${this.months[date.getMonth()]} ${date.getFullYear()}`
        return returnString
    }
}