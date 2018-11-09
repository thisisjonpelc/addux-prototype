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
        trim:true,
        default:''
    },
    objective_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    goals_1:{
        type:String,
        trim:true,
        default:''
    },
    goals_2:{
        type:String,
        trim:true,
        default:''
    },
    goals_3:{
        type:String,
        trim:true,
        default:''
    },
    goals_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    projects_1:{
        type:String,
        trim:true,
        default:''
    },
    projects_2:{
        type:String,
        trim:true,
        default:''
    },
    projects_3:{
        type:String,
        trim:true,
        default:''
    },
    projects_4:{
        type:String,
        trim:true,
        default:''
    },
    projects_5:{
        type:String,
        trim:true,
        default:''
    },
    projects_6:{
        type:String,
        trim:true,
        default:''
    },
    projects_7:{
        type:String,
        trim:true,
        default:''
    },
    projects_8:{
        type:String,
        trim:true,
        default:''
    },
    projects_9:{
        type:String,
        trim:true,
        default:''
    },
    projects_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    timelines_1:{
        type:String,
        trim:true,
        default:''
    },
    timelines_2:{
        type:String,
        trim:true,
        default:''
    },
    timelines_3:{
        type:String,
        trim:true,
        default:''
    },
    timelines_4:{
        type:String,
        trim:true,
        default:''
    },
    timelines_5:{
        type:String,
        trim:true,
        default:''
    },
    timelines_6:{
        type:String,
        trim:true,
        default:''
    },
    timelines_7:{
        type:String,
        trim:true,
        default:''
    },
    timelines_8:{
        type:String,
        trim:true,
        default:''
    },
    timelines_9:{
        type:String,
        trim:true,
        default:''
    },
    timelines_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    projectOwner_1:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_2:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_3:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_4:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_5:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_6:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_7:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_8:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_9:{
        type:String,
        trim:true,
        default:''
    },
    projectOwner_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    resources_1:{
        type:String,
        trim:true,
        default:''
    },
    resources_2:{
        type:String,
        trim:true,
        default:''
    },
    resources_3:{
        type:String,
        trim:true,
        default:''
    },
    resources_4:{
        type:String,
        trim:true,
        default:''
    },
    resources_5:{
        type:String,
        trim:true,
        default:''
    },
    resources_6:{
        type:String,
        trim:true,
        default:''
    },
    resources_7:{
        type:String,
        trim:true,
        default:''
    },
    resources_8:{
        type:String,
        trim:true,
        default:''
    },
    resources_9:{
        type:String,
        trim:true,
        default:''
    },
    resources_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    progress_1:{
        type:String,
        trim:true,
        default:''
    },
    progress_2:{
        type:String,
        trim:true,
        default:''
    },
    progress_3:{
        type:String,
        trim:true,
        default:''
    },
    progress_4:{
        type:String,
        trim:true,
        default:''
    },
    progress_5:{
        type:String,
        trim:true,
        default:''
    },
    progress_6:{
        type:String,
        trim:true,
        default:''
    },
    progress_7:{
        type:String,
        trim:true,
        default:''
    },
    progress_8:{
        type:String,
        trim:true,
        default:''
    },
    progress_9:{
        type:String,
        trim:true,
        default:''
    },
    progress_comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    notes:{
        type:String,
        trim:true,
        default:''
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