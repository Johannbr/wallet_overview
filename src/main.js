'use strict';

import { wallet } from "./currencies";
import { constantes } from "./constantes";
import axios from "axios";
import * as view from "./view";

const getCurrenciesValue = () => {
    axios.get(constantes.API_COINMARKETCAP_ALL_NEX, {})
        .then(function(response) {
            const BTCMap = getBTC(response.data, wallet);
            const USDMap = getUSD(response.data, wallet);
            const EURMap = getEUR(response.data, wallet);
            const USD = getSum(USDMap);
            const EUR = getSum(EURMap);
            view.createTable(BTCMap, USDMap, EURMap);
            view.displayTotal(USD, EUR);

        })
        .catch(function(error) {
            console.log(error);
        });
}

const getBTC = (data, currencies) => {
    const BTC = {};
    for (let currency in currencies) {
        let BTCValue = data[currency].price.btc * currencies[currency];
        BTC[currency] = BTCValue;
    }
    return BTC;
}

const getUSD = (data, currencies) => {
    const USD = {};
    for (let currency in currencies) {
        let USDValue = data[currency].price.usd * currencies[currency];
        USD[currency] = USDValue;
    }
    return USD;
}

const getEUR = (data, currencies) => {
    const EUR = {};
    for (let currency in currencies) {
        let EURValue = data[currency].price.eur * currencies[currency];
        EUR[currency] = EURValue;
    }
    return EUR;
}

const getSum = (USDMap) => {
    return Object.keys(USDMap).reduce((total, c) => {
        return total + USDMap[c];
    }, 0);
}
const getSumEur = (EURMap) => {
    return Object.keys(EURMap).reduce((total, c) => {
        return total + EURMap[c];
    }, 0);
}

getCurrenciesValue();
setInterval(getCurrenciesValue, 5000);