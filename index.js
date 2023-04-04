const Express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const cors = require("cors");

const port = 8080;

const app = Express();
app.use(bodyParser.json());
app.use(cors());

//DB connection
Mongoose.connect(
  "mongodb+srv://Surya147:Surya147@cluster0.ogvpazb.mongodb.net/Myzer",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("Connected to Database Success");
  })
  .catch((err) => {
    console.error("Error in connecting to Database", err);
  });

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

app.post("/user", async (req, res) => {
  const { Name, Location, Age, Gender, FavFilm, Interests } = req.body;

  // Save the Data
  const newUser = new Data({ Name, Location, Age, Gender, FavFilm, Interests });
  await newUser.save();
  console.log(newUser);
  res.send(newUser);
});
app.get("/user",(req,res)=>{
    res.send("The App is Working Fine")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on Port ${port}`);
});
