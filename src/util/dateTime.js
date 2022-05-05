import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/en'

dayjs.locale('en')
dayjs.extend(utc)
dayjs.extend(timezone)

class DateTime {
    constructor() {
        this.zone = dayjs.tz.guess()
    }

    format(date, format = 'MM/DD/YYYY') {
        return dayjs(date).format(format)
    }
}

const dateTime = new DateTime()

export default dateTime