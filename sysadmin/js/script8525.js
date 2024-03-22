const callFn = () => {
  fetch("https://jackpotyantrabackend.onrender.com/getadminresult", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.data)
      if (res.data != null) {
        let data = res.data;
        oldResultFetch(data);
        sessionStorage.setItem("id", data._id);
      } else {
        alert("No record Found");
      }
    })
    .catch((err) => {
      // console.log(err);
      alert("Something went wrong!");
    });
};

const oldResultFetch = (data) => {
  let a = document.getElementById("a-result");
  let b = document.getElementById("b-result");
  let c = document.getElementById("c-result");
  let d = document.getElementById("d-result");
  let e = document.getElementById("e-result");
  let nextTime = document.getElementById("nextTime");

  a.innerText = data.a;
  b.innerText = data.b;
  c.innerText = data.c;
  d.innerText = data.d;
  e.innerText = data.e;
  nextTime.innerText = data.resultFor;
  console.log("40", data);
};

const saveFn = () => {
  let a = document.getElementById("a-input").value;
  let b = document.getElementById("b-input").value;
  let c = document.getElementById("c-input").value;
  let d = document.getElementById("d-input").value;
  let e = document.getElementById("e-input").value;

  if ((a !== "" && Number(a) < 10) || Number(a) > 99) {
    alert("A. Number should be in between 10 to 99 or Empty");
  } else if ((b !== "" && Number(b) < 10) || Number(b) > 99) {
    alert("B. Number should be in between 10 to 99 or Empty");
  } else if ((c !== "" && Number(c) < 10) || Number(c) > 99) {
    alert("C. Number should be in between 10 to 99 or Empty");
  } else if ((d !== "" && Number(d) < 10) || Number(d) > 99) {
    alert("D. Number should be in between 10 to 99 or Empty");
  } else if ((e !== "" && Number(e) < 10) || Number(e) > 99) {
    alert("E. Number should be in between 10 to 99 or Empty");
  } else if (a == "" && b == "" && c == "" && d == "" && e == "") {
    alert("Atleast One field Required to perform this action");
  } else {
    let arr = [];
    if (a !== "") {
      arr.push(a);
    }
    if (b !== "") {
      arr.push(b);
    }
    if (c !== "") {
      arr.push(c);
    }
    if (d !== "") {
      arr.push(d);
    }
    if (e !== "") {
      arr.push(e);
    }
    let set = new Set(arr).size;
    if (arr.length !== set) {
      alert("Please insert unique value");
    } else {
      saveAPi({ a, b, c, d, e });
    }
  }
};

const cancelFn = () => {
  document.getElementById("a-input").value = "";
  document.getElementById("b-input").value = "";
  document.getElementById("c-input").value = "";
  document.getElementById("d-input").value = "";
  document.getElementById("e-input").value = "";
};
const saveAPi = (data) => {
  fetch(`https://jackpotyantrabackend.onrender.com/setresultbyid/${sessionStorage.getItem("id")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      alert(res.message);
      cancelFn();
      callFn();
    })
    .catch((err) => {
      // console.log(err);
      alert("Error Occured!");
    });
};

document.addEventListener("DOMContentLoaded", function () {
  var isLoggedIn = sessionStorage.getItem("token");
  let adminname = document.getElementById("adminname");
  if (!isLoggedIn) {
    window.location.href = "login.html";
  } else {
    let body = document.getElementById("bodyId");
    body.style.display = "block";
    adminname.innerText = sessionStorage.getItem("name");
    callFn();
  }
});
