require("./config/config");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./models");
const authtication = require("./middleware/authentication");
const userRoute = require("./routes/user");
const storeRoute = require("./routes/store");
const menuRoute = require("./routes/menu");
const productRoute = require("./routes/product");
const ordertRoute = require("./routes/order");

const app = express();

const corsOptions = {
  exposedHeaders: "access_token"
};

mongoose
  .connect(`mongodb://${process.env.MONGODB_URI}/${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });
mongoose.set("useCreateIndex", true);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true
  })
);

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(authtication);
app.use("/api", userRoute);
app.use("/api/store", storeRoute);
app.use("/api/menu", menuRoute);
app.use("/api/product", productRoute);
app.use("/api/order", ordertRoute);

app.get("/", (req, res) => {
  const user_agent = req.get("user-agent");
  const request_ip = req.connection.remoteAddress;
  res.send(
    `
    <h1>Hello world</h1>
    <h3>user_agent: ${user_agent}</h3>
    <h3>request_ip: ${request_ip}</h3>
    `
  );
});

app.listen(process.env.PORT, () => console.log(`start up: 3000`));
