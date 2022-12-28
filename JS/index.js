const logInForm = document.querySelector("form");
const logInId = document.getElementById("id");
const logInPw = document.getElementById("pw");
const logInBtn = document.getElementById("login-btn");

function logIn(event) {
    event.preventDefault();
    if(logInId.value === "") {
        alert("ID를 입력해주세요");
        logInId.value = "";
        logInPw.value = "";
    } else if(logInPw.value === "") {
        alert("PW를 입력해주세요");
        logInId.value = "";
        logInPw.value = "";
    } else {
        let logInData = {
            "username" : logInId.value,
            "password" : logInPw.value,
        };
        console.log(logInData);
        logInId.value = "";
        logInPw.value = "";
    }
}

logInForm.addEventListener("submit", logIn)
