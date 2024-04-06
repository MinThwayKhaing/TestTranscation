// app.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const indexRouter = require("./routes/main-route");
const sequelize = require("./config/database");
const loadModels = require("./loaders/model-loader");
const store = require("./constant");
const {
  connectKafkaConsumer,
  transactionComplete,
  connectKafkaProducer,
  sendTopic,
  subscribeTopic,
} = require("./utils/kafka");
const { subscribe } = require("diagnostics_channel");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//main method
async function main() {
  try {
    await sequelize.authenticate();
    await loadModels();
    await sequelize.sync({ update: true });
    // await connectKafkaConsumer();
    // await subscribeTopic("transaction-complete", transactionComplete());
    // await connectKafkaProducer();
    // await sendTopic("transaction-complete", {
    //   transactionAmount: "3500",
    //   userId: 1,
    // });
  } catch (error) {
    // console.error("Error initializing the application:", error);
    // process.exit(1); // Exit the process with error code 1
  }
}
main();
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
const PORT = process.env.PORT || 3001;
store.server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
