let a = document.getElementById("res0");
let b = document.getElementById("res1");
let c = document.getElementById("res2");
let d = document.getElementById("res3");
let e = document.getElementById("res4");
let nxtDraw = document.getElementById("nxtDraw");
let r_time = document.getElementById("r_time");
let load_img = document.getElementsByClassName("load_img");
let currTag = document.getElementById("cur_time1");

const fetchData = () => {
  fetch("https://jackpotyantrabackend.onrender.com/getclientresult", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      fetchDataToPage(res.data);
      sessionStorage.setItem("a", res.data.a);
      sessionStorage.setItem("b", res.data.b);
      sessionStorage.setItem("c", res.data.c);
      sessionStorage.setItem("d", res.data.d);
      sessionStorage.setItem("e", res.data.e);
      sessionStorage.setItem("nextDraw", res.data.nextDraw);
      sessionStorage.setItem("resultFor", res.data.resultFor);
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchData();
const fetchDataToPage = (data) => {
  a.innerText = data.a;
  b.innerText = data.b;
  c.innerText = data.c;
  d.innerText = data.d;
  e.innerText = data.e;
  nxtDraw.innerText = data.nextDraw;
  r_time.innerText = data.resultFor;
};
const setDataResult = () => {
  let aStorage = sessionStorage.getItem("a");
  let bStorage = sessionStorage.getItem("b");
  let cStorage = sessionStorage.getItem("c");
  let dStorage = sessionStorage.getItem("d");
  let eStorage = sessionStorage.getItem("e");
  let nxtStorage = sessionStorage.getItem("nextDraw");
  let resultStorage = sessionStorage.getItem("resultFor");

  if (aStorage !== null) {
    a.innerText = aStorage;
  }
  if (bStorage !== null) {
    b.innerText = bStorage;
  }
  if (cStorage !== null) {
    c.innerText = cStorage;
  }
  if (dStorage !== null) {
    d.innerText = dStorage;
  }
  if (eStorage !== null) {
    e.innerText = eStorage;
  }
  if (nxtStorage !== null) {
    nxtDraw.innerText = nxtStorage;
  }
  if (resultStorage !== null) {
    r_time.innerText = resultStorage;
  }
};
setDataResult();

const dateClient = () => {
  let date = new Date();
  let dateDOM = document.getElementById("dateClient");
  dateDOM.innerText = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getFullYear()}`;
};
dateClient();
const currentTime = () => {
  var hour = 0;
  var minute = 0;
  var sec = 0;
  load_img[0].style.display = "none";
  load_img[1].style.display = "none";
  load_img[2].style.display = "none";
  load_img[3].style.display = "none";
  load_img[4].style.display = "none";
  let date = new Date();
  if (date.getHours() >= 0 && date.getHours() <= 7) {
    sessionStorage.clear();
    nxtDraw.innerText = "08:00 AM";
    r_time.innerText = "";
    load_img[0].style.display = "block";
    load_img[1].style.display = "block";
    load_img[2].style.display = "block";
    load_img[3].style.display = "block";
    load_img[4].style.display = "block";
  }
  if (date.getMinutes() >= 0 && date.getMinutes() < 15) {
    if (date.getSeconds() === 0) {
      minute = 15 - date.getMinutes();
    } else {
      minute = 15 - date.getMinutes() - 1;
    }
  }
  if (date.getMinutes() >= 15 && date.getMinutes() < 30) {
    if (date.getSeconds() === 0) {
      minute = 30 - date.getMinutes();
    } else {
      minute = 30 - date.getMinutes() - 1;
    }
  }
  if (date.getMinutes() >= 30 && date.getMinutes() < 45) {
    if (date.getSeconds() === 0) {
      minute = 45 - date.getMinutes();
    } else {
      minute = 45 - date.getMinutes() - 1;
    }
  }
  if (date.getMinutes() >= 45 && date.getMinutes() <= 59) {
    minute = 59 - date.getMinutes();
  }
  sec = 60 - date.getSeconds();
  let hours24 = date.getHours() >= 1 && date.getHours() <= 12 ? date.getHours() : date.getHours() === 0 ? 12 : date.getHours() - 12;
  let currTimeStr = `${hours24 < 10 ? "0" + hours24 : hours24}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  } ${date.getHours() < 12 ? "AM" : "PM"}`;
  currTag.innerText = currTimeStr;
  setInterval(() => {
    let date = new Date();
    if (date.getHours() >= 8 && date.getHours() <= 22 && (date.getMinutes() === 0 || date.getMinutes() === 15 || date.getMinutes() === 30 || date.getMinutes() === 45)) {
      fetchData();
    }
    if (date.getHours() >= 0 && date.getHours() <= 7) {
      sessionStorage.clear();
      nxtDraw.innerText = "08:00 AM";
      r_time.innerText = "";
      a.innerText = b.innerText = c.innerText = d.innerText = e.innerText = "";
      load_img[0].style.display = "block";
      load_img[1].style.display = "block";
      load_img[2].style.display = "block";
      load_img[3].style.display = "block";
      load_img[4].style.display = "block";
    } else {
      load_img[0].style.display = "none";
      load_img[1].style.display = "none";
      load_img[2].style.display = "none";
      load_img[3].style.display = "none";
      load_img[4].style.display = "none";
    }
    if (date.getHours() >= 0 && date.getHours() < 8) {
      if (date.getMinutes() === 0) {
        minute = 0;
      } else {
        if (date.getSeconds() !== 0) {
          minute = 59 - date.getMinutes();
        }
      }
      hour = 7 - date.getHours();
    } else {
      if (date.getMinutes() >= 0 && date.getMinutes() < 15) {
        if (date.getSeconds() === 0) {
          minute = 15 - date.getMinutes();
        } else {
          minute = 15 - date.getMinutes() - 1;
        }
      }
      if (date.getMinutes() >= 15 && date.getMinutes() < 30) {
        if (date.getSeconds() === 0) {
          minute = 30 - date.getMinutes();
        } else {
          minute = 30 - date.getMinutes() - 1;
        }
      }
      if (date.getMinutes() >= 30 && date.getMinutes() < 45) {
        if (date.getSeconds() === 0) {
          minute = 45 - date.getMinutes();
        } else {
          minute = 45 - date.getMinutes() - 1;
        }
      }
      if (date.getMinutes() >= 45 && date.getMinutes() <= 59) {
        minute = 59 - date.getMinutes();
      }
    }
    sec = 60 - date.getSeconds();
    hours24 = date.getHours() >= 1 && date.getHours() <= 12 ? date.getHours() : date.getHours() === 0 ? 12 : date.getHours() - 12;
    currTimeStr = `${hours24 < 10 ? "0" + hours24 : hours24}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    } ${date.getHours() < 12 ? "AM" : "PM"}`;
    currTag.innerText = currTimeStr;

    if (date.getHours() >= 22) {
      document.getElementById("cdown1").innerText = "";
    } else {
      document.getElementById("cdown1").innerText = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${sec < 10 ? "0" + sec : sec === 60 ? "00" : sec}`;
    }

    if (sec === 0) {
      minute--;
      sec = 59;
      if (minute == 0) {
        minute = 15;
      }
    } else {
      sec--;
    }
  }, 1000);
};
currentTime();
// jQuery(document).ready(function () {
//     jQuery("#datepicker").datepicker({
//         format: "dd-mm-yyyy",
//         startDate: "+1d",
//     });
// });
