export const Maintenance = {
    setTime(){
        const date = new Date();
        const hour = date.getHours()
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hour}:${minutes}:${seconds}`
    },
}