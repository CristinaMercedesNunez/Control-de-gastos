// Se añaden las constantes que vamos a utilizar en las operaciones y que se declararon en el html
const saldo = document.getElementById("saldo");

const money_up = document.getElementById("money-up");

const money_down = document.getElementById("money-down");

const list = document.getElementById("list");

const form = document.getElementById("form");

const text = document.getElementById("text");

const amount = document.getElementById("amount");



//añadimos la operación 

function addoperacion(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "Introduzca el concepto";
    amount.placeholder = "Introduzca la cantidad";
  } else {
    const operacion = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };

    operaciones.push(operacion);
    addoperacionDOM(operacion);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

function genenrateID() {
  return Math.floor(Math.random() * max);
}


function addoperacionDOM(operacion) {

  const sign = operacion.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
 
  item.classList.add(operacion.amount < 0 ? "down" : "up");
  item.innerHTML = `${operacion.text} <span>${sign}${Math.abs(
    operacion.amount
  )}</span> <button class="delete-boton" onclick="removeoperacion(${
    operacion.id
  })">x</button>`;
  list.appendChild(item);
}

//actualizamos los valores que se han ido añadiendo
function updateValues() {
  const amounts = operaciones.map((operacion) => operacion.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(3);
  const ingresos = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(3);
  const gastos = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(3);

  saldo.innerText = `$${total}`;
  money_up.innerText = `$${ingresos}`;
  money_down.innerText = `$${gastos}`;
}

// Para eliminar la operación
function removeoperacion(id) {
  operaciones = operaciones.filter((operacion) => operacion.id !== id);
  init();
}

function init() {
  list.innerHTML = "";
  operaciones.forEach(addoperacionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addoperacion);
