"use strict";

//The values typed into the login space
let userName = document.querySelector("#loginCredentials1");
let passWord = document.querySelector("#loginCredentials2");

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

//function for relocating to web application home page
function webApplication() {
  window.location.href = "http://127.0.0.1:5500/NEA-frontend/homepage.html";
}

//user authenticator - the linear search crosschecks the username and password inputted to usernam and passwords stored
function linearSearch() {
  let input1 = userName.value;
  let input2 = passWord.value;
  const registration1 = [];
  const registration2 = [];

  //fetch used to get the data of the database stored in a URL and then compared to the inputs of the user
  fetch("http://localhost:3000/fetchdata")
    .then((response) => {
      return response.json();
    })
    .then((fetchdata) => {
      fetchdata.forEach((fetchdata) => {
        const username = `${fetchdata.username}`;
        const password = `${fetchdata.password}`;
        registration1.push(username);
        registration2.push(password);
      });

      for (let i = 0; i < registration1.length; i++) {
        if (input1 === registration1[i] && input2 === registration2[i]) {
          webApplication();
        }
      }
    });
}
