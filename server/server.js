import express from "express";
import Bodyparser  from 'body-parser';
import cors from "cors";
import config from "./config.js";
import fetchUrlContent from "./count.js";
import clean from "./count.js";
import count from "./count.js";
import UserModel from "./schema.js";

const app=express();
app.use(cors())
app.use(Bodyparser.json())
app.use(Bodyparser.text())
app.use(Bodyparser.urlencoded({extended:true}))

config();


app.post('/url',async(req,res)=>{
    let url=req.body.url;
    const content= await fetchUrlContent(url);
    const cleanedContent=clean(content);
    const result =count(cleanedContent)

    try{
        const exist_url= await UserModel.findOne({url:url})
        if(exist_url)return res.send("URL already exist");
        const data=UserModel.insertMany({
            url:url,
            wordcount:result
        })
        if(data)return res.status(200).send("url added Successfully")
    }
    catch(error){
        return res.send(error.message)
    }
    
})

app.get("/getdata",async(req,res)=>{
    try {
        let result=await UserModel.find();
        res.status(200).json({data:result})
       } catch (error) {
        res.status(400).send(error.message)
       }
})
app.post("/addfavourite",async(req,res)=>{
    let id=req.body.id;
    let favourite=req.body.favourite;
    try{
        const update_url = await UserModel.findOneAndUpdate({ _id:id},{"favourite":favourite},{new:true})
        if (update_url) return res.status(200).json({message:' Updated Successfully'})
   
    } catch (error) {
        console.log(error.message);
        return res.send(error.message)
    }
})
app.post("/deleteurl",async(req,res)=>{
    let id=req.body.id;
    try {
        let result=await UserModel.deleteOne({_id:id})
        if(result){
          res.status(200).json({message:"Deleted Successfully"})
        }
         
  
      } catch (error) {
          res.status(400).send(error.message)
      }
})

app.listen(4000, () => {
    console.log('Server listening on port 4000');
  });