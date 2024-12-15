const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const meridiem = document.getElementById("meridiem");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const numberOfPeople = document.getElementById("numberOfPeople");

function populateDays(month, year) {
  day.innerHTML = "";
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.textContent = i.toString().padStart(2, "0");
    option.value = i.toString().padStart(2, "0");
    day.append(option);
  }
}

function populateMonths() {
  month.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.textContent = i.toString().padStart(2, "0");
    option.value = i.toString().padStart(2, "0");
    month.append(option);
  }
}

function populateYears(startYear, endYear) {
  year.innerHTML = "";
  for (let i = startYear; i <= endYear; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    year.append(option);
  }
}

function populateHours() {
  hours.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.textContent = i.toString().padStart(2, "0");
    option.value = i.toString().padStart(2, "0");
    hours.append(option);
  }
}

function populateMinutes() {
  minutes.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const option = document.createElement("option");
    option.textContent = i.toString().padStart(2, "0");
    option.value = i.toString().padStart(2, "0");
    minutes.append(option);
  }
}

function populateMeridiem() {
  meridiem.innerHTML = "";
  for (const period of ["AM", "PM"]) {
    const option = document.createElement("option");
    option.textContent = period;
    option.value = period;
    meridiem.append(option);
  }
}

populateMonths();
populateYears(new Date().getFullYear(), new Date().getFullYear() + 2);
populateHours();
populateMinutes();
populateMeridiem();

const currentDate = new Date();
populateDays(currentDate.getMonth() + 1, currentDate.getFullYear());

month.value = (currentDate.getMonth() + 1).toString().padStart(2, "0");
day.value = currentDate.getDate().toString().padStart(2, "0");
year.value = currentDate.getFullYear();
hours.value = (currentDate.getHours() % 12 || 12).toString().padStart(2, "0");
minutes.value = currentDate.getMinutes().toString().padStart(2, "0");
meridiem.value = currentDate.getHours() >= 12 ? "PM" : "AM";

month.addEventListener("change", () => {
  const selectedMonth = Number.parseInt(month.value, 10);
  const selectedYear = Number.parseInt(year.value, 10);
  populateDays(selectedMonth, selectedYear);
  day.value = "01"; // Reset day to the first day of the new month
});

year.addEventListener("change", () => {
  const selectedMonth = Number.parseInt(month.value, 10);
  const selectedYear = Number.parseInt(year.value, 10);
  populateDays(selectedMonth, selectedYear);
  day.value = "01"; // Reset day to the first day of the new year
});

// Ensure the number of people is within the allowed range
function validateNumberOfPeople() {
  let value = Number.parseInt(numberOfPeople.value, 10);
  if (Number.isNaN(value) || value < 2) {
    value = 2;
  } else if (value > 300) {
    value = 300;
  }
  numberOfPeople.value = value;
}

// Initialize the number of people input
validateNumberOfPeople();

minus.addEventListener("click", () => {
  let value = Number.parseInt(numberOfPeople.value, 10);
  if (Number.isNaN(value) || value <= 2) {
    value = 2;
  } else {
    value--;
  }
  numberOfPeople.value = value;
});

plus.addEventListener("click", () => {
  let value = Number.parseInt(numberOfPeople.value, 10);
  if (Number.isNaN(value) || value >= 300) {
    value = 300;
  } else {
    value++;
  }
  numberOfPeople.value = value;
});

// Validate the number of people input on change
numberOfPeople.addEventListener("change", validateNumberOfPeople);