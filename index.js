const express = require('express');
const app = express();

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

app.listen(3001,function(){
    console.log("listening on port 3001");
});