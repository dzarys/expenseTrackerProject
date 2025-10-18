"use strict";

let storedData1 = ["Darwin", "john", "Darwin365", "Mason"];
let storedData2 = ["Bradley", "pete", "Bradley", "Bateman"];

let userName = document.querySelector("#loginCredentials1");
let passWord = document.querySelector("#loginCredentials2");

//Sign up info

//The username input function
userName.addEventListener("click", function UserID() {
  alert(
    "Do not press enter or submit until both username and password are filled. After both input are placed, press enter to confirm credentials, then click submit."
  );

  userName.value = "";
  userName.style.color = "#000000";
  userName.style.fontFamily = "poppins";
});

//The password input function
passWord.addEventListener("click", function passID() {
  passWord.value = "";
  passWord.type = "Password";
  passWord.style.color = "#000000";
});

//The username and password check
document.addEventListener("keydown", function Login(e) {
  if (e.key === "Enter") {
    let input1 = userName.value;
    let input2 = passWord.value;
    alert(`Username is:  ${input1}`);
    alert(`Password is:  ${input2}`);
  }
});

//function for relocating to web application
function webApplication() {
  window.location.href =
    "http://127.0.0.1:5500/expenseTrackerProject/NEA-frontend/homepage.html";
}

//user authenticator
function validateForm() {
  function linearSearch() {
    let input1 = userName.value;
    let input2 = passWord.value;

    for (let i = 0; i < storedData1.length; i++) {
      //Need to make a linear search
      if (input1 === storedData1[i] && input2 === storedData2[i]) {
        return true;
      }
    }
  }

  if (linearSearch()) {
    webApplication();
  } else alert("incorrect credentials");
}
