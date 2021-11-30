const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

app.get('/', (req, res) => {
	res.send("Hello, world");
    res.end();
})

app.get('/json', (req, res) =>{
	res.json({
		res: 1,
		k: 'ioio'
	})
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/calculate',(req,res)=>{
	const s = req.body.s; // площадь сечения
	const h = req.body.h; // высота
	res.json({
		res: s*h
	})
})

app.post('/calculate-create', (req, res) => {
	let flagCreate = false;
	const s = req.body.s;
	const h = req.body.h;
	result = s * h;
	const uuidRes = uuidv1();
	const stringRes = {'uuid':uuidRes, 'result':result};
	let data = JSON.parse(fs.readFileSync("result.txt", "utf8"));
	data.push(stringRes)
	fs.writeFile("result.txt", JSON.stringify(data), (e) => {
     	if(e) throw e;
	});
	flagCreate = true;
	console.log(data);
	res.json({
		'create': flagCreate
	});
})

app.get('/calculate-info', (req, res) => {
	const uuidRes = req.body.uuid;
	let data = JSON.parse(fs.readFileSync("result.txt", "utf8"));
	data.forEach(st => {
		if(uuidRes == st.uuid){
			res.json(st);
		}
	})
})

app.post('/calculate-update', (req, res) => {
	let flagUpdate = false;
	const s = req.body.s;
	const h = req.body.h;
	result = s * h;
	const uuidRes = req.body.uuid;
	let data = JSON.parse(fs.readFileSync("result.txt", "utf8"));
	data.forEach(st => {
		if(uuidRes == st.uuid){
			st.result = result;
			flagUpdate = true;
		}
	})
	fs.writeFile("result.txt", JSON.stringify(data), (e) => {
     	if(e) throw e;
	});
	console.log(data);
	res.json({
		'update': flagUpdate
	});
})

app.post('/calculate-delete', (req, res) => {
	let flagDelete = false;
	const uuidRes = req.body.uuid;
	let data = JSON.parse(fs.readFileSync("result.txt", "utf8"));
	data.forEach(st => {
		if(uuidRes == st.uuid){
			data.splice(st, 1);
			flagDelete = true;
		}
	})
	fs.writeFile("result.txt", JSON.stringify(data), (e) => {
     	if(e) throw e;
	});
	console.log(data);
	res.json({
		'delete': flagDelete
	});
})

app.listen(3001,function(){
    console.log("listening on port 3001");
});
