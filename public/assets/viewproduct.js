minCount=0,
secCount=0,
miliCount=0
function startCount(){
    $("#start").attr({'disabled':'disabled'})
    $("#push").removeAttr('disabled')
    $("#restart").removeAttr('disabled')
    console.log("start")
    setInterval(()=>{
        minCount+=1
        document.getElementById("minute").innerHTML =minCount

    },60000)
    setInterval(function(){
        secCount+=1
        document.getElementById("secound").innerHTML=secCount
        
    },1000)
    setInterval(function(){
        miliCount+=1
        milisecound.innerHTML=miliCount
        
    },100)
}
window.onload = function()
{
    startCount()
}
