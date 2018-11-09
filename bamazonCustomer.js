var mysql = require("mysql");
var inquirer = require("inquirer");

var amount;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: '127.0.0.1',

  port: 3306,

  user: "root",
  password: "root",

  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "product", type: "list", message: "What product would you like to buy?",
            choices: function() {
                var choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                    // Create string with product name and price and push to choiceArray
                    var choice = "";
                    choice += results[i].product_name + " | $" + results[i].price
                    choiceArray.push(choice);
                }
                return choiceArray;
            }  
        }]).then(function(product){
            askAmount(product)
        })
    })
}

function askAmount(product){
    var product = product.product;
        productName = product.slice(0, product.indexOf(" |"))
//          Gets the exact product selected
    connection.query("SELECT * FROM products WHERE product_name = " + "'" + productName +"'",
        function(err, res) {
            if (err) throw err;
            // Show how many are left in stock
            stockQuantity = res[0].stock_quantity
            price = res[0].price
            console.log("There are : " + stockQuantity + " left in stock!")
// Ask how many customer would like to buy
            inquirer.prompt([{
                name: "amount", type: "input", message: "How many would you like to buy?", 
                validate: function(value) {
                    if (Number.isInteger(parseInt(value)) && value > 0) {return true}
                    else {return "You must enter a valid number!"}
                },
            }]).then(function(answer){
                amount = parseInt(answer.amount)
                confirm()
            })
        }
    )
}

function confirm(){
    
    console.log(amount)
    if (amount > stockQuantity) {
        console.log("Not enough in stock! Bringing you back to the menu...")
        start()
    }   else {
            inquirer.prompt([{
                name: "youSure", type: "list", choices: ["Buy", "Return to Menu"],
                message: function() {
                    var total = "Your total is: $" + (price * amount).toFixed(2)
                    return total
                }
            }]).then(function(answer){

                updateStock(answer.youSure)})
        }
}

function updateStock(youSure){
    console.log(youSure)
    console.log("Amount: " + amount)
    if (youSure === "Buy"){
        console.log("Cha-Ching!")
        var newQuantity = stockQuantity - amount
    connection.query("UPDATE products SET ? WHERE ?",
        [{stock_quantity: newQuantity},
        {product_name: productName}
        ], function(err){
        if (err) throw err
        })
        console.log("Returning to main menu...")
        start()
    } else{ start() }
    
}

