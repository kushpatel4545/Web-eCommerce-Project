const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pkush366:5A9mZ0Sm8uoiVQxL@cluster0.rryrj7m.mongodb.net/?retryWrites=true&w=majority").then(() => {console.log("Connected to the mango Database");
}).catch((error) => console.error("Error while connecting to MongoDB Atlas database :", error));