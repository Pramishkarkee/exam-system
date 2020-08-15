var methods={}
methods.timestamp=function(){
    console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000))
    djdhjhmdf
}

methods.currentData=function(x){
    console.log("come from another",x)
    console.log('Current Date is: ' + new Date().toISOString().slice(0, 10))
}
mydata={name:'pramish karkee'}
exports.data=methods
module.exports.mydata=mydata