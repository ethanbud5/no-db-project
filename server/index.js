var express = require("express");
var {json} = require("body-parser");
var cors = require("cors");
var {getCustomers,findCustomer} = require("./controllers/customerCtrl")

var app = express();

app.use(json());
app.use(cors());
// app.use(express.static(__dirname+"/../public"))

app.get("/api/customers",getCustomers);
app.get("/api/customers/search/",findCustomer)


app.listen(3001,()=>{
    console.log("I'm listening!")
})