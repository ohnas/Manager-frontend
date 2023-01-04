import { baseUrl, getCookie } from "./setting.js";
const saleSiteForm = document.querySelector("#sale-site-form");
const saleSiteBrandSelect = saleSiteForm.querySelector("select");
const saleNameInput = document.getElementById("sale-site-field"); 
const saleUrlInput = document.getElementById("sale-site-url-field"); 
const saleApikeyInput = document.getElementById("apikeyfiled");
const saleSecretkeyInput = document.getElementById("secretkeyfiled");
const facebookSiteForm = document.querySelector("#facebook-site-form");
const facebookSiteBrandSelect = facebookSiteForm.querySelector("select");
const facebookNameInput = document.getElementById("facebook-site-field");
const facebookUrlInput = document.getElementById("facebook-site-url-field");
const facebookAdAccountIdInput = document.getElementById("ad-account-id-field");


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
        brandProfile();
    }
}

async function brandProfile() {
    let response = await fetch(`${baseUrl}/api/v1/sites/create`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        alert("현재 등록된 brand가 없습니다.");
    } else {
        data.forEach(element => {
            let saleSiteBrandOption = document.createElement("option");
            let facebookSiteBrandOption = document.createElement("option");
            saleSiteBrandOption.setAttribute("value", `${element.pk}`);
            saleSiteBrandOption.innerText = `${element.name}`;
            facebookSiteBrandOption.setAttribute("value", `${element.pk}`);
            facebookSiteBrandOption.innerText = `${element.name}`;
            saleSiteBrandSelect.appendChild(saleSiteBrandOption);
            facebookSiteBrandSelect.appendChild(facebookSiteBrandOption);
        });
    }
}

function createSaleSite(event) {
    event.preventDefault();
    let data = {
        "name" : saleNameInput.value,
        "url" : saleUrlInput.value,
        "brand" : saleSiteBrandSelect.value,
        "api_key" : saleApikeyInput.value,
        "secret_key" : saleSecretkeyInput.value,
    };
    console.log(data);
    saleNameInput.value = "";
    saleUrlInput.value = "";
    saleSiteBrandSelect.value = "";
    saleApikeyInput.value = "";
    saleSecretkeyInput.value = "";
    handleCreateSite(data);
}

function createFacebookSite(event) {
    event.preventDefault();
    let data = {
        "name" : facebookNameInput.value,
        "url" : facebookUrlInput.value,
        "brand" : facebookSiteBrandSelect.value,
        "ad_account_id" : facebookAdAccountIdInput.value,
    };
    console.log(data);
    facebookNameInput.value = "";
    facebookUrlInput.value = "";
    facebookSiteBrandSelect.value = "";
    facebookAdAccountIdInput.value = "";
    handleCreateSite(data);
}

async function handleCreateSite(data) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/sites/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(data),
    });
    if(response.ok) {
        alert("생성완료");
    } else {
        alert("입력 항목을 확인해주세요");
    }
}

userProfile();
saleSiteForm.addEventListener("submit", createSaleSite);
facebookSiteForm.addEventListener("submit", createFacebookSite);