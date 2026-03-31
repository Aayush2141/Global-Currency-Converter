function convert() {
  var amount = document.getElementById("amount").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var loading = document.getElementById("loading");
  var result = document.getElementById("result");

  loading.innerText = "Loading...";
  result.innerText = "";

  fetch("https://api.exchangerate-api.com/v4/latest/" + from).then((x)=>x.json())
    .then((data)=>{
      var rate = data.rates[to];
      var final = amount * rate;
      loading.innerText = "";
      result.innerText = final + " " + to;
    })
    .catch(()=>{
      loading.innerText = "";
      result.innerText = "Error";
    });
}