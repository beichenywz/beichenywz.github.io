{
    let btn = document.getElementById("open_btn1");
    let div = document.getElementById("background1");
    let close = document.getElementById("close_btn1");

    btn.onclick = function show() {
        div.style.display = "block";
    };

    close.onclick = function close() {
        div.style.display = "none";
    };

    window.onclick = function close(e) {
        if (e.target == div) {
            div.style.display = "none";
        }
    };
}
