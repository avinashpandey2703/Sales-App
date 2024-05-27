const MONGODB=require('mongoose')

const salesSchema=new MONGODB.Schema({
    product_name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    
   Date:{
        type:Date,
        default:new Date,
    }

});

// Create Document in MongoDB\
MONGODB.model('SalesDataModel',salesSchema)