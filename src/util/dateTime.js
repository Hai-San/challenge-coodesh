class DateTime {
    format(date) {
        const newDate  = new Date(date)
        return newDate.toLocaleDateString('en-US')
    }
}

const dateTime = new DateTime()

export default dateTime