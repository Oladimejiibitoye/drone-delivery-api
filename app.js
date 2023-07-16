require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const db = require("./models");
const clientRouter =  require("./routes/client");
const { successResMsg } = require("./helpers/response");
const HttpStatus = require("./helpers/enum/httpStatus.enum");
const { errorHandler } = require("./middlewares/error-handler");
const {seed} = require("./seeders/index");
const cronService = require("./cron/index");



db.sequelize
  .sync()
  .then(() => seed().then(() => console.log("<<<<<<<<<<<<<<<<<<<< Resyncing Database >>>>>>>>>>>>>>>>>>>>>>")));

seed()

const app = express();


if(process.env.NODE_ENV === "development"){
  app.use(logger('dev'))
}

// CORS
app.use(cors());

// MIDDLEWARES
app.use(helmet());
app.use(express.json({ limit: "30mb" }));
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

//start audit log
cronService.start()


// Default Route
app.get("/", (req, res) => {
  return successResMsg(res, HttpStatus.OK, {
    message: "Welcome to Drone Delivery API"
  })
});

// Routes
// ************ REGISTER ROUTES HERE ********** //
app.use("/v1/drones", clientRouter)
// ************ END ROUTE REGISTRATION ********** //




app.use(errorHandler)


app.use((_, res) => {
  return res.status(404).json({
    message: "Endpoint not found",
  })
});

module.exports = app;