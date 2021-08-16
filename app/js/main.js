// fetch('https://www.cbr-xml-daily.ru/daily_json.js')
// .then(function(res) {
//    return res.json();
// }).then(function(data) {
//    console.log(data);
// })

const rates = {
   "RUB": {
      "ID": "0000",
      "NumCode": "0000",
      "CharCode": "RUB",
      "Nominal": 1,
      "Name": "Росийский рубль",
      "Value": "rubValue",
      "Previous": "rubPrevious",
      }
   }

   const inputField = document.querySelector('#input');
   const resultField = document.querySelector('#result');
   const selectField = document.querySelector('#select');
   const outputValue = selectField.value;
   let inputCurrencyName = document.querySelector('option').getAttribute('data-input-value'); //'UAH' по умолчанию
   console.log(inputCurrencyName);
   let outputCurrencyName = document.querySelector('option').getAttribute('value'); 
   console.log(outputCurrencyName);


   const elementUSD = document.querySelector('[data-value="USD"]');
   const elementEUR = document.querySelector('[data-value="EUR"]');
   const elementGBP = document.querySelector('[data-value="GBP"]');
   
getCurrencies();


async function getCurrencies()   {
   const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
   const result = await response.json();
   const data = await result;
   const rubValue = data.Valute.UAH.Value / data.Valute.UAH.Nominal;//Вычисление значений рубля отталкиваясь от курса ГРН
   const rubPrevious = data.Valute.UAH.Previous / data.Valute.UAH.Nominal;

   rates.UAH = data.Valute.UAH;

   rates.RUB.Value = rubValue;//Установка значений рубля отталкиваясь от курса ГРН
   rates.RUB.Previous = rubPrevious;

   rates.USD = data.Valute.USD;
   rates.EUR = data.Valute.EUR;
   rates.GBP = data.Valute.GBP;
   rates.TRY = data.Valute.TRY;
   console.log(rates.USD);
   elementUSD.textContent = (rates.USD.Value / rubValue ).toFixed(2);
   elementGBP.textContent = (rates.GBP.Value / rubValue ).toFixed(2);
   elementEUR.textContent = (rates.EUR.Value/ rubValue ).toFixed(2);
   //Цвет для информера USD
   if (rates.USD.Value > rates.USD.Previous) {
      elementUSD.classList.add('top');
   } else {
      elementUSD.classList.add('bottom');
   }

   //Цвет для информера EUR
   if (rates.EUR.Value > rates.EUR.Previous) {
      elementEUR.classList.add('top');
   } else {
      elementEUR.classList.add('bottom');
   }

   //Цвет для информера GBP
   if (rates.GBP.Value > rates.GBP.Previous) {
      elementGBP.classList.add('top');
   } else {
      elementGBP.classList.add('bottom');
   }
}


inputField.oninput = function() {
   resultField.value = (parseFloat(inputField.value) * rates.RUB.Value / (rates[select.value].Value / rates[select.value].Nominal)).toFixed(2);
   console.log(rates.USD.Value);
}
select.oninput = function() {
   resultField.value = (parseFloat(inputField.value) * rates.RUB.Value / (rates[select.value].Value / rates[select.value].Nominal)).toFixed(2);
   console.log(rates.USD.Value);
}

// console.log(input);

// (Value / Nominal) /  (Value / Nominal)
// (27.5\10) \ (73.5\1) = 
// (73.5\1) \(27.5\10) = 26.7
// // "USD": {
//    "ID": "R01235",
//    "NumCode": "840",
//    "CharCode": "USD",
//    "Nominal": 1,
//    "Name": "Доллар США",
//    "Value": 73.4721,
//    "Previous": 73.5671

// "ID": "R01720",
//    "NumCode": "980",
//    "CharCode": "UAH",
//    "Nominal": 10,
//    "Name": "Украинских гривен",
//    "Value": 27.5372,