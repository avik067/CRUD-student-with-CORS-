const mongoose = require('mongoose') ;

const studentSchema = mongoose.Schema(
    {
        name:{
            type:String ,
            required:[true , "Please enter a product name"]
        } ,
        email : {
            type: String ,
            required : true ,
            default : ''
        },
        phone_no : {
            type :String ,
            require:true ,
            default: ''
        } 
    } ,
    {
        timestamps: true
    }
)

const Student  = mongoose.model('students',studentSchema) ;
// 'students' will be created inside mongo db cluster which model like studentSchema
module.exports = Student ;