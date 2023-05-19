async function fetchTrending() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en");
    const trending = await response.json();
    assignTrending(trending);
}

function assignTrending(trending) {
    for (let i = 1; i < 6; i++) {
        document.getElementById("trendingName" + i).innerHTML = trending[i-1].name
        document.getElementById("trendingPrice" + i).innerHTML = "$" + trending[i-1].current_price
        document.getElementById("trendingChangeP" + i).innerHTML = trending[i-1].price_change_percentage_24h.toFixed(2) + " %"
        document.getElementById("trendingImg" + i).src = trending[i-1].image
        if(trending[i-1].price_change_percentage_24h >= 0) {
            document.getElementById("trendingChangeP" + i).style.color = "#06ad00"
        } else {
            document.getElementById("trendingChangeP" + i).style.color = "#ad0000"
        }
    }
}