const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');
const { parse } = require('path');






app.listen(port, () => console.log(`App listening on port ${port}!`))
app.get('/totalrecovered',(req,res)=>{
    let total=0
   connection.find({}).then((dta)=>{
    // console.log(dta)
dta.map((obj)=>{total=total+parseInt(obj.infected)
console.log(obj.infected,total)})


   }).then(()=>res.json({data: {_id: "total", recovered:total}}))
   
})
app.get('/totalActive',(req,res)=>{
    let total=0
   connection.find({}).then((dta)=>{
    // console.log(dta)
dta.map((obj)=>{total=total+parseInt(obj.infected)-parseInt(obj.recovered)-parseInt(obj.death)
console.log(obj.infected,total)})


   }).then(()=>res.json({data: {_id: "total", active:total}}))
   
})
app.get('/totalDeath',(req,res)=>{
    let total=0
   connection.find({}).then((dta)=>{
    // console.log(dta)
dta.map((obj)=>{total=total+parseInt(obj.death)
console.log(obj.infected,total)})


   }).then(()=>res.json({data: {_id: "total", death:total}}))
   
})
// Number.parseFloat(x).toFixed(5);
app.get('/hotSpots',(req,res)=>{
    let total=0
    let data=[]
   connection.find({}).then((dta)=>{
    // console.log(dta)
dta.map((obj)=>{let rate= (obj.infected-obj.recovered)/obj.infected
rate=Number.parseFloat(rate).toFixed(5)
if(rate>0.1){
    data.push({state:obj.state,rate:rate})
}
console.log(obj.infected,total)})


   }).then(()=>res.json({data}))
   
})

app.get('/healthyStates',(req,res)=>{
    let total=0
    let data=[]
   connection.find({}).then((dta)=>{
    // console.log(dta)
dta.map((obj)=>{let rate= (obj.death)/obj.infected
rate=Number.parseFloat(rate).toFixed(5)
if(rate<0.005){
    data.push({state:obj.state,morality:rate})
}
console.log(obj.infected,total)})


   }).then(()=>res.json({data}))
   
})

module.exports = app;