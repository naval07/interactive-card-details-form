const givenInfo = new URLSearchParams(window.location.search);

givenInfo.forEach((value, key) => {
    if (key == "cardholder-name"){
        const cardName = document.getElementById("on-card-cardholder-name");
        cardName.innerHTML = value;
    }
    if (key == "card-number") {
        const cardNum = document.getElementById("on-card-number");
        cardNum.innerHTML = value;
    }
    if (key == "exp-date-month"){
        const cardExpDate = document.getElementById("on-card-expiration-date");
        cardExpDate.innerHTML = value + '/';
    }
    if (key == "exp-date-year") {
        const cardExpDate = document.getElementById("on-card-expiration-date");
        cardExpDate.innerHTML += value;
    }
    if (key == "cvc-number") {
        const cardCvc = document.getElementById("on-card-cvc-number");
        cardCvc.innerHTML = value;
    }
})