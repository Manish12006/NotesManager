const mongoose = require("mongoose");
require("dotenv").config();



const notesRoutes = require("./routes/nodeRoutes");

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongoose connected"))
.catch((err)=> console.log(err))

const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Backend Running!")
})

app.use("/notes", notesRoutes);
app.listen(5000, () => {
    console.log("Server running on port 5000");
})