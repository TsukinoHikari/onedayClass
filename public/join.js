let idToken;
let pwdToken;
let pwd2Token;
let nameToken;
let telToken;
let mailToken;
let addrToken;

const uid = document.getElementById("uid");
const upwd = document.getElementById("upwd");
const upwd2 = document.getElementById("upwd2");
const uname = document.getElementById("uname");
const utel = document.getElementById("utel");
const umail = document.getElementById("umail");
const uaddr = document.getElementById("uaddr");
const msg = document.querySelectorAll(".msg");

uid.addEventListener("keyup", checkId);
upwd.addEventListener("keyup", checkPwd);
upwd2.addEventListener("keyup", checkPwd2);
utel.addEventListener("blur", checkTel);
umail.addEventListener("blur", checkMail);
function checkId() {
  //id유효성 검사 및 에러시 메세지 표시
  let regId = /^[a-z]+[a-z0-9]{4,20}$/;
  if (uid.value === "") {
    msg[0].innerHTML = "필수정보입니다.";
    msg[0].style.display = "block;";
    idToken = false;
  } else if (!regId.test(uid.value)) {
    msg[0].innerHTML =
      "영문자로 시작하는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.";
    msg[0].style.display = "block";
    idToken = false;
  } else {
    msg[0].innerHTML = "올바른 아이디입니다~!";
    msg[0].style.color = "#08A600";
    msg[0].style.display = "block";
    idToken = true;
  }
}
function checkPwd() {
  let regPwd = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (upwd.value === "") {
    msg[1].innerHTML = "필수정보입니다.";
    msg[1].style.display = "block;";
    pwdToken = false;
  } else if (!regPwd.test(upwd.value)) {
    msg[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
    msg[1].style.display = "block";
    pwdToken = false;
  } else {
    msg[1].style.display = "none";
    pwdToken = true;
  }
}
function checkPwd2() {
  let regPw = /[a-zA-Z0-9~!@#$%^&*()_+|<script>?:{}]{8,16}/;
  if (upwd2.value === "") {
    msg[2].innerHTML = "필수정보입니다.";
    msg[2].style.display = "block;";
    pwd2Token = false;
  } else if (upwd.value !== upwd2.value) {
    msg[2].innerHTML = "비밀번호가 일치하지 않습니다.";
    msg[2].style.display = "block";
    pwd2Token = false;
  } else {
    msg[2].style.display = "none";
    pwd2Token = true;
  }
}
function checkTel() {
  let regTel = /^\d{3}-\d{3,4}-\d{4}$/;
  if (utel.value === "") {
    msg[3].innerHTML = "필수정보입니다.";
    msg[3].style.display = "block;";
    telToken = false;
  } else if (!regTel.test(utel.value)) {
    msg[3].innerHTML = "전화번호 형식이 올바르지 않습니다.";
    msg[3].style.display = "block";
    telToken = false;
  } else {
    msg[3].style.display = "none";
    telToken = true;
  }
}
function checkMail() {
  let regMail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (umail.value === "") {
    msg[4].innerHTML = "필수정보입니다.";
    msg[4].style.display = "block;";
    mailToken = false;
  } else if (!regMail.test(umail.value)) {
    msg[4].innerHTML = "이메일 형식이 올바르지 않습니다.";
    msg[4].style.display = "block";
    mailToken = false;
  } else {
    msg[4].style.display = "none";
    mailToken = true;
  }
}

function Welcome() {
  if (!idToken) {
    alert("아이디 형식을 확인하세요");
    uid.focus();
    return false;
  }
  if (!pwdToken || !pwd2Token) {
    alert("비밀번호 형식을 확인하세요");
    return false;
  }
  if (!telToken) {
    alert("전화번호 형식을 확인하세요");
    return false;
  }
  if (!mailToken) {
    alert("이메일 형식을 확인하세요");
    return false;
  }
}
