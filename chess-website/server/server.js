const express = require("express");
const app = express();


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const userSchema = require("./schemas/users");
const connectionString = require("./connectionString");


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

mongoose.connect(connectionString)
.then(() => {
    const User = mongoose.model("users", userSchema);
    User.create({email: "test@test.com", username: "Mrnibbles"}, (result) => {
        console.log(result);
    });
})
.catch(err => console.log(err));