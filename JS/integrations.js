import { baseUrl } from "./setting.js";
const headerDiv = document.querySelector(".header");
const headerH1 = headerDiv.querySelector("h1");
const logOutBtn = document.querySelector(".button");
const integrationForm = document.querySelector(".integration-form");
const productSelect = integrationForm.querySelector("select");
const dateInput = integrationForm.querySelector("input");
const salesTable = document.querySelector(".sales-table");
const salesTableTbody = salesTable.querySelector("tbody");


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
    let data = await response.json();
    if(data.length === 0) {
        alert("현재 등록된 상품이 없습니다. 상품을 먼저 등록해주세요");
        //to-do : move to create product page.
    } else {
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

async function saleRetrieve(event) {
    event.preventDefault();
    let productName = productSelect.value;
    let date = dateInput.value;
    let response = await fetch(`${baseUrl}/api/v1/sales/?product=${productName}&date=${date}`, {
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
        } else {
            const tr = salesTableTbody.querySelector("tr");
            tr.remove();
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
    } else {
        alert("확인해주세요");
    }
}

userProfile();
handleDateInput();
logOutBtn.addEventListener("click", logOut);
integrationForm.addEventListener("submit", saleRetrieve);