const mongoose = require("mongoose");

const Comment = new mongoose.Schema("Comment", {
    text: {
        type:String
    }
});

module.exports = {String};