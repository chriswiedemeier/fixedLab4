var express = require('express');
var fs = require('fs');
var router = express.Router();
var async = require('asyncawait/async');
var await = require('asyncawait/await');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public'});
    console.log("In weather.html.");
});

/* OWLBOT service*/
router.get('/word',function(req,res,next) {
    console.log("In getdefinition route");
    
    var givenWord = req.query.w;
    console.log("Word: " + givenWord);
   //GET /api/v2/dictionary/owl
//https://owlbot.info/api/v2/dictionary/owl?format=json
//https://owlbot.info/api/v2/dictionary/hello?format=json
    var owlURL = "https://owlbot.info/api/v2/dictionary/"+givenWord+"?format=json";
     console.log("Owl URL: " + owlURL);
     
     var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            //document.getElementById("demo").innerHTML = myObj.high;
            
            console.log("Returned json result: "+ JSON.stringify(myObj));
            res.status(200).json(myObj);
        }
    };
    xmlhttp.open("GET", owlURL+ new Date().getTime(), true);
    xmlhttp.send();
    
    
/*
    $(document).ready(function() {
         $.getJSON(owlURL,function(data) {
             console.log("Reading json object from OWL!");
                    var everything;
                    everything = "<ol>";
                    for(var i = 0; i < data.items.length; i++) {
                        everything += "<li>"+JSON.stringify(data.items[i]);
                    }
                    
                    everything += "</ol>";
                    
                    $("#searchResults").html(everything);
                    
            
                    console.log("Returned json result: "+ everything);
            
                    res.status(200).json(everything);
            })
    });
    */
   
});

/* GET city service. */
router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");
    
    var myRe = new RegExp("^" + req.query.q);
    console.log("RegExp: " + myRe);
   
    
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        console.log("Reading file.");
        if(err) throw err;
        var cities = data.toString().split("\n");
         var jsonresult = [];
         
        //console.log(cities);
        for(var i = 0; i < cities.length; i++) {
            //console.log(i)
            var result = cities[i].search(myRe); 
            if(result != -1) {
                console.log("Found city: "+cities[i]);
                jsonresult.push({city:cities[i]});
            } 
        }   
        
        console.log("Returned json result: "+ JSON.stringify(jsonresult));
        res.status(200).json(jsonresult);
    });
    
   
});


module.exports = router;
