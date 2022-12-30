const logInForm = document.querySelector("form");
const logInId = document.getElementById("id");
const logInPw = document.getElementById("pw");


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
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(logInData),
    });
    // let data = await response.json();
    if(response.ok) {
        location.href = "select.html";
    } else {
        alert("ID 와 PW를 확인해주세요");
    }
}


logInForm.addEventListener("submit", logIn)
