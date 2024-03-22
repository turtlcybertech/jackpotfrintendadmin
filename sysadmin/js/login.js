const loginFn = (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username !== "" && password !== "") {
    loginAPI({ userid: username, password: password });
  } else {
    alert("Username and password should not be empty");
  }
};

const loginAPI = async (data) => {
  fetch("https://jackpotyantrabackend.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status) {
        // console.log(res);
        alert(res.message);
        let { token, name } = res.data;
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("token", token);
        window.location.href = "td-admin.html";
      } else {
        // console.log(res);
        alert(res.message);
      }
    })
    .catch((err) => {
      alert("Something went wrong at login");
      console.log(err);
    });
};

var form = document.getElementById("myForm");
form.addEventListener("submit", loginFn);

document.addEventListener("DOMContentLoaded", function () {
  sessionStorage.clear();
});
