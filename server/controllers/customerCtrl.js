var axios = require("axios")
var id = 0;
var originalCustomers = [];
var copyOfCustomers = [];

function getCustomers(req,res){
    axios.get("https://randomuser.me/api/?results=5").then((response)=>{
        //console.log(response.data)
        originalCustomers = response.data.results;
        console.log(copyOfCustomers.length)
        if(copyOfCustomers.length <= 0){
            console.log("Adding to copy with new data.")
            copyOfCustomers = response.data.results;
        }
        res.status(200).json(copyOfCustomers)
    }).catch(err => res.status(500).send(err))
    
}
function findCustomer(req,res){
    let filteredCustomers = copyOfCustomers.filter(customer=>{
        let {first,last} = customer.name;
        return first.includes(req.query.name) || last.includes(req.query.name)
    })
    res.status(200).json(filteredCustomers);
}

module.exports = {
    getCustomers,
    findCustomer
}