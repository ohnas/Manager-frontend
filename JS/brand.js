import { baseUrl } from "./setting.js";


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
    }
}

userProfile();