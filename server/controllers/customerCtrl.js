var axios = require("axios")
var id = 0;
var originalCustomers = [];
var copyOfCustomers = [];

function getCustomers(req,res){
    axios.get("https://randomuser.me/api/?results=20&seed=6a80104f53071553").then((response)=>{
        //console.log(response.data)
        originalCustomers = response.data.results;
        console.log(copyOfCustomers.length)
        if(copyOfCustomers.length <= 0){
            copyOfCustomers = response.data.results.map(customer=>{
                let {first,last} = customer.name;
                //CHANGING ALL NAMES TO BEGIN WITH UPPERCASE
                customer.name.first = first.charAt(0).toUpperCase() + first.slice(1);
                customer.name.last = last.charAt(0).toUpperCase() + last.slice(1);
                return customer
            });

        }
        res.status(200).json(copyOfCustomers)
    }).catch(err => res.status(500).send(err))
    
}
function findCustomer(req,res){
    let filteredCustomers = copyOfCustomers.filter(customer=>{
        let {first,last} = customer.name;
        return first.toUpperCase().includes((req.query.name).toUpperCase()) || last.toUpperCase().includes((req.query.name).toUpperCase())
    })
    res.status(200).json(filteredCustomers);
}

function addCustomer(req,res){
    let newCustomer = req.body;
    newCustomer.login.uuid = id;
    copyOfCustomers.push(newCustomer);
    res.status(200).json(copyOfCustomers);
    id++
}

function editCustomer(req,res){
    let editedCustomer = req.body;
    let id = editedCustomer.login.uuid;
    copyOfCustomers.map((customer,i)=>{
        if(customer.login.uuid ===id){
            copyOfCustomers.splice(i,1,editedCustomer)
        }
    })
    res.status(200).json(copyOfCustomers);
}

function deleteCustomer(req,res){
    let id = req.params.id;
    copyOfCustomers.map((customer,i)=>{
        if(customer.login.uuid.toString() === id){
            copyOfCustomers.splice(i,1)
            // console.log(messages[i])
        }
    })
    res.status(200).json(copyOfCustomers)
    
}

module.exports = {
    getCustomers,
    findCustomer,
    addCustomer,
    editCustomer,
    deleteCustomer
}