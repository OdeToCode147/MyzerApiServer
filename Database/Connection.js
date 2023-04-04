const Mongoose = require("mongoose");

const connectdb = (url) => {
  Mongoose.set("strictQuery", true);
  Mongoose
    .connect(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectdb;