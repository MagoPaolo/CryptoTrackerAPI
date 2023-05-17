async function fetchTrending() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en");
    const trending = await response.json();

    document.getElementById("coinName").innerHTML = trending[0].name
    document.getElementById("coinRank").innerHTML = trending[0].market_cap_rank
    document.getElementById("coinPrice").innerHTML = trending[0].current_price
    document.getElementById("coinPercentage").innerHTML = trending[0].price_change_percentage_24h
    document.getElementById("coinImg").src = trending[0].image
}