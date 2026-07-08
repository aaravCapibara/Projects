var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  btc.innerHTML = response.bitcoin.usd.toFixed(2);
  eth.innerHTML = response.ethereum.usd.toFixed(2);
  doge.innerHTML = response.dogecoin.usd.toFixed(4);
}).fail(function () {
  console.log("Failed to fetch prices. Check your internet connection or try again later.");
  btc.innerHTML = "N/A";
  eth.innerHTML = "N/A";
  doge.innerHTML = "N/A";
});