
let add = document.getElementById("right");
let down = document.getElementById("down");

let task;
let i=0;


readtodo(loadtodo);

function loadtodo(robj){

   // console.log(robj);

for(let j=0;j<robj.length;j++)
{
 let di = document.createElement("div");
   let li = document.createElement("li");
   let chl = document.createElement("input");
   let img = document.createElement("img");
   let img2 = document.createElement("img");
   img.src = "1.png";
   img2.src = robj[j].img;
    // li.id= robj[j].id;
   li.innerHTML = robj[j].key;
   chl.type = "checkbox";

   if(robj[j].line ==1)
   {
       li.className = "line";
       chl.checked = true;
   }
   else
   {
        li.className = "";
       chl.checked = false;
   }

   chl.addEventListener("click",mark);
   img.addEventListener("click",hide);
   di.appendChild(li);
   di.appendChild(img2);
   di.appendChild(chl);
   di.appendChild(img);
   down.appendChild(di);

    //    i=robj[j].id;
    //    i++;
       console.log(i);

}

};


// input.addEventListener("keydown",function abc(e){

//     if(e.keyCode==13)
//     {
//         let data = {id : i,
//         value : input.value,
//         checked : 0,
//         del : 0
//         }

//         savetodo(data,load);

//      function load()
//      {
//     task = input.value;
//     input.addEventListener("keydown",abc);
//     let di = document.createElement("div");
   
//    let li = document.createElement("li");
//    let chl = document.createElement("input");
//    let img = document.createElement("img");
//     li.id= `${i}`;
//    img.src = "1.png";
//    li.innerHTML = task;
//    chl.type = "checkbox";
//    chl.addEventListener("click",mark);
//    img.addEventListener("click",hide);
//    di.appendChild(li);
//    di.appendChild(chl);
//    di.appendChild(img);
//    down.appendChild(di);

//              i++;

//      }

//     }

   
// });

function mark(event)
{

    
    
    if(event.target.checked)
    {
         let obj = {
            key : event.target.previousSibling.previousSibling.innerText,
            img : event.target.previousSibling.getAttribute("src"),
            line : 1,
            del : 0
    }
      savetodo(obj,update);

        function update(){
     event.target.previousSibling.previousSibling.className="line";
     let q=event.target.parentNode.id;
        }
    }
    else
    {
       

        let obj2 = {
            key : event.target.previousSibling.previousSibling.innerText,
            img : event.target.previousSibling.getAttribute("src"),
            line : 0,
            del : 0
        }
        console.log(obj2);

      savetodo(obj2,update2);
            
       function update2(){
        event.target.previousSibling.previousSibling.className="";
        let q=event.target.parentNode.id;
       }
    }

}

function hide(event)
{
    event.target.disabled = true;
      let obj3 = {
       key : event.target.previousSibling.previousSibling.previousSibling.innerText,
        img : event.target.previousSibling.previousSibling.getAttribute("src"),
        line : 0,
        del : 1
        }
        //console.log(obj2);

      savetodo(obj3,update3);
     function update3()
     {
        event.target.parentNode.style.display = "none";
        let q=event.target.parentNode.id;
     }
}

function savetodo(obj,callback)
{
    let request = new XMLHttpRequest;

    request.open("post","/save");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj));

    request.addEventListener("load",function(){

        if(request.status==200)
        {
            callback();
        }
        else
        {
            console.log("data not sent");
        }


    });

}

function readtodo(callback)
{

     let request = new XMLHttpRequest;

    request.open("GET","/read");
    request.send();

    request.addEventListener("load",function(){

        if(request.status==200)
        {
            if(request.responseText);
            var obj = JSON.parse(request.responseText);
             callback(obj);
        }
        else
        {
            console.log("data not recieved");
        }

    });

}
