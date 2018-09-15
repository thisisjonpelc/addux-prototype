const mongoose = require("mongoose");

const Addux = mongoose.model("Addux", {
    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    objective:{
        input:{
            type:String,
            trim:true
        },
        comments:{
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }
    },
    goals:{
        inputs:[
            {
                type:String,
                trim:true
            }
        ],
        comments: {
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    projects:{
        inputs:[
            {
                type:String,
                trim:true
            }
        ],
        comments: {
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    timelines:{
        inputs:[
            {
                type:String,
                trim:true
            }
        ],
        comments: {
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    projectOwner:{
        inputs:[
            {
                type:String,
                trim:true
            }
        ],
        comments: {
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    expertise:{
        inputs:[
            {
                type:String,
                trim:true
            }
        ],
        comments: {
            type:Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    notes:{
        type:String,
        trim:true
    },
    _creator: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports = {Addux};