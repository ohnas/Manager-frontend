import { baseUrl, getCookie } from "./setting.js";
const productForm = document.querySelector("form");
const nameInput = document.getElementById("namefiled");
const costInput = document.getElementById("costfiled");
const brandSelect = document.getElementById("brandfiled");

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
    let response = await fetch(`${baseUrl}/api/v1/products/create`, {
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
            let brandOption = document.createElement("option");
            brandOption.setAttribute("value", `${element.pk}`);
            brandOption.innerText = `${element.name}`;
            brandSelect.appendChild(brandOption);
        });
    }
}

function createProdct(event) {
    event.preventDefault();
    let productData = {
        "name" : nameInput.value,
        "cost" : costInput.value,
        "brand" : brandSelect.value,
    };
    console.log(productData);
    nameInput.value = "";
    costInput.value = "";
    brandSelect.value = "";
    handleCreateProduct(productData);
}


async function handleCreateProduct(productData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/api/v1/products/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(productData),
    });
    if(response.ok) {
        alert("상품 생성완료");
            location.href = "site.html";
    } else {
        alert("입력 항목을 확인해주세요");
    }
}

userProfile();
productForm.addEventListener("submit", createProdct);