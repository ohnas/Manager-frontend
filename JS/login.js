function logIn() {
    const body = document.body;
    const logIndiv = document.createElement("div");
    const logInForm = document.createElement("form");
    const logInId = document.createElement("input");
    const logInPw = document.createElement("input");
    const logInBtn = document.createElement("button");
    
    logInId.setAttribute("type", "text");
    logInId.setAttribute("placeholder", "ID");
    logInPw.setAttribute("type", "password");
    logInPw.setAttribute("placeholder", "PW");
    logInBtn.setAttribute("type", "submit")
    logInBtn.innerText = "Log In"
    logIndiv.classList.add("login-form");

    logInForm.appendChild(logInId);
    logInForm.appendChild(logInPw);
    logInForm.appendChild(logInBtn);
    logIndiv.appendChild(logInForm)
    body.appendChild(logIndiv)
}

logIn()