const express = require('express');
const app = express();
const storage = require('node-persist');

app.use(express.json());

app.get('/:key', async (req, res) => {
    await storage.init();
    const value = await storage.getItem(req.params.key);
    if(value == null){
        res.json({"key": req.params.key, "value": "No value found"});
    }else{
        res.json({"key": req.params.key, "value": value});
    }
    
});

app.post('/add', async (req, res) => {
    var key = req.body.key;
    var value = req.body.value;
    await storage.init();
    await storage.setItem(key,value);
    res.send("A new key value pair has been added.");
});

app.listen(9000, () => console.log("Listening on port number 9000"));