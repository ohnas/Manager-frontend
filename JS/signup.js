import { baseUrl, getCookie } from "./setting.js";
const signUpForm = document.querySelector("form");
const signUpId = document.getElementById("idfiled");
const signUpPw = document.getElementById("pwfiled");
const signUpName = document.getElementById("namefiled");
const signUpEmail = document.getElementById("emailfiled");


async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        alert("현재 로그인 상태입니다. 해당페이지는 로그아웃 후에 사용 할 수 있습니다");
        location.href = "index.html";
    }
}


function signUp(event) {
    event.preventDefault();
    let signUpData = {
        "username" : signUpId.value,
        "password" : signUpPw.value,
        "name" : signUpName.value,
        "email" : signUpEmail.value,
    };
    signUpId.value = "";
    signUpPw.value = "";
    signUpName.value = "";
    signUpEmail.value = "";
    handleSignUp(signUpData);
}

async function handleSignUp(signUpData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/users/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(signUpData),
    });
    let data = await response.json();
    if(data.response === "success") {
        alert("회원가입 성공하였습니다. 로그인 하러 가시겠습니까?");
            location.href = "index.html";
    } else {
        alert("입력 조건을 확인해주세요");
    }
}

userProfile();
signUpForm.addEventListener("submit", signUp)