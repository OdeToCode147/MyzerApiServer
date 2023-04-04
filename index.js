const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./Database/Connection");

const port = process.env.PORT || 8080;
dotenv.config();

const app = Express();
app.use(bodyParser.json());
app.use(cors());

//schema
const dataSchema = new Mongoose.Schema(
  {
    Name: { type: String, required: true },
    Location: { type: String, required: true },
    Age: { type: String, required: true },
    Gender: { type: String, required: true },
    FavFilm: { type: [String], required: true },
    Interests: { type: [String], required: true },
  },
  { collection: "userInputs" }
);

const Data = Mongoose.model("Data", dataSchema);
const startServer = async () => {
    try {
      connectdb(process.env.MONGODB_URL);
      app.listen(port, () => {
        console.log("App is running on port", port);
      });
      app.post("/user", async (req, res) => {
        const { Name, Location, Age, Gender, FavFilm, Interests } = req.body;
      
        // Save the Data
        const newUser = new Data({ Name, Location, Age, Gender, FavFilm, Interests });
        await newUser.save();
        console.log(newUser);
        res.send(newUser);
      });
    } catch (error) {
      console.log(error);
    }
  };
  startServer();
