const logOutBtn = document.querySelector(".button");
const dateForm = document.querySelector(".date-form");
const dateInput = dateForm.querySelector("input");


//조회할 날짜 전일로 제한시켜놓기
function handleDateInput() {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const yesterdayValue = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
    dateInput.setAttribute("max", yesterdayValue);
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
    let response = await fetch("http://127.0.0.1:8000/api/v1/users/log-out" , {
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

handleDateInput();
logOutBtn.addEventListener("click", logOut);