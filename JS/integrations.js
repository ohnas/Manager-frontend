import { baseUrl, getCookie } from "./setting.js";
const headerDiv = document.querySelector(".header");
const headerH1 = headerDiv.querySelector("h1");
const headerForm = headerDiv.querySelector("form");
const moveSelect = headerForm.querySelector("select");
const logOutBtn = document.querySelector(".button");
const saleRetrieveForm = document.querySelector(".sale-retrieve-form");
const productSelect = document.getElementById("productfield");
const siteSelect = document.getElementById("sitefield");
const saleDateInput = document.getElementById("sale-datefield");
const salesTable = document.querySelector(".sales-table");
const salesTableTbody = salesTable.querySelector("tbody");
const facebookTable = document.querySelector(".facebook-table");
const faccbookTableTbody = facebookTable.querySelector("tbody");
const facebookRetrieveForm = document.querySelector(".facebook-retrieve-form");
const facebookSelect = document.getElementById("facebookfield");
const facebookDateInput = document.getElementById("facebook-datefield");


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
        anotherBrand();
    } else {
        alert("로그인이 되어있지 않습니다. 로그인 해주세요.");
        location.href = "index.html";
    }
}

async function anotherBrand() {
    let response = await fetch(`${baseUrl}/api/v1/brands`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(response.ok) {
        data.forEach(element => {
            let moveOption = document.createElement("option");
            moveOption.setAttribute("value", `${element.name}`);
            moveOption.setAttribute("name", "brand");
            moveOption.innerText = `${element.name}`;
            moveSelect.appendChild(moveOption);
        })  
    }
}

function handleMoveBrand(event) {
    event.preventDefault();
    // headerForm.setAttribute("action", `integrations.html?brand=${moveSelect.value}`);
    location.href = `integrations.html?brand=${moveSelect.value}`;
    
}

async function brandProfile() {
    let response = await fetch(`${baseUrl}/api/v1/brands/@${brandName}`, {
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
            productOption.setAttribute("value", `${element.pk}`);
            productOption.innerText = `${element.name}`;
            productSelect.appendChild(productOption);
        });
        site.forEach(element => {
            let siteOption = document.createElement("option");
            let facebookOption = document.createElement("option");
            siteOption.setAttribute("value", `${element.pk}`);
            siteOption.innerText = `${element.name}`;
            facebookOption.setAttribute("value", `${element.pk}`);
            facebookOption.innerText = `${element.name}`;
            siteSelect.appendChild(siteOption);
            facebookSelect.appendChild(facebookOption);
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
    saleDateInput.setAttribute("max", yesterdayValue);
    facebookDateInput.setAttribute("max", yesterdayValue);
}

function paintSales(data) {
    data.forEach(element => {
        let productNameTd = document.createElement("td");
        let productCostTd = document.createElement("td");
        let countTd = document.createElement("td");
        let priceTd = document.createElement("td");
        let deliveryPriceTd = document.createElement("td");
        let orderTimeTd = document.createElement("td");
        let payTimeTd = document.createElement("td");
        let salesTableTr = document.createElement("tr");
        productNameTd.innerText = `${element.product.name}`;
        productCostTd.innerText = `${element.product.cost}`;
        countTd.innerText = `${element.count}`;
        priceTd.innerText = `${element.price}`;
        deliveryPriceTd.innerText = `${element.delivery_price}`;
        orderTimeTd.innerText = `${element.order_time}`;
        payTimeTd.innerText = `${element.pay_time}`;
        salesTableTr.appendChild(productNameTd);
        salesTableTr.appendChild(productCostTd);
        salesTableTr.appendChild(countTd);
        salesTableTr.appendChild(priceTd);
        salesTableTr.appendChild(deliveryPriceTd);
        salesTableTr.appendChild(orderTimeTd);
        salesTableTr.appendChild(payTimeTd);
        salesTableTbody.appendChild(salesTableTr);
    });
}

async function saleRetrieve(event) {
    event.preventDefault();
    let product = productSelect.value;
    let site = siteSelect.value;
    let date = saleDateInput.value;
    let response = await fetch(`${baseUrl}/api/v1/sales/?product=${product}&site=${site}&date=${date}`, {
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
            const tr = salesTableTbody.querySelectorAll("tr");
            tr.forEach(element => {
                element.remove();
            });
            paintSales(data);
        }
    }
}

function paintFacebook(data) {
    data.forEach(element => {
        let campaignName = document.createElement("td");
        let reach = document.createElement("td");
        let impressions = document.createElement("td");
        let frequency = document.createElement("td");
        let spend = document.createElement("td");
        let cpm = document.createElement("td");
        let purchaseRoas = document.createElement("td");
        let websiteCtr = document.createElement("td");
        let costPerUniqueInlineLinkClick = document.createElement("td");
        let purchase = document.createElement("td");
        let landingPageView = document.createElement("td");
        let linkClick = document.createElement("td");
        let adDate = document.createElement("td");
        let facebookTableTr = document.createElement("tr");
        campaignName.innerText = `${element.campaign_name}`;
        reach.innerText = `${element.reach}`;
        impressions.innerText = `${element.impressions}`;
        frequency.innerText = `${element.frequency}`;
        spend.innerText = `${element.spend}`;
        cpm.innerText = `${element.cpm}`;
        purchaseRoas.innerText = `${element.purchase_roas}`;
        websiteCtr.innerText = `${element.website_ctr}`;
        costPerUniqueInlineLinkClick.innerText = `${element.cost_per_unique_inline_link_click}`;
        purchase.innerText = `${element.purchase}`;
        landingPageView.innerText = `${element.landing_page_view}`;
        linkClick.innerText = `${element.link_click}`;
        adDate.innerText = `${element.ad_date}`;
        facebookTableTr.appendChild(campaignName);
        facebookTableTr.appendChild(reach);
        facebookTableTr.appendChild(impressions);
        facebookTableTr.appendChild(frequency);
        facebookTableTr.appendChild(spend);
        facebookTableTr.appendChild(cpm);
        facebookTableTr.appendChild(purchaseRoas);
        facebookTableTr.appendChild(websiteCtr);
        facebookTableTr.appendChild(costPerUniqueInlineLinkClick);
        facebookTableTr.appendChild(purchase);
        facebookTableTr.appendChild(landingPageView);
        facebookTableTr.appendChild(linkClick);
        facebookTableTr.appendChild(adDate);
        faccbookTableTbody.appendChild(facebookTableTr);
    });
}

async function facebookRetrieve(event) {
    event.preventDefault();
    let site = facebookSelect.value;
    let date = facebookDateInput.value;
    let response = await fetch(`${baseUrl}/api/v1/advertisings/?site=${site}&date=${date}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if(data.length === 0) {
        alert("선택 한 날짜에는 데이터가 없습니다. 다른 날짜를 선택해주세요");
    } else {
        if(faccbookTableTbody.firstElementChild === null) {
            paintFacebook(data);
        } else {
            const tr = faccbookTableTbody.querySelectorAll("tr");
            tr.forEach(element => {
                element.remove();
            });
            paintFacebook(data);
        }
    }
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
saleRetrieveForm.addEventListener("submit", saleRetrieve);
facebookRetrieveForm.addEventListener("submit", facebookRetrieve);
headerForm.addEventListener("submit", handleMoveBrand);
logOutBtn.addEventListener("click", logOut);