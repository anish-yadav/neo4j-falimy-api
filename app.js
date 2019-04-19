var user = require('./model')
const express = require('express')
const logger = require('morgan')
const bcrypt  = require('bcrypt')
const bodyParser = require('body-parser')
const neo4j = require('neo4j-driver').v1

const app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j','123456'))
var session = driver.session()


app.post('/register' ,(req,res) => {
  var name  = req.body.name;
  var email = req.body.emailAddr;
  var pass = req.body.password;
  var age = req.body.age;
  var height = req.body.height;
  var position = req.body.position;
  position = position.toLowerCase();
  var femail = req.body.fatherEmailAddr;
  var memail = req.body.motherEmailAddr;
  var semail = req.body.sonEmailAddr;
  var demail = req.body.daughterEmailAddr;
  user.register(name,pass,email,age,height,position,femail,memail,demail,semail)


})

app.post('/getinfo' , (req,res) =>{

    var email = req.body.emailAddr;
    var pass = req.body.password;
    var position = req.body.position;
    position = position.toLowerCase();
   user.getinfo(email,pass,position)
    
})
// session
//        .run("CREATE (n:Person {name:'Anish' ,age: {myIntParam}}) RETURN n", {myIntParam: neo4j.int(22)})
//        .then( (result) => {
//            console.log(result.records)
//        })
//        .catch( (err) => {
//            console.log(err)
//        })

app.listen(3000 , () => {
    console.log("Api Started on PORT 3000")
})

module.exports = {app}