const express =  require("express");
const bodyParser =  require("body-parser");
const request =  require("request");
//to make accepting the request
const https = require("https");

const app = express();

//static folder to access css in local host
app.use(express.static("public"));

//use body parser to reflect in backend
app.use(bodyParser.urlencoded({extended:true}));

//sending html page when asking request
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

//value entering making reflect in terminal 
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName,lastName,email);

    const data={
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                //open merge fields and run this api
                FNAME:firstName,
                LNAME:lastName
            }
        }
        ]};
        const jsonData = JSON.stringify(data)
        //posting request
        const url = "https://us13.api.mailchimp.com/3.0/lists/0974c30b6b"
        
            
        const options={
            method:"POST",
            auth:"jayadurga:8761e161f22f907167cb846673ac5465-us13"
        }
        const request = https.request(url,options,function(response){

            //adding success and failure pages after sign up

            if(response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }

            
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
        })
        request.write(jsonData);
        request.end();
});

//adding home page route for failure page 
app.post("/failure.html",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});

//8761e161f22f907167cb846673ac5465-us13
//0974c30b6b