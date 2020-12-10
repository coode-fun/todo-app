
document.addEventListener('DOMContentLoaded', function() {
   
    fetch(`/getAll`)
    .then(response=>response.json())
    .then(data=>{ loadHTMLTable(data.data);})
    .catch(err=>{console.log("Error from fetch!!")})
});

document.getElementById('one').addEventListener("click",(event)=>{
        if(event.target.className==='delete-row-btn')
        {
          deleteRowbyId(event.target.dataset.id);
        }
        if(event.target.dataset.id=='edit-row-btn')
        {
            console.log("Still under process");
        }
});

function deleteRowbyId(id)
{
            fetch(`http://localhost:5000/delete/`+id,{method:'DELETE'})
            .then(response=>response.json())
            .then(response=>{
            if(response.success)
            {
              //location.reload();
                reloadTable();
             }
            });
}

function reloadTable()
{  
  fetch(`http://localhost:5000/getAll`)
  .then(response=>response.json())
  .then(data=>{ loadHTMLTable(data.data);});
}
const addbtn=document.getElementById('add-name-btn');

addbtn.addEventListener('click',()=>{
  const addname=document.getElementById('name-input');
  const name=addname.value;
  addname.value="";

  fetch(`http://localhost:5000/insert`,{
  headers:{'content-type':'application/json'},
  method:'POST',
  body:  JSON.stringify({name:name})
  })
  .then(response=>response.json())
  .then(data=>insertRowIntoTable(data.data));
});

function insertRowIntoTable(element)
{
  console.log(element);
  let table=document.getElementById('one');
  let isdata=document.querySelector('.no-data');
  let tableRow="";
    
    tableRow+="<tr>"
    tableRow+=`<td>${element.ID}</td>`;
    tableRow+=`<td>${element.Name}</td>`;
    tableRow+=`<td>${new Date(element.Date_Added).toLocaleString()}</td>`;
    tableRow+=`<td><button class="delete-row-btn" data-id=${element.ID}>Delete</button></td>`;
    tableRow+=`<td><button class="edit-row-btn" data-id=${element.ID}>Edit</button></td>`;
    
    tableRow+="</tr>";
    if(isdata)
    {
      table.innerHTML=tableRow;
    }
    else{
      const newrow=table.insertRow();
      newrow.innerHTML=tableRow;
    }
}

function loadHTMLTable(data){

let table=document.getElementById('one');

    if(data.length===0)
    {
      table.innerHTML="<tr><td class='no-data' colspan='5'>No-data</td></tr>";
    }
    else
    {
          console.log("Inside else");
          let tableRow="";
          data.forEach(element => {
          
          console.log("element :",element);
          console.log("ele,emt Name :",element.Name);

          console.log("ele,emt name :",element.name);
          
          tableRow+="<tr>"
          tableRow+=`<td>${element.id}</td>`;
          tableRow+=`<td>${element.name}</td>`;
          tableRow+=`<td>${new Date(element.date_added).toLocaleString()}</td>`;
          tableRow+=`<td><button class="delete-row-btn" data-id=${element.id}>Delete</button></td>`;
          tableRow+=`<td><button class="edit-row-btn" data-id=${element.id}>Edit</button></td>`;
          tableRow+="</tr>"
        });
        table.innerHTML=tableRow;
      };
}