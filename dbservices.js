const mysql=require("mysql");
const dotenv=require("dotenv");

let instance=null;
dotenv.config();


const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DBPORT
});

connection.connect((err)=>{
    if(err){ 
             console.log("Connection failed!!");
             throw err;
    }
    else
    console.log("Database Successfully connected!!");
});


class Dbservice{

    static getDbServiceInstance()
    {
        return instance?instance:new Dbservice();
    }
    async getAllData(){
        try{
             const response= await new Promise((resolve,reject)=>{

                const query='SELECT * FROM  ITEM;';
                connection.query(query,(err,result)=>{
                   if(err) reject(new Error(err.message));
                   resolve(result);
                });
             });
             console.log(response);
             return response;
        }
        catch{
                 console.log("Error");
        }
    }
    async insertData(name){
        try{           
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO item (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] , (err, rows) => {
                    if (err) reject(new Error(err.message));
                    console.log(rows);
                    resolve(rows.insertId);
                })

            });
            return {
                ID : insertId,
                Name : name,
                Date_Added : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }
    async  deleteData(id)
    {
       try{
            let response=await new Promise((resolve,reject)=>{
               
                const query=`Delete from item where id=${id};`;

                connection.query(query,(err,result)=>{
                        if(err) reject(new Error(err.message));
                        if(result.affectedRows===1)
                        resolve(true);
                        else 
                        resolve(false);
                });
            });
            return response;
       }
       catch(error){
           console.log(error);
           return false;
       }
    }
}

module.exports=Dbservice; //exporting Dbservice Class

