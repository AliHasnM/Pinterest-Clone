const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
},
title: String,
description: String,
postImage: String,
})

module.exports = mongoose.model("posts", postSchema);