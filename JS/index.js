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
        logInId.value = "";
        logInPw.value = "";
        handleLogIn(logInData);
    }
}

async function handleLogIn(logInData) {
    let response = await fetch("http://127.0.0.1:8000/api/v1/users/log-in" , {
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(logInData),
    });
    let data = await response.json();
    console.log(data.response);
}

logInForm.addEventListener("submit", logIn)
