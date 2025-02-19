
const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


window.addEventListener("load", () =>{
  UpdateCurrency();

})


for(let select of dropdowns){
  for(currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }
    if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption)
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click",(evt) =>{
  evt.preventDefault();
  UpdateCurrency()
})

const UpdateCurrency = async () =>{
  let amt = document.querySelector("#amt");
  let amount = amt.value;
  if(amount === '' || amount < 1){
    amount=1;
    amt.value="1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json()
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  let finalAmount = amount * rate;

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;




}
