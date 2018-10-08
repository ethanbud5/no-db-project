var axios = require("axios")
var id = 0;
var originalCustomers = [];
var copyOfCustomers = [];
var randomCities = [
    "Dallas",
    "Melbourne",
    "Opelika",
    "London",
    "Atlanta",
    "Boston",
    "Cairo",
    "Sacramento",
    "Seattle",
    "Harare",
    "Dubai",
    "Denver",
    "Berlin",
    "Flagstaff",
    "Orlando",
    "Tokyo",
    "Rome",
    "Portland",
    "Birmingham",
    "Manchester"
]
var cordArray = [    
    "Dallas",
    "Melbourne",
    "Opelika",
    "London",
    "Atlanta",
    "Boston",
    "Cairo",
    "Sacramento",
    "Seattle",
    "Harare",
    "Dubai",
    "Denver",
    "Berlin",
    "Flagstaff",
    "Orlando",
    "Tokyo",
    "Rome",
    "Portland",
    "Birmingham",
    "Manchester"
]

randomCities.map((city,index)=>{
    axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${randomCities[index]}&lang=en_US&format=json`).then(res=>{
        //console.log("START---->",res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos,"<---END")
        let coordinates = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
        //console.log(cordArray)
        cordArray.splice(cordArray.indexOf(res.data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request),1,{
                     latitude: coordinates[0],
                     longitude: coordinates[1]
                 }) 
    })
})

// function getCordinates(city){
//     axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${city}&lang=en_US&format=json`)
    // .then(res=>{
    //     //console.log("START---->",res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos,"<---END")
    //     let coordinates = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
    //     //console.log(cordArray)
    //        return  {
    //                  latitude: coordinates[0],
    //                  longitude: coordinates[1]
    //                 } 
    // })
// }

function getCustomers(req,res){
    axios.get("https://randomuser.me/api/?results=20&seed=6a80104f53071553").then((response)=>{
        //console.log(response.data)
        originalCustomers = response.data.results;
        console.log(copyOfCustomers.length)
        if(copyOfCustomers.length <= 0){
            copyOfCustomers = response.data.results.map((customer,i)=>{
                let {first,last} = customer.name;
                //CHANGING ALL NAMES TO BEGIN WITH UPPERCASE
                customer.name.first = first.charAt(0).toUpperCase() + first.slice(1);
                customer.name.last = last.charAt(0).toUpperCase() + last.slice(1);
                // console.log(res.data);
                customer.location.city = randomCities[i];
                customer.location.coordinates = {
                        latitude: cordArray[i].latitude,
                        longitude: cordArray[i].longitude
                    }
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
    axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${newCustomer.location.city}&lang=en_US&format=json`)
    .then(response=>{
        let coordinates = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
        //console.log(cordArray)
                newCustomer.location.coordinates = {
                    latitude: coordinates[0],
                    longitude: coordinates[1]
                } 
        copyOfCustomers.push(newCustomer);
        res.status(200).json(copyOfCustomers);
        id++

    })
}

function editCustomer(req,res){
    let editedCustomer = req.body;
    axios.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${editedCustomer.location.city}&lang=en_US&format=json`)
    .then(response=>{
    let coordinates = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
//console.log(cordArray)
        editedCustomer.location.coordinates = {
            latitude: coordinates[0],
            longitude: coordinates[1]
        } 
        let id = editedCustomer.login.uuid;
        copyOfCustomers.map((customer,i)=>{
            if(customer.login.uuid ===id){
                //customer.location.coordinates = newCord;
                copyOfCustomers.splice(i,1,editedCustomer)
            }
            return customer
        })
        // copyOfCustomers = newCustomers
        res.status(200).json(copyOfCustomers);

    })
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