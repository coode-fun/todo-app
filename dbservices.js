
let instance=null;
const pool=require('./connection');
// connection.connect(function (err){
//     if(err){ 
//              console.log("Connection failed!!");
//              throw err;
//     }
//     else
//     console.log("Database Successfully connected!!");
// });


class Dbservice{

    static getDbServiceInstance()
    {
      
        return instance?instance:new Dbservice();
    }
    async getAllData(){
        try{
        
             const response= await new Promise((resolve,reject)=>{

                pool.getConnection((err,connection)=>{
                const query='SELECT * FROM  ITEM;';
                connection.query(query,(err,result)=>{
                    connection.release();
                   if(err)
                        reject(new Error(err.message));
                   else
                        resolve(result);
                });
            });
                })    
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
                    connection.getConnection((err,connection)=>{
                    const query = "INSERT INTO item (name, date_added) VALUES (?,?);";
    
                    connection.query(query, [name, dateAdded] , (err, rows) => {
                        connection.release();
                        if (err) reject(new Error(err.message));
                        else{
                            console.log(rows);
                            resolve(rows.insertId);
                        }
                    })
                });
                return {
                    ID : insertId,
                    Name : name,
                    Date_Added : dateAdded
                };
            })
           
        } catch (error) {
            console.log(error);
        }
    }
    async  deleteData(id)
    {
       try{
            
            let response=await new Promise((resolve,reject)=>{
               
                connection.getConnection((err,connection)=>{

                });
                const query=`Delete from item where id=${id};`;

                connection.query(query,(err,result)=>{
                        
                        if(err) reject(new Error(err.message));
                        else{
                               
                        console.log(result,"----------->result ");
                        console.log(result.affectedRows,"----------->affected");
                        if(result.affectedRows===1)
                        resolve(true);
                        else 
                        resolve(false);
                        }

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

module.exports={Dbservice}; //exporting Dbservice Class

