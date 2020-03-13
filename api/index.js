const express = require("express")
const app = express()
const fs =require('fs')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

app.use(jsonParser); // use it globally
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.get("/",(req,res)=>{
    let read=fs.readFileSync('details.json')
    let convert=JSON.parse(read)
    res.send(convert)})

app.post("/",(req,res)=>{
    let read=fs.readFileSync('details.json')
    let convert=JSON.parse(read)
    convert.push(req.body)
    fs.writeFileSync('details.json',JSON.stringify(convert,null,4))
    
})
app.listen(8000,()=>{
    console.log('server started at 8000')
})