const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongod://localhost/react-add-cart',{
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

const product = mongoose.model(
    'products'
    ,
    new mongoose.Schema({
        _id : {type :String , default: shortid.generate} , 
        title : String,
        image : String,
        description : String,
        availableSizes : [String],
        price:Number
    })

);

app.get('/api/products', async (req,res)=>{
    const products = await product.find({});
    res.send(products);
    res.send('we are home');
});

app.post('/api/products', async (req,res)=>{
    const newProduect = new product(req.body);z
    const savedProduct = await newProduect.save();
    res.send(savedProduct);
});

app.delete('/api/products/:id') , async (req , res) =>{
    const deleteproduect = await product.findByIdAndDelete(req.params.id);
    res.send(deleteproduect);
}

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('server at http://localhost:5000'));
