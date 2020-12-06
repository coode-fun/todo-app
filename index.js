
//console.log("Heloo!");
async function fun()
{
    const temp=await new Promise((resolve,reject)=>{

               resolve("hello world!");
               reject("rejected!!");
    });
    console.log(temp + "console!!");
    return temp;
}
//console.log(fun());
fun()
.then(data=>{console.log(data)});