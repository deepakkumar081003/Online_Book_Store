const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const {MongoClient,ObjectId}=require('mongodb');

const app=express();
app.use(cors());
app.use(bodyParser.json());

const uri="mongodb://0.0.0.0:27017";
const dbName="bs";
const PORT=process.env.PORT||5000;

async function connect(){
    const client=new MongoClient(uri);
    await client.connect();
    console.log("Connect to MongoDB");

    const db=client.db(dbName);
    const coll=db.collection('users');

    app.post('/add',async(req,res)=>{
        const {username,password}=req.body;
        const user=await coll.findOne({username:username,password:password})
        
        if(user){
            res.json({message:"user",usname:user.username,cart:user.cart})
            console.log(user.username)
            console.log(user.cart)
        }
        else{
            res.json({message:"invalid",cart:[""]})
        }
        
    })

    app.post('/display',async(req,res)=>{
        const {username,password}=req.body;
        const users=await coll.find({}).toArray();
        res.json({cart:users})
    })

    app.post('/addtocart',async(req,res)=>{
        const{username,book}=req.body;
        const user=await coll.findOne({username:username})
        await coll.updateOne({_id:new ObjectId(user._id)},{$addToSet:{cart:book}});
        const upuser=await coll.findOne({username:username})
        res.json({cart:upuser.cart});
    })

    app.delete('/removefromcart',async(req,res)=>{
        const{username,book}=req.body;
        const user=await coll.findOne({username:username})
        await coll.updateOne({_id:new ObjectId(user._id)},{$pull:{cart:book}});
        const upuser=await coll.findOne({username:username})
        res.json({cart:upuser.cart});
    })

    app.post('/reg',async(req,res)=>{
        const {username,password}=req.body;
        if(username!=='' && password!==''){
            await coll.insertOne({username:username,password:password,cart:[""]});
        }
    })

}

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})

connect();