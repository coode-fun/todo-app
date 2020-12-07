const dotenv=require('dotenv');
const express=require('express');
const app=express();
const cors=require('cors');// to  make api call between backend and frontend
const dbservices=require("./dbservices");

dotenv.config();
app.use(cors()); //to will allow to send data to serverside when api call wil be made and will not block.
app.use(express.json()); //file sharing in jason format
app.use(express.urlencoded({extended : false}));
app.use(express.static(__dirname+"/client"));

//create
app.post("/insert",(request,response)=>{
    const { name } = request.body;
    const db = dbservices.getDbServiceInstance();
    const result = db.insertData(name);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

//read route
app.get("/getall",(request,response)=>{
    
    const db=dbservices.getDbServiceInstance();
    const result=db.getAllData();
    
    result
    .then(data=>response.json({data:data}));
});      

app.get("/",(req,res)=>{
    res.render("./client/index.html");
})
//update route
app.put("/insert",(request,response)=>{
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertData(name);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
    
});

//delete route
app.delete("/delete/:Id",(request,response)=>{

    const id=request.params.Id;
    const db = dbservices.getDbServiceInstance();
    const result = db.deleteData(id);
    result
    .then(data => response.json({ success: data}))
    .catch(err => console.log(err));
    
});

app.listen(process.env.PORT||5000,()=>{
    console.log("Server Running at http://localhost:5000");
});
