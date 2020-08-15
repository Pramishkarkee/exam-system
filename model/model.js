var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var model={}
model.insertAdminData=function(productDetail){
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var db=db.db('mydb')
        db.collection('product').insertOne(productDetail,(err,db)=>{
            if (err) throw err;
        })
    })
}
// model.adminLogin=function(adminId){
//     MongoClient.connect(url,(err,db)=>{
//         if (err) throw err;
//         var db=db.db('mydb')
//         db.collection('adminSecurity').insertOne(adminId,(err,db)=>{
//             if (err) throw err;
//         })
//     })
// }

model.checkAdminLogin= async function(uname){
    const client=new MongoClient(url)
    try{
        await client.connect()
        // var x=await createListing(client)
        console.log("x",uname)
        const reasult=await client.db("mydb").collection("adminSecurity").findOne(uname)
        if (reasult){
            console.log("model")
            return reasult
        }
        else{
            return false
        }
            
        
    }catch(e){
        console.error(e)
    }finally{
        await client.close()
    }
}

model.addQuestion=async function(question){
    const client=new MongoClient(url)
    try{
        console.log("model",question)
        await client.connect()
        const indata= await client.db("mydb").collection("Question").insertOne(question)
        const data= await client.db('mydb').collection('Question').find({}).toArray()
        if(data){
            return data
        }
        else{
            return "sorry it is empty"
        }
    }catch(e){

    }finally{
        await client.close()
    }
}
model.findAllQn=async function(){
    const client=new MongoClient(url)
    try{
       
        await client.connect()
        
        const data= await client.db('mydb').collection('Question').find({}).toArray()
        if(data){
            return data
        }
        else{
            return "sorry it is empty"
        }
    }catch(e){

    }finally{
        await client.close()
    }
}
exports.data=model