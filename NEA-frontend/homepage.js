"use strict";

let visualReport = document.querySelector(".my-chart");
let data = {
  labels: ["Housing", "Utility", "Transportation", "entertainement"],
  Title: "Expenses",
  datasets: [
    {
      data: [20, 10, 30, 5],
    },
  ],
};

let myChart = new Chart(visualReport, {
  type: "pie",
  data,
});

let calcInp = document.querySelector(".input");
let calcRes = document.querySelector(".result");

function calculate() {
  if (calcInp.value === 0) {
    calcRes.placeholder = 0;
  } else if (calcInp.value > 0 && calcInp.value < 12571) {
    calcRes.placeholder = calcInp.value;
  } else if (calcInp.value > 12570 && calcInp.value < 50271) {
    calcRes.placeholder = calcInp.value * 0.8;
  } else if (calcInp.value > 50270 && calcInp.value < 125141) {
    calcRes.placeholder = calcInp.value * 0.6;
  } else if (calcInp.value > 125140) {
    calcRes.placeholder = calcInp.value * 0.55;
  } else {
    calcRes.placeholder = "Invalid input! ";
    alert("Error! Make sure any input placed is greater than zero.");
  }
}

document.querySelector(".calculate").addEventListener("click", function () {
  calculate();
});
