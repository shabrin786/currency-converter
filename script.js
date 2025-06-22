const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.6.15/v1/currencies";


let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

for (select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase()
    let url = `${Base_URL}/${from}.json`;
        try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data[from][to];
        let finalAmount = (amtVal * rate).toFixed(2);

        document.querySelector(".msg").innerText = 
            `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        document.querySelector(".msg").innerText = "Error fetching data.";
        console.error(error);
    }
});