const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const noteschema = new mongoose.Schema(
    {
        title : {
            type: String,
            required : true
        },
        content : {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note",noteschema)