'use strict';

module.exports = {

    createTable: (BTCMap, USDMap) => {
        var table = document.getElementById("table");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        var node = document.createElement("tr");
        document.getElementById("table").appendChild(node);
        //Header
        var nodeTh = document.createElement("th");
        nodeTh.appendChild(document.createTextNode(""));
        node.appendChild(nodeTh);

        var nodeTh = document.createElement("th");
        nodeTh.appendChild(document.createTextNode("BTC value"));
        node.appendChild(nodeTh);

        var nodeTh = document.createElement("th");
        nodeTh.appendChild(document.createTextNode("Dollar value"));
        node.appendChild(nodeTh);

        Object.keys(BTCMap).forEach((key) => {
            var node = document.createElement("tr");
            document.getElementById("table").appendChild(node);

            //Currency name 
            var nodeTd = document.createElement("td");
            // var text = document.createTextNode(key);
            nodeTd.appendChild(document.createTextNode(key));
            node.appendChild(nodeTd);

            //BTC value
            var nodeTd = document.createElement("td");
            var text = document.createTextNode(Math.round(BTCMap[key] * 1000) / 1000);
            nodeTd.appendChild(text);
            node.appendChild(nodeTd);

            //USD value
            var nodeTd = document.createElement("td");
            var text = document.createTextNode(Math.round(USDMap[key]) + " $");
            nodeTd.appendChild(text);
            node.appendChild(nodeTd);
        });
        // var node = document.createElement("tr");
        // document.getElementById("table").appendChild(node);
        // nodeTh.appendChild(document.createTextNode("Total"));
        // node.appendChild(nodeTh);
    },

    displayTotal: (USD) => {
        document.getElementById("total_dol").innerHTML = "Total : " + Math.round(USD) + " $";
    },
}