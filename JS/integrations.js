import { baseUrl } from "./setting.js";
const headerDiv = document.querySelector(".header");
const headerH1 = headerDiv.querySelector("h1");
const logOutBtn = document.querySelector(".button");
const integrationForm = document.querySelector(".integration-form");
const productSelect = integrationForm.querySelector("select");
const dateInput = integrationForm.querySelector("input");

const currentUrl = location.href;
const url = new URL(currentUrl);
const urlParams = url.searchParams;
const brandName = urlParams.get("brand");
headerH1.innerText = `selected brand : ${brandName}`;

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        productProfile();
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.");
        location.href = "index.html";
    }
}

async function productProfile() {
    let response = await fetch(`${baseUrl}/api/v1/products/?brand=${brandName}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        let data = await response.json();
        data.forEach(element => {
            let productOption = document.createElement("option");
            productOption.setAttribute("value", `${element.name}`)
            productOption.innerText = `${element.name}`
            productSelect.appendChild(productOption);
        });
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