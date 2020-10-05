const spoolcostInput = document.querySelector("#spoolcost-input");
const spoolweightInput = document.querySelector("#spoolweight-input");
const filamentlengthInput = document.querySelector("#filamentlength-input");
const printweightInput = document.querySelector("#printweight-input");
const diameterSelect = document.querySelector("#diameter-select");
const materialSelect = document.querySelector("#material-select");
const printcostInput = document.querySelector("#printcost-input");

spoolcostInput.addEventListener("input", handleCost);
spoolweightInput.addEventListener("input", handleCost);
printweightInput.addEventListener("input", handleCost);

filamentlengthInput.addEventListener("input", getWeight);

printcostInput.addEventListener("input", getWeightFromCost);

printweightInput.addEventListener("input", getLength);
diameterSelect.addEventListener("input", getLength);
materialSelect.addEventListener("input", getLength);

function handleCost() {
  spoolcostInput.value = +spoolcostInput.value;
  spoolweightInput.value = +spoolweightInput.value;
  printweightInput.value = +printweightInput.value;
  let spoolCost = parseFloat(spoolcostInput.value);
  let spoolWeight = parseInt(spoolweightInput.value);
  let printWeight = parseFloat(printweightInput.value);

  if (spoolCost < 0 || isNaN(spoolCost)) {
    spoolcostInput.value = 0;
    spoolCost = 0;
  }
  if (spoolWeight < 0 || isNaN(spoolWeight)) {
    spoolweightInput.value = 0;
    spoolWeight = 0;
  }
  if (printWeight < 0 || isNaN(printWeight)) {
    printweightInput.value = 0;
    printWeight = 0;
  }

  const printCost = (spoolCost / spoolWeight) * printWeight;
  if (isNaN(printCost) || printCost === Infinity) {
    printcostInput.value = 0;
  } else {
    printcostInput.value = printCost.toFixed(2);
  }
}

function getWeight() {
  filamentlengthInput.value = +filamentlengthInput.value;
  let filamentLength = parseFloat(filamentlengthInput.value);
  const diameter = parseFloat(diameterSelect.value);
  const material = parseFloat(materialSelect.value);

  if (filamentLength < 0 || isNaN(filamentLength)) {
    filamentlengthInput.value = 0;
    filamentLength = 0;
  }

  const volume = Math.PI * (diameter / 2) ** 2 * filamentLength;
  const weight = volume * material;
  printweightInput.value = parseInt(weight);
  handleCost();
}

function getWeightFromCost() {
  printcostInput.value = +printcostInput.value;
  let printCost = parseFloat(printcostInput.value);
  const spoolCost = parseFloat(spoolcostInput.value);
  const spoolWeight = parseInt(spoolweightInput.value);

  if (printCost < 0 || isNaN(printCost)) {
    printcostInput.value = 0;
    printCost = 0;
  }

  const printWeight = printCost / (spoolCost / spoolWeight);
  printweightInput.value = parseInt(printWeight);

  getLength();
}

function getLength() {
  let weight = parseInt(printweightInput.value);
  const diameter = parseFloat(diameterSelect.value);
  const material = parseFloat(materialSelect.value);

  if (weight < 0 || isNaN(weight)) {
    printweightInput.value = 0;
    weight = 0;
  }

  const volume = weight / material;
  const length = volume / (Math.PI * (diameter / 2) ** 2);
  filamentlengthInput.value = length.toFixed(2);
}
