const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const button = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr =document.querySelector(".from select");
const tocurr =document.querySelector(".to select");
const msg =document.querySelector(".msg");
//for (country in countryList) {
   // console.log(countryList[country]);}

for (let select of dropdowns) {
for (currencycode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currencycode;
    newoption.value = currencycode;
    if(select.name ==="from" && currencycode ==="USD"){
        newoption.selected ="selected";
    } else if(select.name ==="to" && currencycode ==="INR"){
        newoption.selected ="selected";
    }
    select.append(newoption);
}
select.addEventListener("change",(evt) =>{
    updateflag(evt.target);
})
}
const updateflag = (element) =>{

    let currcode = element.value;
    let countrycode = countryList[currcode];
    
    let newsrc =`https://flagsapi.com/${countryList[currcode]}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};


button.addEventListener("click", async (evt)=> {
    evt.preventDefault();

let amount =document.querySelector(".amount input")
let amtval = amount.value;
if(amtval ==="" || amtval < 1){
    amtval = 1;
    amount.value = "1";

}
console.log(fromcurr.value,tocurr.value);
const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;



let response = await fetch(URL);
let data = await response.json();

// API structure: { "usd": { "inr": 83.1, "eur": 0.92, ... } }
let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

console.log(rate);
let finalamount = amtval * rate;
msg.innerText =`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`

});
 