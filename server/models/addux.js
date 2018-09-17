const mongoose = require("mongoose");
const {Comment} = require('./comment');

const AdduxSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    objective:{
        type:String,
        trim:true
    },
    objective_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    goals_1:{
        type:String,
        trim:true
    },
    goals_2:{
        type:String,
        trim:true
    },
    goals_3:{
        type:String,
        trim:true
    },
    goals_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    projects_1:{
        type:String,
        trim:true
    },
    projects_2:{
        type:String,
        trim:true
    },
    projects_3:{
        type:String,
        trim:true
    },
    projects_4:{
        type:String,
        trim:true
    },
    projects_5:{
        type:String,
        trim:true
    },
    projects_6:{
        type:String,
        trim:true
    },
    projects_7:{
        type:String,
        trim:true
    },
    projects_8:{
        type:String,
        trim:true
    },
    projects_9:{
        type:String,
        trim:true
    },
    projects_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    timelines_1:{
        type:String,
        trim:true
    },
    timelines_2:{
        type:String,
        trim:true
    },
    timelines_3:{
        type:String,
        trim:true
    },
    timelines_4:{
        type:String,
        trim:true
    },
    timelines_5:{
        type:String,
        trim:true
    },
    timelines_6:{
        type:String,
        trim:true
    },
    timelines_7:{
        type:String,
        trim:true
    },
    timelines_8:{
        type:String,
        trim:true
    },
    timelines_9:{
        type:String,
        trim:true
    },
    timelines_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    projectOwner_1:{
        type:String,
        trim:true
    },
    projectOwner_2:{
        type:String,
        trim:true
    },
    projectOwner_3:{
        type:String,
        trim:true
    },
    projectOwner_4:{
        type:String,
        trim:true
    },
    projectOwner_5:{
        type:String,
        trim:true
    },
    projectOwner_6:{
        type:String,
        trim:true
    },
    projectOwner_7:{
        type:String,
        trim:true
    },
    projectOwner_8:{
        type:String,
        trim:true
    },
    projectOwner_9:{
        type:String,
        trim:true
    },
    projectOwner_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    resources_1:{
        type:String,
        trim:true
    },
    resources_2:{
        type:String,
        trim:true
    },
    resources_3:{
        type:String,
        trim:true
    },
    resources_4:{
        type:String,
        trim:true
    },
    resources_5:{
        type:String,
        trim:true
    },
    resources_6:{
        type:String,
        trim:true
    },
    resources_7:{
        type:String,
        trim:true
    },
    resources_8:{
        type:String,
        trim:true
    },
    resources_9:{
        type:String,
        trim:true
    },
    resources_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    progress_1:{
        type:String,
        trim:true
    },
    progress_2:{
        type:String,
        trim:true
    },
    progress_3:{
        type:String,
        trim:true
    },
    progress_4:{
        type:String,
        trim:true
    },
    progress_5:{
        type:String,
        trim:true
    },
    progress_6:{
        type:String,
        trim:true
    },
    progress_7:{
        type:String,
        trim:true
    },
    progress_8:{
        type:String,
        trim:true
    },
    progress_9:{
        type:String,
        trim:true
    },
    progress_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    notes:{
        type:String,
        trim:true
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

AdduxSchema.pre("remove", function(next){
    //console.log("REMOVING COMMENTS");
    //console.log("THIS IS: ", this);

    const addux = this;

    //console.log(addux.objective_comments);

    // Comment.findByIdAndDelete(addux.objective_comments).exec();
    // Comment.findByIdAndDelete(addux.goals_comments).exec();
    // Comment.findByIdAndDelete(addux.projects_comments).exec();
    // Comment.findByIdAndDelete(addux.timelines_comments).exec();
    // Comment.findByIdAndDelete(addux.projectOwner_comments).exec();
    // Comment.findByIdAndDelete(addux.resources_comments).exec();
    // Comment.findByIdAndDelete(addux.progress_comments).exec();

    Comment.deleteMany(
        {
           $or:[
               {_id: addux.objective_comments},
               {_id: addux.goals_comments},
               {_id: addux.projects_comments},
               {_id: addux.timelines_comments},
               {_id: addux.projectOwner_comments},
               {_id: addux.resources_comments},
               {_id: addux.progress_comments}
           ] 
        }
    ).exec();
    
    next();
});

const Addux = mongoose.model("Addux", AdduxSchema);

module.exports = {Addux};

// const AdduxSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         minlength:1,
//         trim:true
//     },
//     objective:{
//         input:{
//             type:String,
//             trim:true
//         },
//         comments:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Comment",
//         }
//     },
//     goals:{
//         inputs:[
//             {
//                 type:String,
//                 trim:true
//             }
//         ],
//         comments: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     },
//     projects:{
//         inputs:[
//             {
//                 type:String,
//                 trim:true
//             }
//         ],
//         comments: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     },
//     timelines:{
//         inputs:[
//             {
//                 type:String,
//                 trim:true
//             }
//         ],
//         comments: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     },
//     projectOwner:{
//         inputs:[
//             {
//                 type:String,
//                 trim:true
//             }
//         ],
//         comments: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     },
//     expertise:{
//         inputs:[
//             {
//                 type:String,
//                 trim:true
//             }
//         ],
//         comments: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref: "Comment"
//         }
//     },
//     notes:{
//         type:String,
//         trim:true
//     },
//     _creator: {
//         type:mongoose.Schema.Types.ObjectId,
//         required:true
//     }
// });

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

