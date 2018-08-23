var products = require("faker");

console.log("Buy somethin' will ya?");
console.log("======================");
for (var i = 0; i < 10; i++){
    console.log(products.fake("{{commerce.productAdjective}} {{commerce.product}} -  ${{commerce.price}}"));
}

