const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json())
mongoose
  .connect("mongodb://localhost:27017/cycle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use("/", require("./controller/feature"));
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
