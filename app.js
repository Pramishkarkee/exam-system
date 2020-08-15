
var controller=require('./controler/controller')
var express=require('express')
const session = require('express-session');
var app=express()
var path=require('path');
app.use (session ({secret: "53cr3t50m3th1ng", resave: true,rolling: true,saveUninitialized: false,cookie: {expires: 3600*1000}}));


app.set('view engine','ejs')
controller.controllerData.insertAdmin(app)

// app.use('/assets',express.static('assets'))
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname,"public")));
let host='127.0.0.1'
let port=4000
app.listen(port,host,()=>{
    console.log(`this server is running in http//:${host}:${port}`)
})
