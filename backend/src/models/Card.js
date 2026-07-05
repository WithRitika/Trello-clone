const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    name: {
        type: String, require: true
    },description:{
        type: String, default: ''
    },
    boardList:{
        type: mongoose.Schema.Types.ObjectId, ref:'BoardList', require:true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', default:null
    }
},{timestamps:true});

module.exports = mongoose.model('Card', cardSchema);