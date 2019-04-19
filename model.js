const bcrypt  = require('bcrypt')
const neo4j = require('neo4j-driver').v1
var driver = neo4j.driver('bolt://localhost:7687',neo4j.auth.basic('neo4j','123456'))
var session = driver.session()

getInfo = (position,result) => {
     if(position == 'father') {
        session.run("MATCH (n:Person {email :{memail} RETURN n",{memail:result.records[0].motherEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
        session.run("MATCH (n:Person {email :{semail} RETURN n",{semail:result.records[0].sonEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
        session.run("MATCH (n:Person {email :{demail} RETURN n",{demail:result.records[0].daughterEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
     } else if(position == 'mother') {
        session.run("MATCH (n:Person {email :{semail} RETURN n",{semail:result.records[0].sonEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
        session.run("MATCH (n:Person {email :{demail} RETURN n",{demail:result.records[0].daughterEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
     } else if (position == 'son') {
        session.run("MATCH (n:Person {email :{demail} RETURN n",{demail:result.records[0].daughterEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
     } else {
        session.run("MATCH (n:Person {email :{semail} RETURN n",{semail:result.records[0].sonEmailAddr})
        .then ((doc) =>{
            res.send(doc.records[0])
        })
     }
}









module.exports.register = (name,pass,email,age,height,position,femail,memail,demail,semail) =>{

    if (position == 'father') {
        femail = null;
    } else if(position == 'mother') {
        memail = null;
    } else if(position == 'son'){
       semail = null
    } else {
       demail = null;
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          pass = hash;
          session
         .run("CREATE (n:Person {name:{name} , email:{email},password:{pass},height:{height},position:{position},age:{age},fatherEmailAddr:{femail},motherEmailAddr:{memail},sonEmailAddr:{semail},daughterEmailAddr:{demail}) RETURN n",{name,pass,email,age,height,position,femail,memail,demail,semail})
         .then( (result) => {
             res.send(result.records)
         })
         .catch( (err) => {
             console.log(err)
         })
  
      });
  });
}

module.exports.getinfo = (email,pass,position) =>{
    session.run("MATCH (n:Person {email :{email} RETURN n",{email})
    .then( (result) =>{
        hash = result.records[0].password;
        
         bcrypt.compare(pass, hash, function(err, resp) {
             if (resp) {
                 res.send(result.records[0])
                  getInfo(position,result)
               
             } else {
                 res.send().status(403);
             }
         });
    })


}

