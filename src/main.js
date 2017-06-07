'use strict';

import { wallet } from "./currencies";
import { constantes } from "./constantes";
import axios from "axios";
import * as view from "./view";

const getCurrenciesValue = () => {
    axios.get(constantes.API_COINMARKETCAP_ALL_NEX, {})
        .then(function(response) {
            const BTCMap = getBTC(response.data, wallet);
            const USDMap = getUSD(response.data, BTCMap);
            const USD = getSum(USDMap);
            view.createTable(BTCMap, USDMap);
            view.displayTotal(USD);

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

const getUSD = (data, BTCMap) => {
    const USD = {};
    for (let currency in BTCMap) {
        let USDValue = data[currency].price.usd * BTCMap[currency];
        USD[currency] = USDValue;
    }
    return USD;
}

const getSum = (USDMap) => {
    return Object.keys(USDMap).reduce((total, c) => {
        return total + USDMap[c];
    }, 0);
}

getCurrenciesValue();
setInterval(getCurrenciesValue, 5000);