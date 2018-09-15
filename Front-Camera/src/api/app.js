const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/',cors(),(req,res)=>{
    res.status(200).json('api running');
})
const port = process.env.PORT || 4099;
console.log(`listening on port: ${port}`);
app.listen(port);