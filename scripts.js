const spoolcostInput = document.querySelector("#spoolcost-input");
const spoolweightInput = document.querySelector("#spoolweight-input");
const filamentlengthInput = document.querySelector("#filamentlength-input");
const filamentweightInput = document.querySelector("#filamentweight-input");
const diameterSelect = document.querySelector("#diameter-select");
const materialSelect = document.querySelector("#material-select");
const printcostInput = document.querySelector("#printcost-input");

spoolcostInput.addEventListener("input", handleCost);
