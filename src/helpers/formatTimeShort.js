
const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
];

function formatTimeShort(time) {

    time = new Date(time).toLocaleString();

    time = time.split(",")[0];

    let parts = time.split(".");
    let monthPart = parts[1];
    let month;

    if (monthPart[0] === "0") {
        month = months[Number(monthPart[1]) - 1];
    } else {
        month = months[Number(monthPart) - 1];
    }

    let number = parts[0];

    return `${ number[0] === "0" ? number[1] : number } ${month} ${parts[2]}`;

}

export { formatTimeShort }