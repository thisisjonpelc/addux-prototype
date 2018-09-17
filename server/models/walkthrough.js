const mongoose = require("mongoose");

const WalkthroughSchema = new mongoose.Schema({
    objective_prompt:{
        type:String,
        trim:true
    },
    objective_video:{
        type:String,
        trim:true
    },
    goals_prompt:{
        type:String,
        trim:true
    },
    goals_video:{
        type:String,
        trim:true
    },
    projects_prompt:{
        type:String,
        trim:true
    },
    projects_video:{
        type:String,
        trim:true
    },
    timelines_prompt:{
        type:String,
        trim:true
    },
    timelines_video:{
        type:String,
        trim:true
    },
    projectOwner_prompt:{
        type:String,
        trim:true
    },
    projectOwner_video:{
        type:String,
        trim:true
    },
    resources_prompt:{
        type:String,
        trim:true
    },
    resources_video:{
        type:String,
        trim:true
    },
    progress_prompt:{
        type:String,
        trim:true
    },
    progress_video:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Number,
        required:true
    }
});

const Walkthrough = mongoose.model("Walkthrough", WalkthroughSchema);

module.exports = {Walkthrough};