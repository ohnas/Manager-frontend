import { baseUrl, getCookie } from "./setting.js";
const logInFormDiv = document.querySelector(".login-form");
const logInForm = document.querySelector("form");
const logInId = document.getElementById("id");
const logInPw = document.getElementById("pw");
const signUpDiv = document.querySelector(".signup");
const goBrandDiv = document.querySelector(".go-brand");
const goManagementDiv = document.querySelector(".go-management");

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(response.ok) {
        logInFormDiv.classList.add("hidden");
        signUpDiv.classList.add("hidden");
        goBrandDiv.classList.remove("hidden");
        if(data.is_staff == true) {
            goManagementDiv.classList.remove("hidden");
        }
    }
}

function handlelogIn(event) {
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
        onLogIn(logInData);
    }
}

async function onLogIn(logInData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/users/log-in` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(logInData),
    });
    if(response.ok) {
        userProfile();
    } else {
        alert("ID 와 PW를 확인해주세요");
    }
}

userProfile();
logInForm.addEventListener("submit", handlelogIn)
