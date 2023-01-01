import { baseUrl } from "./setting.js";
const logOutBtn = document.querySelector(".button");
const dateForm = document.querySelector(".date-form");
const dateInput = dateForm.querySelector("input");

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        //productProfile();
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.");
        location.href = "index.html";
    }
}

async function productProfile() {
    let response = await fetch(`${baseUrl}/api/v1/products/1`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(!response.ok) {
        let returnValue = confirm("현재 로그아웃 상태입니다. 해당페이지는 로그인 후에 사용 할 수 있습니다");
        if(returnValue === true || returnValue === false) {
            location.href = "index.html";
        }
    }
}


//조회할 날짜 전일로 제한시켜놓기
function handleDateInput() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const yesterdayValue = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
    dateInput.setAttribute("max", yesterdayValue);
}

// function saleRetrieve(event) {
//     event.preventDefault();
// }


// 모던 자바스크립트에서 찾은 내용
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function logOut() {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/users/log-out` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
    });
    let data = await response.json();
    if(data.response === "success") {
        alert("로그아웃")
    } else {
        alert("확인해주세요");
    }
}

userProfile();
handleDateInput();
logOutBtn.addEventListener("click", logOut);