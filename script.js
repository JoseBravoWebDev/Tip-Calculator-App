"use strict";

const amountInput = document.getElementById("amount");
const percentageInput = document.getElementById('percentage');
const peopleInput = document.getElementById("number-people");

const numberInputs = document.querySelectorAll('input[type="number"]');
const percentageBtns = document.querySelectorAll('.percentage-btn');
const radioInputs = document.querySelectorAll('input[type="radio"]');

const errorText = document.querySelector(".error-text");

let amount = "";
let tipPercentage = "";
let numberPeople = "";

////////////////////////////////////////////////////////////////////////////

const inputBorder = (input)=> {
	const label = input.closest(".label");
	input.addEventListener("focus",()=> {
   		if (label) label.style.outline = "1px solid var(--primary)";
	});

	input.addEventListener("blur",()=> {
   		if (label) label.style.outline = "none";
	});
};
inputBorder(amountInput);
inputBorder(peopleInput);

percentageInput.addEventListener("focus",()=> {
   	if (percentageInput) percentageInput.style.outline = "1px solid var(--primary)";
});

percentageInput.addEventListener("blur",()=> {
   	if (percentageInput) percentageInput.style.outline = "none";
});


////////////////////////////////////////////////////////////////////////////

amountInput.addEventListener("input", ()=> {
	let value = amountInput.value;
	amount = value;
	calculateTip();
});

percentageInput.addEventListener("input", ()=> {
	let value = percentageInput.value;
	tipPercentage = value;
	calculateTip();
});

peopleInput.addEventListener("input",()=> {
	let value = peopleInput.value;

	const label = peopleInput.closest(".label");
	if (value == "0") {			
		errorText.style.display = "block";
		errorText.style.transition = "0.5s ease";

		label.style.outline ="1px solid indianred"
	} else {
		errorText.style.display = "none";
		label.style.outline = "1px solid var(--primary)";
	}

  	numberPeople = value;
  	calculateTip();
});

////////////////////////////////////////////////////////////////////////////

percentageBtns.forEach((percentBtn)=> {
	const radio = percentBtn.querySelector('input[type="radio"]');

	percentBtn.addEventListener("mouseover", ()=> {
  		percentBtn.classList.add("hover");
	});

	percentBtn.addEventListener("mouseout", ()=> {
  		percentBtn.classList.remove("hover");
	});

	percentBtn.addEventListener("click",(e)=> {
		percentageInput.value = null;
		radio.checked = true;

    	radioInputs.forEach((radio)=> {
    		const parent = radio.parentNode;
			if (radio.checked) {
      			parent.classList.add("selected");

    		} else {
      			parent.classList.remove("selected");
    		}
    	});

    	tipPercentage = radio.value;
		calculateTip();
	});
});


percentageInput.addEventListener("focus",()=> {
	radioInputs.forEach((radio)=> {
		radio.checked = false;
  	});

  	percentageBtns.forEach((percentageBtn)=> {
    	percentageBtn.classList.remove("selected");
  	});
});

////////////////////////////////////////////////////////////////////////////

const tipResult = document.querySelector(".tip-amount");
const totalResult = document.querySelector(".total-amount");

const calculateTip = ()=> {  
	let amountNumber = parseFloat(amount);
  	let percentageNumber = parseFloat(tipPercentage);
  	let peopleNumber = parseInt(numberPeople);

  	if (!isNaN(amountNumber) && !isNaN(percentageNumber) && peopleNumber > 0) {
    	let tipPerPerson = (amountNumber * percentageNumber / 100) / peopleNumber;
    	let totalPerPerson = (amountNumber + (amountNumber * percentageNumber / 100)) / peopleNumber;
    
    	tipResult.textContent = `$${tipPerPerson.toFixed(2)}`;
    	totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;

  	} else {
    	tipResult.textContent = `$0.00`;
    	totalResult.textContent = `$0.00`;
  	}
}

////////////////////////////////////////////////////////////////////////////

const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener("click",(e)=> {
	e.preventDefault();
	amountInput.value = null;
	percentageInput.value = null;
	peopleInput.value = null;

	radioInputs.forEach((radio)=> {
		radio.checked = false;
  	});

  	percentageBtns.forEach((percentageBtn)=> {
    	percentageBtn.classList.remove("selected");
  	});

  	tipResult.textContent = `$0.00`;
    totalResult.textContent = `$0.00`;

    amount = "";
    tipPercentage = "";
    numberPeople = "";
});