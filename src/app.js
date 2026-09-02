const express= require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const {corsOrigin} = require("./config/env");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api/v1", routes);
app.use(errorMiddleware);


module.exports = app;