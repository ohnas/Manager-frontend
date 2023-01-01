import { baseUrl } from "./setting.js";
const logInFormDiv = document.querySelector(".login-form");
const logInForm = document.querySelector("form");
const logInId = document.getElementById("id");
const logInPw = document.getElementById("pw");
const signUpDiv = document.querySelector(".signup");
const selectDiv = document.querySelector(".select");

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        logInFormDiv.classList.add("hidden");
        signUpDiv.classList.add("hidden");
        selectDiv.classList.remove("hidden");
    }
}


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
    let response = await fetch(`${baseUrl}/api/v1/users/log-in` , {
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

userProfile();
logInForm.addEventListener("submit", logIn)
