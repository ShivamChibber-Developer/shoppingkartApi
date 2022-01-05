var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 8210;
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
// const mongourl ="http://localhost:8210"
const mongourl = "mongodb+srv://shivam:1234@cluster0.g43io.mongodb.net/shoppingkart?retryWrites=true&w=majority"
var db;

// starting defining Route 
app.get('/', (req, res) => {
    res.send("welcome to API");
})

//makingAPI for top offers //http://localhost:8210/topOffers
app.get('/topOffers', (req, res) => {
    db.collection("shopping").find({ "category": "Top offers" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/Grocery', (req, res) => {
    db.collection("shopping").find({ "category": "Grocery" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/Mobiles', (req, res) => {
    db.collection("shopping").find({ "category": "Mobiles" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/Fashion', (req, res) => {
    db.collection("shopping").find({ "category": "Fashion" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/Electronics', (req, res) => {
    db.collection("shopping").find({ "category": "Electronics" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

app.get('/homeAppliances', (req, res) => {
    db.collection("shopping").find({ "category": "Top offers" }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

// SUBCATEGORY 
app.get('/subcategory1', (req, res) => {
    db.collection("subcategory1").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

// ELECTRONICS SUBCATEGORY 
app.get('/shopping/', (req, res) => {
    var subcategory = req.query.subcategory;
    var query = { "subcateggory_Id": Number(subcategory) }
    db.collection("shopping").find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

//FILTER API
app.get('/filter/:subcategory', (req, res) => {
        var subcategory = req.params.subcategory;
        var query = {"subcateggory_Id": Number(subcategory)}
     if(req.query.lcost && req.query.hcost) {
        var lcost = Number(req.query.lcost);
        var hcost = Number(req.query.hcost);
        query = { "subcateggory_Id": Number(subcategory), $and: [{ Cost: { $gt: lcost, $lt: hcost } }] }
    }
    db.collection("shopping").find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

//DETAILS API 
app.get('/details/:id', (req,res) => {
    var id = req.params.id;
    db.collection("shopping").find({id:Number(id)}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//PLACE ORDER 
app.post('/placeOrder', (req, res) => {
    console.log(req.body);
    db.collection('orders').insert(req.body, (err,result) => {
        if (err) throw err;
        res.send("Order Placed")
    });
});

// FIND ORDER
app.get('/viewOrder', (req, res) => {
    if (req.query.email)
    var query = {email:req.query.email}
    db.collection('orders').find(query).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    });
});

// app.get('/viewOrder', (req, res) => {
//     var email = req.query.email
//     db.collection('orders').find({email:email}).toArray((err,result) => {
//         if (err) throw err;
//         res.send(result)
//     });
// });

// DELETE ORDER
app.delete('/deleteOrder', (req, res) => {
    db.collection('orders').remove({},(err,result) => {
        if (err) throw err;
        res.send(result)
    });
});


//to connect with URL DB can see in w3schools also 
MongoClient.connect(mongourl, function (err, client) {
    if (err) console.log("Error");
    console.log("Database created!")
    db = client.db('shoppingkart');
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
});

