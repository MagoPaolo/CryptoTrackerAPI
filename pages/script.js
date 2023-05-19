async function fetchData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h%2C7d%2C30d&locale=en");
    const dataAPI = await response.json();
    assignTrending(dataAPI);
    assignTable(dataAPI);
}

function assignTrending(dataAPI) {
    for (let i = 1; i < 6; i++) {
        document.getElementById("trendingName" + i).innerHTML = dataAPI[i - 1].name
        document.getElementById("trendingPrice" + i).innerHTML = "$" + dataAPI[i - 1].current_price
        document.getElementById("trendingChangeP" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h.toFixed(2) + " %"
        document.getElementById("trendingImg" + i).src = dataAPI[i - 1].image
        if (dataAPI[i - 1].price_change_percentage_24h >= 0) {
            document.getElementById("trendingChangeP" + i).style.color = "#06ad00"
        } else {
            document.getElementById("trendingChangeP" + i).style.color = "#ad0000"
        }
    }
}

function assignTable(dataAPI) {
    for (let i = 1; i < 4; i++) {
        document.getElementById("tableRank" + i).innerHTML = dataAPI[i - 1].market_cap_rank
        document.getElementById("tableName" + i).innerHTML = dataAPI[i - 1].name
        document.getElementById("tablePrice" + i).innerHTML = "$" + dataAPI[i - 1].current_price
        document.getElementById("table24P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_24h_in_currency.toFixed(2) + " %"
        document.getElementById("table7P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_7d_in_currency.toFixed(2) + " %"
        document.getElementById("table30P" + i).innerHTML = dataAPI[i - 1].price_change_percentage_30d_in_currency.toFixed(2) + " %"
        document.getElementById("tableMarketcap" + i).innerHTML = "$" + dataAPI[i - 1].market_cap
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
    console.log(days)
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
                    borderColor: '#111'
                }
            }
        }
    });

}