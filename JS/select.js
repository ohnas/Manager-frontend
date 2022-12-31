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
        let data = await response.json();
        let pk = data.pk
        handleSelect(pk);
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.")
    }
}

async function handleSelect(pk) {
    let response = await fetch(`${baseUrl}/api/v1/users/${pk}` , {
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
            let nameLink = document.createElement("a");
            let nameLi = document.createElement("li");
            nameLink.innerText = `${element.name}`;
            nameLink.setAttribute("href", "integrations.html");
            nameLi.appendChild(nameLink);
            selectUl.appendChild(nameLi);
        });
    }
}

userProfile();
