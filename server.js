require('dotenv').config();
const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors({
    origin:"http://localhost:3004"
}))
app.use(express.json())

// const  PORT = process.env.PORT || 4000 // either on 4000 or any 
const Student = require('./models/productModel')
// app.listen(4000,()=> {
//     console.log("Node is running on port 4000") ;
// })
// give <collecetion_name> before ? in bwlow url otherwise no problem it will name it as test 



mongoose.connect(process.env.SECRET_MONGO_LINK)
.then(()=>{
    app.listen(4000,()=> {

        console.log("Node is running on port 4000") ;
    
    })
    console.log("data base connected")
}).catch((e) => {
   console.log(e)
})


app.get("/" ,(req,res) => {

    res.send(`Hi there 🙂 here are some examples to make use of these api : <br/><br/>   use root path  https://crud-mongoose-final.vercel.app/
    <br/> <br/> 
    use path /students/  get all the student :        https://crud-mongoose-final.vercel.app/students
    
    <br/> <br/> 

    use path student/student_name/ to get specific student data :       https://crud-mongoose-final.vercel.app/student/rahu
    
    <br/> <br/> 

    use path student/studnt_id/ to delete student data :        https://crud-mongoose-final.vercel.app/student/64ae57114910a1fa52ed22be/

    <br/> <br/> 
    
    use path student/studnt_id/ to PUT :         https://crud-mongoose-final.vercel.app/student/64ae57114910a1fa52ed22be/ \n
    
    PUT jason like :  { 
        "name" : "AvikB" "," 
        "phone" : "763345544 }
    
        <br/> <br/> 

    POST new DATA in path  /student/ :          https://crud-mongoose-final.vercel.app/student/ 
    PUT jason like :  "{ "name": "sudipto" , "email" : "sudipto354@gmail.com" ,
        "phone" : "763345544" }

    `
    
   
  
    
    ) 
    
})

/// get all the full list 
app.get("/students" , async(req,res) => {
   
    try {
       const stu = await Student.find({}) ;  // {} empty means all the students data
       res.status(200).json(stu)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })
  // POST 
app.post("/student" , async(req,res) => {
   
    try {
       const stu = await Student.create(req.body) 
       res.status(200).json(stu)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })
///// put
  app.put("/student/:id/" , async(req,res) => {

    try {
        const {id} = req.params;
        const n= req.body
        const stu =await Student.findByIdAndUpdate(id,n);
        if (!stu) {
            return res.status(404).json({message:"could not find any product name try with different casing uppper or lower case"})
        }
         const updatedStu = await Student.findById(id)
         res.status(200).json(updatedStu)
    }catch (err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
  })

/// delete 
app.delete("/student/:id/" , async(req,res) => {

    try {
        const {id} = req.params;
        const n= req.body
        const stu =await Student.findByIdAndDelete(id);
        if (!stu) {
            return res.status(404).json({message:"could not find any product name try with different casing uppper or lower case"})
        }
        res.status(200).json(stu)
    }catch (err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
  })

/// get by name
  app.get("/student/:name" , async(req,res) => {
    try {
        const {name} = req.params;
       const stu = await Student.find({'name':name}) ;  // {} empty means all the students data
       res.status(200).json(stu)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })







 