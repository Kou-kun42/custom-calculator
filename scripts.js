// Getting selectors for the inputs
const spoolcostInput = document.querySelector("#spoolcost-input");
const spoolweightInput = document.querySelector("#spoolweight-input");
const filamentcolorInput = document.querySelector("#filamentcolor-input");
const filamentlengthInput = document.querySelector("#filamentlength-input");
const printweightInput = document.querySelector("#printweight-input");
const diameterSelect = document.querySelector("#diameter-select");
const materialSelect = document.querySelector("#material-select");
const printcostInput = document.querySelector("#printcost-input");

// Event Listeners for handleCost()
spoolcostInput.addEventListener("input", handleCost);
spoolweightInput.addEventListener("input", handleCost);
printweightInput.addEventListener("input", handleCost);

// Event Listener for getWeight()
filamentlengthInput.addEventListener("input", getWeight);

// Event Listener for getWeightFromCost()
printcostInput.addEventListener("input", getWeightFromCost);

// Event Listener for getLength()
printweightInput.addEventListener("input", getLength);
diameterSelect.addEventListener("input", getLength);
materialSelect.addEventListener("input", getLength);

// Event Listener for changeColor()
filamentcolorInput.addEventListener("input", changeColor);

// Calculates print cost whenever spool cost, spool weight, or print weight are changed
function handleCost() {
  // Gets rid of leading 0
  spoolcostInput.value = +spoolcostInput.value;
  spoolweightInput.value = +spoolweightInput.value;
  printweightInput.value = +printweightInput.value;
  // Assigns local variables
  let spoolCost = parseFloat(spoolcostInput.value);
  let spoolWeight = parseInt(spoolweightInput.value);
  let printWeight = parseFloat(printweightInput.value);

  // Covers cases if negatives or non numbers are input
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

  // Calculates print cost
  const printCost = (spoolCost / spoolWeight) * printWeight;

  // Sets new print cost value.  If function is used in case spool weight is set to 0
  if (isNaN(printCost) || printCost === Infinity) {
    printcostInput.value = 0;
  } else {
    printcostInput.value = printCost.toFixed(2);
  }
}

// Calculates new print weight whenever a new length is input
function getWeight() {
  // Gets rid of leading 0
  filamentlengthInput.value = +filamentlengthInput.value;
  // Assigns local variables
  let filamentLength = parseFloat(filamentlengthInput.value);
  const diameter = parseFloat(diameterSelect.value);
  const material = parseFloat(materialSelect.value);

  // Covers cases if negatives or non numbers are input
  if (filamentLength < 0 || isNaN(filamentLength)) {
    filamentlengthInput.value = 0;
    filamentLength = 0;
  }

  // Calculates new volume of filament to be printed
  const volume = Math.PI * (diameter / 2) ** 2 * filamentLength;
  // Calculates new weight using the material density
  const weight = volume * material;
  // Sets new weight value
  printweightInput.value = parseInt(weight);

  // Calls handleCost() to update the cost to reflect the new weight
  handleCost();
}

// Calculates the new weight if a print cost is input
function getWeightFromCost() {
  // Gets rid of leading 0
  printcostInput.value = +printcostInput.value;
  // Assigns local variables
  let printCost = parseFloat(printcostInput.value);
  const spoolCost = parseFloat(spoolcostInput.value);
  const spoolWeight = parseInt(spoolweightInput.value);

  // Covers cases if negatives or non numbers are input
  if (printCost < 0 || isNaN(printCost)) {
    printcostInput.value = 0;
    printCost = 0;
  }

  // Calculates new print weight
  const printWeight = printCost / (spoolCost / spoolWeight);
  // Sets new weight value
  printweightInput.value = parseInt(printWeight);

  // Calls getLength() to update the length of filament to match the new weight
  getLength();
}

// Calculates new length of filament to be printed if the print weight, material type, or material diameter is changed
function getLength() {
  // Assigns local variables
  let weight = parseInt(printweightInput.value);
  const diameter = parseFloat(diameterSelect.value);
  const material = parseFloat(materialSelect.value);

  // Covers cases if negatives or non numbers are input
  if (weight < 0 || isNaN(weight)) {
    printweightInput.value = 0;
    weight = 0;
  }

  // Calculates volume using print weight and material density
  const volume = weight / material;
  // Calculates the new length using the volume and diameter of filament
  const length = volume / (Math.PI * (diameter / 2) ** 2);
  // Sets new length value
  filamentlengthInput.value = length.toFixed(2);
}

function changeColor() {
  // Assigns local variables
  const filamentcolor = filamentcolorInput.value;
  const background = document.querySelector("#inputs");

  background.style.backgroundColor = filamentcolor;
}
