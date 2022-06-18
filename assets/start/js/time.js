setInterval("fun(time)", 1);
function fun(timeID) {
    var date = new Date();
    var h = date.getHours(); //时
    var minute = date.getMinutes(); //分
    if (h < 10) {
        h = "0" + h;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }
    document.getElementById(timeID.id).innerHTML = h + ":" + minute;
}
