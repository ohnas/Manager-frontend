import { baseUrl } from "./setting.js";
const headerDiv = document.querySelector(".header");
const headerH1 = headerDiv.querySelector("h1");
const logOutBtn = document.querySelector(".button");
const integrationForm = document.querySelector(".integration-form");
const productSelect = document.getElementById("productfield");
const siteSelect = document.getElementById("sitefield");
const dateInput = document.getElementById("datefield");
const salesTable = document.querySelector(".sales-table");
const salesTableTbody = salesTable.querySelector("tbody");


const currentUrl = location.href;
const url = new URL(currentUrl);
const urlParams = url.searchParams;
const brandName = urlParams.get("brand");
headerH1.innerText = `${brandName}`;

async function userProfile() {
    let response = await fetch(`${baseUrl}/api/v1/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        brandProfile();
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.");
        location.href = "index.html";
    }
}

async function brandProfile() {
    let response = await fetch(`${baseUrl}/api/v1/brands/${brandName}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        alert("현재 등록된 정보가 없습니다. 브랜드에 관련된 정보를 등록해주세요");
        //to-do : move to create page.
    } else {
        let product = data.product_set;
        let site = data.site_set;
        product.forEach(element => {
            let productOption = document.createElement("option");
            productOption.setAttribute("value", `${element.name}`);
            productOption.innerText = `${element.name}`;
            productSelect.appendChild(productOption);
        });
        site.forEach(element => {
            let siteOption = document.createElement("option");
            siteOption.setAttribute("value", `${element.name}`);
            siteOption.innerText = `${element.name}`;
            siteSelect.appendChild(siteOption);
        });
    }
}

//조회할 날짜 전일로 제한시켜놓기
function handleDateInput() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    let month = yesterday.getMonth() + 1;
    if(month < 10) {
        month = `0${month}`
    }
    let date = yesterday.getDate();
    if(date < 10) {
        date = `0${date}`
    }
    const yesterdayValue = `${yesterday.getFullYear()}-${month}-${date}`
    dateInput.setAttribute("max", yesterdayValue);
}

function paintSales(data) {
    data.forEach(element => {
        let productNameTd = document.createElement("td");
        let productCostTd = document.createElement("td");
        let countTd = document.createElement("td");
        let priceTd = document.createElement("td");
        let deliveryPriceTd = document.createElement("td");
        let payTimeTd = document.createElement("td");
        let salesTableTr = document.createElement("tr");
        productNameTd.innerText = `${element.product.name}`;
        productCostTd.innerText = `${element.product.cost}`;
        countTd.innerText = `${element.count}`;
        priceTd.innerText = `${element.price}`;
        deliveryPriceTd.innerText = `${element.delivery_price}`;
        payTimeTd.innerText = `${element.pay_time}`;
        salesTableTr.appendChild(productNameTd);
        salesTableTr.appendChild(productCostTd);
        salesTableTr.appendChild(countTd);
        salesTableTr.appendChild(priceTd);
        salesTableTr.appendChild(deliveryPriceTd);
        salesTableTr.appendChild(payTimeTd);
        salesTableTbody.appendChild(salesTableTr);
    });
}

async function saleRetrieve(event) {
    event.preventDefault();
    let productName = productSelect.value;
    let siteName = siteSelect.value;
    let date = dateInput.value;
    let response = await fetch(`${baseUrl}/api/v1/sales/?product=${productName}&site=${siteName}&date=${date}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        alert("선택 한 날짜에는 판매 데이터가 없습니다. 다른 날짜를 선택해주세요");
    } else {
        if(salesTableTbody.firstElementChild === null) {
            paintSales(data);
        } else {
            const tr = salesTableTbody.querySelector("tr");
            tr.remove();
            paintSales(data);
        }
    }
}

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
        location.href = "index.html";
    } else {
        alert("확인해주세요");
        location.href = "index.html";
    }
}

userProfile();
handleDateInput();
logOutBtn.addEventListener("click", logOut);
integrationForm.addEventListener("submit", saleRetrieve);