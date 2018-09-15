const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
var router = express.Router();

app.get('/',cors(),(req,res)=>{
    res.status(200).json('api running');
})


//var token;
//get image and token and send to python
app.post('/spotify',cors(),(req,res)=>{
    //  var image = req.body.image;
    //  var facing = req.body.facing;
    //  var key;
    //  token = req.body.token;
    //  var options = {
    //     mode: 'text',
    //     pythonPath: 'path',
    //     pythonOptions: [],
    //     scriptPath: '../Front-Camera/src',
    //     args: [image]
    // };
    // PythonShell.run('azure.py',options, (err,data)=>{
    //     if(err){
    //         res.status(500).json('An error has occured. ' + err);
    //         return
    //     }
    //     key = data.toString();
    // });
    var key = 'happy';
    var token = 'BQB9lFr4VhxhHWGjilwpLw632PHTHNMKzXgwIwjv7FCryj2M4x3qqYkiP6JWOf-HD_N3iH6zshCrVeH3Jyt1eYbd14JmzgXGFn9T1UeohEVfeeBSpZEw8M7L_gy6FQiIq5xxBbVPpq2fHt_pdA'
    var spotifyOptions = {
        url: 'https://api.spotify.com/v1/search/?q='+key+'&type=playlist',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    request.get(spotifyOptions,(err,res2,body)=>{
        if(err){
            res.status(500).json('An error has occured. ' + err);
            return;
        }
        var rando = Math.floor(Math.random() * 5);
        let playlists = {
            'key':key,
            body: JSON.parse(body).playlists.items[rando]
        };
        res.status(200).send(playlists);
    });
})



const port = process.env.PORT || 4099;
console.log(`listening on port: ${port}`);
app.listen(port);