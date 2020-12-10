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
// const allowedOrigins = ["http://localhost:5000","http://localhost:8080"];

//     app.use(
//         cors({
//             origin: function(origin, callback) {
//                 if (!origin) return callback(null, true);
//                 if (allowedOrigins.indexOf(origin) === -1) {
//                     var msg =
//                         "The CORS policy for this site does not " +
//                         "allow access from the specified Origin.";
//                     return callback(new Error(msg), false);
//                 }
//                 return callback(null, true);
//             }
//         })
//     );
app.post("/insert",(request,response)=>{

    if(!request.body)
    {
        response.status(400);
        response.send("Error 400!")
    }
    const { name } = request.body;
    const db = dbservices.getDbServiceInstance();
    if(!db)
    {
        response.send("Server down !!");
    }
    const result = db.insertData(name);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err,"unable to insert data into the database"));
});

//read route
app.get("/getall",(request,response)=>{
    
    if(!request.body)
    {
        response.status(400);
        response.send("Error 400!")
    }
    const db = dbservices.getDbServiceInstance();
    if(!db)
    {
        response.send("Server down !!");
    }
    const result=db.getAllData();
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err,"unable to fetch data into the database "));
});      

app.get("/",(req,res)=>{
    if(!request.body)
    {
        response.status(400);
        response.send("Error 400!")
    }
    res.render("./client/index.html");
})
//update route
app.put("/insert",(request,response)=>{
    if(!request.body)
    {
        response.status(400);
        response.send("Error 400!")
    }
    const { name } = request.body;
    const db = dbservices.getDbServiceInstance();
    if(!db)
    {
        response.send("Server down !!");
    }
    const result = db.insertData(name);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

//delete route
app.delete("/delete/:Id",(request,response)=>{
    if(!request.body)
    {
        response.status(400);
        response.send("Error 400!")
    }
    const id=request.params.Id;
    const db = dbservices.getDbServiceInstance();
    if(!db)
    {
        response.send("Server down !!");
    }
    const result = db.deleteData(id);
    result
    .then(data => response.json({ success: data}))
    .catch(err => console.log(err));
});
// app.get("/w",(req,res)=>{
//     res.send("Hello");
// })
var port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server Running at http://localhost:${port}`);
});

