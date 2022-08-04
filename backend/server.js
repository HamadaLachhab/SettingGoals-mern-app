const path = require("path");
const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config(); //have .env file
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); // use the goals router
app.use("/api/users", require("./routes/userRoutes")); // use the user router
// Serve frontend (frontend must be under routes )
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", index.html)
    )
  );
} else {
  app.get("/", (res, req) => {
    res.send("please set to production");
  });
}

app.use(errorHandler); // that will overwrite the default error handler

app.listen(port, () => console.log(`server Started on port ${port}`));
