const BASE_URL  = "https://api.currencyapi.com/v3/latest?apikey=cur_live_Y7sRihe98NkGBvtFAzZAjK65YrBulkBj0MMAptD7";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const to_currency = document.querySelectorAll("#to-currency");
let newSrc;
let img;



for(let select of dropdown){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = " selected ";
        } else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };

  btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval<1){
        amtval = 1;
        amount.value = "1";
    }

   // console.log(fromcurr.value, tocurr.value);
   const URL = BASE_URL;
   let response = await fetch(URL);
   let data = await response.json();
   let curr = (tocurr.value);
   console.log(curr);
   let rate = data.data.AED.value;    // error creating line
   console.log(rate);

   let finalamount = amtval * rate;
   msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
   
  })

  