
let instance=null;
const pool=require('./connection.js');

class Dbservice{

    static getDbServiceInstance()
    {
      console.log("Into instance!");
        return instance?instance:new Dbservice();
    }
    async getAllData(){
        try{
             const response= await new Promise((resolve,reject)=>{

                pool.getConnection((err,connection)=>{
                 
                    if(err)
                    {
                        throw err.message;
                    }
                const query='SELECT * FROM  ITEM;';
                connection.query(query,(err,result)=>{
                    connection.release();
                   if(err)
                   {
                        reject(new Error(err.message));
                   }
                   else{
                        resolve(result);
                   }
                });
            });
                })    
             console.log(response);
             return response;
        }
        catch(error){
                 console.log(error," Error from getAll function");
        }
    }
    async insertData(name){
        try{           
                const dateAdded = new Date();
                const insertId = await new Promise((resolve, reject) => {
                    pool.getConnection((err,connection)=>{
                        
                    if(err)
                    {
                        throw err.message;
                    }
                    const query = "INSERT INTO item (name, date_added) VALUES (?,?);";
    
                    connection.query(query, [name, dateAdded] , (err, rows) => {
                        connection.release();
                        if (err) {
                            
                            reject(new Error(err.message));
                            throw new Error(err.message);
                        }
                        else{
                            console.log(rows);
                            resolve(rows.insertId);
                        }
                    })
                });
            })
            return {
                ID : insertId,
                Name : name,
                Date_Added : dateAdded
            };
           
        } catch (error) {
            console.log(error, " Error from Insertdata side");
        }
    }
    async  deleteData(id)
    {
       try{
            
            let response=await new Promise((resolve,reject)=>{
               
                pool.getConnection((err,connection)=>{
                    
                    if(err)
                    {
                        throw err.message;
                    }
                    const query=`Delete from item where id=${id};`;
                    connection.query(query,(err,result)=>{
                            connection.release();
                            if(err) {
                                reject(new Error(err.message));
                                throw new Error(err.message)
                            }
                            else{                                   
                                if(result.affectedRows===1)
                                    resolve(true);
                                else 
                                    resolve(false);
                            }
                        });
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

