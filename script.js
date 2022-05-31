"use strict";

var Cal = function (divId) {
     //Store div id
     this.divId = divId;

     // Days of week, starting on Sunday
     this.DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     console.log(this);

     // Months, stating on January
     this.Months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
     ];

     // Set the current month, year
     var d = new Date();

     this.currMonth = d.getMonth();
     this.currYear = d.getFullYear();
     this.currDay = d.getDate();
};

// Goes to next month
Cal.prototype.nextMonth = function () {
     if (this.currMonth == 11) {
          this.currMonth = 0;
          this.currYear = this.currYear + 1;
     } else {
          this.currMonth = this.currMonth + 1;
     }
     this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function () {
     if (this.currMonth == 0) {
          this.currMonth = 11;
          this.currYear = this.currYear - 1;
     } else {
          this.currMonth = this.currMonth - 1;
     }
     this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function () {
     this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m) {
     var d = new Date(),
          // First day of the week in the selected month
          firstDayOfMonth = new Date(y, m, 1).getDay(),
          // Last day of the selected month
          lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
          // Last day of the previous month
          lastDayOfLastMonth =
               m == 0
                    ? new Date(y - 1, 11, 0).getDate()
                    : new Date(y, m, 0).getDate();

     var html = "<table>";

     // Write selected month and year

     document.querySelector(".today__date").innerHTML =
          '<p colspan="7">' + this.Months[m] + " " + y + "</p>";

     // Write the header of the days of the week
     html += '<tr class="days">';
     for (var i = 0; i < this.DaysOfWeek.length; i++) {
          html += "<td>" + this.DaysOfWeek[i] + "</td>";
     }
     html += "</tr>";

     // Write the days
     var i = 1;
     do {
          var dow = new Date(y, m, i).getDay();

          // If Sunday, start new row
          if (dow == 0) {
               html += "<tr>";
          }
          // If not Sunday but first day of the month
          // it will write the last days from the previous month
          else if (i == 1) {
               html += "<tr>";
               var k = lastDayOfLastMonth - firstDayOfMonth + 1;
               for (var j = 0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + "</td>";
                    k++;
               }
          }

          // Write the current day in the loop
          var chk = new Date();
          var chkY = chk.getFullYear();
          var chkM = chk.getMonth();
          if (
               chkY == this.currYear &&
               chkM == this.currMonth &&
               i == this.currDay
          ) {
               html += '<td class="today">' + i + "</td>";
               document.querySelector(".current__day__container").innerHTML =
                    ` <p class="curront__day"> ${i} </p> ` +
                    `<p class=""curront__month> ${this.Months[m]} </p>`;
          } else {
               html += '<td class="normal">' + i + "</td>";
          }
          // If Saturday, closes the row
          if (dow == 6) {
               html += "</tr>";
          }
          // If not Saturday, but last day of the selected month
          // it will write the next few days from the next month
          else if (i == lastDateOfMonth) {
               var k = 1;
               for (dow; dow < 6; dow++) {
                    html += '<td class="not-current">' + k + "</td>";
                    k++;
               }
          }

          i++;
     } while (i <= lastDateOfMonth);

     // Closes table
     html += "</table>";

     // Write HTML to the div
     document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function () {
     // Start calendar
     var c = new Cal("divCal");
     c.showcurr();

     // Bind next and previous button clicks
     getId("btnNext").onclick = function () {
          c.nextMonth();
     };
     getId("btnPrev").onclick = function () {
          c.previousMonth();
     };
};

// Get element by id
function getId(id) {
     return document.getElementById(id);
}

//Get All progressBar svg
let progressBar = document.querySelectorAll(".progress-bar__progress");
//Get Each progressBar svg
progressBar.forEach((item) => {
     let myCourseCours =
          item.parentElement.parentElement.parentElement.parentElement;
     //Get progressBar achivment innerhtml
     let achvmentPercentage =
          item.parentElement.parentElement.children[1].innerHTML;
     //Get progressBar achivment innerhtml convert to array to do some changes
     //Get progressBar achivment array remove all spaces
     let percentageArray = [...achvmentPercentage].filter((n) =>
          String(n).trim()
     );
     //Get progressBar achivment array remove "%" sign
     percentageArray.pop();
     //Get progressBar achivment array convert to string
     percentageArray.toString();
     let percentageString = percentageArray.join("");
     console.log(percentageString);
     if (percentageString == 0) {
          myCourseCours.classList.add("not--started");
     } else if (percentageString == 100) {
          myCourseCours.classList.add("succesfully__finished");
     }
     ////////////
     if (percentageString <= 9) {
          item.classList.add("str02");
     } else if ((percentageString >= 10) & (percentageString <= 19)) {
          item.classList.add("str04");
     } else if ((percentageString >= 20) & (percentageString <= 29)) {
          item.classList.add("str06");
     } else if ((percentageString >= 30) & (percentageString <= 39)) {
          item.classList.add("str08");
     } else if ((percentageString >= 40) & (percentageString <= 49)) {
          item.classList.add("str1");
     } else if ((percentageString >= 50) & (percentageString <= 59)) {
          item.classList.add("str12");
     } else if ((percentageString >= 60) & (percentageString <= 69)) {
          item.classList.add("str14");
     } else if ((percentageString >= 70) & (percentageString <= 79)) {
          item.classList.add("str16");
     } else if ((percentageString >= 60) & (percentageString <= 89)) {
          item.classList.add("str18");
     } else if ((percentageString >= 60) & (percentageString <= 100)) {
          item.classList.add("str20");
     } else {
          console.log("there isnt any percentage in range 1 to 100");
     }

     //push achivment iinnerhtml to strokoffset style for circle in svg
     item.style.strokeDashoffset = 100 - percentageString;
});

// active headerlink
let headerLink = document.querySelectorAll(".header__link");
headerLink.forEach((item) => {
     item.addEventListener("click", (e) => {
          for (let i = 0; i < headerLink.length; i++) {
               headerLink[i].classList.remove("activate__header");
          }
          item.classList.add("activate__header");
          console.log(headerLink[1]);
     });
});

let courseProgresss = document.querySelectorAll(".progress__item");
courseProgresss.forEach((item) => {
     item.addEventListener("click", (e) => {
          for (let i = 0; i < courseProgresss.length; i++) {
               courseProgresss[i].setAttribute("id", "");
          }
          item.setAttribute("id", "active__prgress");
     });
});

function loadDashboard() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "index.html");
     xhttp.send();
}
function loadcourses() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "Pages/Courses.html");
     xhttp.send();
}
function loadgrade() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "Pages/grade.html");
     xhttp.send();
}
function loadscheduel() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "Pages/scheduel.html");
     xhttp.send();
}
function loadchat() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "Pages/Chat.html");
     xhttp.send();
}
function loadsetting() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
       document.querySelector("body").innerHTML = this.responseText;
  };
  xhttp.open("GET", "Pages/setting.html");
  xhttp.send();
}
function loadDoc() {
     const xhttp = new XMLHttpRequest();
     xhttp.onload = function () {
          document.querySelector("body").innerHTML = this.responseText;
     };
     xhttp.open("GET", "Pages/Help.html");
     xhttp.send();
}
