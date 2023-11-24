const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/movieRoutes"));
app.listen(process.env.PORT || 5001);
