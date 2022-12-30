const signUpForm = document.querySelector("form");
const signUpId = document.getElementById("idfiled");
const signUpPw = document.getElementById("pwfiled");
const signUpName = document.getElementById("namefiled");
const signUpEmail = document.getElementById("emailfiled");
const signUpBtn = document.getElementById("signup-btn");

async function userProfile() {
    let response = await fetch("http://127.0.0.1:8000/api/v1/users", {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        let returnValue = confirm("현재 로그인 상태입니다. 해당페이지는 로그아웃 후에 사용 할 수 있습니다");
        if(returnValue === true || returnValue === false) {
            location.href = "index.html";
        }
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
    let response = await fetch("http://127.0.0.1:8000/api/v1/users/create" , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(signUpData),
    });
    let data = await response.json();
    if(data.response === "success") {
        let returnValue = confirm("회원가입 성공하였습니다. 로그인 하러 가시겠습니까?");
        if(returnValue === true) {
            location.href = "index.html";
        }
    } else {
        alert("입력 조건을 확인해주세요");
    }
}

userProfile();
signUpForm.addEventListener("submit", signUp)