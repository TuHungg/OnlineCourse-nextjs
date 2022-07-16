import moment from 'moment'

export default class DateHelper {
    static getExpectedPaidDate(date: Date) {
        const now = new Date()
        date.setMonth(date.getMonth() + 2)
        date.setDate(7)
        return now.toISOString() > date.toISOString() ? now : date
    }

    static getTimeDiffStringFromNow(date: Date) {
        const data = this.getTimeDiffFromNow(date)
        if (data) {
            const text =
                data.daysLeft > 0
                    ? `${data.daysLeft} days`
                    : data.hoursLeft > 0
                    ? `${data.hoursLeft} hours`
                    : `${data.minutesLeft} minutes`
            return text
        }
    }

    static getTimeDiffFromNow(date: Date) {
        const current = new Date()
        const diffTime = Math.abs(date.getTime() - current.getTime())
        const daysLeft = Math.floor(diffTime / (60 * 60 * 1000 * 24))
        const hoursLeft = Math.floor(diffTime / (60 * 60 * 1000))
        const minutesLeft = Math.floor(diffTime / (60 * 1000))
        return {
            daysLeft,
            hoursLeft,
            minutesLeft,
        }
    }

    static getShortDate(date: Date): string {
        const value = moment(date).format('DD/MM/YYYY   ')
        return value
    }

    static getLongDate(date: Date): string {
        const value = moment(date).format('DD/MM/YYYY HH:mm:ss')
        return value
    }

    static getRoundMinute(seconds: number) {
        return Math.round(seconds / 60)
    }

    static isBetweenTwoDateString(dateStr1: string, dateStr2: string) {
        const start = new Date(dateStr1).getTime()
        const end = new Date(dateStr2).getTime()
        const current = new Date().getTime()
        return current >= start && current <= end
    }
}
