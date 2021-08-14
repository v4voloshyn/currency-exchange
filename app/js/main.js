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
      "Previous": "rubPrevious"
      }
   }
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
   console.log(rates);
}


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