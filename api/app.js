const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
const request = require('request');
const app = express();
const spawn = require('child_process');
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
var image = req.body.image;
    //  var facing = req.body.facing;
    var  token = req.body.token;
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

    //var key = 'happy';
    //var token = 'BQA7nJ-v171y5WmbfBG80fzTrbCpow1UY3RBnb5gFia4GAqYzL79NevetXdVGYfY4_0lRKIre0uvSJ6_wkNpmkTa5WVQm9aULPZ6E7TP4IrpKjGSfx8YoUXf34fopmZjJBgpK91_Q0N9zCM1qw'
    
    const ls = spawn('python', ['../Front-Camera/src/azure.py', image]);

    ls.stdout.on('data', (data) => {
        var key = data.toString();
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
    });
    
    ls.stderr.on('data', (data) => {
        res.status(500).json(`Error occured: ${data}`)
    });
    
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
   
})



const port = process.env.PORT || 4099;
console.log(`listening on port: ${port}`);
app.listen(port);