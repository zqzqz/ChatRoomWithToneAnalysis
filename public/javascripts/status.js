
function changestatus() {
    if(document.getElementById("status").innerHTML=="ON"){
        document.getElementById("status").innerHTML = "OFF";
        document.getElementById("status").style = "color:black";
        //document.getElementById("submit").onclick = "send"
        //document.getElementById("post").style = "VISIBILITY:hidden";
        //document.getElementById("force_post").style = "VISIBILITY:visible";
    }
    else {
        document.getElementById("status").innerHTML = "ON";
        document.getElementById("status").style = "color:blue";
        //document.getElementById("submit").onclick = "force_send"
        //document.getElementById("force_post").style = "VISIBILITY:hidden";
        //document.getElementById("post").style = "VISIBILITY:visible";
    }
}