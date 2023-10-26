const { name } = require('ejs');
var express = require('express');
var app = express();
var bodyParsser = require("body-parser")

app.use(bodyParsser.urlencoded({extended: false}));
app.use(bodyParsser.json());
app.use('/static', express.static('public'));
app.set("view engine", "ejs");

app.get('/', function( req, res ){
    res.render('home.ejs', {"name": null});
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

app.post('/create', (req, res) =>{
    console.log(req.body)
})

app.listen(3000, () => {
    console.log('started on port 3000');
})


// path param REQUIRED /home/678954390/...
// query param /home?foo=bar&bar=foo
//PUT & POST/CREATE & UPDATE body, from a form