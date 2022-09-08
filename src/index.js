const express = require('express');
 const app=express();
 const port=process.env.PORT || 5000;

const ejs=require('ejs');

const path = require('path');

const templatePath=path.join(__dirname,'../Public');
const body=require('body-parser');
app.use(body.json());
app.set('view engine','ejs')
app.set('views',templatePath)

const client = require("../db.js");



app.use(express.json());
app.use(express.urlencoded({extended:false}));

client.connect();

app.get('/',(req,res)=>{
    res.render('home');
})


app.post('/data',async(req,res)=>{
    const user=req.body;
  
    let firstletter=user.state.charAt(0).toUpperCase()
    let letter=user.state.slice(1).toLowerCase();
    user.state=firstletter+letter;
    let searchQuery=`Select * from apistate where state=('${user.state}')`
     client.query(searchQuery,(err,result)=>{
        try{
           
           res.send(result.rows); 
           
        }catch{
        res.send(err);
            
        }
    })
})



app.listen(port,()=>{
    console.log(`app listening on ${port}`);

})