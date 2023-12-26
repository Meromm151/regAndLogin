let users = [];
let nameValidationPattern = /^\w{3,25}$/;
let mailValidationPattern = /^\w+\.?@\w+\.\w{2,8}$/;
let passwordValidationPattern = /^\w{8,25}$/;
let logEmail = document.getElementById("logEmail");
let logPassword = document.getElementById("logPassword");
let logInForm = document.getElementById("logInForm");

regmailVal(logEmail);
regPasswordVal(logPassword);
logInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      if (logEmail.value.toLowerCase() == users[i].userMail) {
        if (logPassword.value == users[i].userPassword) {
          //login
          sessionStorage.setItem("successLogin", JSON.stringify(users[i]));
          if (sessionStorage.getItem("successLogin")) {
            window.location.href = "https://regandlog.netlify.app/homePage.html";
          }
          return;
        } else {
          //wrong password
          logInWrongPassword(logPassword);
          return;
        }
      }
    }
    //wron email
    logInWrongmail(logEmail);
  } else {
    //no mails stored
    logInWrongmail(logEmail);
    logInWrongPassword(logPassword);
  }
});
function logInWrongmail(logEmail) {
  if (!logEmail.parentElement.classList.contains("is-invalid")) {
    logEmail.parentElement.classList.add("is-invalid");
    let span = document.createElement("span");
    span.id = "regMailSpan";
    span.classList.add("invalid");
    spanText = document.createTextNode("wrong E-mail");
    span.appendChild(spanText);
    logEmail.parentElement.style.marginBottom = "0px";
    logEmail.parentElement.parentElement.appendChild(span);
  }
}
function logInWrongPassword(regPassword) {
  if (!regPassword.parentElement.classList.contains("is-invalid")) {
    regPassword.parentElement.classList.add("is-invalid");
    let span = document.createElement("span");
    span.id = "regPasswordSpan";
    span.classList.add("invalid");
    spanText = document.createTextNode("wrong password");
    span.appendChild(spanText);
    regPassword.parentElement.style.marginBottom = "0px";
    regPassword.parentElement.parentElement.appendChild(span);
  }
}
// localStorage restoring data
function restorUsers() {
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
}
restorUsers();
// changing page element
let changableSide = document.getElementById("changableSide");
// login page
let loginPage = `
<div id="loginPage">
<p class="fs-5">Welcome To</p>
<h1 >Future Tech</h1>
<p class="text-light p-2">Log in to get in the Future Tech </p>
<form action="" class="login d-flex flex-column m-auto" id="logInForm">
  <div>
    <div class="input-container">
      <label for="logEmail"class="fa-solid fa-user"></label>
      <input id="logEmail" type="email" placeholder="User email" class=" bg-transparent btn-outline-none">
    </div>
  </div>
  <div>
    <div class="input-container">
      <label for="logPassword" class="fa-solid fa-lock"></label>
      <input id="logPassword" type="password" placeholder="Password" class=" bg-transparent btn-outline-none">
    </div>
  </div>
  <button  type="submit" class="btn btn-danger my-3 rounded-5">LOG IN</button>
</form>
<div class="regestration">
  <p class="d-inline">Dont have an account?</p>
  <button id="signUp" class="d-inline btn text-danger">Sign Up Now</button>
</div>
<div class="login-option">
  <span class="or">OR</span>
  <div class="icon-group d-flex justify-content-center align-items-center">
    <div class="login-option-icon">
      <a href="new-service.html" target="_blank" class="text-decoration-none text-white facebook"><i class="fa-brands fa-facebook fs-1 p-3"></i></a>
    </div>
    <div class="login-option-icon">
      <a href="new-service.html" target="_blank" class="text-decoration-none text-white google"><i class="fa-brands fa-google fs-1 p-3"></i></a>
    </div>
  </div>
</div>
</div>
`;
// regestration page
let regestrationPage = `
<div id="regestrationPage">
<h2 class="py-5 fs-1">Regestration Page</h2>
<form id="regForm">
<div>
  <div class="input-container">
  <label for="regName"class="fa-solid fa-user"></label>
  <input id="regName" type="text" placeholder="Enter your name" class=" bg-transparent btn-outline-none">
  </div>
</div>

<div>
  <div class="input-container">
  <label for="regmail"class="fa-solid fa-at"></label>
  <input id="regmail" type="email" placeholder="Enter your E-mail" class=" bg-transparent btn-outline-none">
  </div>
</div>

<div>
  <div class="input-container">
  <label for="regPassword" class="fa-solid fa-lock"></label>
  <input id="regPassword" type="password" placeholder="Enter your password" class=" bg-transparent btn-outline-none">
  </div>
</div>

<button id="regestrationBtn"type="submit" class="btn btn-danger my-3 rounded-5">Register</button>
</form>
</div>
<div class="regestration">
  <p class="d-inline">Dont have an account?</p>
  <button id="logInBtn" class="d-inline btn text-danger">Log In</button>
</div>
`;
// switching page
document.addEventListener("click", (e) => {
  if (e.target.id == "logInBtn") {
    changableSide.innerHTML = loginPage;
    logInBtn = document.getElementById(e.target.id);
  } else if (e.target.id == "signUp") {
    changableSide.innerHTML = regestrationPage;
    let regName = document.getElementById("regName");
    let regmail = document.getElementById("regmail");
    let regPassword = document.getElementById("regPassword");
    regNameVal(regName);
    regmailVal(regmail);
    regPasswordVal(regPassword);
    regFunction(regName, regmail, regPassword);
  }
});
// name validtation
function regNameVal(regName) {
  regName.addEventListener("input", () => {
    regNameValDanger();
  });
  if (nameValidationPattern.test(regName.value)) {
    return true;
  } else {
    return false;
  }
}
function regNameValDanger() {
  if (!nameValidationPattern.test(regName.value)) {
    if (!regName.parentElement.classList.contains("is-invalid")) {
      regName.parentElement.classList.add("is-invalid");
      let span = document.createElement("span");
      span.id = "regNameSpan";
      span.classList.add("invalid");
      spanText = document.createTextNode(
        "Name must be 3:25 letter or number or mixed"
      );
      span.appendChild(spanText);
      regName.parentElement.style.marginBottom = "0px";
      regName.parentElement.parentElement.appendChild(span);
    }
  } else {
    if (regName.parentElement.classList.contains("is-invalid")) {
      regName.parentElement.classList.remove("is-invalid");
      document.querySelector("#regNameSpan").parentElement.style.marginBottom =
        "15px";
      document.querySelector("#regNameSpan").remove();
    }
  }
}
// mail validtation
function regmailVal(regmail) {
  regmail.addEventListener("input", () => {
    regmailValDanger(regmail);
  });
  if (mailValidationPattern.test(regmail.value)) {
    return true;
  } else {
    return false;
  }
}
function regmailValDanger(regmail) {
  if (!mailValidationPattern.test(regmail.value)) {
    if (!regmail.parentElement.classList.contains("is-invalid")) {
      regmail.parentElement.classList.add("is-invalid");
      let span = document.createElement("span");
      span.id = "regMailSpan";
      span.classList.add("invalid");
      spanText = document.createTextNode(
        "E-mail must be like form 'exaple@nnn.com'"
      );
      span.appendChild(spanText);
      regmail.parentElement.style.marginBottom = "0px";
      regmail.parentElement.parentElement.appendChild(span);
    }
  } else {
    if (regmail.parentElement.classList.contains("is-invalid" )) {
      regmail.parentElement.classList.remove("is-invalid");
      document.querySelector("#regMailSpan").parentElement.style.marginBottom ="15px";
      document.querySelector("#regMailSpan").remove();
    }
  }
}
function regMailNotDuplicated() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userMail == regmail.value) {
      if (!regmail.parentElement.classList.contains("is-invalid")) {
        regmail.parentElement.classList.add("is-invalid");
        let span = document.createElement("span");
        span.id = "regMailSpan";
        span.classList.add("invalid");
        spanText = document.createTextNode(
          "Your e-mail is already registered "
        );
        span.appendChild(spanText);
        regmail.parentElement.style.marginBottom = "0px";
        regmail.parentElement.parentElement.appendChild(span);
      }
      return false;
    }
  }
  return true;
}
// password validtation
function regPasswordVal(regPassword) {
  regPassword.addEventListener("input", () => {
    regPasswordValDanger(regPassword);
  });
  if (passwordValidationPattern.test(regPassword.value)) {
    return true;
  } else {
    return false;
  }
}
function regPasswordValDanger(regPassword) {
  if (!passwordValidationPattern.test(regPassword.value)) {
    if (!regPassword.parentElement.classList.contains("is-invalid")) {
      regPassword.parentElement.classList.add("is-invalid");
      let span = document.createElement("span");
      span.id = "regPasswordSpan";
      span.classList.add("invalid");
      spanText = document.createTextNode(
        "Password size must be [8-25] litter or number or mixed'"
      );
      span.appendChild(spanText);
      regPassword.parentElement.style.marginBottom = "0px";
      regPassword.parentElement.parentElement.appendChild(span);
    }
  } else {
    if (regPassword.parentElement.classList.contains("is-invalid")) {
      regPassword.parentElement.classList.remove("is-invalid");
      document.querySelector(
        "#regPasswordSpan"
      ).parentElement.style.marginBottom = "15px";
      document.querySelector("#regPasswordSpan").remove();
    }
  }
}

function regFunction(regName, regmail, regPassword) {
  let regForm = document.getElementById("regForm");
  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    regMailNotDuplicated();
    if (
      !regNameVal(regName) ||
      !regmailVal(regmail) ||
      !regPasswordVal(regPassword) ||
      !regMailNotDuplicated()
    ) {
      if (!regNameVal(regName)) {
        regNameValDanger();
      }
      if (!regmailVal(regmail)) {
        regmailValDanger(regmail);
      }
      if (!regPasswordVal(regPassword)) {
        regPasswordValDanger(regPassword);
      }
    } else {
      submitRegForm();
    }
  });
}

function submitRegForm() {
  user = {
    userName: regName.value,
    userMail: regmail.value.toLowerCase(),
    userPassword: regPassword.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("successLogin", JSON.stringify(user));
  if (sessionStorage.getItem("successLogin")) {
    window.location.href = "https://regandlog.netlify.app/homePage.html";
  }
}
