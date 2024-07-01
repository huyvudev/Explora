import moment from "moment";

export function toDateTimeString(date: Date) {
    return moment(date).format("HH:mm DD/MM/YYYY");
}
