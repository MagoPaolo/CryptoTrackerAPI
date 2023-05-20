async function fetchData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=24h%2C7d%2C30d&locale=en");
    const dataAPI = await response.json();
    assignTrending(dataAPI);
    assignTable(dataAPI);
}


function assignTrending(dataAPI) {
    for (let i = 1; i < 6; i++) {
        document.getElementById("trendingLink" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("trendingName" + i).innerHTML = dataAPI[i - 1].name
        document.getElementById("trendingPrice" + i).innerHTML = "$" + dataAPI[i - 1].current_price.toString().slice(0, 7)
        document.getElementById("trendingImg" + i).src = dataAPI[i - 1].image
        if (dataAPI[i - 1].price_change_percentage_24h >= 0) {
            document.getElementById("trendingChangeP" + i).innerHTML = "+" + dataAPI[i - 1].price_change_percentage_24h.toFixed(2) + " %"
            document.getElementById("trendingChangeP" + i).style.color = "#00BF00"
        } else {
            document.getElementById("trendingChangeP" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h.toFixed(2) + " %"
            document.getElementById("trendingChangeP" + i).style.color = "#BF0413"
        }
    }
}

function assignTable(dataAPI) {
    for (let i = 1; i < 26; i++) {
        document.getElementById("tableRank" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("tableRank" + i).innerHTML = dataAPI[i - 1].market_cap_rank
        document.getElementById("tableRank" + i).style.fontWeight = "600"
        document.getElementById("tableImgLink" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("tableImg" + i).src = dataAPI[i - 1].image
        document.getElementById("tableName" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("tableName" + i).innerHTML = dataAPI[i - 1].name
        document.getElementById("tableName" + i).style.fontWeight = "600"
        document.getElementById("tablePrice" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("tablePrice" + i).innerHTML = "$" + dataAPI[i - 1].current_price.toString().slice(0, 7)
        document.getElementById("tableMarketcap" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("tableMarketcap" + i).innerHTML = "$" + dataAPI[i - 1].market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })
        if (dataAPI[i - 1].price_change_percentage_24h_in_currency >= 0) {
            
            document.getElementById("table24P" + i).innerHTML = "+" + dataAPI[i - 1].price_change_percentage_24h_in_currency.toFixed(2) + "%"
            document.getElementById("table24P" + i).style.color = "#00BF00"
        } else {
            document.getElementById("table24P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h_in_currency.toFixed(2) + "%"
            document.getElementById("table24P" + i).style.color = "#BF0413"
        }
        if (dataAPI[i - 1].price_change_percentage_7d_in_currency >= 0) {
            document.getElementById("table7P" + i).innerHTML = "+" + dataAPI[i - 1].price_change_percentage_7d_in_currency.toFixed(2) + "%"
            document.getElementById("table7P" + i).style.color = "#00BF00"
        } else {
            document.getElementById("table7P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h_in_currency.toFixed(2) + "%"
            document.getElementById("table7P" + i).style.color = "#BF0413"
        }
        if (dataAPI[i - 1].price_change_percentage_30d_in_currency >= 0) {
            document.getElementById("table30P" + i).innerHTML = "+" + dataAPI[i - 1].price_change_percentage_30d_in_currency.toFixed(2) + "%"
            document.getElementById("table30P" + i).style.color = "#00BF00"
        } else {
            document.getElementById("table30P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h_in_currency.toFixed(2) + "%"
            document.getElementById("table30P" + i).style.color = "#BF0413"
        }
        document.getElementById("table24P" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("table7P" + i).href = "coin.html?" + dataAPI[i - 1].id
        document.getElementById("table30P" + i).href = "coin.html?" + dataAPI[i - 1].id
        sparklineGenerator(dataAPI[i - 1], i)
    }
}

function sparklineGenerator(dataAPI, n) {
    const valori = dataAPI.sparkline_in_7d.price
    let days = []
    for (let i = 1; i < valori.length; i++) {
        if (i % 3 === 0) {
            days.push(i)
        }
    }
    const ctx = document.getElementById('tableSparkline' + n);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                data: valori,
                radius: 0,
            }]
        },
        options: {
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.2,
                    borderColor: '#acecff'
                }
            }
        }
    });
}

function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("coinTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}