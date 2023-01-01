import { baseUrl } from "./setting.js";
const selectUl = document.querySelector(".select");

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        handleSelect();
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.");
        location.href = "index.html";
    }
}

async function handleSelect() {
    let response = await fetch(`${baseUrl}/api/v1/brands` , {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        let nameLi = document.createElement("li");
        nameLi.innerText = "현재 보유한 브랜드가 없습니다.";
        selectUl.appendChild(nameLi);
    } else {
        data.forEach(element => {
            let nameInput = document.createElement("input");
            let nameForm = document.createElement("form");
            let nameLi = document.createElement("li");
            nameInput.setAttribute("value", `${element.name}`);
            nameInput.setAttribute("name", "brnad");
            nameInput.setAttribute("type", "submit");
            nameInput.setAttribute("class", "button-clear");
            nameForm.appendChild(nameInput);
            nameForm.setAttribute("method", "get");
            nameForm.setAttribute("action", "integrations.html");
            nameLi.appendChild(nameForm);
            selectUl.appendChild(nameLi);
        });
    }
}

userProfile();
