const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.listen(3001,function(){
    console.log("listening on port 3001");
});
