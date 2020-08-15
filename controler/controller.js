var model=require('../model/model')
var http=require('http');
var fs = require('fs');
var keygenerator=require('./keygenerator')
var encriptdata=require('./cripto')
var formidable=require('formidable')
var bodyParser=require('body-parser')
var urlencodedParser=bodyParser.urlencoded({extended:false})
console.log(model)
var controller={}

var sess
k=0
var ans=""
var count=0
var sid=""
var reasult=[]
var dbdata={}
controller.insertAdmin=(app)=>{
    
    app.get('/',(req,res)=>{
        reasult=[]
        count=0
        res.render('index',{qs:'pk'})
    })
    app.post('/startexam',urlencodedParser,async(req,res)=>{
        var qn=await  model.data.findAllQn()
        var x= qn[Math.floor(Math.random()*qn.length)];
        console.log("Dtabase data",dbdata)
        if(req.body){
            if(req.body.examinarAns==ans){
                var qndata=dbdata
                delete qndata['_id']
                examinerInput=req.body
                finaldata=qndata
                finaldata['participanceAns']=examinerInput.examinarAns
                finaldata['reasult']=1
                console.log("#####databasedata right answer",x)
                console.log("#####Answerdata",examinerInput)
            }
            else{
                var qndata=x
                delete qndata['_id']
                examinerInput=req.body
                finaldata=x
                finaldata['participanceAns']=examinerInput.examinarAns
                finaldata['reasult']=0
                console.log("#####databasedata wrong answer",x)
                console.log("#####Answerdata",examinerInput)
            }
        }
        
        ans=x.Answer
        if(count % 5 ==0){
            var keyPic=keygenerator.data.generateHexString(8)
            sid=keyPic
        }
        count++
        if(count % 6==0){
            return res.redirect("/")
        }
        else{
            // console.log("ok",x,req.body,count)
            res.render('show',{rqn:x,key:sid})
        }
        dbdata=x
        
    })
    app.get('/admin',(req,res)=>{
        sess=req.session
        console.log(sess.username)
        if(sess.username && sess.password){
            console.log("move to session")
           
            res.render('./admin/admindasbordhtml')
        }
        else{
            
            res.render("login")
        }
        // res.send("ok")
        
    })
    
    var mydata=[]
    app.post('/admindasbord',urlencodedParser,async(req,res)=>{
        sess=req.session
        console.log(req.body)
        var x=await  model.data.checkAdminLogin(req.body)
            
        // model.data.adminLogin(req.body)
        console.log(x)
        if (x){
            sess.username=req.body.username
            sess.password=req.body.password
            console.log("$$$$$$$$$$$$mview",mydata)
            res.render('./admin/admindasbordhtml',{'data':mydata})
        }
        else{
            res.redirect("/admin/false")
        }
       
        
        
    })
    
    app.post('/addQuestion',urlencodedParser,async(req,res)=>{
        // console.log("body data",req.body)
       
        var qn=await  model.data.findAllQn()
        for(var i=0;i<qn.length;i++){
            if(qn[i].Question==req.body.Question){
                break; 
            }
        }
        console.log(qn.length,i)
        if(i==qn.length){
            var data= await  model.data.addQuestion(req.body)
        }
        // console.log("#####",data,"&&$$##$$&^^")
        if(qn){
            
            
            mydata.push(req.body)
            res.render('./admin/admindasbordhtml',{'data':mydata})
        }
        else{
            res.render('./admin/admindasbordhtml',{'data':mydata})
        }
    
        
    })
    app.get('/qncollection',async(req,res)=>{
        sess=req.session
        console.log("session",sess.username)
        if(sess.username && sess.password){
        var qn=await  model.data.findAllQn()
        res.render('./admin/qncollectionhtml',{data:qn})
        }
        else{
            res.send("Please Login first")
        }
        
    })
    
    
    
}
exports.controllerData=controller