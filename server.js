const express = require('express')
const fs = require("fs");
const app = express()
const port = 3000;

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


app.use(express.urlencoded({extended : false}));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());


app.post('/sendpic', upload.single('profile'), function (req, res) {

	//console.log(req.body.mytext,req.file.filename);

	let obj = {
	key : req.body.mytext,
	img : req.file.filename,
     line : 0,
	del : 0}
	fs.readFile("./file.txt","utf-8",function(err,data){

		let todo;
		if(data.length===0)
		{
		 todo = [];
		}
		else
		{
			todo = JSON.parse(data);
		}

		todo.push(obj);

		fs.writeFile("./file.txt",JSON.stringify(todo),function(err){

			res.end("ok");
		});
		
	});



	res.redirect("/");


  });

  app.get("/read",(req,res) => {
	var sdata = [];

	fs.readFile("./file.txt","utf-8",function(err,data){
  
	if(data.length==0)
	{
		res.json(sdata);
	}
	else
	{

  sdata = JSON.parse(data);
	
   res.json(sdata);
	}
	});
	

});
  

app.post("/save", (req, res) => {

	fs.readFile("./file.txt","utf-8",function(err,data){
	
		let todo;
		if(data.length===0)
		{
		 todo = [];
		}
		else
		{
			todo = JSON.parse(data);
		}
	let y,k=0;
	console.log(req.body);
			for( y=0;y<todo.length;y++)
			{
	
				if(todo[y].img == req.body.img)
				{
			  if(req.body.del==1)
					{
						console.log("in",y);
			       todo.splice(y,1);
					}
					else
					{
			         todo[y]=req.body;
					}
					 
			  k=1
				}
			}
			if(k!=1)
			{
			todo.push(req.body);
			}
	//	console.log(req.body);
	
	
	fs.writeFile("./file.txt",JSON.stringify(todo),function(err){
	
		res.end("ok");
	});
	
	
	});
	
	
	//res.end("ok");
	});



app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
