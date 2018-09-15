const mongoose = require("mongoose");
const {Comment} = require('./comment');

const AdduxSchema = mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
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
            type:mongoose.Schema.Types.ObjectId,
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
            type:mongoose.Schema.Types.ObjectId,
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
            type:mongoose.Schema.Types.ObjectId,
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
            type:mongoose.Schema.Types.ObjectId,
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
            type:mongoose.Schema.Types.ObjectId,
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

// AdduxSchema.pre("save", async function(next){
    
//     try{
//         const addux = this;

//         const comments = [];

//         for(let i = 0; i < 6; i++){
//             //let comment = new Comment();
//             comments.push({text:"TEST COMMENT"});
//         }

//         Comment.insertMany(comments).then((comments) => {
//             console.log("COMMENTS INSERTED!");
//             //console.log(comments);

//             addux.objective.comments = comments[0]._id;
//             addux.goals.comments = comments[1]._id;
//             addux.projects.comments = comments[2]._id;
//             addux.timelines.comments = comments[3]._id;
//             addux.projectOwner.comments = comments[4]._id;
//             addux.expertise.comments = comments[5]._id;

//             addux.markModified("objective");
//             addux.markModified("goals");
//             addux.markModified("projects");
//             addux.markModified("timelines");
//             addux.markModified("projectOwner");
//             addux.markModified("expertise");

//             // addux.markModified("objective.comments");
//             // addux.markModified("goals.comments");
//             // addux.markModified("projects.comments");
//             // addux.markModified("timelines.comments");
//             // addux.markModified("projectOwner.comments");
//             // addux.markModified("expertise.comments");
    
//             next();
//         })
//         .catch((e) => {
//             console.log("UNABLE TO CREATE COMMENTS!");
//             console.log(e);
//             next();
//         });

//         // comments[0] = await comments[0].save();
//         // comments[1] = await comments[1].save();
//         // comments[2] = await comments[2].save();
//         // comments[3] = await comments[3].save();
//         // comments[4] = await comments[4].save();
//         // comments[5] = await comments[5].save();     
//     }
//     catch(e){
//         console.log("ERROR CREATING COMMENTS:", e);
//         next();
//     }
    





// });

const Addux = mongoose.model("Addux", AdduxSchema);

module.exports = {Addux};