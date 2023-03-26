const form = document.forms[0];
const resourceSelector = document.getElementById("resource");
const numberInput = document.getElementById("number");
const button = document.getElementById("button");
const containerDiv = document.getElementById("containerDiv");
const errorDiv = document.getElementById("errorDiv");
const loader = document.getElementById("loading");
const options = {
  people: "Человек",
  planets: "Планета",
  species: "Существо",
  starships: "Космический корабль",
  vehicles: "Другой вид транспорта",
};

document.addEventListener("DOMContentLoaded", () =>
  setDropdownOptions(options)
);

button.addEventListener("click", function (e) {
  e.preventDefault();

  containerDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  displayLoading();

  const requestData = {
    resource: resourceSelector.options[resourceSelector.selectedIndex].value,
    number: numberInput.value,
  };

  form.reset();

  fetch(`https://swapi.dev/api/${requestData.resource}/${requestData.number}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Такого элемента нет в базе данных");
      } else if (!requestData.number) {
        throw new Error("Вы не ввели номер элемента");
      }
      return response.json();
    })
    .then((item) => {
      hideLoading();
      const foundItem = document.createElement("p");
      foundItem.className = "found-item";
      foundItem.innerHTML = `${options[requestData.resource]} под номером ${
        requestData.number
      } — это ${item.name}.`;
      containerDiv.appendChild(foundItem);
    })
    .catch((error) => {
      hideLoading();
      const errorMessage = document.createElement("p");
      errorMessage.className = "error-message";
      errorMessage.innerHTML = `<p>Извините, мы ничего не нашли! ${error.message}.</p><p>Попробуйте ещё раз!</p>`;
      errorDiv.appendChild(errorMessage);
    });
});

function setDropdownOptions(x) {
  for (let i in x) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = x[i];
    resourceSelector.appendChild(opt);
  }
}

function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}
