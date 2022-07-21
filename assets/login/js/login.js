function signinctrl() {
    var inctrl = document.getElementById("signincontrol"),
        upctrl = document.getElementById("signupcontrol"),
        inctet = document.getElementById("signincontent"),
        upctet = document.getElementById("signupcontent"),
        inuser = document.getElementById("signinuser"),
        inpass = document.getElementById("signinpass");
    inctrl.style.cssText = "background-color: rgba(255, 255, 255, 0.5);color: rgba(17, 0, 78, 0.6);";
    upctrl.style.cssText = "background-color: rgba(17, 0, 78, 0.6);color: rgba(255, 255, 255, 0.7);";
    inctet.style.cssText = "display: flex;";
    upctet.style.cssText = "display: none;";
    document.getElementById("warning").innerHTML = "";
    inuser.value = "";
    inpass.value = "";
}

function signupctrl() {
    var inctrl = document.getElementById("signincontrol"),
        upctrl = document.getElementById("signupcontrol"),
        inctet = document.getElementById("signincontent"),
        upctet = document.getElementById("signupcontent"),
        warning = document.getElementById("warning"),
        upuser = document.getElementById("signupuser"),
        uppass = document.getElementById("signuppass"),
        uprepass = document.getElementById("signuprepass");
    inctrl.style.cssText = "background-color: rgba(17, 0, 78, 0.6);color: rgba(255, 255, 255, 0.7);";
    upctrl.style.cssText = "background-color: rgba(255, 255, 255, 0.5);color: rgba(17, 0, 78, 0.6);";
    inctet.style.cssText = "display: none;";
    upctet.style.cssText = "display: flex;";
    warning.innerHTML = "";
    upuser.value = "";
    uppass.value = "";
    uprepass.value = "";
}

function signin() {
    var inuser = document.getElementById("signinuser").value,
        inpass = document.getElementById("signinpass").value;
    if (incheck(inuser, inpass)) {
        clearcookie();
        setcookie(inuser, inpass, 90);
        console.log("登录成功");
    }
}

function signup() {
    var upuser = document.getElementById("signupuser").value,
        uppass = document.getElementById("signuppass").value,
        uprepass = document.getElementById("signuprepass").value;
    if (upcheck(upuser, uppass, uprepass)) {
        setaccount(upuser, uppass);
        console.log("注册成功");
    }
}

function incheck(user, pass) {
    var warning = document.getElementById("warning");
    if (!user && !pass) {
        warning.innerHTML = "账户、密码不能为空";
        return false;
    }
    else if (!user) {
        warning.innerHTML = "账户不能为空";
        return false;
    }
    else if (!pass) {
        warning.innerHTML = "密码不能为空";
        return false;
    }
    else if (cheakaccount(user, pass) == 0) {
        warning.innerHTML = "账号不存在";
        return false;
    }
    else if (cheakaccount(user, pass) == 1) {
        warning.innerHTML = "密码错误";
        return false;
    }
    else {
        warning.innerHTML = "";
        return true;
    }
}

function upcheck(user, pass, repass) {
    var warning = document.getElementById("warning");
    if (!user && !pass && !repass) {
        warning.innerHTML = "账户、密码、重复密码不能为空";
    }
    else if (!user && !pass) {
        warning.innerHTML = "账户、密码不能为空";
        return false;
    }
    else if (!user && !repass) {
        warning.innerHTML = "账户、重复密码不能为空";
        return false;
    }
    else if (!user) {
        warning.innerHTML = "账户不能为空";
        return false;
    }
    else if (!pass) {
        warning.innerHTML = "密码不能为空";
        return false;
    }
    else if (!repass) {
        warning.innerHTML = "重复密码不能为空";
        return false;
    }
    else if (pass != repass) {
        warning.innerHTML = "两次密码不一致";
        return false;
    }
    else if (cheakaccount(user, pass) == 1 || cheakaccount(user, pass) == 2) {
        warning.innerHTML = "账号已存在";
        return false;
    }
    else {
        warning.innerHTML = "";
        return true;
    }
}

// 检查账号和密码，账号不存在返回0，账号存在且密码错误返回1，账号存在但密码正确返回2
function cheakaccount(user, pass) {
    if (localStorage.account) {
        let arr = JSON.parse(localStorage.account);
        let js = {user: user, pass: pass};
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].user == js.user) {
                if (arr[index].pass == js.pass) {
                    return 2;
                }
                return 1;
            }
        }
        return 0;
    }
    else {
        return 0;
    }
}

function setcookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
    var prompt = document.getElementById("prompt");
    prompt.style.display = "flex";
    prompt.innerHTML = "账号已登录,正在跳转";
    setTimeout(() => {
        window.location.replace("http://127.0.0.1:5500/game.html");
    }, 1000);
}

function clearcookie() {
    if (document.cookie) {
        var cookiepair = document.cookie.split("=");
        setcookie(cookiepair[0], "", -1);
    }
}

function setaccount(user, pass) {
    var accountarr = [];
    var accountjs = {};
    var prompt = document.getElementById("prompt");
    if (localStorage.account) {
        accountarr = JSON.parse(localStorage.account);
    }
    accountjs.user = user;
    accountjs.pass = pass;
    accountarr.push(accountjs);
    localStorage.account = JSON.stringify(accountarr);
    prompt.style.display = "flex";
    prompt.innerHTML = "账号已注册,正在跳转,前往登录";
    setTimeout("location.reload()", 1000);
}