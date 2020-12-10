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
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    debug    :  false,
    port:3306
});

module.exports = pool;