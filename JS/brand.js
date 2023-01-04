import { baseUrl, getCookie } from "./setting.js";
const brandForm = document.querySelector("form");
const nameInput = document.getElementById("namefiled");
const desText = document.getElementById("desfiled");
const bmSelect = document.getElementById("bmfiled");

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.is_staff === false) {
        alert("사용 할 수 없는 페이지 입니다");
        location.href = "index.html";
    } else {
        bmProfile();
    }
}

async function bmProfile() {
    let response = await fetch(`${baseUrl}/api/v1/brands/create`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        alert("현재 등록된 bm이 없습니다.");
    } else {
        data.forEach(element => {
            let bmOption = document.createElement("option");
            bmOption.setAttribute("value", `${element.pk}`);
            bmOption.innerText = `${element.name}`;
            bmSelect.appendChild(bmOption);
        });
    }
}

function createBrand(event) {
    event.preventDefault();
    let brandData = {
        "name" : nameInput.value,
        "description" : desText.value,
        "user" : bmSelect.value,
    };
    console.log(brandData);
    nameInput.value = "";
    desText.value = "";
    bmSelect.value = "";
    handleCreateBrand(brandData);
}


async function handleCreateBrand(brandData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/brands/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(brandData),
    });
    if(response.ok) {
        alert("브랜드 생성완료");
            // location.href = "index.html";
    } else {
        alert("입력 항목을 확인해주세요");
    }
}

userProfile();
brandForm.addEventListener("submit", createBrand);