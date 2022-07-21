var size = 20,
    score = -1,
    maxscore = 0,
    snake = [41, 40], //snake队列表示蛇身，初始节点存在但不显示
    direction = 1, //1表示向右，-1表示向左，20表示向下，-20表示向上
    food = 43, //食物的位置
    n, //与下次移动的位置有关
    box = document.getElementById("can").getContext("2d");
//从0到799表示box里[0~19]*[0~19]的所有节点，每20px一个节点

window.onload = function main() {
    if (cheakcookie()) {
        init();
        game();
    }
    else {
        replace();
    }
}

function replace() {
    var prompt = document.getElementById("prompt");
    prompt.style.display = "flex";
    prompt.innerHTML = "账号未登录,正在跳转,前往登录";
    setTimeout(() => {
        window.location.replace("http://127.0.0.1:5500/login.html");
    }, 1000);
}

function init() {
    document.getElementById("player").innerHTML = getcookie();
    var maxscorearr = [];
    if (localStorage.maxscore) {
        maxscorearr = JSON.parse(localStorage.maxscore);
        console.log(maxscorearr.length);
        for (let index = 0; index < maxscorearr.length; index++) {
            console.log(getcookie());
            console.log(maxscorearr[index].user);
            if (maxscorearr[index].user == getcookie()) {
                document.getElementById("maxscore").innerHTML = maxscorearr[index].maxscore;
                return 0;
            }
        }
    }
    var maxscorejs = {};
    maxscorejs.user = getcookie();
    maxscorejs.maxscore = 0;
    maxscorearr.push(maxscorejs);
    localStorage.maxscore = JSON.stringify(maxscorearr);
}

function cheakmaxscore() {
    var maxscorearr = JSON.parse(localStorage.maxscore);
    for (let index = 0; index < maxscorearr.length; index++) {
        if (maxscorearr[index].user == getcookie() && maxscorearr[index].maxscore < score) {
            maxscorearr[index].maxscore = score;
            localStorage.maxscore = JSON.stringify(maxscorearr);
            document.getElementById("maxscore").innerHTML = score;
        }
    }
}

function cheakcookie() {
    if (document.cookie && localStorage.account) {
        var cookiepair = document.cookie.split("=");
        var accountarr = JSON.parse(localStorage.account);
        for (let index = 0; index < accountarr.length; index++) {
            if (accountarr[index].user == cookiepair[0] && accountarr[index].pass == cookiepair[1]) {
                return true;
            }
        }
    }
    else {
        return false;
    }
    return false;
}

function getcookie() {
    var cookiepair = document.cookie.split("=");
    return cookiepair[0];
}

// 游戏进程函数
function draw(seat, color) {
    box.fillStyle = color;
    box.fillRect(
        (seat % 40) * size + size / 10,
        ~~(seat / 40) * size + size / 10,
        (size * 8) / 10,
        (size * 8) / 10
    );
    //用color填充一个矩形，以前两个参数为x，y坐标，后两个参数为宽和高。
}

document.onkeydown = function (evt) {
    //当键盘上下左右键摁下的时候改变direction
    direction =
        snake[1] - snake[0] ==
        (n = [-1, -40, 1, 40][(evt || event).keyCode - 37] || direction)
            ? direction
            : n;
};

// 游戏主进程
function game() {
    snake.unshift((n = snake[0] + direction));
    //此时的n为下次蛇头出现的位置，n进入队列
    if (
        snake.indexOf(n, 1) > 0 ||
        n < 0 ||
        n > 1599 ||
        (direction == 1 && n % 40 == 0) ||
        (direction == -1 && n % 40 == 39)
    ) {
        //if语句判断贪吃蛇是否撞到自己或者墙壁，碰到时返回，结束程序
        return alert("GAME OVER!");
    }
    draw(n, "#f87c2a"); //画出蛇头下次出现的位置
    if (n == food) {
        //如果吃到食物时，产生一个蛇身以外的随机的点，不会去掉蛇尾
        // while (snake.indexOf((food = ~~(Math.random() * 1600))) > 0);
        let foodX, foodY;
        do {
            food = ~~(Math.random() * 1600);
            foodX = food % 40;
            foodY = ~~(food / 40);
        } while (
            snake.indexOf(food) > 0 ||
            foodX == 0 ||
            foodX == 39 ||
            foodY == 0 ||
            foodY == 39
        );
        draw(food, "yellow");
        score++;
        document.getElementById("score").innerHTML = score;
        cheakmaxscore();
    } else {
        //没有吃到食物时正常移动，蛇尾出队列
        draw(snake.pop(), "#5d65ac");
    }
    draw(snake[1], "#4bd0f8");
    setTimeout(arguments.callee, 100);
    //每隔0.15秒执行函数一次，可以调节蛇的速度
}

// 摇杆
let joyCon = document.querySelector("#rocker");
// eslint-disable-next-line no-debugger
let options = {
    mode: "dynamic", // 'dynamic', 'static' or 'semi'
    size: 300,
    zone: joyCon, //如果不提提供zone容器元素，那么默认动态生成的元素是注入在body中的。
    color: "#00b3fa",
    threshold: 0.4,
};
let manager = nipplejs.create(options);

manager.on("dir:up dir:left dir:down dir:right", function (evt, data) {
    switch (evt.type) {
        case "dir:up":
            direction = snake[1] - snake[0] == (n = -40) ? direction : n;
            break;
        case "dir:left":
            direction = snake[1] - snake[0] == (n = -1) ? direction : n;
            break;
        case "dir:down":
            direction = snake[1] - snake[0] == (n = 40) ? direction : n;
            break;
        case "dir:right":
            direction = snake[1] - snake[0] == (n = 1) ? direction : n;
            break;
        default:
            break;
    }
});