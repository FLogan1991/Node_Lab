const { name } = require('ejs');
var express = require('express');
var app = express();
var bodyParsser = require("body-parser");
var axios = require('axios').default;
const apiNasaPic = axios.get('https://api.nasa.gov/planetary/apod?', {
    params: {
        //may need to pass the api key to site host
        api_key: "DEMO_KEY"
    }
});

app.use(bodyParsser.urlencoded({extended: false}));
app.use(bodyParsser.json());
app.use('/static', express.static('public'));
app.set("view engine", "ejs");

app.get('/', function( req, res ){
    apiNasaPic
    .then(function(response){
        console.log(response.data)
        res.render('home.ejs', {name: null, nasaAPI: response.data});
    })
})
//added null in get above
app.get('/path/:name', function( req, res ){
    //change to another ejs file
    let name = req.params.name;
    res.render('home.ejs',{"name": name});
})

app.get('/query', function( req, res ){
    //change to another ejs file
    let name = req.query.name;
    let nameObject = {"name": name};
    res.render('home.ejs', nameObject);
})

//post and put need a body in the home html file in order to get the information to pass
app.post('/create', (req, res) =>{
    console.log(req.body)
    res.redirect("/")
})

//app.put(route, function);

app.listen(3000, () => {
    console.log('started on port 3000');
})


// path param REQUIRED /home/678954390/...
// query param /home?foo=bar&bar=foo
//PUT & POST/CREATE & UPDATE body, from a form