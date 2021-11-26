// Алгоритм
// 1. Получить json файл
// 2. Преобразовать json в javascript объект
// 3. В объекте получить информацию из value
// 4. отобразить на странице
// 5. отслеживать данные введенные в инпут и отслеживать select
// 6. еонвертировать данные при их изменении

// объект с курсами трех валют
const rates = {};

// элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// элементы формы, ввод суммы, выбор валют, поле с результатом
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

// Запуск функции получения курса валют и отображения на странице
getCurrencies();

// функция получения курса валют и отображения на странице
async function getCurrencies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js"); // в const respons записать значение fetch после получения данных
  const data = await response.json();
  const result = await data;

  rates.USD = result.Valute.USD;
  rates.EUR = result.Valute.EUR;
  rates.GBP = result.Valute.GBP;

  console.log(rates);

  elementUSD.textContent = rates.USD.Value.toFixed(2);
  elementEUR.textContent = rates.EUR.Value.toFixed(2);
  elementGBP.textContent = rates.GBP.Value.toFixed(2);

  // Цвет для информера USD
  if (rates.USD.Value > rates.USD.Previos) {
    // если сегодняшняя больше чем предыдуща, то
    elementUSD.classList.add("top");
  } else {
    elementUSD.classList.add("bottom");
  }

  // Цвет для информера EUR
  if (rates.EUR.Value > rates.EUR.Previos) {
    // если сегодняшняя больше чем предыдуща, то
    elementEUR.classList.add("top");
  } else {
    elementEUR.classList.add("bottom");
  }

  // Цвет для информера GBP
  if (rates.GBP.Value > rates.GBP.Previos) {
    // если сегодняшняя больше чем предыдуща, то
    elementGBP.classList.add("top");
  } else {
    elementGBP.classList.add("bottom");
  }
}

// слушатель изменения в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

// функция конвертации
function convertValue() {
  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(
    2
  );
}
