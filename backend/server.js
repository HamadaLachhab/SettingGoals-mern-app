const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config(); //have .env file

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); // use the goals router

app.use(errorHandler); // that will overwrite the default error handler

app.listen(port, () => console.log(`server Started on port ${port}`));
