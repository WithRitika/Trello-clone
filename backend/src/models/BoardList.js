const mongoose = require('mongoose');

const boardListSchema = mongoose.Schema({
    name:{
        type:String, require:true
    },
    board:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Board',
        require:true
    }
},{timestamps:true});

module.exports= mongoose.model('BoardList', boardListSchema);