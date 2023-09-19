const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase authentication
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "" //https://[DATABASE NAME].firebaseio.com
});

const express = require("express");
const app = express();
const db = admin.firestore();

const cors = require("cors");
app.use( cors({ origin:true }));

// POST (Create)
app.post('/api/create', (req, res) =>{

    (async () => {

        try{
            // Create and send the JSON object to the db to a collection called "products"
            await db.collection('products').doc('/' + req.body.id + '/')
            .create({
                name:req.body.name,
                description: req.body.description,
                price: req.body.price
            })
          // Successfully created document
            return res.status(200).send();
        }
        catch(error){
          // Handle error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// GET - READ A SPECIFIC PRODUCT BASED ON ID
app.get('/api/read/:id', (req, res) =>{

    (async () => {

        try{
            const document = db.collection('products').doc(req.params.id);
            let product = await document.get();
            let response = product.data()
            
            // Successfully queried data
            return res.status(200).send(response);
        }
        catch(error){
          // Handle error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 
// GET - ALL DATA
app.get('/api/read', (req, res) =>{

    (async () => {

        try{
            let query = db.collection('products');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; // result of the query

                for (let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        price: doc.data().price
                    };
                    response.push(selectedItem);
                }
                return response; // each then should return a value
            })
          // Successfully queried data
            return res.status(200).send(response);
        }
        catch(error){
          // Handle error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 
// PUT (Update)
app.put('/api/update/:id', (req, res) =>{

    (async () => {

        try{
            const document = db.collection('products').doc(req.params.id);

            await document.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price

            });
          // Successfully updated document
            return res.status(200).send(response);
        }
        catch(error){
          // Handle error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

// DELETE (Delete)
app.delete('/api/delete/:id', (req, res) =>{

    (async () => {

        try{
            const document = db.collection('products').doc(req.params.id);
            await document.delete();
          // Successfully deleted document
            return res.status(200).send(response);
        }
        catch(error){
          // Handle error
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Export the API to Firebase Cloud Functions
exports.app = functions.https.onRequest(app);