const URL = "https://www.cbr-xml-daily.ru/daily_json.js";
var currencies = [];
var timestamps = [];

// Fetching currencies list via GET-request
fetch(URL)
    .then((res) => res.json())
    .then(function (data) {
        timestamps = [data.Date, data.PreviousDate];
        currencies = Object.values(data.Valute);
        initCurrenciesList(timestamps, currencies);
    })
    .catch((error) => {
        document.getElementsByClassName("error-message")[0].classList.remove('inactive');
        console.error(`Ошибка HTTP: ${error}`);
    })

function initCurrenciesList() {
    let list = document.getElementsByClassName("currencies-list")[0];
    
    if (currencies) {
        list.classList.remove('inactive');
    }

    list.addEventListener('change', onCurrencySelect);

    currencies.map((currency) => {
        let child = document.createElement("option");
        child.value = currency.ID;
        child.innerHTML = `${currency.ID} - ${currency.Name}`;
        list.appendChild(child);
    })
}

function onCurrencySelect(event) {
    let ID = event.target.value;
    let currency;
    if (ID) {
        currency = currencies.find((element) => element.ID == ID);
    } else {
        currency = null;
    }
    showCurrencyInfo(currency);
    event.preventDefault();
}

function showCurrencyInfo(currency) {
    let infoBox = document.getElementsByClassName('currency-info')[0];
    if (currency) {
        infoBox.classList.remove('inactive');
        document.getElementsByClassName('currency-label')[0].innerHTML = `${currency.ID} - ${currency.Name} (${currency.CharCode}).`;
        document.getElementsByClassName('currency-value')[0].innerHTML = `${getDateString(timestamps[0])} - ${currency.Value}`;
        document.getElementsByClassName('currency-value prev')[0].innerHTML = `${getDateString(timestamps[1])} - ${currency.Previous}`;
    } else {
        infoBox.classList.add('inactive');
    }
}

function getDateString(timestamp) {
    let date = new Date(timestamp).toLocaleDateString('en-GB');
    let time = new Date(timestamp).toLocaleTimeString();
    return `${date}, ${time}`;
}