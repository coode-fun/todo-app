const mysql=require("mysql");
const dotenv=require("dotenv");

dotenv.config();
var pool=mysql.createPool({
    // user:'root',
    // password:'',
    // database:'webapp',
    // port:3306,
    // host:'localhost'
    connectionLimit : 10,
    host:'us-cdbr-east-02.cleardb.com',
    user:'b2d0edfdf98be6',
    password:'90d70b55',
    database:'heroku_8d3b69cd683633a',
    debug    :  false,
    port:3306
});

module.exports = pool;