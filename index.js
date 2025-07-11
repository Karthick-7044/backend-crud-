
const express = require("express");
const app = express();
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const dotenv = require("dotenv").config()
const URL = process.env.DB;
const cors=require("cors");

console.log("MongoDB successfully connected");
//middle ware
app.use(express.json());
app.use(cors({
    origin:"https://crud-operation-two-sigma.vercel.app/"
}))
app.post("/create",async function(req,res){
    try{
        const Connection=await mongoclient.connect(URL);
        const db=Connection.db("CRUD");
        await db.collection("Students").insertOne(req.body)
        await Connection.close()
        res.json({message:"data inserted"})
    }
    catch(error){
        console.log(error)

    }

})
app.get("/read",async function(req,res){
    try{
        const Connection=await mongoclient.connect(URL);
        const db=Connection.db("CRUD");
        let data=await db.collection("Students").find().toArray();
        await Connection.close()
        res.json(data)

    }catch(error){
        console.log(error)

    }
})
app.get("/view/:id",async function(req,res){
    try{
       
        console.log(req.params.id);
        const Connection=await mongoclient.connect(URL);
        const db=Connection.db("CRUD");
        let data=await db.collection("Students").findOne({_id:new mongodb.ObjectId(req.params.id)});
        await Connection.close();
        res.json(data);
    }
    catch(error){
        console.log(error)
    }
});
app.put("/edit/:id",async function(req,res){
    try{
        const Connection=await mongoclient.connect(URL);
        const db=Connection.db("CRUD");
        let data=await db.collection("Students").findOneAndUpdate({_id:new mongodb.ObjectId(req.params.id)}, {$set:req.body})
    
        await Connection.close();
        res.json(data);
    }catch(error){
        console.log(error);
    }
});
app.delete("/delete/:id",async function(req,res){
    try{
        const Connection=await mongoclient.connect(URL);
        const db =Connection.db("CRUD");
        let data =await db.collection("Students").findOneAndDelete({_id:new mongodb.ObjectId(req.params.id)})
        await Connection.close()
        res.json(data);
    }catch(error){
        console.log(error);
    }
});
app.listen(process.env.PORT ||5000);